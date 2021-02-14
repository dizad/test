<template>
<v-app>
<div class='splashBackground'>
<v-card elevation="2" style='width: 450px; padding: 40px 20px 20px 20px; text-align: center; margin: 75px auto auto auto;'>
<v-form ref='form' lazy-validation>
	<!--login card-->
		<v-card-text v-on:keyup.enter='login()'>
		<!--mute button-turn on-->
		<button 
			v-if='!isMute'
			dense dark 
			color='success' 
			class='muteButton'
			title='Do shut up...'
			style='background-color: rgba(76, 175, 80, 1);'
			tabindex="-1"
			type="button"
			@click='setMute(true)'>
			<v-icon dark>volume_up</v-icon>
		</button>
		<!--mute button-turn off-->
		<button 
			v-if='isMute'
			dense dark 
			color='danger' 
			class='muteButton'
			title="Don't shut up..."
			style='background-color: rgba(251, 140, 0, 1);'
			tabindex="-1"
			type="button"
			@click='setMute(false)'>
			<v-icon dark>volume_off</v-icon>
		</button>
	<!--logo-->
		<img id="imageLogin" src="../../public/logo.gif" style='width: 100%; margin-bottom: 10px;'/>
	<!--username textbox-->
		<v-text-field
			ref='focusUsername'
			append-icon='mdi-account-circle'
			dense outlined
			label='Username'
			:rules='[validate.required]'
			placeholder='Type username...'
			v-model='username'
			autocomplete="off"
			color='rgba(77, 187, 64, 1.0)'
			background-color= 'yellow lighten-4'
		></v-text-field>
	<!--password textbox-->
		<v-text-field
			dense outlined
			append-icon='mdi-lock'
			label='Password'
			:rules='[validate.required]'
			placeholder='Type password...'
			v-model='password'
			type = 'password'
			autocomplete="off"
			color='rgba(77, 187, 64, 1.0)'
			background-color= 'yellow lighten-4'
		></v-text-field>
	<!--update button-->
		<v-btn
			dense dark 
			color='success' 
			style='width: 100%; margin: 0px 0px 10px 0px; font-weight: bold;'
			@click='login()'>
			<v-icon dark left>login</v-icon>
			LOGIN
		</v-btn>
		<span style='font-size: small; font-style: italic; color: #8f8f8f;'>
		contact dizad87@yahoo.com for login issues<br>
		izasoft version: 1.03 last update: 02/14/21</span>
</v-card-text>
</v-form>
</v-card>
</div>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
//master
    export default {
    //name
        name: 'users',
    //components
        components: {
        },
	//on load
		async created(){
		//get mute option
			this.isMute = await bridge.getMute();
			this.music = new Audio(`music.mp3`);
			if(!this.isMute){
				this.music.play();
			}
		//focus the textbox
			setTimeout(() => {
				this.$refs.focusUsername.$refs.input.focus();
			}, 0);
		},
	//exit page
		destroyed(){
			this.music.pause();
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
				document.cookie = 'admin';
				this.$router.push({ path: `/users`});
			}else if(token.privilege == 'user'){
			//update cookie
				document.cookie = 'user';
			//play sound effect
				if(this.username != 'test'){
					let result = await bridge.getTauntCount();
					let tauntId = (result.tauntCount + 1).toString();
					if(tauntId.length == 1){
						tauntId = `0` + tauntId;
					}
					new Audio(`taunts/${tauntId}.mp3`).play();
				}
			//redirect
				this.$router.push({ path: `/invoice/${this.username}`});
			}else{
				toastr.error(`This account has an error!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			}
		},
	//mute button
		async setMute(mute){
		//update isMute in temp
			this.isMute = mute;
		//update isMute in perm
			let params = {
				isMute: mute
			};
			await bridge.setMute(params);
		//update play
			if(mute){
				this.music.pause();
			}else{
				this.music.play();
			}
		}
      },
	//global vars
          data: () => ({
			username: '',
			password: '',
			isMute: false,
			music: {},
			validate: {
                required: a => !!a || 'Entry required!'
            }
        }),
    }
</script>