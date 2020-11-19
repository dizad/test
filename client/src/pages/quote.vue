<template>
<v-app>
<div class='splashBackground' >
	<v-card style='margin:30px;'> 
 	<!--banner-->
        <v-card-title
            class='headline primary'
            primary-title 
			style='color: white;'>
        <!--title-->
            <small><i class='fa fa-fw fa-usd'></i>Quote</small>
        <!--logout button-->
            <v-btn 
                style='position: absolute; right: 20px; width: 100px;'
                dense dark color='info' 
                @click='logout()'>
                <i class='fa fa-fw fa-sign-out'></i>
                Logout
            </v-btn>
        </v-card-title>
	<!--content-->
		<v-form ref='form' lazy-validation v-on:keyup.enter='updateQuote()'>
		<v-row style='padding: 20px 10px 0px 10px;'>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 20px;'
				label='Input01'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[0]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 10px;'
				label='Input02'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[1]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 20px 0px 10px;'
				label='Input03'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[2]'
			></v-text-field>
		</v-row>
		<v-row style='padding: 0px 10px 0px 10px;'>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 20px;'
				label='Input04'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[3]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 10px;'
				label='Input05'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[4]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 20px 0px 10px;'
				label='Input06'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[5]'
			></v-text-field>
		</v-row>
		<v-row style='padding: 0px 10px 0px 10px;'>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 20px;'
				label='Input07'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[6]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 10px 0px 10px;'
				label='Input08'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[7]'
			></v-text-field>
		<!--input-->
			<v-text-field
				style='width: 100px; margin: 0px 20px 0px 10px;'
				label='Input09'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type number...'
				outlined
				autocomplete="off"
				v-model='inputs[8]'
			></v-text-field>
		</v-row>
	</v-form>			
	<!--footer-->
		<v-footer class="primary" style='border-top-left-radius: 0px; border-top-right-radius: 0px;'>
		<v-row  justify="center" style='padding: 10px 10px 10px 10px;'>
		<!--quote value-->
			<v-btn
				style='width: 200px; margin: 0px 10px 0px 10px; background-color: white;'
				dense
				outlined
				dark
				color="primary"
				readonly
			>${{quote}}</v-btn>
		<!--update quote button-->
			<v-btn 
				style='width: 200px; margin: 0px 10px 0px 10px;'
				dense  color='info' 
				@click='updateQuote()'>
				<i class='fa fa-fw fa-refresh'></i>
				Update Quote
			</v-btn>
		<!--udpate quote button-->
			<v-btn 
				style='width: 200px; margin: 0px 20px 0px 10px;'
				dense dark color='success' 
				@click='downloadPdf()'>
				<i class='fa fa-fw fa-download'></i>
				Download PDF
			</v-btn>
			</v-row>
		</v-footer>
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
        //authenticate
            let params = document.cookie.split('+');
			if(params && params.length && params[0] != 'user'){
				this.$router.push({ path: '/login'});
            }
		},
      	methods: {
		//update the quote dollar
			updateQuote(){
			//validate empties
				if(!this.$refs.form.validate()){
					return;
				}
			//calculate
				this.quote = 0;
				this.inputs.forEach(a => this.quote += parseFloat(a));
				this.quote = this.quote.toFixed(2);
			},
		//logout of page
			logout(){
			//reset cookie
				document.cookie = 'null';
			//re-direct to login page
				this.$router.push({ path: '/login', params: {}});
			//notify
				toastr.success('Logged out!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			},
		//download pdf and send email
			downloadPdf(){
			//notify
				toastr.info(`Under construction!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			//validate empties
				if(!this.$refs.form.validate()){
					return;
				}
			//send email
				//abc
			//download pdf
				//abc
			}
	  	},
	//global vars
          data: global => ({
			quote: '0.00',
			inputs: [],
			validate: {
				required: a => !!a || 'This entry is empty!',
				number: a => !isNaN(a) || 'This entry requires a number!'
			}
        })
    }
</script>