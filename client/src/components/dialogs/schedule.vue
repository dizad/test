<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<!--loading bar-->
    <div v-if='loaded.percent < 100'
        class='center-block' 
        style='width: calc(50vw); margin-top: calc(40vh)'>
        <v-card class="dizagara-outline-blue">
            <v-card-title
                class="primary"
                style='color: white;'>
                <span class="mdi mdi-24px" id='headerIcon'></span>
                &nbsp;Loading...
            </v-card-title>
            <v-card-text>
            <v-progress-linear striped
                style='margin-top: 15px;'
                :value="loaded.percent"
                height="25"
                readonly>
                <strong>{{loaded.percent}}% - {{loaded.checkpoint}}</strong>
            </v-progress-linear>
            </v-card-text>
        </v-card>
    </div>
<!--dialog-->
<div v-if='loaded.percent >= 100' 
    class='center-block' 
    style='width: calc(90vw); margin-top: 75px;' >
<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
<!--title-->
    <v-card-title
        class="primary"
        style='color: white;'>
        <span class="mdi mdi-24px" id='headerIcon'></span>
        &nbsp;Edit Surgery Procedure  
    <!--refresh button-->
		<v-btn dense
			class='dizagara-button-green' 
            style='position: absolute; right: 20px;'
			@click='reloadDropdowns()'>
			<span class="mdi mdi-24px dizagara-margin-right" id='refreshIcon'></span>
			RELOAD DROPDOWNS
		</v-btn>
    </v-card-title>
<!--content-->
    <v-form lazy-validation ref="form" class='dizagara-background-01' style='height: calc(100vh - 300px) !important; overflow-y: scroll; overflow-x: hidden;'>       
    <v-row><!--master row-->
<!--1st col------------------------------------------------------------------------------------------------------------->
  <v-col>
<!--location-->
	<v-card class='dizagara-panel-body' style='margin: 10px 0px 20px 20px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='centerIcon'></span>
			Location
		</v-list-item-title>
	<!--content-->
        <v-card-text style='padding: 10px 20px 0px 20px; margin-bottom: -5px;'>
            <v-row>
                <v-col style='padding-bottom: 0px;'>
        <!--center-->
            <v-text-field dense outlined 
                autocomplete='off'
                background-color = 'blue-grey lighten-5'
                v-model='schedule.location.center.name'
                label='Center'
                type='text'
                readonly
            ></v-text-field>
             </v-col>
              <v-col style='padding-bottom: 0px;'>
        <!--room-->
            <v-text-field dense outlined 
                autocomplete='off'
                background-color = 'blue-grey lighten-5'
                v-model='schedule.location.room.name'
                label='Room'
                type='text'
                readonly
            ></v-text-field>
             </v-col>
            </v-row>
        </v-card-text>
	</v-card>
<!--historical events-->
	<v-card class='dizagara-panel-body' style='margin: 0px 0px 20px 20px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='archiveIcon'></span>
			Load Historical
		</v-list-item-title>
	<!--content-->
	        <v-card-text style='padding: 10px 20px 0px 20px; margin-bottom: -5px;'>
            <v-row>
            <!--historical-->
                <v-col class='col-md-11'
                    style='padding-bottom: 0px;'>
                    <v-autocomplete dense outlined
                        style=''
                        background-color='yellow lighten-4'
                        v-model='historicalEvent'
                        :items='lists.schedules'
                        :item-text='a => getHistoricalTitle(a)'
                        :item-value='a => a'
                        title='Pick historical event by patient name and date...'
                        label='Historical Events'
                    ></v-autocomplete>
                </v-col>
           <!--load-->
                <v-col class='col-md-1'>
                    <v-btn dense icon 
                        style='margin-left: -10px;'
                        class='dizagara-button-green' 
                        title='Load historical event...'
                        @click="loadHistorical()">
                        <span class="mdi mdi-24px" id='loadIcon'></span>
                    </v-btn>  
                </v-col>
            </v-row>
        </v-card-text>
	</v-card>
