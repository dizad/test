<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: calc(90vw); margin-top: 75px;'>
<v-card>
<!--title-->
    <v-card-title
        class="primary"
        style='color: white;'>
        <span class="mdi mdi-24px mdi-note-text-outline"></span>
        &nbsp;Add Schedule   
    </v-card-title>
<!--body-->
    <v-form lazy-validation ref="form" v-model="valid">
    <v-row><!--master row-->
<!--left column-->
    <v-col style='padding: 0px 0px 0px 20px;'>
<!--drafts card-->
    <v-card style='margin: 20px;' outlined>
    <!--header-->
        <v-list-item-title class='panelHeader'>
            <v-icon left>description</v-icon>Drafts
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 20px 20px 0px 20px;'>
            <v-row>
            <!--pick patient-->
                <v-autocomplete dense outlined
                    style = 'margin: auto 20px auto 20px;'
                    background-color = 'yellow lighten-4'
                    v-model = 'draft.id'
                    :items = 'properties.drafts'
                    :item-text = 'a => a.id'
                    label = 'Drafts'
                    @change="draftChanged()"
                ></v-autocomplete>
            <!--editors-->
                <editors 
                    style = 'margin-right: 20px;'
                    v-bind:data = 'draft.id' 
                    v-bind:type = 'editorTypes.drafts'>
                </editors>
            </v-row>
        </v-card-text>
    </v-card>





<!--procedure card-->
    <v-card style='margin: 20px;'>
    <!--header-->
        <v-list-item-title class='panelHeader'>
            <v-icon left>assignment</v-icon>Procedure
        </v-list-item-title>
        <v-card-text style='padding: 10px 20px 0px 20px;'>
        <!--diagnosis-->
            <v-row >
                <v-col style='padding-bottom: 0px;'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='bogus'
                        :items="properties.languages"
                        label="Diagnosis"
                    ></v-autocomplete>
                </v-col>
                <v-col style='padding-bottom: 0px;'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='bogus'
                        :items="properties.languages"
                        label="CPT Code"
                    ></v-autocomplete>
                </v-col>
            <!--editors-->
                <v-col style='padding-bottom: 0px;'>
                    <editors 
                        style = 'margin-right: 20px;'
                        v-bind:data = 'draft.id' 
                        v-bind:type = 'editorTypes.codes'>
                    </editors>
                 </v-col>
            </v-row>
    <!--procedure-->
        <v-row >
            <v-col style='padding-bottom: 0px;'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='bogus'
                    :items="properties.languages"
                    label="Procedure"
                ></v-autocomplete>
            </v-col>
            <v-col style='padding-bottom: 0px;'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='bogus'
                    :items="properties.languages"
                    label="CPT Code"
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row >
        <!--bmi-->
            <v-col style='padding-bottom: 0px;'>
                <v-text-field dense outlined
                    background-color = 'yellow lighten-4'
                    v-model = 'bogus'
                    label ="BMI"
                    :rules ="[validate.required]"
                    
                    placeholder = "Equipment requests, equipment, implants, allografts etc..."
                ></v-text-field>
            </v-col>
        <!--anesthesia type-->
            <v-col style='padding-bottom: 0px;'>
            <v-text-field dense outlined
                background-color = 'yellow lighten-4'
                v-model = 'bogus'
                label ="Anesthesia Type"
                :rules ="[validate.required]"
                
                placeholder = "Equipment requests, equipment, implants, allografts etc..."
            ></v-text-field>
            </v-col>
        </v-row>
        </v-card-text>
    </v-card>

<!--patient panel-->
    <v-card style='margin: 20px;'>
    <!--header-->
        <v-list-item-title class='panelHeader'>
            <v-icon left>accessible</v-icon>Other
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 10px 20px 0px 20px;'>
            <v-row>
            <!--pick patient-->
                <v-col >
                   <v-textarea outlined label="Comments"
                        background-color = 'yellow lighten-4'
                        value="Special request(s) for equipment, implants, and/or allografts etc"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>


</v-col>




