<template>
<v-app>
	<div class='splashBackground'>
<v-card elevation="2" style='width: 400px; padding: 20px; text-align: center; margin: 150px auto auto auto;'>
<v-form ref='form' lazy-validation v-on:keyup.enter='login'>
	<!--logo-->
		<img id="imageLogin" src="./logo.jpg" style='width: 200px; margin: 25px;'/>
	<!--title textbox-->
		<v-text-field
			ref='focusMe'
			dense
			label='Username'
			:rules='[validate.required]'
			placeholder='Type username...'
			outlined
			v-model='username'
		></v-text-field>
	<!--password textbox-->
		<v-text-field
			dense
			label='Password'
			:rules='[validate.required]'
			placeholder='Type password...'
			outlined
			v-model='password'
		></v-text-field>
	<!--update button-->
		<v-btn
			dense 
			dark color='primary' 
			style='width: 100%; margin: 0px 0px 10px 0px;'
			@click='login()'>
			<i class='fa fa-fw fa-sign-in'></i>
			Login
		</v-btn>
		<span style='font-weight: bold; font-style: italic; color: #8f8f8f;'>contact kelgamal@kaiengineers.com for login issues</span>
</v-form>
</v-card>
	</div>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge';
//master
    export default {
	//on load
		async created(){
			this.users = await bridge.getUsers();
		},
      methods: {
	//login
		async login(){

this.$router.push({ path: '/users', params: {}});

/*

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
			console.log(token);
		//invalid entries
			if(!token.validUsername){
				toastr.error(`Username does not exist!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}else if(!token.validPassword){
				toastr.error(`Password is incorrect!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return;
			}
		//valid entries
			else if(privilege == 'admin'){
				alert('users');
				//this.$router.push({ path: '/users', params: {}});
			}else if(privilege == 'user'){
				alert('user');
				//this.$router.push({ path: '/quote', params: {}});
			}else{
				toastr.error(`This account has an error!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}
			*/
		}
      },
	//global vars
          data: () => ({
			username: '',
			password: '',
			validate: {
                required: a => !!a || 'This entry is empty!'
            }
        }),
    }
</script>