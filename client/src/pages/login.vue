<template>
<v-app>
<div class='splashBackground'>
<v-card elevation="2" style='width: 400px; padding: 20px; text-align: center; margin: 150px auto auto auto;'>
<v-form ref='form' lazy-validation>
	<v-card-text v-on:keyup.enter='login()'>
	<!--logo-->
		<img id="imageLogin" src="./logo.jpg" style='width: 200px; margin: 25px;'/>
	<!--username textbox-->
		<v-text-field
			ref='focusUsername'
			append-icon='mdi-account-circle'
			dense
			label='Username'
			:rules='[validate.required]'
			placeholder='Type username...'
			outlined
			v-model='username'
			autocomplete="off"
		></v-text-field>
	<!--password textbox-->
		<v-text-field
			dense
			append-icon='mdi-lock'
			label='Password'
			:rules='[validate.required]'
			placeholder='Type password...'
			outlined
			v-model='password'
			type = 'password'
			autocomplete="off"
		></v-text-field>
	<!--update button-->
		<v-btn
			dense 
			dark color='primary' 
			style='width: 100%; margin: 0px 0px 10px 0px;'
			@click='login()'>
			<v-icon dark left>login</v-icon>
			Login
		</v-btn>
		<span style='font-size: small; font-style: italic; color: #8f8f8f;'>
		contact kelgamal@kaiengineers.com for login issues<br>
		izasoft version: 1.03 last update: 12/04/20</span>
</v-card-text>
</v-form>
</v-card>
</div>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
	import session from "../utils/session.js";
//master
    export default {
    //name
        name: 'users',
    //components
        components: {
			session
        },
	//on load
		async created(){
		//focus the textbox
			setTimeout(() => {
				this.$refs.focusUsername.$refs.input.focus();
			}, 0);
		},
      methods: {
	//login
		async login(){
		//validate empties
			if(!this.$refs.form.validate()){
				return;
			}
		//check user
			let user = {
				username: this.username,
				password: this.password
			};
			let token = await bridge.getToken(user);
		//invalid entries
			if(!token.validUsername){
				toastr.error(`Username does not exist!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}else if(!token.validPassword){
				toastr.error(`Password is incorrect!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}
		//valid entries
			else if(token.privilege == 'admin'){
				document.cookie = 'admin' + '+' + session.getExpiration();
				this.$router.push({ path: `/users`});
			}else if(token.privilege == 'user'){
				document.cookie = 'user' + '+' + session.getExpiration();
				this.$router.push({ path: `/quote/${this.username}`});
			}else{
				toastr.error(`This account has an error!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}
		}
      },
	//global vars
          data: () => ({
			username: '',
			password: '',
			validate: {
                required: a => !!a || 'Entry required!'
            }
        }),
    }
</script>