<!--right column-->
    <v-col style='padding: 0px 10px 0px 0px;'>
    <!--communication panel-->
    <v-card style='margin: 20px;'>
    <!--header-->
        <v-list-item-title class='panelHeader'>
            <v-icon left>language</v-icon>Communication
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 10px 20px 0px 20px;'>
            <v-row >
            <!--language-->
                <v-col style='padding-bottom: 0px;'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='bogus'
                        :items="properties.languages"
                        label="Language"
                    ></v-autocomplete>
                </v-col>
            <!--interpreter required-->
                <v-col style='padding-bottom: 0px;'>
                    <v-checkbox hide-details
                        style = 'margin-top: 0px;'
                        v-model = "bogus"
                        label = 'Interpreter Required'
                    ></v-checkbox>
                </v-col>
            <!--interpreter reasoning-->
                <v-col style='padding-bottom: 0px;'>
                    <v-text-field dense outlined
                        background-color = 'yellow lighten-4'
                        v-model = 'bogus'
                        label ="Interpreter Reason"
                        :rules ="[validate.required]"
                        v-if = 'bogus'
                        placeholder = "Explain why interpreter is required..."
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
 <!--patient panel-->
    <v-card style='margin: 20px;'>
    <!--header-->
        <v-list-item-title class='panelHeader'>
            <v-icon left>accessible</v-icon>Patient
        </v-list-item-title>
    <!--content-->
        <v-card-text style='padding: 10px 20px 0px 20px;'>
        <v-row>
        <!--pick patient-->
            <v-col style='padding-bottom: 0px;' class='col-md-9'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='bogus'
                    :items="properties.patients"
                    :item-text="a => a.firstName + ' ' + a.middleInitial + ' ' + a.lastName"
                    label="Patient"
                ></v-autocomplete>
            </v-col>
        <!--button group-->
            <v-col class='col-md-3'>
                <editors></editors>
            </v-col>
        </v-row>
        </v-card-text>
    </v-card>
  <!--insurance panel-->
        <v-card style='margin: 20px;'>
        <!--header-->
            <v-list-item-title class='panelHeader'>
                <v-icon left>credit_card</v-icon>Insurance
            </v-list-item-title>
        <!--content-->
            <v-card-text style='padding: 10px 20px 0px 20px;'>
            <v-row style='margin-bottom:-20px;'>
            <!--primary insurance-->
                <v-col style='padding-bottom: 0px;' class='col-md-9'>
                    <v-autocomplete dense outlined
                        background-color='yellow lighten-4'
                        v-model='bogus'
                        :items="properties.insurances"
                        :item-text="a => a.id"
                        label="Primary Insurance"
                    ></v-autocomplete>
                </v-col>
            <!--button group-->
                <v-col class='col-md-3'>

                <editors></editors>


                         
                </v-col>
            </v-row>
        <v-row>
        <!--secondary insurance-->
            <v-col style='padding-bottom: 0px;' class='col-md-9'>
                <v-autocomplete dense outlined
                    background-color='yellow lighten-4'
                    v-model='bogus'
                    :items="properties.insurances"
                    :item-text="a => a.id"
                    label="Secondary Insurance"
                ></v-autocomplete>
            </v-col>
        <!--button group-->
            <v-col class='col-md-3'>
                <editors></editors>             
            </v-col>
        </v-row>
                </v-card-text>
        </v-card>
<!--procedure-->
  <!--schedule-->
        <v-card style='margin: 20px;'>
            <v-list-item-title class='panelHeader'>
                <v-icon left>event_note</v-icon>Schedule
            </v-list-item-title>
            <v-card-text style='padding: 10px 20px 0px 20px;'>




                <v-row >
                <!--pick insurance1-->
                    <v-col style='padding-bottom: 0px;'>
                            <v-text-field dense outlined
                                background-color = 'yellow lighten-4'
                                v-model = 'bogus'
                                label ="Date"
                                :rules ="[validate.required]"
                                placeholder = "abc"
                            ></v-text-field>
                    </v-col>





                <!--pick time-->
                    <v-col style='padding-bottom: 0px;'>


                            <v-text-field dense outlined
                                background-color = 'yellow lighten-4'
                                v-model = 'bogus'
                                label ="Time"
                                :rules ="[validate.required]"
                                placeholder = "abc"
                            ></v-text-field>
                    </v-col>

                <!--pick insurance2-->
                    <v-col style='padding-bottom: 0px;'>


                            <v-text-field dense outlined
                                background-color = 'yellow lighten-4'
                                v-model = 'bogus'
                                label ="Duration"
                                :rules ="[validate.required]"
                                placeholder = "abc"
                            ></v-text-field>
                    </v-col>
