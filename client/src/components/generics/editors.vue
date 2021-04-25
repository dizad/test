<template>
    <v-app style='height: 40px;'><!--required for vuetify-->
    <!--dialogs-->
    <transition name="fade">
        <edit-draft 
            v-if="showModals.editDraft" 
            @closeEditDraftModal="closeEditDraftModal" 
            v-bind:data ='data'
            v-bind:action ='action'></edit-draft>
    </transition>
        <div><!--empty div required to contain component-->
        <!--edit-->
            <v-btn small icon
                style='margin-right: 5px; width: 40px; height: 40px; background-color: #46bd4c; color: white;' 
                @click="edit()">
                 <span class="mdi mdi-24px mdi-pencil"></span>
            </v-btn>
        <!--add-->
            <v-btn small icon
                style='margin-right: 5px; width: 40px; height: 40px; background-color: #217eff; color: white;'
                @click="save()">
                <span class="mdi mdi-24px mdi-plus"></span>
            </v-btn>
        <!--remove-->
            <v-btn small  icon
                style='width: 40px; height: 40px; background-color: #ff5c5c; color: white;'
                @click="remove()">
               <span class="mdi mdi-24px mdi-close"></span>
            </v-btn> 
        </div>
    </v-app>
</template>
<script>
//imports
    import draft from '../dialogs/draft.vue';
//master
	export default {
//name
	name: 'editors',
//components
	components: {
        draft
	},
//props
    props: ['data', 'type'],
//life cycle
    async created(){
	},
//customs
    methods: {
    //edit item
        edit(){
            this.action = 'edit';
            if(this.type == 'drafts'){
                this.showModals.editDraft = true;  
               
                

            }
        },
    //add item
        add(){
            this.action = 'add';
            if(this.type == 'drafts'){
                this.showModals.editDraft = true;  
            }

        },
    //remove item
        remove(){
            this.action = 'delete';


        },
    //modals
        closeEditDraftModal(){
            this.showModals.editDraft = false;
        }
    },
//data
	data: global => ({
        showModals: {
            editDraft: false
        }
    })
}
</script>