<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 1000px; margin-top: 100px;'><!--modal props-->
<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
<!--title-->
	<v-card-title
		class="primary"
		style='color: white;'>
		<span class='mdi mdi-24px dizagara-margin-right dizagara-margin-left' id='headerIcon'></span>
		User   
	</v-card-title>		
<!--content-->
	<v-card-text>
	<v-form ref = 'form' lazy-validation>
	<v-row><!--master row-->
	<v-col><!--left col-->
<!--licensing-->
	<v-card class='dizagara-panel-body dizagara-panel-height-01' style='margin: 10px 0px 20px 10px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='licenseIcon'></span>
			Licensing
		</v-list-item-title>
	<!--content-->
		<v-card-text>
		<!--type-->
			<v-autocomplete dense outlined
				id='firstFocus'
				background-color='yellow lighten-4'
				v-model='user.privilege'
				:items='lists.privileges'
				:item-text='a => a'
				label='Privilege'
				:rules='[validate.required]'
			></v-autocomplete>
		<!--hospitals-->
			<v-autocomplete dense outlined
				v-if='user.privilege == "hospital"'
				background-color='yellow lighten-4'
				v-model='user.facility'
				:items='lists.hospitals'
				:item-text='a => a.name'
				:item-value='a => a.key'
				label='Hospital'
				:rules='[validate.required]'
			></v-autocomplete>
		<!--centers-->
			<v-autocomplete dense outlined
				v-if='user.privilege == "center"'
				background-color='yellow lighten-4'
				v-model='user.facility'
				:items='lists.centers'
				:item-text='a => a.name'
				:item-value='a => a.key'
				label='Center'
				:rules='[validate.required]'
			></v-autocomplete>
		<!--license#-->
			<v-text-field dense outlined autocomplete='off'
				placeholder='Contact dizagara@gmail.com for license#...'
				v-model='user.license'
				background-color='yellow lighten-4'
				label='License#'
				:rules='[validate.required]'
			></v-text-field>
		</v-card-text>
	</v-card>
<v-card outlined class='dizagara-panel-body dizagara-panel-height-01' style='margin: 10px 0px 0px 10px;'> 
<!--header-->
	<v-list-item-title class='dizagara-panel-header'>
		<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='identityIcon'></span>
		Identity
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
	<!--first name-->
		<v-row>
		<v-text-field dense outlined
			label='First Name'
			:rules='[validate.required]'
			placeholder='Type first name...'
			v-model='user.first'
			autocomplete='off'
			background-color='yellow lighten-4'
			style='margin-left: 10px; margin-right: 10px;'
		></v-text-field>
		</v-row>
	<!--last name-->
		<v-row>
		<v-text-field dense outlined
			label='Last Name'
			:rules='[validate.required]'
			placeholder='Type last name...'
			v-model='user.last'
			autocomplete='off'
			background-color='yellow lighten-4'
			style='margin-left: 10px; margin-right: 10px;'
		></v-text-field>
		</v-row>
</v-card-text>
</v-card>
</v-col>
<v-col><!--right col-->
<v-card class='dizagara-panel-body dizagara-panel-height-01' style='margin: 10px 10px 0px 0px;'>
<!--header-->
	<v-list-item-title class='dizagara-panel-header'>
		<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='contactIcon'></span>
		Contact
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
		<!--name-->
			<v-row>
				<!--phone# textbox-->
				<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
					style='margin-left: 10px; margin-right: 10px;'
					v-model='user.phone'
					placeholder='Type phone...'
					label='Phone#'
					:rules='[validate.required, validate.phone]'
					@keyup="controlPhone()"
				></v-text-field>
			</v-row>
			<v-row>
				<!--email textbox-->
					<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
						style='margin-left: 10px; margin-right: 10px;'
						v-model='user.email'
						placeholder='Type e-mail...'
						label='E-mail'
						:rules='[validate.required, validate.email]'
					></v-text-field>
			</v-row>
			<v-row>
			<!--code textbox-->
				<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
					style='margin-left: 10px; margin-right: 20px;'
					v-model='temp.code'
					placeholder='Type code sent to e-mail...'
					label='Code'
					:rules='[validate.required, validate.number]'
				></v-text-field>
			<!--send code-->
				<v-btn dense
					class='dizagara-button-blue' 
					style='margin-right: 10px;margin-top: 2px;'
					@click='sendCode()'
					:rules='[validate.required, validate.number]'>
					<span class="mdi mdi-24px mdi-signal-variant dizagara-margin-right dizagara-margin-left"></span>
					E-MAIL CODE
				</v-btn>
			</v-row>
	</v-card-text>
