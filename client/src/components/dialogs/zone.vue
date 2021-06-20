<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 600px; margin-top: 100px;'><!--modal props-->
<v-card class='dizagara-outline-red' @keyup.enter='closeDialog("submit")'>
<!--title-->
    <v-card-title
        class="error"
        style='color: white;'>
        <span class='mdi mdi-24px dizagara-margin-right' id='headerIcon'></span>
        Edit Restriction Zone  
    </v-card-title>		
<!--content-->
<v-card-text>
<v-form ref = 'form' lazy-validation>
<!--center-->
    <v-text-field dense outlined autocomplete='off'
        style='margin: 20px 0px 0px 0px;'
        background-color = 'blue-grey lighten-5'
        v-model='zone.location.center.name'
        placeholder="Type restriction label..."
        label='Center'
        type='text'
        readonly
    ></v-text-field>
<!--room-->
    <v-text-field dense outlined autocomplete='off'
        style='margin: 0px 0px 0px 0px;'
        background-color = 'blue-grey lighten-5'
        v-model='zone.location.room.name'
        placeholder="Type restriction label..."
        label='Room'
        type='text'
        readonly
    ></v-text-field>
<!--label-->
    <v-text-field dense outlined autocomplete='off'
        id='firstFocus'
        style='margin: 0px 0px 0px 0px;'
        background-color='yellow lighten-4'
        v-model='zone.label'
        placeholder="Type restriction label..."
        label='Label'
        type='text'
        :rules='[validate.required]'
    ></v-text-field>
<!--frequency-->
    <v-radio-group row 
        v-model='zone.schedule.type' 
        :rules='[validate.required]'
        style='margin-top: -10px; margin-bottom: -10px;'>
        <v-radio
            v-for='type in lists.types'
            :key='type'
            :label='type'
            :value="type"
        ></v-radio>
    </v-radio-group>
<!--single date-->
    <div v-if='zone.schedule.type == "single"' class='dizagara-section' style='margin-bottom: 20px;'>
    <v-dialog
        style='margin-top: 0px;'
        ref="menu"
        v-model='datePickers.date.show'
        :close-on-content-click='false'
        :nudge-right='0'
        transition='scale-transition'
        offset-y
        max-width='290px'
        min-width='290px'>
        <template v-slot:activator="{on}">
        <v-text-field dense
            style='font-weight: bold; margin-bottom: -25px;'
            label='Single Date'
            append-icon='event'
            outlined readonly
            background-color= 'yellow lighten-4'
            v-model='datePickers.date.dateFormatted'
            @blur='zone.schedule.date = parseDate(datePickers.date.dateFormatted)'
            :rules='[validate.required]'
            v-on='on'
        ></v-text-field>
        </template>
        <v-date-picker dense 
            color='red lighten-1'
            v-model='zone.schedule.date'
            @input='datePickers.date.show = false'
        ></v-date-picker>
    </v-dialog>
    </div>
