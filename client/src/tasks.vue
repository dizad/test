<template>
    <v-app style='margin:30px'>
<!--modal-->
    <transition name='fade'>
	<div class='modal-mask' transition='modal' v-if='showModal' @closeModal = 'closeModal'>
		<div class='center-block' style='width: 400px; margin-top: 50px;'>     
		<v-card>
		<!--title-->
			<v-card-title
				class='headline primary' primary-title style='color: white;'>
				<small><i class='fa fa-plus-circle fa-fw'></i>{{isNew ? 'Add' : 'Update'}} Taskabc</small>
			</v-card-title>
		<!--add task-->
            <v-form ref='form' lazy-validation>
			<v-card-text v-on:keyup.enter='addTask'>
            <!--title textbox-->
                <v-text-field v-if='isNew'
                    ref='focusMe'
                    dense
                    label='Title'
                    :rules='validateTitle'
                    placeholder='Type title...'
                    outlined
                    v-model='title'
                ></v-text-field>
            <!--description textbox-->
                <v-text-field 
                    dense
                    label='Description'
                    :rules='[validate.required]'
                    placeholder='Type description...'
                    outlined
                    v-model='description'
                ></v-text-field>
            <!--deadline date picker-->
                <v-layout>
                    <v-menu
                        ref='menu'
                        v-model='menu'
                        :close-on-content-click='false'
                        :nudge-right='40'
                        transition='scale-transition'
                        offset-y
                        max-width='290px'
                        min-width='290px'
                    >
                        <template v-slot:activator='{ on }'>
                        <v-text-field
                            readonly
                            v-model='dateFormatted'
                            label='Deadline'
                            hint='MM/DD/YYYY format'
                            persistent-hint
                            prepend-icon='event'
                            @blur='deadline = parseDate(dateFormatted)'
                            v-on='on'
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model='deadline' no-title @input='menu = false'></v-date-picker>
                    </v-menu>
                </v-layout>
			</v-card-text>
            <v-radio-group style='margin: 0px 20px 0px 20px;'
                v-model="priority"
                row
            >
            <!--priority radio-->
                <v-layout row wrap>
                    <label style='margin: 0px 20px 0px 10px;'>Priority:</label>
                    <v-flex xs3 v-for="option in priorities" :key="option">
                            <v-radio :label="option" :value="option"></v-radio>
                    </v-flex>         
                </v-layout>                    
            </v-radio-group>
            <v-card-actions>
            <!--add button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='primary' 
                    @click='addTask'>
                    <i class='fa fa-plus-circle fa-fw'></i>
                    {{isNew ? 'Add' : 'Update'}}
                </v-btn>
            <!--cancel button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='error' 
                    @click='closeModal'                     
                    >
                    <i class='fa fa-times-circle fa-fw'></i>
                    Cancel
                </v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
        </div>
    </div>
</transition>
<!--page-->
    <v-card>
    <v-card-title
        class='headline primary'
        primary-title style='color: white;'>
    <!--title-->
        <small><i class='fa fa-bars fa-fw'></i>Tasks</small>
    <!--add button-->
        <v-btn 
            style='position: absolute; right: 140px; width: 100px;'
            dense dark color='info'
            @click='createTask'>
            <i class='fa fa-plus-circle fa-fw'></i>
            Add
        </v-btn>
    <!--back button-->
        <v-btn 
            style='position: absolute; right: 20px; width: 100px;'
            dense dark color='info' 
            @click='goBack'>
            <i class='fa fa-arrow-circle-left fa-fw'></i>
            Back
        </v-btn>
    </v-card-title>
        <!--display tasks-->
            <v-simple-table style='margin: 20px;'>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class='text-left' style='width: 25%;'>
                    Task
                    </th>
                    <th class='text-left' style='width: 25%;'>
                    Description
                    </th>
                    <th class='text-center'>
                    Deadline
                    </th>
                    <th class='text-center'>
                    Priority
                    </th>
                    <th class='text-center'>
                    Is Complete?
                    </th>
                    <th class='text-center'>
                    Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for='(task, index) in item.tasks'
                    :key='task.taskId'
                >
                <td class='text-left' style='width: 25%;' v-if='task.isComplete'><strike>{{ task.title }}</strike></td>
                <td class='text-left' style='width: 25%;' v-if='!task.isComplete'>{{ task.title }}</td>
                <td class='text-left' style='width: 25%;'>{{ task.description }}</td>
                <td class='text-center'>{{ formatDate(task.deadline) }}</td>
                <td class='text-center'>{{ task.priority}}</td>
                <td class='text-center' style='padding-left: 60px;'>
                    <v-checkbox v-model='task.isComplete' @change='saveComplete(index)'></v-checkbox>
                </td>
                <td class='text-center'>
        <!--update button-->
            <v-btn v-if='!task.isComplete'
                dense 
                dark color='primary' 
                style='width: 100px; margin: 5px;'
                @click='updateTask(task)'>
                <i class='fa fa-edit fa-fw'></i>
                Update
            </v-btn>
        <!--delete button-->
            <v-btn 
                dense 
                dark color='error' 
                style='width: 100px; margin: 5px;'
                @click='deleteTask(index)'>
                <i class='fa fa-trash fa-fw'></i>
                Delete
            </v-btn>
            </td>
            </tr>
            </tbody>
            </template>
            </v-simple-table>
        </v-card>
    </v-app>