</v-card>	
<v-card class='dizagara-panel-body dizagara-panel-height-01' style='margin: 20px 10px 0px 0px;'>
<!--header-->
	<v-list-item-title class='dizagara-panel-header'>
		<span class="mdi mdi-18px dizagara-margin-right dizagara-margin-left" id='authenticationIcon'></span>Authentication
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
	<!--username-->
		<v-text-field dense outlined
			label='Username'
			:rules='[validate.required]'
			placeholder='Type username...'
			v-model='user.username'
			autocomplete='off'
			background-color='yellow lighten-4'
		></v-text-field>
	<!--password once-->
		<v-text-field dense outlined
			label='Type Password'
			:rules='[validate.required, validate.password]'
			placeholder='Type password once...'
			type='password'
			v-model='user.fruit'
			autocomplete='off'
			background-color='yellow lighten-4'
		></v-text-field>
	<!--password twice-->
		<v-text-field dense outlined
			label='Re-Type Password'
			:rules='[validate.required, validate.password]'
			placeholder='Type password twice...'
			type='password'
			v-model='temp.fruit'
			autocomplete='off'
			background-color='yellow lighten-4'
		></v-text-field>
	</v-card-text>
</v-card>
</v-col>
</v-row>
</v-form>		
</v-card-text>   
<!--actions-->
	<v-card-actions style='margin-top: -30px;'>
		<v-row>
		    <v-col class="text-right">
	<!--register button-->
		<v-btn dense
			class='dizagara-button-blue dizagara-button-width-medium' 
			style='margin-right: 20px;'
			@click='closeDialog("submit")'>
			<span class="mdi mdi-24px mdi-check-circle dizagara-margin-right"></span>
			{{this.params.isNew ? 'ADD' : 'EDIT'}}
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-medium'
			style='margin-right: 20px;'
			@click='closeDialog("cancel")'>
			<span class="mdi mdi-24px mdi-cancel dizagara-margin-right"></span>
			CANCEL
		</v-btn>
		</v-col>
		</v-row>
	</v-card-actions>
</v-card>
</div>
</div>
</template>
<script>
//imports
	import bridge from '../../bridge.js';
	import references from '../../utils/references.js';
	import utils from '../../utils/utils.js';
