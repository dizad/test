<template>
<v-app>
<!--dialogs-->
<!--account-->
	<transition name="fade">
		<account v-bind:data='dialogs.account.data' v-if="dialogs.account.show" @closeAccountModal="closeAccountModal"></account>
	</transition>
<div class='back-plate' style='background-image: url("/background.jpg"); background-size: cover;'>
<v-card elevation='2' style='width: 450px; text-align: center; margin: 100px auto auto auto;' class='dizagara-outline-blue'>
	<!--logo-->
		<img id='imageLogin' src='../../public/logo.jpg' style = 'width: 80%; margin-top: 10px;'/>	
	<!--username textbox-->
		<v-text-field dense outlined
			ref='focusUsername'
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
				style = 'width: 100%; margin: 0px 0px 10px 0px; font-weight: bold;'
				@click = 'login()'>
				<span class='mdi mdi-login'></span>
				LOGIN
			</v-btn>
			<v-row class = "align-center">
		<!--register button-->
			<v-btn small class='dizagara-button-blue'
				style = 'margin: 10px; width: 190px' 
				@click = "register()" 
				title='Create an account'>
				<span class='mdi mdi-account-circle'></span>
				REGISTER
			</v-btn>
		<!--recover password-->
			<v-btn small class='dizagara-button-blue'
				style = 'margin: 10px; width: 190px;' 
				@click = 'forgotPassword()' 
				title='Recover your password.'>
				<span class='mdi mdi-help-circle'></span>
				PASSWORD
			</v-btn>
			</v-row>
		<!--disclaimer-->
			<span style='font-size: small; font-style: italic; color: white; text-align: center; margin: auto;'>
			contact dizagara@gamil.com for login issues</span>
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
	import account from '../components/dialogs/account.vue';
//master
    export default {
//name
	name: 'login',
//components
	components: {
		account
	},
//cycle methods
	//on load
		async created(){
		//focus the first textbox
			setTimeout(() => {
				this.$refs.focusUsername.$refs.input.focus();
			}, 0);
		//reset cookie
			document.cookie = 'denied';
		},
	//exit page
		destroyed(){
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
			let user = {
				username: this.username,
				fruit: this.fruit
			};
			let token = await bridge.getToken(user);
		//invalid entries
			if(!token.validUsername){
				toastr.error(`Username does not exist for that hub!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}else if(!token.validFruit){
				toastr.error(`Password is incorrect!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}
		//redirect if valid entries
			document.cookie = 'granted';
			this.$router.push({ path: `/dashboard/${this.username}`});
		},
	//create account
		register(){
			this.dialogs.account.show = true;
		},
	//forgot password
		recover(){
			toastr.info(`Under construction!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//dialogs
		closeAccountModal(){
			this.dialogs.account.show = false;
		}
	},
//global vars
	data: () => ({
		username: '',
		fruit: '',
		validate: {
			required: a => !!a || 'Entry required!'
		},
		dialogs: {
			account: {
				show: false,
				data: {isNew: true}
			}
		}
	}),
}
</script>