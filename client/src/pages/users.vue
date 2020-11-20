<template>
<v-app>
<div class='splashBackground' >
<!--confirmation modal-->
    <transition name='fade'>
	<div class='modal-mask' transition='modal' v-if='showDeleteModal' @closeDeleteModal = 'closeDeleteModal'>
		<div class='center-block' style='width: 400px; margin-top: 50px;'>     
		<v-card>
		<!--title-->
			<v-card-title
				class='headline primary' primary-title style='color: white;'>
				<small><i class='fa fa-user-times fa-fw'></i>&nbsp;Delete User</small>
			</v-card-title>
		<!--add user-->
            <v-form ref='form' lazy-validation>
			<v-card-text style='padding-bottom: 0px;'>
                <span style='text-align: center; margin: auto;'>Are you sure you want to delete user <strong>{{userToDelete._id}}</strong>?</span>
            </v-card-text>              
            <v-card-actions>
            <!--delete button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='primary' 
                    @click='doDeleteUser()'>
                    <i class='fa fa-times-circle fa-fw'></i>
                    Delete
                </v-btn>
            <!--cancel button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='error' 
                    @click='closeDeleteModal()'                     
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
<!--add/update user modal-->
    <transition name='fade'>
	<div class='modal-mask' transition='modal' v-if='showUserModal' @closeUserModal = 'closeUserModal'>
		<div class='center-block' style='width: 400px; margin-top: 50px;'>     
		<v-card>
		<!--title-->
			<v-card-title
				class='headline primary' primary-title style='color: white;'>
				<small><i class='fa fa-user-plus fa-fw'></i>&nbsp;&nbsp;{{isNew ? 'Add' : 'Update'}}&nbsp;User</small>
			</v-card-title>
		<!--add user-->
            <v-form ref='form' lazy-validation>
			<v-card-text v-on:keyup.enter='addUser' style='padding-bottom: 0px;'>
            <!--username textbox-->
                <v-text-field
                    v-if='isNew'
                    ref='focusMe'
                    dense
                    label='Username'
                    :rules='validateUsername'
                    placeholder='Type username...'
                    outlined
                    v-model='username'
                    autocomplete="off"
                ></v-text-field>
            <!--description textbox-->
                <v-text-field 
                    dense
                    label='Password'
                    :rules='[validatePassword.required]'
                    placeholder='Type password...'
                    outlined
                    v-model='password'
                    autocomplete="off"
                ></v-text-field>
			</v-card-text>
            <v-card-actions>
            <!--add button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='primary' 
                    @click='addUser()'>
                    <i class='fa fa-plus-circle fa-fw'></i>
                    {{isNew ? 'Add' : 'Update'}}
                </v-btn>
            <!--cancel button-->
                <v-btn 
                    style='width: 49%;'
                    dense dark color='error' 
                    @click='closeUserModal'                     
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
    <v-card style='margin: 30px;'>
    <!--banner-->
    <v-card-title
        class='headline primary'
        primary-title style='color: white;'>
    <!--title-->
        <small><i class='fa fa-fw fa-user-circle'></i>Users</small>
    <!--add button-->
        <v-btn 
            style='position: absolute; right: 140px; width: 100px;'
            dense dark color='info'
            @click='createUser()'>
            <i class='fa fa-plus-circle fa-fw'></i>
            Add
        </v-btn>
    <!--logout button-->
        <v-btn 
            style='position: absolute; right: 20px; width: 100px;'
            dense dark color='info' 
            @click='logout()'>
            <i class='fa fa-fw fa-sign-out'></i>
            Logout
        </v-btn>
    <!--list--->
    </v-card-title>
        <!--display users-->
            <v-simple-table style='margin: 20px; padding-bottom: 20px;' v-if='users.length'>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class='text-left' style='width: 5%;'>
                    Index
                    </th>
                    <th class='text-left' style='width: 35%;'>
                    Username
                    </th>
                    <th class='text-left' style='width: 35%;'>
                    Password
                    </th>
                    <th class='text-center' style='width: 5%;'>
                    Added
                    </th>
                    <th class='text-center'>
                    Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for='(user, index) in users'
                    :key='user._id'
                >
                <td class='text-left' style='width: 5%;'>
                    <v-avatar
                        color="green"
                        size="24"
                    >
                    <span class="white--text headline" style='font-size: small;'><small>{{ index + 1}}</small></span>
                    </v-avatar>
                </td>
                <td class='text-left' style='width: 35%;'>{{ user._id }}</td>
                <td class='text-left' style='width: 35%;'>{{ user.password }}</td>
                <td class='text-center' style='width: 5%;'>{{ user.added }}</td>
                <td class='text-center'>
                <!--update button-->
                    <v-btn  
                        dense 
                        dark 
                        color='primary' 
                        style='width: 100px; margin: 5px;'
                        @click='updateUser(user)'>
                        <i class='fa fa-edit fa-fw'></i>
                        Update
                    </v-btn>
                <!--delete button-->
                    <v-btn v-if='user.privilege == "user"'
                        dense 
                        dark 
                        color='error' 
                        style='width: 100px;'
                        @click='deleteUser(index)' 
                        >
                        <i class='fa fa-fw fa-times-circle'></i>
                        Delete
                    </v-btn>
                <!--blind admin-->
                    <v-btn v-if='user.privilege == "admin"'
                        dense 
                        style='width: 100px;'
                        disabled>
                        <i class='fa fa-fw fa-user-circle'></i>
                        Admin
                    </v-btn>
                </td>
            </tr>
        </tbody>
        </template>
        </v-simple-table>
    </v-card>
