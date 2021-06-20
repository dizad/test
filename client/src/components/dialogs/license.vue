<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 475px; margin-top: 100px;'><!--modal props-->
<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
<!--title-->
<v-card-title
    class="primary"
    style='color: white;'>
    <span class='mdi mdi-24px dizagara-margin-right' id='headerIcon'></span>
    License   
</v-card-title>		
<!--content-->
<v-card-text>
<v-form ref = 'form' lazy-validation>
<!--type-->
    <v-autocomplete dense outlined 
        id='firstFocus'
        style='margin: 20px 0px 0px 0px;'
        background-color='yellow lighten-4'
        v-model='license.privilege'
        :items='lists.privileges'
        :item-text='a => a'
        label='Privilege'
        :rules='[validate.required]'
    ></v-autocomplete>
<!--expiration months-->
    <v-text-field dense outlined autocomplete='off'
        style='margin: 0px 0px 0px 0px;'
        background-color='yellow lighten-4'
        v-model='license.duration'
        placeholder="Type # of months from today."
        label='Expiration Months'
        type='number'
        @change='updateExpirationDate'
        :rules='[validate.required, validate.number]'
    ></v-text-field>
<!--expiration date-->
    <v-dialog
        style='margin: 0px 10px 0px 10px;'
        ref="menu"
        v-model='datePicker.show'
        :close-on-content-click='false'
        :nudge-right='0'
        transition='scale-transition'
        offset-y
        max-width='290px'
        min-width='290px'>
        <template v-slot:activator="{on}">
        <v-text-field dense
            style='font-weight: bold; '
            label='Expiration Date'
            append-icon='event'
            outlined readonly
            background-color= 'yellow lighten-4'
            v-model='datePicker.dateFormatted'
            @blur='license.expiration = parseDate(datePicker.dateFormatted)'
            @change='updateExpirationDuration'
            :rules='[validate.required]'
            v-on='on'
        ></v-text-field>
        </template>
        <v-date-picker dense
            v-model='license.expiration'
            @input='datePicker.show = false'
        ></v-date-picker>
    </v-dialog>
<!--license count-->
    <v-text-field dense outlined autocomplete='off'
        background-color='yellow lighten-4'
        v-model='license.totalAccounts'
        placeholder="Type # of accounts available..."
        label='Total Accounts'
        type='number'
        :rules='[validate.required, validate.number]'
    ></v-text-field>
<!--license count-->
    <v-text-field dense outlined autocomplete='off'
        background-color='yellow lighten-4'
        v-model='license.usedAccounts'
        placeholder="Type # of accounts used..."
        label='Used Accounts'
        type='number'
        :rules='[validate.required, validate.number]'
    ></v-text-field>
<!--license-->
    <v-text-field readonly dense outlined autocomplete='off' 
        background-color='light-blue lighten-5'
        v-model='license.license'
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
			class='dizagara-button-blue dizagara-button-width-medium' 
            style='margin-right: 10px;'
			@click='closeDialog("submit")'>
			<span class="mdi mdi-24px mdi-check-circle dizagara-margin-right"></span>
			{{this.params.isNew ? 'ADD' : 'EDIT'}}
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-medium'
            style='margin-left: 10px;'
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
    import references from '../../utils/references.js';
    import utils from '../../utils/utils.js';
//master
	export default {
//name
	name: 'license',
//components
	components: {
	},
//props
	props: ['data', 'params'],
//cycle methods
    async created(){
	//focus the first textbox
		setTimeout(() => {
			$('#firstFocus').focus();
            $('#headerIcon').addClass(references.getIcon('license'));
		}, 0);
    //if existing
        if(!this.params.isNew){
            this.license = utils.deepClone(this.data);
            this.datePicker.dateFormatted = this.formatDate(this.license.expiration); 
        }else{
    //if new, generate license#
        let licenses = utils.deepClone(this.params.data) || [];
        let licenseCount = licenses.length;
        let count = licenseCount.toString();
        while(count.length < 5){
            count = `0` + count;
        }
        this.license.license = `${count}-${this.getRandomFive()}-${this.getRandomFive()}-${this.getRandomFive()}`;
        //generate date
        this.license.expiration = this.getNow(0);
        this.datePicker.dateFormatted = this.formatDate(this.license.expiration); 
        }
	},
//custom methods
    methods: {
    //update expiration duration on date change
        updateExpirationDuration(){
            let duration = moment(this.license.expiration).diff(moment(), 'months', true);
            this.license.duration = Math.round(duration);
        },
    //update expiration date on duration change
        updateExpirationDate(){
            let delay = this.license.duration * 30;
            this.license.expiration = this.getNow(delay);
            this.datePicker.dateFormatted = this.formatDate(this.license.expiration); 
        },
    //get random number
        getRandomFive(){
            let randomNumber = '';
            while(randomNumber.length < 5){
                randomNumber += Math.floor(Math.random() * 10);
            }
            return randomNumber;
        },
	//close dialog
		closeDialog(action){
            if(action == 'submit'){
            //check duration
                if(this.license.duration < 0){
                    toastr.error(`Duration can not be negative.`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    return;
                }
            //check validation
                if(!this.$refs.form.validate()){
                    toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    return;
                }
            }
            //conditioning
                Object.keys(this.license).forEach(a => {
                    if(this.license[a] && typeof this.license[a] == `string`){
                        this.license[a] = this.license[a].trim();
                    }
                });
            //send
                this.$emit('closeDialog', {
                    action: action,
                    data: this.license
                });
		},
    //format date to people friendly
        formatDate (date) {
            if (!date) return null;
            let [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
    //format date to picker friendly
        parseDate (date) {
            if (!date) return null
            let [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    //get default date
		getNow(delay){
			let today = new Date();
			today.setDate(today.getDate() + delay);
			return today.toISOString().substr(0, 10);
		},
    },
//watchers
    watch: {
        'datePicker':  {
        deep: true,
        handler: function(){
            this.datePicker.dateFormatted = this.formatDate(this.license.expiration);
            }
		}
    },
//global vars
	data: global => ({
        lists: {
            privileges:  ['hospital', 'center', 'master']
        },
        license: {
            license: '',
            privilege: '',
            duration: '',
            expiration: '',
            totalAccounts: ``,
            usedAccounts: ``
        },
        datePicker: {
            show: false,
            dateFormatted: ''
        },
        validate: {
            required: a => !!a || 'Entry is required!',
            number: a => !isNaN(a) || 'Number is required!'
        }
    })
}
</script>