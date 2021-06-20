<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 325px; margin-top: calc(40vh);'><!--modal props-->
<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
<!--title-->
    <v-card-title
        class='headline primary' primary-title style='color: white;'>
        <span class='mdi mdi-24px dizagara-margin-right' id='headerIcon'></span>
        Event Type
    </v-card-title>
<!--content-->
    <v-form ref='form' lazy-validation> 
    <v-card-text style='padding-bottom: 0px; font-weight: bold;' class="text-center">
        <span class='text-primary' style='text-align: center; margin: auto;'>What type of event is this?</span>
        <v-radio-group v-model="event.type"
            :rules='[validate.required]'
            style='margin-bottom: -20px;'>
            <span v-for='type in lists.types' 
                :key='type.key'>
                <v-radio
                    :label='type.name'
                    :value='type.key'>
                </v-radio>
            </span>
        </v-radio-group>
    </v-card-text>              
    <v-card-actions>
        <v-row>
            <v-col class="text-center">
            <!--submit button-->
                <v-btn 
                    style='margin-right: 10px; width: 125px;'
                    class='dizagara-button-blue'
                    @click='closeDialog(`submit`)'>
                    <span class="mdi mdi-24px dizagara-margin-right" id='submitIcon'></span>
                    SUBMIT
                </v-btn>
            <!--cancel button-->
                <v-btn 
                    style='margin-left: 10px; width: 125px;'
                    class='dizagara-button-red'
                    @click='closeDialog(`cancel`)'>
                    <span class="mdi mdi-24px dizagara-margin-right" id='cancelIcon'></span>
                    CANCEL
                </v-btn>
            </v-col>
        </v-row>
    </v-card-actions>
    </v-form>
</v-card>
</div>
</div>
</template>
<script>
//imports
	import converters from '../../utils/converters.js';
    import references from '../../utils/references.js';
//master
	export default {
//name
	name: 'event',
//components
	components: {
	},
	props: [],
//cycle methods
    async created(){
        //get icons
        setTimeout(() => {
            $('#headerIcon').addClass(references.getIcon('schedule'));
            $('#submitIcon').addClass(references.getIcon('submit'));
            $('#cancelIcon').addClass(references.getIcon('cancel'));
        }, 0);
	},
//custom methods
    methods: {
	//close dialog
		closeDialog(action){
        //check form if not cancel
            if(action != `cancel` && !this.$refs.form.validate()){
                toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                return;
            }
        //send data
            this.$emit('closeDialog', {
                action: action,
                data: {
                   type: this.event.type
                }
            });
		}
    },
//global vars
	data: global => ({
        event: {
            type: ``
        },
        lists: {
            types: [{
                key: `zone`, 
                name: `Restriction Zone`
            }, {
                key:`schedule`, 
                name: `Surgery Procedure`
            }]
        },
        validate: {
            required: a => !!a || references.getToast(`validatorRequired`)
        }
    })
}
</script>