<!--repeat checkboxes-->
    <div v-if='zone.schedule.type == "repeat"' class='dizagara-section' style='margin-bottom: 20px;'>
        <v-row>
        <!--days of week-->
            <span v-for='(day, index) in lists.days' :key='day'  
                style='margin: -20px 0px 20px 20px;' >
                <v-checkbox hide-details
                    v-model='zone.schedule.repeat[index]'
                    :label='day'
                    :rules='[validateRepeat]'
                ></v-checkbox>
            </span>
        </v-row>
        <!--frequency-->
            <v-radio-group row 
                v-model='zone.schedule.frequency' 
                :rules='[validate.required]'
                style='margin: -5px auto -10px 8px;'>
                <v-radio
                    v-for='frequency in lists.frequency'
                    :key='frequency'
                    :label='frequency'
                    :value="frequency"
                ></v-radio>
            </v-radio-group>
        <!--range-->
            <!--start date-->
            <v-row v-if='zone.schedule.frequency == "range"'>
                <v-dialog
                    ref="menu"
                    v-model='datePickers.rangeStart.show'
                    :close-on-content-click='false'
                    :nudge-right='0'
                    transition='scale-transition'
                    offset-y
                    max-width='290px'
                    min-width='290px'>
                    <template v-slot:activator="{on}">
                    <v-text-field dense
                        style='font-weight: bold; margin: 0px 10px -20px 20px;'
                        label='Start Date'
                        append-icon='event'
                        outlined readonly
                        background-color= 'yellow lighten-4'
                        v-model='datePickers.rangeStart.dateFormatted'
                        @blur='zone.schedule.rangeStart = parseDate(datePickers.rangeStart.dateFormatted)'
                        :rules='[validate.required]'
                        v-on='on'
                    ></v-text-field>
                    </template>
                    <v-date-picker dense
                        color='red lighten-1'
                        v-model='zone.schedule.rangeStart'
                        @input='datePickers.rangeStart.show = false'
                    ></v-date-picker>
                </v-dialog>
            <!--end date-->
                <v-dialog
                    ref="menu"
                    style='margin: 0px 10px 0px 10px'
                    v-model='datePickers.rangeEnd.show'
                    :close-on-content-click='false'
                    :nudge-right='0'
                    transition='scale-transition'
                    offset-y
                    max-width='290px'
                    min-width='290px'>
                    <template v-slot:activator="{on}">
                    <v-text-field dense
                        style='font-weight: bold; bold; margin: 0px 20px -20px 10px;'
                        label='End Date'
                        append-icon='event'
                        outlined readonly
                        background-color= 'yellow lighten-4'
                        v-model='datePickers.rangeEnd.dateFormatted'
                        @blur='zone.schedule.rangeEnd = parseDate(datePickers.rangeEnd.dateFormatted)'
                        :rules='[validate.required]'
                        v-on='on'
                    ></v-text-field>
                    </template>
                    <v-date-picker dense
                        color='red lighten-1'
                        v-model='zone.schedule.rangeEnd'
                        @input='datePickers.rangeEnd.show=false'
                    ></v-date-picker>
                </v-dialog>
            </v-row>
    </div>
<!--start time-->
    <v-row>
<!--start time picker-->
    <v-dialog
        ref="dialog"
        v-model="timePickers.start.show"
        :return-value.sync="zone.schedule.start"
        persistent
        width="290px">
        <template v-slot:activator="{on}">
        <v-text-field outlined dense autocomplete='off'
            v-model="zone.schedule.start"
            label='Start Time'
            append-icon='mdi-clock-outline'
            background-color='yellow lighten-4'
            style='width: 50px; margin: 0px 10px 0px 10px; font-weight: bold;'
            color='rgba(77, 187, 64, 1.0)'
            readonly
            v-on="on"
        ></v-text-field>
        </template>
        <v-time-picker
            v-if="timePickers.start.show"
            v-model="zone.schedule.start"
            format="24hr"
            color='red lighten-1'
            @click:minute="closeTimePicker('start', zone.schedule.start)">
        </v-time-picker>
    </v-dialog>
<!--end time picker-->
    <v-dialog
        ref="dialog"
        v-model="timePickers.end.show"
        :return-value.sync="zone.end"
        persistent
        width="290px">
        <template v-slot:activator="{on}">
        <v-text-field outlined dense autocomplete="off"
            v-model="zone.schedule.end"
            label="End Time"
            append-icon="mdi-clock-outline"
            background-color= 'yellow lighten-4'
            style='width: 50px; margin: 0px 10px 0px 10px; font-weight: bold;'
            color='rgba(77, 187, 64, 1.0)'
            readonly
            v-on="on"
        ></v-text-field>
        </template>
        <v-time-picker
            v-if="timePickers.end.show"
            v-model="zone.schedule.end"
            format="24hr"
            color='red lighten-1'
            @click:minute="closeTimePicker('end', zone.schedule.end)">
        </v-time-picker>
    </v-dialog>
</v-row>
</v-form>
</v-card-text>   
<!--actions-->
	<v-card-actions style='margin-top: -40px;'>
		<v-row>
		    <v-col class="text-center">
	<!--register button-->
		<v-btn dense
			class='dizagara-button-blue dizagara-button-width-short' 
			@click='closeDialog("submit")'>
			<span class="mdi mdi-24px dizagara-margin-right" id='confirmIcon'></span>
			{{this.params.isNew ? 'ADD' : 'EDIT'}}
		</v-btn>
    <!--delete button-->
		<v-btn dense dark
            v-if='!params.isNew'
			class='dizagara-button-red dizagara-button-width-short'
            style='margin-left: 20px;'
			@click='closeDialog("delete")'>
			<span class="mdi mdi-24px dizagara-margin-right" id='deleteIcon'></span>
			DELETE
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-short'
            style='margin-left: 20px;'
			@click='closeDialog("cancel")'>
			<span class="mdi mdi-24px dizagara-margin-right" id='cancelIcon'></span>
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
    import converters from '../../utils/converters.js';
    import utils from '../../utils/utils.js';
	import bridge from '../../bridge.js';
