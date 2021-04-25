<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 1000px; margin-top: 100px;'><!--modal props-->
<v-card class='dizagara-outline-blue'>
<!--title-->
	<v-card-title
		class="primary"
		style='color: white;'>
		<span class='mdi mdi-24px mdi-account-circle dizagara-icon-right'></span>
		Account   
	</v-card-title>		
<!--content-->
	<v-card-text>
	<v-row><!--master row-->
	<v-col><!--left col-->
<!--account type type-->
	<v-card class='dizagara-panel-body dizagara-panel-height-01' style='margin: 10px 0px 20px 10px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px mdi-license dizagara-icon-right'></span>
			Licensing
		</v-list-item-title>
	<!--content-->
		<v-card-text>
			<!--type radio-->
				<v-row>
					<!--hospitals-->
						<v-autocomplete dense outlined

							background-color='yellow lighten-4'
							v-model='account.licensing.type'
							:items='lists.types'
							:item-text='a => a'
							label='Type'
							:rules='[validate.required]'
						></v-autocomplete>
				</v-row> 
				<v-row>
				<!--dropdowns-->
					<v-col style='margin-top: 20px; margin-bottom: -20px;'>
					<!--hospitals-->
						<v-autocomplete dense outlined
							v-if='account.licensing.type == "Hospital"'
							background-color='yellow lighten-4'
							v-model='account.facility'
							:items='lists.hubs'
							:item-text='a => a'
							label='Hospitals'
							:rules='[validate.required]'
						></v-autocomplete>
					<!--hubs-->
						<v-autocomplete dense outlined
							v-if='account.licensing.type == "Hub"'
							background-color='yellow lighten-4'
							v-model='account.facility'
							:items='lists.hospitals'
							:item-text='a => a'
							label='Hubs'
							:rules='[validate.required]'
						></v-autocomplete>
					</v-col>
				</v-row> 
				<v-row>
					<v-col>
					<!--license#-->
						<v-text-field dense outlined autocomplete='off'
							placeholder='Contact dizagara@gmail.com for license#...'
							v-model='account.licensing.license'
							background-color='yellow lighten-4'
							label='License#'
							:rules='[validate.required]'
						></v-text-field>
					</v-col>
				</v-row>			
		</v-card-text>
	</v-card>
<v-card outlined class='dizagara-panel-body dizagara-panel-height-01' style='margin: 10px 0px 0px 10px;'> 
<!--header-->
	<v-list-item-title class='dizagara-panel-header'>
		<span class='mdi mdi-18px mdi-account-box dizagara-icon-right'></span>
		Identity
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
		<!--name-->
			<v-row>
			<!--first name-->
				<v-text-field dense outlined
					label='First Name'
					:rules='[validate.required]'
					placeholder='Type first name...'
					v-model='account.identity.first'
					autocomplete='off'
					background-color='yellow lighten-4'
					style='margin-left: 10px; margin-right: 10px;'
				></v-text-field>
			<!--middle initial-->
				<v-text-field dense outlined
					label='Middle Name'
					:rules='[validate.required]'
					placeholder='Type middle name...'
					v-model='account.identity.middle'
					autocomplete='off'
					background-color='yellow lighten-4'
					style='margin-left: 10px; margin-right: 10px;'
				></v-text-field>
			<!--last name-->
				<v-text-field dense outlined
					label='Last Name'
					:rules='[validate.required]'
					placeholder='Type last name...'
					v-model='account.identity.last'
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
		<span class='mdi mdi-18px mdi-phone-forward dizagara-icon-right'></span>
		Contact
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
		<!--name-->
			<v-row>
				<!--phone# textbox-->
				<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
					style='margin-left: 10px; margin-right: 10px;'
					v-model='account.contact.phone'
					placeholder='Type phone...'
					label='Phone#'
					:rules='[validate.required]'
				></v-text-field>
			</v-row>
			<v-row>
				<!--email textbox-->
					<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
						style='margin-left: 10px; margin-right: 10px;'
						v-model='account.contact.email'
						placeholder='Type e-mail...'
						label='E-mail'
						:rules='[validate.required, validate.email]'
					></v-text-field>
			</v-row>
			<v-row>
			<!--code textbox-->
				<v-text-field dense outlined background-color='yellow lighten-4' autocomplete='off'
					style='margin-left: 10px; margin-right: 20px;'
					v-model='temp.contact.code'
					placeholder='Type code sent to e-mail...'
					label='Code'
					:rules='[validate.required]'
				></v-text-field>
			<!--send code-->
				<v-btn dense
					class='dizagara-button-blue' 
					style='margin-right: 10px;margin-top: 2px;'
					@click='sendCode()'
					:rules='[validate.required, validate.number]'>
					<span class="mdi mdi-24px mdi-signal-variant dizagara-icon-right"></span>
					E-MAIL CODE
				</v-btn>
			</v-row>
	</v-card-text>