<!--communication-->
    <v-card class='dizagara-panel-body' style='margin: 0px 0px 20px 20px;'>
	<!--header-->
		<v-list-item-title class='dizagara-panel-header'>
			<span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='communicationIcon'></span>
			Communication
		</v-list-item-title>
    <!--content-->
        <v-card-text style='margin: 10px 20px -20px 20px;'>
            <v-row>
            <!--language-->
                <v-autocomplete dense outlined
                    id='firstFocus'
                    background-color='yellow lighten-4'
                    v-model='schedule.communication.language'
                    :items="lists.languages"
                    label="Language"
                    :rules ="[validate.required]"
                ></v-autocomplete>
            <!--interpreter required-->
                <v-checkbox hide-details
                    style='margin: 0px 50px 0px 20px;'
                    v-model='schedule.communication.isInterpreter'
                    label='Interpreter Required'
                ></v-checkbox>
            </v-row>
        <!--interpreter reason-->
            <v-row style='margin-right: 25px;'>
                <v-text-field dense outlined
                    v-if='schedule.communication.isInterpreter'
                    background-color = 'yellow lighten-4'
                    v-model='schedule.communication.reason'
                    label ="Interpreter Reason"
                    placeholder = "Explain..."
                ></v-text-field>
            </v-row>
        </v-card-text>
    </v-card>
 <!--patient-->
    <v-card class='dizagara-panel-body' style='margin: 0px 0px 20px 20px;'>
    <!--header-->
        <v-list-item-title class='dizagara-panel-header'>
            <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='patientIcon'></span>
            Patient
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 10px 20px 0px 20px;'>
        <!--params-->
            <v-row>
            <!--patient-->
                <v-col class='col-md-11'
                    style='padding-bottom: 0px;'>
                    <v-autocomplete dense outlined
                        label="Patient"
                        background-color='yellow lighten-4'
                        v-model='schedule.patient'
                        :items="lists.patients"
                        :item-text="a => a.first + ', ' + a.last"
                        :item-value="a => a"
                        :rules='[validate.required]'
                    ></v-autocomplete>
                </v-col>
           <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('patient')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
            <!--bmi and anesthethis type-->
            <v-row style='margin-top: -10px;'>
            <!--bmi-->
                <v-col style='padding-bottom: 0px;' class='col-md-6'>
                    <v-text-field dense outlined
                        background-color = 'blue-grey lighten-5'
                        v-model='schedule.patient.bmi'
                        placeholder="Displays BMI..."
                        readonly
                        label ="BMI"
                    ></v-text-field>
                </v-col>
           <!--anesthesia-->
                <v-col class='col-md-6'>
                    <v-text-field dense outlined
                        background-color = 'blue-grey lighten-5'
                        v-model='schedule.patient.anesthesia.name'
                        label ="Anesthesia"
                        placeholder = "Displays Anesthesia..."
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
            <!--preps-->
                <div style='margin-top: -20px; margin-bottom: 20px; box-shadow: none;' class='dizagara-section'>        
                    <label style='margin-left: 10px; margin-top: 2px;' class='text-primary'>Prep Checklist</label>
                    <v-row>
                        <span v-for='prep in lists.preps.patients' :key='prep._id' style='margin-top: -20px;'>
                        <v-checkbox hide-details multiple 
                            style='margin-left: 20px;'
                            v-model='schedule.patient.preps'
                            :value='prep'
                            :label='prep.name'
                        ></v-checkbox>
                        </span>
                    </v-row>
                </div>
        </v-card-text>
    </v-card>