//master
	export default {
//name
	name: 'zone',
//components
	components: {
	},
//props
	props: ['data', 'params'],
//cycle methods
    async created(){
	//init timeout
		setTimeout(() => {
            $('#focusFirst').focus();
            $('#headerIcon').addClass(references.getIcon('zone'));
            $('#confirmIcon').addClass(references.getIcon('submit'));
            $('#deleteIcon').addClass(references.getIcon('delete'));
            $('#cancelIcon').addClass(references.getIcon('cancel'));
		}, 0);
    //if existing
        if(!this.params.isNew){
            this.zone = utils.deepClone(this.data) || {};
        }
    //override with updates
        this.zone.schedule.start = converters.getPickerTime(this.params.event.start);
        this.zone.schedule.end = converters.getPickerTime(this.params.event.end);
    //bind date
       this.zone.schedule.date = converters.getPickerDate(this.params.event.start);
       this.datePickers.date.dateFormatted = this.formatDate(this.zone.schedule.date);  
    //bind center and room
        this.zone.location.center = this.params.center;
        this.zone.location.room = this.params.room;
	},
//custom methods
    methods: {
	//close dialog
		closeDialog(action){
            if(action != 'cancel'){
            //generic validation
                if(!this.$refs.form.validate()){
                    toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    return;
                }
            //conditioning(fine if zone but not schedule)
                Object.keys(this.zone.schedule).forEach(a => {
                    if(!this.zone.schedule[a]){
                        delete this.zone.schedule[a];
                    }
                });
            //time validation
                let rangeStart = `01/01/01 ${this.zone.schedule.start}`;
                let rangeEnd = `01/01/01 ${this.zone.schedule.end}`;
                if(utils.getHoursFromTwo(rangeStart, rangeEnd) <= 0){
                    toastr.error(`End time must be after start time!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    return;
                }
            }
        //send
            this.zone.modBy = this.$route.params.id;
            this.zone.modDate = moment();
            this.$emit('closeDialog', {
                action: action,
                data: this.zone
            });
		},
//validate repeart
        validateRepeat(){
            if(this.zone.schedule.repeat.every(a => !a)){
                return false;
            }else{
                return true;
            }
        },
//time stuff
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
    //close time picker
		closeTimePicker(type, value){
		//hide modal(must be before timeout)
            this.timePickers[type].show = false;
		//set value(must be inside timeout)
			setTimeout(() => {	
                this.zone.schedule[type] = value;
			}, 0);			
		},
    },
//watchers
    watch: {
        'datePickers':  {
            deep: true,
            handler: function() {//don't change 'function' syntax
                Object.keys(this.datePickers).forEach(a => {
                    this.datePickers[a].dateFormatted = this.formatDate(this.zone.schedule[a]);
                });
            }
		}
    },
//global vars
	data: global => ({
        lists: {
            types:  ['single', 'repeat'],
            frequency: ['forever', 'range'],
            days: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        },
        datePickers: {
            date: {
                show: false,
                dateFormatted: ``
            },
            rangeStart:  {
                show: false,
                dateFormatted: ``
            }, 
            rangeEnd: {
                show: false,
                dateFormatted: ``
            }
        },
        timePickers: {
            start: {
                show: false
            },
            end: {
                show: false
            }
        },
        zone: {
            label: ``,
            location: {
                center: {},
                room: {}
            },
            schedule: {
                start: ``,
                end: ``,
                type: `single`,
                date: ``,
                repeat: [false, false, false, false, false, false, false],
                rangeStart: ``,
                rangeEnd: ``,
                frequency: ``
            }
        },
        validate: {
            required: a => !!a || 'Entry is required!',
            number: a => !isNaN(a) || 'Number is required!'
        }
    })
}
</script>