<v-col style='padding-bottom: 0px;'>
                                    <!--pick insurance1-->
                <v-btn 
                    dense dark 
                    class='primary buttonWidth01' 
                    style='margin-right: 20px;'
                    @click="saveDraft()">
                    <v-icon dark left>check_circle</v-icon>
                    Show Available Times
                </v-btn>

 </v-col>

 <v-col style='padding-bottom: 0px;'>




                    </v-col>


                    </v-row>
                <v-row >
                <!--pick insurance1-->
                    <v-col style='padding-bottom: 0px;'>
                            <v-text-field dense outlined
                                background-color = 'yellow lighten-4'
                                v-model = 'bogus'
                                label ="Surgeon"
                                :rules ="[validate.required]"
                                placeholder = "abc"
                            ></v-text-field>
                    </v-col>
                <!--pick insurance2-->
                    <v-col style='padding-bottom: 0px;'>
                            <v-text-field dense outlined
                                background-color = 'yellow lighten-4'
                                v-model = 'bogus'
                                label ="Laboratory"
                                :rules ="[validate.required]"
                                placeholder = "abc"
                            ></v-text-field>
                    </v-col>
                    </v-row>


                </v-card-text>
        </v-card>






</v-col>


</v-row>

        
        </v-form>








<!--footer-->
<v-card-actions>
    <v-col class="text-right">
        <!--schedule button-->
        <v-btn 
            dense dark 
            class='primary buttonWidth01' 
            style='margin-right: 20px;'
            @click="saveDraft()">
            <v-icon dark left>check_circle</v-icon>
            Save Draft
        </v-btn>
    <!--schedule button-->
        <v-btn 
            dense dark 
            class='primary buttonWidth01' 
            style='margin-right: 20px;'
            @click="schedule()">
            <v-icon dark left>check_circle</v-icon>
            Schedule
        </v-btn>
     <!--delete button-->
        <v-btn 
            dense dark 
            class="error buttonWidth01" 
            @click="closeModal()">
            <v-icon dark left>block</v-icon>
            Delete
        </v-btn>       
    <!--cancel button-->
        <v-btn 
            dense dark 
            class="error buttonWidth01" 
            @click="closeModal()">
            <v-icon dark left>block</v-icon>
            Cancel
        </v-btn>
    </v-col>
</v-card-actions>
    </v-card>
    
    </div>
</div>

</template>
<script>
//imports
    import editors from '../generics/editors.vue';
//master
    export default {
//name
    name: 'edit-schedule',
//components
	components: {
        editors
	},
 //cycle methods
    //created
        created(){
        //drafts
            //get drafts
                let drafts = [];
                //api get drafts
                //sort
            //add default
                if(drafts.length){
                    this.properties.drafts = drafts;
                } else{
                    this.properties.drafts.unshift({
                        id: 'Default'
                    });
                }
            //assign 1st from list
                this.draft = this.properties.drafts[0];
        },
    //destroyed
        destroyed(){
            
        },
//custom methods
    methods:{
    //close the edit schedule modal
        closeModal() {
            this.$emit('closeEditScheduleModal');
        },
    //draft changed and bind values
        draftChanged(){
            let selectedDraft = this.drafts.find(a => a.id == this.draft.id);
            if(selectedDraft){
                this.loadDraft();
            }
        }
    },
//global vars
    data: () => ({
        bogus: 'a',
        items: ['a', 'b', 'c'],


        valid: true,
        editorTypes: {
            patients: 'patients',
            insurances: 'insurances',
            drafts: 'drafts',
            codes: 'codes'
        },
        properties: {
            languages: ['English', 'Spanish', 'Other'],
            drafts: [],
            patients: [],
            insurances: []
        },
        draft : {},
        validate: {
        //field is required
            required: a => !!a || 'Required!'
        }
    })
}
</script>