</v-col>
<!--2nd col------------------------------------------------------------------------------------------------------------->
<v-col>
<!--procedure card-->
    <v-card class='dizagara-panel-body' style='margin: 10px 0px 0px 0px;'>
    <!--header-->
        <v-list-item-title class='dizagara-panel-header'>
            <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='diagnoseIcon'></span>
            Diagnoses
        </v-list-item-title>
        <v-card-text style='padding: 10px 20px 0px 20px; margin-bottom: -15px;'>
        <!--diagnoses codes-->
            <v-row>
                <v-col class='col-md-11'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='schedule.diagnose.diagnose'
                        :items='lists.diagnoses'
                        :item-text="a => a.name"
                        :item-value="a => a"
                        label="Diagnose"
                        :rules ="[validate.required]"
                    ></v-autocomplete>
                </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('diagnose')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row style='margin-top: -20px;'>
        <!--diagnose codes-->
            <v-col class='col-md-11'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='schedule.diagnose.code'
                    :items='lists.codes.diagnoses'
                    :item-text="a => a.name"
                    :item-value="a => a"
                    label="Diagnose Code"
                    :rules ="[validate.required]"
                ></v-autocomplete>
            </v-col>
        <!--redirect-->
            <v-col class='col-md-1'>
                <v-btn 
                    dense icon
                    class='dizagara-button-blue' 
                    style='margin-left: -10px;'
                    @click="redirect('code')">
                    <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                </v-btn>
            </v-col>
            </v-row>
        </v-card-text>
    </v-card>
<!--procedure card-->
    <v-card class='dizagara-panel-body' style='margin: 20px 0px 0px 0px;'>
    <!--header-->
        <v-list-item-title class='dizagara-panel-header'>
            <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='procedureIcon'></span>
            Procedure
        </v-list-item-title>
        <v-card-text style='padding: 10px 20px 0px 20px;'>
     <!--physician-->
            <v-row  style='margin-top: 0px;'>
            <!--physician-->
                <v-col class='col-md-11'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='schedule.procedure.physician'
                        :items="lists.physicians"
                        :item-text="a => a.first + ', ' + a.last"
                        :item-value="a => a"
                        label="Physician"
                        :rules ="[validate.required]"
                    ></v-autocomplete>
                </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('physician')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row  style='margin-top: -20px;'>
            <!--procedure-->
                <v-col class='col-md-11'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='schedule.procedure.code'
                        :items='lists.codes.procedures'
                        :item-text="a => a.name"
                        :item-value="a => a"
                        label="Procedure Code"
                        :rules ="[validate.required]"
                    ></v-autocomplete>
                </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('code')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row  style='margin-top: -20px;'>
            <!--room property-->
                <v-col class='col-md-11'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                         v-model='schedule.procedure.procedure'
                        :items="lists.procedures"
                        :item-text='a => a.name'
                        :item-value='a => a'
                        label="Procedure"
                        :rules ="[validate.required]"
                    ></v-autocomplete>
                </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('procedure')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
        <!--preps-->
            <div style='margin-top: -20px; margin-bottom: 20px; box-shadow: none;' 
                class='dizagara-section'>        
                <label style='margin-left: 10px; margin-top: 2px;' class='text-primary'>Prep Checklist</label>
                <v-row>
                    <span v-for='prep in schedule.procedure.procedure.preps' :key='prep.key' style='margin-top: -20px;'>
                        <v-checkbox hide-details multiple
                            style='margin-left: 20px;'
                            v-model='schedule.procedure.preps'
                            :value='prep'
                            :label='prep.name'
                        ></v-checkbox>
                    </span>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
  <!--insurance panel-->
        <v-card class='dizagara-panel-body' style='margin: 20px 0px 0px 0px;'>
        <!--header-->
            <v-list-item-title class='dizagara-panel-header'>
                <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='insuranceIcon'></span>
                Insurance
            </v-list-item-title>
        <!--content-->
            <v-card-text style='padding: 10px 20px 0px 20px; margin-bottom: -15px;'>               
            <v-row style='margin-bottom:-10px;'>
            <!--primary insurance-->
                <v-col style='padding-bottom: 0px;' class='col-md-11'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='schedule.insurance.primary'
                        :items="lists.insurances"
                        :item-text="a => a.name"
                        :item-value="a => a"
                        label="Primary Insurance"
                        :rules ="[validate.required]"
                    ></v-autocomplete>
                </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('insurance')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
        <v-row>
        <!--secondary insurance-->
            <v-col class='col-md-11'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='schedule.insurance.secondary'
                    :items="lists.insurances"
                    :item-text="a => a.name"
                    :item-value="a => a"
                    label="Secondary Insurance"
                    :rules ="[validate.required]"
                ></v-autocomplete>
            </v-col>
            <!--redirect-->
                <v-col class='col-md-1'>
                    <v-btn 
                        dense icon
                        class='dizagara-button-blue' 
                        style='margin-left: -10px;'
                        @click="redirect('insurance')">
                        <span class="mdi mdi-24px dizagara-redirect-icon"></span>
                    </v-btn>
                </v-col>
            </v-row>
                </v-card-text>
            </v-card>
