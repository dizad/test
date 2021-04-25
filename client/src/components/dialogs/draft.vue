<template>
<div class='modal-mask' transition='modal'>
<div class='center-block' style='width: 400px; margin-top: 150px;'>     
<v-card>
<!--title-->
    <v-card-title
        class="primary"
        style='color: white;'>
         <span class="mdi mdi-24px mdi-note-text-outline"></span>{{friendlyTitle}}&nbsp;Draft
    </v-card-title>
    <!--add user-->
        <v-form ref='form' lazy-validation>
        <v-card-text v-on:keyup.enter='addUser()' style='padding-bottom: 0px; margin-bottom: -10px;'>
        <!--username textbox-->
            <v-text-field
                v-if='isNew'
                ref='focusUsername'
                dense
                append-icon='mdi-account-circle'
                label='Username'
                :rules='validateUsername'
                placeholder='Type username...'
                outlined
                v-model='bogus'
                autocomplete="off"
                type="text"
                color='rgba(77, 187, 64, 1.0)'
                background-color= 'yellow lighten-4'
            ></v-text-field>
        <!--password textbox-->
            <v-text-field 
                ref='focusPassword'
                dense
                append-icon='mdi-lock'
                label='Password'

                placeholder='Type password...'
                outlined
                v-model='bogus'
                autocomplete="off"
                type="text"
                color='rgba(77, 187, 64, 1.0)'
                background-color= 'yellow lighten-4'
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
        <!--add button-->
            <v-btn 
                style='width: 49%; font-weight: bold;'
                dense dark color='primary' 
                @click = 'addUser()'>
                <v-icon dark left>check_circle</v-icon>
                &nbsp;{{isNew ? 'Add' : 'Update'}}
            </v-btn>
        <!--cancel button-->
            <v-btn 
                style='width: 49%; font-weight: bold;'
                dense dark color = 'error' 
                @click = 'closeModal()'>
                <span class="mdi mdi-24px mdi-cancel"></span>
                Cancel
            </v-btn>
        </v-card-actions>
        </v-form>
    </v-card>
    </div>
</div>
</template>
<script>
//imports
    import converters from '../../utils/converters.js';
//master
	export default {
//name
	name: 'editors',
//components
	components: {
        converters
	},
//props
    props: ['data', 'action'],
//cycle methods
    async created(){
        this.friendlyTitle = converters.capitalizeFirst(this.action);
	},
//custom methods
    methods: {
        closeModal(){
            this.$emit('closeEditDraftModal');
        }
    },
//global vars
	data: global => ({
        bogus: 'abc'
    })
}
</script>