</template>
<script>
//import
    import bridge from './bridge';

  //master
    export default {
    //on load
        async created(){
            this.itemId = this.$route.params.id; //id from url
            this.items = await bridge.getItems();
            this.item = this.items.find(a => a._id == this.itemId);
        },
        methods: {
    //add a task to item
        async addTask(){
		//validate fields
			if(!this.$refs.form.validate()){
				return;
            }
        //close modal
            this.showModal = false;
            let notification = '';
        //if success, save
            if(this.isNew){
                this.item.tasks.push({
                    title: this.title,
                    description: this.description,
                    priority: this.priority,
                    deadline: this.deadline,
                    isComplete: false
                });
                notification = 'added';
            }else{
                for(let i = 0; i < this.item.tasks.length; i++){
                    if(this.item.tasks[i].title == this.title){
                        this.item.tasks[i].description = this.description;
                        this.item.tasks[i].priority = this.priority;
                        this.item.tasks[i].deadline = this.deadline;
                        break;
                    }
                }
                notification = 'updated';
            }
		//update
            await bridge.deleteItem(this.item._id);
            await bridge.saveItem(this.item);
		//notify
			toastr.success(`Task ${notification}!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        }, 
    //delete task from item
        async deleteTask(index){
        this.item.tasks.splice(index, 1);
        await bridge.deleteItem(this.item._id);
        await bridge.saveItem(this.item);
        toastr.success('Task deleted!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        }, 
    //save the checkbox change
        async saveComplete(index){
            await bridge.deleteItem(this.item._id);
            await bridge.saveItem(this.item);
        }, 
    //re-use the modal to update an existing task
        updateTask(task){
        //set props and open modal
            this.isNew = false;
            this.title = task.title;
            this.description = task.description;
            this.priority = task.priority;
            this.deadline = task.deadline;
            this.showModal = true;
        //focus the textbox
			setTimeout(() => {
				this.$refs.focusMe.$refs.input.focus();
			}, 0);
        }, 
    //go back to the to do page
        goBack(){
            this.$router.push({ path: '/toDo', params: {}});
        }, 
    //display the modal
        createTask(){
        //set props and open modal
            this.isNew = true;
            this.title = '';
            this.description = '';
            this.priority = 'low';
            this.deadline = new Date().toISOString().substr(0, 10);
            this.showModal = true;
        //focus the textbox
			setTimeout(() => {
				this.$refs.focusMe.$refs.input.focus();
			}, 0);
        }, 
    //hide the modal
        closeModal(){
            this.showModal = false;
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
        }
      }, 
    //used for picker to update dynamically
        watch: {
            deadline () {
                this.dateFormatted = this.formatDate(this.deadline)
            }
        },
        computed: {
            computedDateFormatted () {
            return this.formatDate(this.date)
        },
    //validate the task title
        validateTitle(){
        //initialize
            let errors = [];
        //check empty
            if(!this.title || this.title == ''){
                errors.push('This title is empty!');
            }
        //check unique
            if(this.item.tasks.some(a => a.title == this.title)){
                errors.push('This title already exists!');
            }
        //return
            return errors;
        }
      },
    //global vars
          data: global => ({
            index: 0,
            menu: false,
            showModal: false,
            itemId: '',
            item: {},
            items: [],
            title: '',
            description: '',
            priority: 'low',
            deadline: new Date().toISOString().substr(0, 10),
            dateFormatted: global.formatDate(new Date().toISOString().substr(0, 10)),
            isComplete: false,
            isNew: true,
            priorities: ['low', 'med', 'high'],
            validate: {
                required: a => !!a || 'This description is empty!'
            }
        }),
    }
</script>