//master
	export default {
//name
	name: 'user',
//components
	components: {
	},
	props: ['data', 'params'],
//cycle methods
    async created(){
	//focus the first textbox
		setTimeout(() => {
			$('#firstFocus').focus();
			$('#headerIcon').addClass(references.getIcon('user'));
			$('#licenseIcon').addClass(references.getIcon('license'));
			$('#identityIcon').addClass(references.getIcon('identity'));
			$('#authenticationIcon').addClass(references.getIcon('authentication'));
			$('#contactIcon').addClass(references.getIcon('contact'));		
		}, 0);
    //get raw props
	  let users = [];
	  if(this.params.data){
		users = utils.deepClone(this.params.data);
	  }else{
		users = await bridge.getCollection({collection: `users`}) || [];
	  }
      let hospitals = await bridge.getCollection({collection: `hospitals`}) || [];
      let centers = await bridge.getCollection({collection: `centers`}) || [];
	  let licenses = await bridge.getCollection({collection: `licenses`}) || [];
	  this.application = await bridge.getConfig({config: `application`}) || {};
	//condition props
	  this.lists.hospitals = hospitals.map(a => {return {
		  key: a._id,
		  name: a.name
	  }});
	  this.lists.centers = centers.map(a => {return {
		  key: a._id,
		  name: a.name
	  }});
      this.lists.licenses = utils.deepClone(licenses);
      this.lists.usernames = users.map(a => a.username);
	//get data
		if(!this.params.isNew && this.data){
			this.user = utils.deepClone(this.data);
			this.temp.oldUser = this.user.username;
			this.temp.oldLicense = this.user.license;
		}else{
			let dataIds = users.map(a => a._id);
			this.user._id = `use#${utils.getNextId(dataIds)}`;
		}
	},
//custom methods
    methods: {
	//close modal
		closeAccountModal(){
			this.$emit('closeAccountModal');
		},
	//send e-mail code
		sendCode(){
			toastr.info(`Under construction, type any code for now!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//control phone#
		controlPhone(){
			if(this.user.phone){
				let x = this.user.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				this.user.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
			}
		},
	//close dialog
        async closeDialog(action){
        if(action == 'submit'){
        //form
            if(!this.$refs.form.validate()){
                toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                return;
            }
		//password match
			if(this.temp.fruit != this.user.fruit){
                toastr.error(`Passwords are not matching!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                return;
			}
		//unique username
			if(this.params.validation && this.params.validation.length){//comes from properties
				let validation = this.params.validation.find(a => a.key == `username`);
				if(validation.values.includes(this.user.username) && this.user.username != this.temp.oldUser){
					toastr.error(`Username already exists!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					return;
				}
			}else{//comes from banner or login screen
				if(this.lists.usernames.includes(this.user.username) && this.user.username != this.temp.oldUser){
					toastr.error(`Username already exists!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					return;
				}
			}
		//validate license
			//validate privilege
				let find = this.lists.licenses.find(a => 
					a.privilege == this.user.privilege && 
					a.license == this.user.license &&
					parseInt(a.usedAccounts) < parseInt(a.totalAccounts) && 
					moment(a.expiration).diff(moment(), 'hours', true) > 0);
				if(!find){
					if(this.lists.licenses.find(a => 
						(a.privilege == this.user.privilege && a.license != this.user.license) || 
						(a.privilege != this.user.privilege && a.license == this.user.license))){
						toastr.error(`This license# is not valid for the privilege selected, contact ${this.application.email} for assistance!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					}
					else if(this.lists.licenses.find(a => 
						a.privilege == this.user.privilege && 
						a.license == this.user.license &&
						parseInt(a.usedAccounts) >= parseInt(a.totalAccounts))){
						toastr.error(`This license# has no available accounts left, contact ${this.application.email} for assistance!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					}
					else if(this.lists.licenses.find(a => 
						a.privilege == this.user.privilege && 
						a.license == this.user.license &&
						parseInt(a.usedAccounts) < parseInt(a.totalAccounts) && 
						moment(a.expiration).diff(moment(), 'hours', true) <= 0)){
						toastr.error(`This license# expired, contact ${this.application.email} for assistance!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					}else{
						toastr.error(`This license# is not valid, contact ${this.application.email} for assistance!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					}
					return;
				}
			//update the count
				if(this.temp.oldLicense != this.user.license){
					await bridge.setField({
						collection: 'licenses',
						matchField: '_id',
						matchValue: find._id,
						setField: 'usedAccounts',
						setValue: (parseInt(find.usedAccounts) + 1).toString()
					});
				}
			//condition
			//cap master
				if(this.user.privilege == 'master'){
					this.user.facility = 'master';
				}
			//trim white space
				Object.keys(this.user).forEach(a => {
					if(this.user[a] && typeof this.user[a] == `string`){
						this.user[a] = this.user[a].trim();
					}
				});
		}		
		//send data
            this.$emit('closeDialog', {
                action: action,
                data: this.user
            });
		}
    },
//global vars
	data: global => ({
		application: {},
		lists: {
			privileges:  ['hospital', 'center', 'master'],
			hospitals: [],
			centers: [],
			licenses: [],
			usernames: []
		},
		user: {
		//licensing
			privilege: ``,
			facility: ``,
			license: ``,
		//identity
		//don't include middle, because if none will messup generic table
			first: ``,
			last: ``,
		//contact
			email: ``,
			phone: ``,
		//authentication
			username: ``,
			fruit: ``,
			isEula: false
		},
		temp:{
			oldUser: ``,
			code : ``,
			fruit: ``
		},
		validate: {
			required: a => !!a || 'Entry is required!',
			number: a => !isNaN(a) || 'Number is required!',
			password: a => a && a.length && a.length >= 2 || 'Password must have at least 1 chars!',
			email: a => {        
				let regex = new RegExp(/.+@.+\..+/);
				return regex.test(a) || 'Email must be in x@x.x format!';
			},
			phone: a => {        
				let regex = new RegExp(/\d{3}.+?\d{3}.+?\d{4}/);
				return regex.test(a) || 'Phone must contain 9 digits!';
			}
		}
	})
}
</script>