</v-col>
<!--3rd col------------------------------------------------------------------------------------------------------------->
<!--right column-->
<v-col>
<!--schedule-->
<v-card class='dizagara-panel-body' style='margin: 10px 20px 0px 0px;'>
    <v-list-item-title class='dizagara-panel-header'>
        <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='timeIcon'></span>
        Date Time
    </v-list-item-title>
    <v-card-text style='padding: 20px 20px 0px 20px; margin-bottom: -5px;'>
    <!--date-->
        <v-dialog
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
                style='font-weight: bold; margin: 0px 0px 0px 0px;'
                label='Date'
                append-icon='event'
                outlined readonly
                background-color= 'yellow lighten-4'
                v-model='datePickers.date.dateFormatted'
                @blur='schedule.schedule.date = parseDate(datePickers.date.dateFormatted)'
                :rules='[validate.required]'
                v-on='on'
            ></v-text-field>
            </template>
            <v-date-picker dense
                v-model='schedule.schedule.date'
                @input='datePickers.date.show = false'
            ></v-date-picker>
        </v-dialog>
    <!--busy times-->
        <div style='margin-top: -10px; margin-bottom: 20px; box-shadow: none;' class='dizagara-section'>        
            <label style='margin-left: 10px; margin-top: 2px;' class='text-primary'>Busy Times For {{datePickers.date.dateFormatted}}</label>
            <v-row style='margin-left: 0px;'>
        <span v-for='busyTime in lists.busyTimes' :key='busyTime.key'>
        <v-chip style='margin-left: 5px;'
            color="error">
            {{`${busyTime.start} to ${busyTime.end}`}}
        </v-chip>
        </span>
        </v-row>
        </div>
<v-row>
<!--start time picker-->
<v-dialog
    ref="dialog"
    v-model="timePickers.start.show"
    :return-value.sync="schedule.schedule.start"
    persistent
    width="290px">
    <template v-slot:activator="{on}">
    <v-text-field outlined dense autocomplete='off'
        v-model="schedule.schedule.start"
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
        v-model="schedule.schedule.start"
        format="24hr"
        @click:minute="closeTimePicker('start', schedule.schedule.start)">
    </v-time-picker>
</v-dialog>
<!--end time picker-->
<v-dialog
    ref="dialog"
    v-model="timePickers.end.show"
    :return-value.sync="schedule.schedule.end"
    persistent
    width="290px">
    <template v-slot:activator="{on}">
    <v-text-field outlined dense autocomplete="off"
        v-model="schedule.schedule.end"
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
        v-model="schedule.schedule.end"
        format="24hr"
        @click:minute="closeTimePicker('end', schedule.schedule.end)">
    </v-time-picker>
</v-dialog>
</v-row>
    <v-row>
    <!--pick insurance2-->
        <v-col style='padding-bottom: 0px; margin-top: -10px;'>
            <v-text-field dense outlined
                background-color='blue-grey lighten-5'
                v-model='schedule.schedule.duration'
                label="Duration(hrs)"
                placeholder="Duration"
                readonly
            ></v-text-field>
        </v-col>
    </v-row>
    </v-card-text>
