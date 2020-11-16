<template>
<v-app style='margin:30px'>
<!--modal-->
<transition name='fade'>
	<div class='modal-mask' transition='modal' v-if='showModal' @closeModal = 'closeModal'>
		<div class='center-block' style='width: 400px; margin-top: 50px;'>
		<v-card>
		<!--title label-->
		<v-card-title
			class='headline primary' primary-title style='color: white;'>
			<small><i class='fa fa-plus-circle fa-fw'></i>Add Item</small>
		</v-card-title>
		<v-form ref='form' lazy-validation>
			<v-card-text v-on:keyup.enter='addItem'>
			<!--title textbox-->
				<v-text-field
					ref='focusMe'
					dense
					label='Title'
					:rules='validateTitle'
					placeholder='Type title...'
					outlined
					v-model='title'
				></v-text-field>
			</v-card-text>
			<v-card-actions style='margin-top: -30px;'>
			<!--add button-->
				<v-btn 
					style='width: 49%;'
					dense dark color='primary' 
					@click='addItem'
					>
					<i class='fa fa-plus-circle fa-fw'></i>
					Add
				</v-btn>
			<!--cancel button-->
				<v-btn 
					style='width: 49%;'
					dense dark color='error' 
					@click='closeModal'               
					right >
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
	<!--banner-->
		<!--title label-->
		<v-card-title
			class='headline primary'
			primary-title style='color: white;'>
			<small><i class='fa fa-bars fa-fw'></i>To Do</small>
		<!--add button-->
			<v-btn 
				style='position: absolute; right: 20px; width: 100px;'
				dense dark color='info' 
				@click='openModal'                     
			>
			<i class='fa fa-plus-circle fa-fw'></i>
			Add
			</v-btn>           
		</v-card-title>
	<!--table-->
		<v-simple-table style='margin: 40px;'>
		<template v-slot:default>
		<!--headers-->
			<thead>
			<tr>
				<th class='text-left' style='width: 75%;'>
				Item
				</th>
				<th class='text-center'>
				Status
				</th>
				<th class='text-center'>
				Action
				</th>
			</tr>
			</thead>
		<!--content-->
			<tbody>
			<tr
				v-for='item in items'
				:key='item.id'
			>
			<!--title-->
				<td class='text-left' style='width: 75%;' v-if='isComplete(item.tasks)'><strike>{{ item._id }}</strike></td>
				<td class='text-left' style='width: 75%;' v-if='!isComplete(item.tasks)'>{{ item._id }}</td>
			<!--status-->
				<td class='text-center'>{{ getStatus(item.tasks)}}</td>
			<!--action-->
				<td class='text-center'> 
				<!--update button-->
					<v-btn v-if="!item.isComplete"
						dense 
						dark color='primary' 
						style='width: 100px; margin: 5px;'
						@click='updateItem(item._id)'>
						<i class='fa fa-edit fa-fw'></i>
						Update
					</v-btn>
				<!--delete button-->
					<v-btn 
						dense 
						dark color='error' 
						style='width: 100px; margin: 5px;'
						@click='deleteItem(index, item._id)'>
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
			this.items = await bridge.getItems();
			this.items.sort((a, b) => (a.date.localeCompare(b.date)));
		},
      methods: {
    //add item
      async addItem(){
		//validate fields
			if(!this.$refs.form.validate()){
				return;
			}
		//if success, save
			let item = {
				_id: this.title,
				date: new Date().toISOString(),
				tasks: []
			};
			await bridge.saveItem(item);
			this.items.push(item);
		//reset
			this.title = '';
		//notify
			toastr.success('Item added!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		//close modal
			this.showModal = false;
		},
	//delete item
        async deleteItem(index, id){
			this.items.splice(index, 1);
			await bridge.deleteItem(id);
			toastr.success('Item deleted!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//update item
        updateItem(id){
            this.$router.push({ path: `/tasks/${id}`});
		},
	//check if item has completed tasks
        isComplete(tasks){
            return Boolean(tasks.length > 0 && this.getCompletedCount(tasks) == tasks.length)
		},
	//get the ratio of completed to total tasks
        getStatus(tasks){
            return `${this.getCompletedCount(tasks)}/${tasks.length}`;
		},
	//hide the modal
        closeModal(){
            this.showModal = false;
		},
	//display the modal
		openModal(){
		//show the modal
			this.showModal = true;
		//focus the textbox
			setTimeout(() => {
				this.$refs.focusMe.$refs.input.focus();
			}, 0);
		},
	//get count of tasks that are complete
        getCompletedCount(tasks){
            let completedCount = 0;
            tasks.forEach(a => {
                if(a.isComplete){
                    completedCount++;
                }
            });
            return completedCount;
        }
      }, computed: {
	//validate the title
        validateTitle(){
        //initialize
            let errors = [];
        //check empty
            if(!this.title || this.title == ''){
                errors.push('This title is empty!');
            }
        //check unique
            if(this.items.some(a => a._id == this.title)){
                errors.push('This title already exists!');
            }
        //return
            return errors;
        }
	  },
	//global vars
          data: () => ({
			index: 0,
			showModal: false,
			title: '',
			items: []
        }),
    }
</script>