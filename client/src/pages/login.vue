<template>
<v-app>
<!--dialogs-->
	<!--user-->
		<transition name="fade">
			<user 
				:data='user' 
				:params='params'
				v-if='dialogs.user.show'
				@closeDialog='closeDialog($event, "user")'>
			</user>
		</transition>
	<!--eula-->
		<transition name="fade">
			<eula 
				v-if='dialogs.eula.show'
				@closeDialog='closeDialog($event, "eula")'>
			</eula>
		</transition>
<div class='back-plate' style='background-image: url("../../background.jpg"); background-size: cover;'>
<v-card elevation='2' style='width: 450px; text-align: center; margin: 100px auto auto auto;' class='dizagara-outline-blue'>
	<!--logo-->
		<img id='imageLogin' src='../../public/logo.jpg' style = 'width: 80%; margin-top: 10px;'/>	
	<!--username textbox-->
		<v-text-field dense outlined
			id='firstFocus'
			append-icon='mdi-account-circle'
			label='Username'
			:rules='[validate.required]'
			placeholder='Type username...'
			v-model='username'
			autocomplete='off'
			background-color='light-blue lighten-5'
			style='margin-left: 30px; margin-right: 30px;'
		></v-text-field>
	<!--password textbox-->
		<v-text-field dense outlined
			append-icon='mdi-lock'
			label='Password'
			:rules='[validate.required]'
			placeholder='Type password...'
			v-model='fruit'
			type='password'
			autocomplete="off"
			background-color='light-blue lighten-5'
			style='margin-left: 30px; margin-right: 30px;'
		></v-text-field>
	<!--action buttons-->
	<v-card-actions style = 'background-color: #2655a9 !important;'>
		<v-form ref = 'form' lazy-validation>
			<v-card-text v-on:keyup.enter='login()'>
		<!--login button-->
			<v-btn dense class='dizagara-button-blue'
				style='width: 100%; margin: 0px 0px 10px 0px; font-weight: bold;'
				@click='login()'>
				<span class='mdi' id='loginIcon'></span>
				LOGIN
			</v-btn>
			<v-row class = "align-center">
		<!--register button-->
			<v-btn small class='dizagara-button-blue'
				style='margin: 10px; width: 190px' 
				@click="register()" 
				title='Create an account'>
				<span class='mdi' id='accountIcon'></span>
				REGISTER
			</v-btn>
		<!--recover password-->
			<v-btn small class='dizagara-button-blue'
				style='margin: 10px; width: 190px;' 
				@click='recover()' 
				title='Recover your password.'>
				<span class='mdi' id='passwordIcon'></span>
				PASSWORD
			</v-btn>
			</v-row>
		<!--disclaimer-->
			<span style='font-size: small; font-style: italic; color: white; text-align: center; margin: auto;'>
			version = {{application.version}} / last update = {{application.update}}<br>
			contact {{application.email}} for login issues</span>
			</v-card-text>
	</v-form>
</v-card-actions>
</v-card>
</div>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
	import user from '../components/dialogs/user.vue';
	import eula from '../components/dialogs/eula.vue';
	import references from '../utils/references.js';
//master
    export default {
//name
	name: 'login',
//components
	components: {
		user, eula
	},
//cycle methods
	//created
		async created(){
		//init timeout 
			setTimeout(() => {
				$('#focusFirst').focus();
				$('#loginIcon').addClass(references.getIcon('login'));
				$('#accountIcon').addClass(references.getIcon('user'));
				$('#passwordIcon').addClass(references.getIcon('password'));
			}, 0);
		//get data
			this.application = await bridge.getConfig({config: `application`}) || {};
			this.application.update = moment(this.application.update).format('MM/DD/YY');
		},
//custom methods
	methods: {
	//login
		async login(){
		//validate entries
			if(!this.$refs.form.validate()){
				return;
			}
		//check user
			let token = await bridge.getToken({
				username: this.username,
				fruit: this.fruit
			});
		//invalid entries
			if(!token.validUsername){
				toastr.error(`Username does not exist!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}else if(!token.validFruit){
				toastr.error(`Password is incorrect!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}else if(!token.isEula){
				this.dialogs.eula.show = true;
			}else{
			//redirect if valid entries
				this.$router.push({ path: `/dashboard/${this.username}`});
			}
		},
	//create account
		register(){
			this.params.isNew = true;
			this.dialogs.user.show = true;
		},
	//forgot password
		recover(){
			toastr.info(`Under construction!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//dialogs
		async closeDialog(params, type){
			this.dialogs[type].show = false;
			if(params.action == `submit`){
				if(type == 'user'){
				//add standards
					params.data.modBy = this.user.username;
					params.data.modDate = moment();
				//save to database
					await bridge.setDocument({
						collection: `users`,
						item: params.data
					}); 
				//notify
					toastr.success(`user added successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				}else if(type == 'eula'){
				//update isEula to true
					await bridge.setField({
						collection: 'users',
						matchField: 'username',
						matchValue: this.username,
						setField: 'isEula',
						setValue: true
					});
				//redirect if valid entries
					this.$router.push({ path: `/dashboard/${this.username}`});
				}
			}
		}
	},
//global vars
	data: () => ({
		username: '',
		fruit: '',
		application: {},
		user: {},
		validate: {
			required: a => !!a || 'Entry required!'
		},
		params: {},
		dialogs: {
			user: {
				show: false
			},
			eula: {
				show: false
			}
		}
	}),
}
</script>