</v-card>
<!--patient panel-->
    <v-card class='dizagara-panel-body' style='margin: 20px 20px 0px 0px;'>
    <!--header-->
        <v-list-item-title class='dizagara-panel-header'>
            <span class='mdi mdi-18px dizagara-margin-right dizagara-margin-left' id='otherIcon'></span>
            Comments
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 20px; margin-bottom: -30px;'>
        <!--office comments-->
            <v-textarea outlined label="Hospital Comments"
                v-model='schedule.comments.hospital'
                background-color = 'yellow lighten-4'
                placeholder="Type comments here..."
            ></v-textarea>
        <!--center comments-->
            <v-textarea outlined label="Center Comments"
                v-model='schedule.comments.center'
                background-color = 'yellow lighten-4'
                placeholder="Type comments here..."
            ></v-textarea>
        </v-card-text>
</v-card>
</v-col>
</v-row>      
</v-form>
<!--actions-->
	<v-card-actions class='primary'>
		<v-row>
        <v-radio-group 
            v-if='!(this.schedule.stage == `approved` && [`hospital`].includes(user.privilege))'
            v-model="schedule.stage" row
            style='position: absolute; left: 30px; bottom: 0px; color: white;'>
            <span v-for='prep in lists.stages' :key='prep.key' style='margin-top: -20px;'>
            <v-radio color='white' dark
            style='color: white;' 
        :label="prep"
        :value="prep"
    ></v-radio>
    </span>
    </v-radio-group>
<v-col class="text-right">
    <!--add/edit schedule button-->
		<v-btn dense
            v-if='!(this.schedule.stage == `approved` && [`hospital`].includes(user.privilege))'
			class='dizagara-button-cyan dizagara-button-width-medium' 
			style='margin-right: 20px;'
			@click='closeDialog("submit")'>
			<span class="mdi mdi-24px dizagara-margin-right" id='submitIcon'></span>
			{{params.isNew ? 'ADD' : 'EDIT'}}
		</v-btn>
	<!--delete schedule button-->
		<v-btn dense
            v-if='!(this.schedule.stage == `approved` && [`hospital`].includes(user.privilege))'
			class='dizagara-button-red dizagara-button-width-medium' 
			style='margin-right: 20px;'
			@click='closeDialog("delete")'>
			<span class="mdi mdi-24px dizagara-margin-right" id='deleteIcon'></span>
			DELETE
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-medium'
			style='margin-right: 20px;'
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
    import bridge from '../../bridge.js';
    import references from '../../utils/references.js';
    import converters from '../../utils/converters.js';
    import utils from '../../utils/utils.js';