</div>
</v-app>
</template>
<script>
//import
    import bridge from '../bridge.js';
    import session from "../utils/session.js";
//master
    export default {
    //name
        name: 'users',
    //components
        components: {
            session
        },
    //on load
        async created(){
        //authenticate
            let params = document.cookie.split('+');
			if(params && params.length && params[0] != 'admin'){
				this.$router.push({ path: '/login'});
            }
        //continue
            this.users = await bridge.getUsers() || [];
            this.users.sort((a, b) => a._id.localeCompare(b._id));
            this.users.sort((x,y)=>{return x.privilege == 'admin' ? -1 : y.privilege == 'admin' ? 1 : 0;});
            this.originals = JSON.parse(JSON.stringify(this.users));
            this.users.forEach(a => {
                a.usernameErrors = [];
                a.passwordErrors = [];
            });
        },
        methods: {
    //add a user to item
        async addUser(){
		//validate fields
			if(!this.$refs.form.validate()){
				return;
            }
        //close modal
            this.showUserModal = false;
        //build user object
            let user = {
                _id: this.username,
                password: this.password,
                privilege: 'user',
                added: this.formatDate(new Date().toISOString().substr(0, 10))
            };
        //if new push, else update
            let notification = '';
            if(this.isNew){
                this.users.push(user);
                notification = 'added';
            }else{
                for(let i = 0; i < this.users.length; i++){
                    if(this.users[i]._id == user._id){
                        this.users[i].password = user.password;
                        if(this.users[i].privilege == 'admin'){
                            user.privilege = 'admin';
                        }
                    }
                }
                notification = 'updated';
            }           
        //reset params
            this.username = '';
            this.password = '';
        //update
            await bridge.updateUser(user);
		//notify
			toastr.success(`User ${notification}!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        }, 
    //delete user from item
        deleteUser(index){
        //get delete index
            this.userToDelete = this.users[index];
        //prompt are you sure
            this.showDeleteModal = true;
        }, async doDeleteUser(){
        //delete user
            this.users = this.users.filter(a => a._id != this.userToDelete._id);
            await bridge.deleteUser(this.userToDelete._id);
            this.showDeleteModal = false;
        //notify
            toastr.success('User deleted!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        },  
    //re-use the modal to update an existing user
        updateUser(user){
        //set props and open modal
            this.username = user._id;
            this.password = user.password;
            this.isNew = false;
            this.showUserModal = true;
        //focus the textbox
			setTimeout(() => {
				this.$refs.focusMe.$refs.input.focus();
			}, 0);
        }, 
    //log out of page
        logout(){
        //reset cookie
            document.cookie = 'null';
        //re-direct to login page
            this.$router.push({ path: '/login' });
        //notify
            toastr.success('Logged out!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        },
    //display the modal
        createUser(){
        //set props and open modal
            this.username = '';
            this.password = '';
            this.isNew = true;
            this.showUserModal = true;
        //focus the textbox
			setTimeout(() => {
				this.$refs.focusMe.$refs.input.focus();
			}, 0);
        }, 
    //hide modals
        closeUserModal(){
            this.showUserModal = false;
        },
        closeDeleteModal(){
            this.showDeleteModal = false;
        },
    //format date to people friendly
        formatDate (date) {
            if (!date) return null;
            let [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        }
      }, computed: {
        //validate the user title
            validateUsername(){
            //initialize
                let errors = [];
            //check empty
                if( !this.username || this.username == '' ){
                    errors.push('This username is empty!');
                }
            //check unique
                if(this.users.some(a => a._id == this.username )){
                    errors.push('This username already exists!');
                }
            //return
                return errors;
            }
        },
    //global vars
          data: global => ({
            index: 0,
            showUserModal: false,
            showDeleteModal: false,
            users: [],
            username: '',
            password: '',
            isNew: true,
            userToDelete: {},
            validatePassword: {
                required: a => !!a || 'This password is empty!'
            }
        }),
    }
</script>