</v-card>	
<v-card class='dizagara-panel-body dizagara-panel-height-01' style='margin: 20px 10px 0px 0px;'>
<!--header-->
	<v-list-item-title class='dizagara-panel-header'>
		<span class="mdi mdi-18px mdi-key dizagara-icon-right"></span>Authentication
	</v-list-item-title>
<!--content-->
	<v-card-text style='padding: 20px 20px 0px 20px;'>
		<!--name-->
			<v-row>
				<!--username textbox-->
				<v-text-field dense outlined
					label='Username'
					:rules='[validate.required]'
					placeholder='Type username...'
					v-model='username'
					autocomplete='off'
					background-color='yellow lighten-4'
					style='margin-left: 10px; margin-right: 10px;'
				></v-text-field>
				<!--username textbox-->
				<v-text-field dense outlined
					label='Type password'
					:rules='[validate.required]'
					placeholder='Password...'
					v-model='username'
					autocomplete='off'
					background-color='yellow lighten-4'
					style='margin-left: 10px; margin-right: 10px;'
				></v-text-field>
				<!--username textbox-->
				<v-text-field dense outlined
					label='Re-type password'
					:rules='[validate.required]'
					placeholder='Type username...'
					v-model='username'
					autocomplete='off'
					background-color='yellow lighten-4'
					style='margin-left: 10px; margin-right: 10px;'
				></v-text-field>
			</v-row>
	</v-card-text>
</v-card>
</v-col>
</v-row>		
</v-card-text>   
<!--actions-->
	<v-card-actions style='margin-top: -30px;'>
		<v-row>
		    <v-col class="text-right">
	<!--register button-->
		<v-btn dense
			class='dizagara-button-blue dizagara-button-width-01' 
			style='margin-right: 20px;'
			@click='register()'>
			<span class="mdi mdi-24px mdi-check-circle dizagara-icon-right"></span>
			Register
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-01'
			style='margin-right: 20px;'
			@click='closeAccountModal()'>
			<span class="mdi mdi-24px mdi-cancel dizagara-icon-right"></span>
			Cancel
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
	//abc
//master
	export default {
//name
	name: 'account',
//components
	components: {
	},
	props: ['data'],
//cycle methods
    async created(){
	//focus the first textbox
		setTimeout(() => {
			this.$refs.focusUsername.$refs.input.focus();
		}, 0);
		this.account.licensing.type = this.lists.types[0];
	},
//custom methods
    methods: {
	//register account
		register(){
			//validate form
			this.$refs.form.validate();
		},
	//close modal
		closeAccountModal(){
			this.$emit('closeAccountModal');
		},
	//send e-mail code
		sendCode(){


		}
    },
//global vars
	data: global => ({
			username: 'abc',
			hospitals: [],
			lists: {
				types:  ['Hospital', 'Hub'],
				hospitals: ['hospital01', 'hospital02', 'hospital03'],
				hubs: ['hub01', 'hub02', 'hub03']
			},
			account: {
				licensing: {
					type: '',
					facility: '',
					license: ''	
				},
				identity:{
					first: '',
					middle: '',
					last: ''
				},
				contact:{
					email: '',
					phone: ''
				},
				authentication:{
					username: '',
					fruit: '',
				}
			},
			temp:{
				contact:{
					code : ''
				},
				authentication: {
					fruit: ''
				}
			},
			validate: {
				required: a => !!a || 'Entry is required!',
				number: a => !isNaN(a) || 'Number is required!',
				email: a => {        
					let regex = new RegExp(/.+@.+\..+/);
					return regex.test(a) || 'Email must be in x@x.x format!';
				},
			}
		})
	}
</script>