//master
    export default {
//name
    name: 'schedule',
//components
	components: {
	},
//lists
	props: ['data', 'params'],
 //life cycle
    //created
        async created(){
        //get user and privileges
            this.user = await bridge.getUser({
                id: this.$route.params.id
            });
            if([`master`, `center`].includes(this.user.privilege)){
                this.lists.stages = ['drafted', 'submitted', 'approved'];
            }else if([`hospital`].includes(this.user.privilege)){
                this.lists.stages = ['drafted', 'submitted'];
            }
        //if existing
            if(!this.params.isNew){           
                this.schedule = utils.deepClone(this.data);
            }else{
                this.schedule.location.center = this.params.center;
                this.schedule.location.room = this.params.room;
            }
            if(!this.params.isReview){
            //get date
                this.schedule.schedule.date = converters.getPickerDate(this.params.event.start);  
            //get times
                this.schedule.schedule.start = converters.getPickerTime(this.params.event.start);
                this.schedule.schedule.end = converters.getPickerTime(this.params.event.end);
                this.schedule.schedule.duration = utils.getHoursFromTwo(this.params.event.start, this.params.event.end);
            }
        //update pickers
            this.datePickers.date.dateFormatted = this.formatDate(this.schedule.schedule.date);      
        //generic updates
            this.reloadDropdowns();
        },
    //destroyed
        destroyed(){
        },
//custom methods
    methods:{
    //get historical title
        getHistoricalTitle(a){
            if(a && a.patient){
                return a.patient.first + "," + a.patient.last + " (" + this.getFriendlyDate(a.modDate) + ")";
            }
        },
    //get friendly
        getFriendlyDate(date){
            return converters.getFriendlyDate(date);
        },
    //refresh
        async reloadDropdowns(){
        //centers
            this.loaded = {percent: 0, checkpoint: 'Initializing, loading centers...'}; //progress point
            this.lists.centers = await bridge.getCollection({collection: 'centers'}) || [];
            this.loaded = {percent: 15, checkpoint: 'Centers loaded, loading preps...'}; //progress point
        //preps
            let preps = await bridge.getCollection({collection: `preps`}) || [];
            this.lists.preps = {};
            this.lists.preps.patients = preps
                .filter(a => a.type == 'patient')
                .map(a => {return {
                    key: a._id,
                    name: a.name
                }});
            this.loaded = {percent: 20, checkpoint: 'Preps loaded, loading codes...'}; //progress point
        //codes
            let codes = await bridge.getCollection({collection: `codes`}) || [];
            this.lists.codes = {};
            this.lists.codes.diagnoses = codes.filter(a => a.type == 'diagnose');
            this.lists.codes.procedures = codes.filter(a => a.type == 'procedure');
            this.loaded = {percent: 25, checkpoint: 'Codes loaded, loading insurances...'}; //progress point
        //other
            this.lists.insurances = await bridge.getCollection({collection: `insurances`}) || [];
            this.loaded = {percent: 30, checkpoint: 'Insurances loaded, loading diagnoses...'}; //progress point
            this.lists.diagnoses = await bridge.getCollection({collection: `diagnoses`}) || [];
            this.loaded = {percent: 35, checkpoint: 'Diagnoses loaded, loading physicians...'}; //progress point
            this.lists.physicians = await bridge.getCollection({collection: `physicians`}) || [];
            this.loaded = {percent: 40, checkpoint: 'Physicians loaded, loading procedures...'}; //progress point
            this.lists.procedures = await bridge.getCollection({collection: `procedures`}) || [];
            this.loaded = {percent: 50, checkpoint: 'Procedures loaded, loading rooms...'}; //progress point
            this.lists.rooms = await bridge.getCollection({collection: `rooms`}) || [];
            this.loaded = {percent: 60, checkpoint: 'Rooms loaded, loading patients...'}; //progress point
            this.lists.patients = await bridge.getCollection({collection: `patients`}) || [];
            this.loaded = {percent: 70, checkpoint: 'Patients loaded, loading historical events...'}; //progress point
        //schedules
            let schedules = [];
            if(this.params.schedules){//need to check params first, in case some were saved in ram
                schedules = utils.deepClone(this.params.schedules);
            }else{
                schedules = await bridge.getCollection({collection: `schedules`}) || [];
            }
            this.lists.schedules = schedules.filter(a => 
                a.location.center._id == this.schedule.location.center._id && 
                a.location.room.key == this.schedule.location.room.key);
        //zones
            let zones = [];
            if(this.params.zones){//need to check params first, in case some were saved in ram
                zones = utils.deepClone(this.params.zones);
            }else{
                zones = await bridge.getCollection({collection: `zones`}) || [];
            }
            this.lists.zones = zones.filter(a => 
                a.location.center._id == this.schedule.location.center._id && 
                a.location.room.key == this.schedule.location.room.key);
            this.loaded = {percent: 80, checkpoint: 'Historical events loaded, loading icons...'}; //progress point
            this.updateBusyTimes();//update busy times after fetching zones and schedules
        //load icons
            setTimeout(() => {
                $('#firstFocus').focus();
                $('#headerIcon').addClass(references.getIcon('schedule'));
                $('#archiveIcon').addClass(references.getIcon('archive'));
                $('#centerIcon').addClass(references.getIcon('center'));
                $('#communicationIcon').addClass(references.getIcon('communication'));
                $('#patientIcon').addClass(references.getIcon('patient'));
                $('#diagnoseIcon').addClass(references.getIcon('diagnose'));
                $('#procedureIcon').addClass(references.getIcon('procedure'));
                $('#scheduleIcon').addClass(references.getIcon('schedule'));
                $('#insuranceIcon').addClass(references.getIcon('insurance'));
                $('#otherIcon').addClass(references.getIcon('other'));
                $('#timeIcon').addClass(references.getIcon('time'));
                $('#loadIcon').addClass(references.getIcon('download'));
                $('#refreshIcon').addClass(references.getIcon('refresh'));
                $('#cancelIcon').addClass(references.getIcon('cancel'));
                $('#submitIcon').addClass(references.getIcon('submit'));
                $('#deleteIcon').addClass(references.getIcon('delete'));
                $('.dizagara-redirect-icon').addClass(references.getIcon('redirect'));                              
            }, 0);
        //complete
            this.loaded = {percent: 100, checkpoint: 'Load complete...'}; //progress point
        },
    //redirect
        redirect(prop){
            window.open(`/#/properties/${prop}/${this.$route.params.id}`, '_blank');
        },
    //check that end date is after start date
        checkTimes(){
            let isFault = false;
            if(this.schedule.schedule.duration <= 0){
                toastr.error(`End time must be after start time!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                isFault = true;
            }
            return isFault;
        },
    //check conflicts
        checkConflicts(){
            let isConflict = false;
            this.lists.busyTimes.forEach(a => {
            //get date times
                let busy = {
                    start: moment(`${this.schedule.schedule.date} ${a.start}`),
                    end: moment(`${this.schedule.schedule.date} ${a.end}`)
                }
                let test = {
                    start: moment(`${this.schedule.schedule.date} ${this.schedule.schedule.start}`),
                    end: moment(`${this.schedule.schedule.date} ${this.schedule.schedule.end}`)
                }
            //compare times
                let isBefore = Boolean(test.start.isBefore(busy.start) && test.start.isBefore(busy.end) && test.end.isBefore(busy.start) && test.end.isBefore(busy.end));          
                let isAfter = Boolean(test.start.isAfter(busy.start) && test.start.isAfter(busy.end) && test.end.isAfter(busy.start) && test.end.isAfter(busy.end));
                if(!isBefore && !isAfter){
                    isConflict = true;
                }
            });
            if(isConflict){
                toastr.error(`This schedule conflicts with another event, change the START or END times by reviewing the busy times listed!`, ``, 
                {'closeButton': true, positionClass: 'toast-bottom-right'});
            }
            return isConflict;
        },
    //close the dialog
        closeDialog(action){
            if(action == 'submit'){
            //generic validation
                if(!this.$refs.form.validate()){
                    toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                    return;
                }
            //time validation
                if(this.checkTimes()){
                    return;
                }
            //conflict validation
                if(this.checkConflicts()){
                    return;
                }
            //update stage
                if(this.schedule.stage != `approved`){
                    this.schedule.track = -1;
                }
            //update stamp
                this.schedule.modBy = this.$route.params.id;
                this.schedule.modDate = moment();
            //condition
                Object.keys(this.schedule.comments).forEach(a => {
                    this.schedule.comments[a] = this.schedule.comments[a].trim();
                });
            }
            //do not housekeep, will mess up exports
            //send data
                this.$emit('closeDialog', {
                    action: action,
                    data: this.schedule
                });
        },
    //save schedule
        async editSchedule(){
            this.schedule.modDate = moment();
            this.closeDialog();
        },
    //load historical
        loadHistorical(){
        //make sure a historical event is selected
            if(!this.historicalEvent || (this.historicalEvent && !this.historicalEvent._id)){
                toastr.error(`No historical event selected!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                return;
            }
        //load historical event
            let tempId = this.schedule._id;
            let tempSchedule = utils.deepClone(this.schedule.schedule);
            this.schedule = utils.deepClone(this.historicalEvent);
            this.datePickers.date.dateFormatted = this.formatDate(this.schedule.schedule.date); 
            this.schedule._id = tempId;
            this.schedule.schedule = tempSchedule;
        //notify
            toastr.info(`Historical event loaded!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
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
                this.schedule.schedule[type] = value;
                let startDate = `${this.schedule.schedule.date} ${this.schedule.schedule.start}`;
                let endDate = `${this.schedule.schedule.date} ${this.schedule.schedule.end}`;
                this.schedule.schedule.duration = utils.getHoursFromTwo(startDate, endDate);
                this.checkConflicts();
                this.checkTimes();
			}, 0);
		},
    //update busy times
        updateBusyTimes(){
        //init
            this.lists.busyTimes = [];
        //schedules
            this.lists.schedules.forEach(a => {
                if(a.schedule.date == this.schedule.schedule.date){
                    if(this.params.isNew || (!this.params.isNew && this.schedule._id != a._id)){
                        this.lists.busyTimes.push({
                            start: `${a.schedule.start}`,
                            end: `${a.schedule.end}`
                        });
                    }
                }
            });
        //zones
            this.lists.zones.forEach(a => { 
            //single
                if(a.schedule.type == `single`){
                    if(a.schedule.date ==  this.schedule.schedule.date){
                        this.lists.busyTimes.push({
                            start: `${a.schedule.start}`,
                            end: `${a.schedule.end}`
                        });
                    }
                } 
            //repeat
                else if(a.schedule.type == `repeat`){
                    let currentWeekDay = moment(this.schedule.schedule.date).day();
                //forever
                    if(((a.schedule.frequency == `forever`) && a.schedule.repeat[currentWeekDay]) ||
                       ((a.schedule.frequency == `range`) && moment(this.schedule.schedule.date).isBetween(moment(a.schedule.rangeStart), moment(a.schedule.rangeEnd)) && a.schedule.repeat[currentWeekDay])){
                            this.lists.busyTimes.push({
                                start: `${a.schedule.start}`,
                                end: `${a.schedule.end}`
                            });
                    }
                }
            });
        //sort
            this.lists.busyTimes = this.lists.busyTimes.sort((a, b) => a.start.localeCompare(b.start));
        }
    },
//watchers
    watch: {
        'datePickers':  {
            deep: true,
            handler: function() {//don't change 'function' syntax
                this.datePickers.date.dateFormatted = this.formatDate(this.schedule.schedule.date);
                this.updateBusyTimes();
            }
		}
    },
//global vars
    data: () => ({
        user: {},
        loaded: {
            percent: 0,
            checkpoint: 'initializing...'
        },
        editorTypes: {
            patients: 'patients',
            insurances: 'insurances',
            drafts: 'drafts',
            codes: 'codes'
        },
        datePickers: {
            date: {
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
        historicalEvent: {

        },
        lists: {            
            stages: ['drafted', 'submitted', 'approved'],
            languages: ['English', 'Spanish', 'Other'],
            busyTimes: [],
            schedules: [],
            zones: [],
            patients: [],
            codes: {},
            insurances: [],
            preps: {
                procedures: [],
                patients: []
            }
        },
        schedule: {//empty objects are set to '' to properly trigger validator
            track: -1,
            stage: `drafted`,
            location: {
                center: ``,
                room: ``
            },
            patient: {anesthesia: {}},
            communication: {
                language: ``,
                isInterpreter: false,
                reason: ``
            },
            diagnose: {
                diagnose: ``,
                code: ``
            },
            procedure: {
                procedure: ``,
                code: ``,
            },
            schedule: {
                date: ``,
                start: `00:00`,
                end: `00:00`,
                duration: ``
            },
            insurance: {
                primary: ``,
                secondary: ``
            },
            comments: {
                hospital: ``,
                center: ``
            }
        },
        validate: {
        //field is required
            required: a => !!a || `Required Field!`
        }
    })
}
</script>