<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 475px; margin-top: 100px;'><!--modal props-->
<v-card class='dizagara-outline-blue'>
<!--title-->
<v-card-title
    class="primary"
    style='color: white;'>
    <span class='mdi mdi-24px mdi-license dizagara-icon-right'></span>
    License   
</v-card-title>		
<!--content-->
<v-card-text>
<v-form ref = 'form' lazy-validation>
<!--type-->
    <v-autocomplete dense outlined 
        style='margin-top: 20px;'
        background-color='yellow lighten-4'
        ref='focusFirstInput'
        v-model='license.type'
        :items='lists.types'
        :item-text='a => a'
        label='Type'
        :rules='[validate.required]'
    ></v-autocomplete>
<!--expiration-->
    <v-text-field dense outlined autocomplete='off'
        background-color='yellow lighten-4'
        v-model='license.expiration'
        placeholder="Type # of months from today."
        label='Expiration Months'
        type='number'
        :rules='[validate.required, validate.number]'
    ></v-text-field>
<!--license count-->
    <v-text-field dense outlined autocomplete='off'
        background-color='yellow lighten-4'
        v-model='license.count'
        placeholder="Type # of accounts valid to license."
        label='License Count'
        type='number'
        :rules='[validate.required, validate.number]'
    ></v-text-field>
<!--license-->
    <v-text-field dense outlined autocomplete='off' readonly
        background-color='light-blue lighten-5'
        v-model='license._id'
        label='License#'
    ></v-text-field>
</v-form>
</v-card-text>   
<!--actions-->
	<v-card-actions style='margin-top: -40px;'>
		<v-row>
		    <v-col class="text-center">
	<!--register button-->
		<v-btn dense
			class='dizagara-button-blue dizagara-button-width-01' 
            style='margin-right: 10px;'
			@click='add()'>
			<span class="mdi mdi-24px mdi-check-circle dizagara-icon-right"></span>
			Add
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-01'
            style='margin-left: 10px;'
			@click='closeLicenseDialog()'>
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
	import bridge from '../../bridge.js';
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
			this.$refs.focusFirstInput.$refs.input.focus();
		}, 0);
    //generate license#
        let params = await bridge.getLicenseCount();
        this.licenseCount = params.licenseCount;
        let count = this.licenseCount.toString();
		while(count.length < 5){
			count = `0` + count;
		}
        this.license._id = `${count}-${this.getRandomFive()}-${this.getRandomFive()}-${this.getRandomFive()}`;
	},
//custom methods
    methods: {
    //get random number
        getRandomFive(){
            let randomNumber = '';
            while(randomNumber.length < 5){
                randomNumber += Math.floor(Math.random() * 10);
            }
            return randomNumber;
        },
	//add license
		async add(){
        //validate form
            if(!this.$refs.form.validate()){
                return;
            }
        //save license count
            this.licenseCount++;
            let params = {
                licenseCount: this.licenseCount
            }
            await bridge.saveLicenseCount(params);
        //save license
            await bridge.saveLicense(this.license);
        //notify
            toastr.success(`License added successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        //close dialog
            this.closeLicenseDialog();
		},
	//close dialog
		closeLicenseDialog(){
			this.$emit('closeLicenseDialog');
		}
    },
//global vars
	data: global => ({
        lists: {
            types: ['hospital', 'hub']
        },
        license: {
             _id: '',
            type: '',
            expiration: '',
            count: ''
        },
        licenseCount: 0,
        validate: {
            required: a => !!a || 'Entry is required!',
            number: a => !isNaN(a) || 'Number is required!'
        }
    })
}
</script>