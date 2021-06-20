<template>
<v-app>
<!--banner bar-->
  <banner class='no-print'></banner>
<!--sub-header-->
<v-card-title class='dizagara-sub-header'>
  <span class='mdi mdi-18px dizagara-margin-right' id='headerIcon'></span>
	<span>Dashboard</span>
</v-card-title>
<v-row v-if='license.percentage < 100'>
<v-col>
<!--scheduling-->
	<v-card 
		class='dizagara-panel-body' 
		style='margin: 10px 0px -20px 20px; height: calc(100vh - 350px)'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right' id='schedulingIcon'></span>
			Scheduling
		</v-list-item-title>
	<!--chart-->
		<v-card-text>
			<chart v-if="ready.charts" 
			:data="chartData.scheduling || {}" 
			style='height: calc(40vh); width: calc(40vh); text-align: center; margin: calc(5vh) auto auto auto;'>
			</chart>
    </v-card-text>
	</v-card>
</v-col>
<v-col>
<!--tracking-->
  	<v-card class='dizagara-panel-body' 
	  style='margin: 10px 20px -20px 0px; height: calc(100vh - 350px)'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right' id='trackingIcon'></span>
		  	Tracking
		</v-list-item-title>
	<!--chart-->
		<v-card-text>
			<chart v-if="ready.charts" 
			:data="chartData.tracking || {}" 
			style='height: calc(40vh); width: calc(40vh); text-align: center; margin: calc(5vh) auto auto auto;'>
			</chart>
		</v-card-text>
	</v-card>
	</v-col>
</v-row>
<v-row>
	<v-col>
	<v-card 
		class='dizagara-panel-body' 
		style='margin: 0px 20px 0px 20px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right' id='licenseIcon'></span>
			License
		</v-list-item-title>
	<!--license bar-->
		<v-card-text>		
			<v-progress-linear
				striped
				:color='license.percentage >= 100 ? "red" : "blue"'
				:value="license.percentage"
				height="25" 
				readonly>
				<strong>
					{{Math.ceil(license.percentage)}}% Complete - {{license.remaining}} Days Remaining
				</strong>
			</v-progress-linear>
		</v-card-text>
	</v-card>
	</v-col>
</v-row>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
	import banner from '../components/generics/banner.vue';
	import references from '../utils/references.js';
	import converters from '../utils/converters.js';
	import chart from "../components/generics/pie.js";
//master
	export default {
//name
	name: 'dashboard',
//components
  components: {
    banner, chart
  },
//cycle methods
  async created(){
	//get generics
	  	this.userId = this.$route.params.id;
  	//get schedule data
		this.schedules = await bridge.getCollection({collection: 'schedules'}) || [];
		this.application = await bridge.getConfig({config: `application`}) || {};
		let stages = ['drafted', 'submitted', 'approved'];
		let labels = {
			scheduling: [],
			tracking: []
		};
		let data = {
			scheduling: [],
			tracking: []
		};
		let backColors = {
			scheduling: [],
			tracking: [],
		};
		let hoverColors = {
			scheduling: [],
			tracking: []
		};
		let blueBottom = 100;
		let blueTop = 250;
		stages.forEach((a, ai) => {
			let count = this.schedules.filter(b => b.stage == a).length;
			labels.scheduling.push(converters.capitalizeFirst(a));
			data.scheduling.push(count);
			let blueIncrement = (blueTop - blueBottom) / stages.length;
			backColors.scheduling.push(converters.getColor(0, blueTop - (ai * blueIncrement), 255, 1.00));
			hoverColors.scheduling.push(converters.getColor(0, blueTop - (ai * blueIncrement), 255, 0.75));
		});
	//get track data
		let tracks = await bridge.getCollection({collection: 'tracks'}) || [];
		tracks = tracks.length ? tracks.map(a => a.name) : [`none`];
		let increment = 100;
		if(tracks.length > 0){
			increment = 100 / (tracks.length - 1);
		}
		tracks.forEach((a, ai) => {
			let count = this.schedules.filter(b => Math.round(b.track) == Math.round(ai * increment)).length;
			labels.tracking.push(converters.capitalizeFirst(a));
			data.tracking.push(count);
			let blueIncrement = (blueTop - blueBottom) / tracks.length;
			backColors.tracking.push(converters.getColor(0, blueTop - (ai * blueIncrement), 255, 1.00));
			hoverColors.tracking.push(converters.getColor(0, blueTop - (ai * blueIncrement), 255, 0.75));
		});
	//bind data
		this.chartData = {
		//scheduling
			scheduling: {
				labels: labels.scheduling,
				datasets: [{
					label: 'scheduling',
					data: data.scheduling,
					backgroundColor: backColors.scheduling,
					hoverBackgroundColor: hoverColors.scheduling,
					borderWidth: 1,
					borderColor: converters.getColor(0, 80, 180, 1.00)
				}]
			},
		//tracking
			tracking: {
				labels: labels.tracking,
				datasets: [{
					label: 'tracking',
					data: data.tracking,
					backgroundColor: backColors.tracking,
					hoverBackgroundColor: hoverColors.tracking,
					borderWidth: 1,
					borderColor: converters.getColor(0, 80, 180, 1.00)
				}]
			}
		}
	//license
		//get numbers
			let license = await bridge.getLicenseByUser({
				username: this.userId
			});
			this.license.total = license.duration * 30;
			this.license.remaining = Math.round(moment(license.expiration).diff(moment(), 'days', true));
			this.license.expired = this.license.total - this.license.remaining;
			this.license.percentage = Math.round((this.license.expired / this.license.total) * 100);
		//cap percentage
			if(this.license.percentage < 0){
				this.license.percentage = 0;
			}else if(this.license.percentage > 100){
				this.license.percentage = 100;
				toastr.info(`This license# expired, contact ${this.application.email} for a new one!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}
		//cap remainings
			if(this.license.remaining < 0){
				this.license.remaining = 0;
			}
	//get icons (must be after stuff above)
		setTimeout(() => {
			$('#schedulingIcon').addClass(references.getIcon('schedule'));
			$('#trackingIcon').addClass(references.getIcon('track'));
			$('#licenseIcon').addClass(references.getIcon('license'));
			$('#headerIcon').addClass(references.getIcon('dashboard'));
		}, 0);
		this.ready.charts = true;
  },
//global
	data: global => ({
		userId: '',
		application: {},
		ready: {
			charts: false
		},
		license: {
			total: 0,
			remaining: 0,
			expired: 0,
			percentage: 0
		},
		chartData: null //must be null
	})
}
</script>