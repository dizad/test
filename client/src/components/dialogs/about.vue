<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 450px; margin-top: 150px;'>    
	<v-card v-on:keyup.enter='closeAboutModal()'>
	<!--title-->
		<v-card-title
			class="primary"
			style='color: white;'>
			<span class="mdi mdi-24px mdi-information"></span>
			&nbsp;About   
		</v-card-title>		
	<!--content-->
		<v-card-text style='padding: 20px;'>
			<v-icon left>arrow_forward</v-icon>
				<label>Title=</label>&nbsp;
				<v-chip color='success'>{{title}}</v-chip><br>
			<v-icon left>arrow_forward</v-icon>
				<label style='padding-top: 10px;'>Version=</label>&nbsp;
				<v-chip color='success'>{{version}}</v-chip><br>
			<v-icon left>arrow_forward</v-icon>
				<label style='padding-top: 10px;'>Edition=</label>&nbsp;
				<v-chip color='success'>{{edition}}</v-chip><br>
			<v-icon left>arrow_forward</v-icon>
				<label style='padding-top: 10px;'>Headquarters=</label>&nbsp;
				<v-chip color='success'>{{headquarters}}</v-chip><br>
			<div style='margin-top: 10px;'>{{description}}</div>
		</v-card-text>             
		<v-card-actions style='margin-top: -10px;'>
		<!--close button-->
			<v-btn 
				style='width: 100%; margin: 0px 10px 10px 10px;'
				dense dark color='primary' 
				@click='closeAboutModal()'>
				<span class="mdi mdi-24px mdi-check-circle iconRight"></span>
				Ok
			</v-btn>
		</v-card-actions>
	</v-card>
</div>
</div>
</template>
<script>
//imports
//master
	export default {
//name
	name: 'about',
//components
	components: {
	},
//cycle methods
    async created(){
	},
//custom methods
    methods: {
	//close modal
		closeAboutModal(){
			this.$emit('closeAboutModal');
		}
    },
//global vars
	data: global => ({
			title: 'Outstanding Medical Automation',
			version: '1.000',
			edition: '2020 - 2021',
			headquarters: 'Cleveland / Los angeles',
			description: 'OMA software packages are used to automate all aspects of the medical industry such as scheduling, billing, and document management.'
    	})
	}
</script>