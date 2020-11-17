<template>
    <v-app>
        	<div class='splashBackground' >
    <v-card v-on:keyup.enter='addUser()' style='margin: 30px;'>
    <!--banner-->
        <v-card-title
            class='headline primary'
            primary-title style='color: white;'>
        <!--title-->
            <small><i class='fa fa-bars fa-fw'></i>Users</small>
        <!--save-->
            <v-btn 
                style='position: absolute; right: 140px; width: 100px;'
                dense dark color='success' 
                @click='save()'>
                <i class='fa fa-fw fa-save'></i>
                Save
            </v-btn>
        <!--logout button-->
            <v-btn 
                style='position: absolute; right: 20px; width: 100px;'
                dense dark color='info' 
                @click='logout()'>
                <i class='fa fa-fw fa-sign-out'></i>
                Logout
            </v-btn>
        </v-card-title>
    <!--add user-->
        <!--username textbox-->
        <v-row>
            <v-text-field
                style='width: 100px; margin: 20px 20px 0px 40px;'
                label='Username'
                dense
                :rules='[validate.required]'
                placeholder='Type username...'
                outlined
                v-model='username'
            ></v-text-field>
        <!--password textbox-->
            <v-text-field
                style='width: 100px; margin: 20px 20px 0px 20px;'
                label='Password'
                dense
                :rules='[validate.required]'
                placeholder='Type password...'
                outlined
                v-model='password'
            ></v-text-field>
        <!--add user button-->
            <v-btn 
                style='width: 100px; margin: 20px 40px 0px 20px;'
                dense dark color='info' 
                @click='addUser()'>
                <i class='fa fa-fw fa-plus-circle'></i>
                Add
            </v-btn>
        </v-row>
    <!--list-->
        <!--display tasks-->
            <v-simple-table style='margin: 20px;' v-if='users.length'>
            <template v-slot:default>
            <!--headers-->
                <thead>
                <tr>
                    <th class='text-left' style='width: 5%;'>
                    Id#
                    </th>
                    <th class='text-left' style='width: 40%;'>
                    Username
                    </th>
                    <th class='text-left' style='width: 40%;'>
                    Password
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
            <!--id# badge-->
                <td class='text-left' style='width: 5%;'>
                    <v-avatar
                        color="green"
                        size="24"
                    >
                        <span class="white--text headline" style='font-size: small;'><small>{{ index + 1}}</small></span>
                    </v-avatar>
                </td>
            <!--username textbox-->
                <td class='text-left' style='width: 45%;'>
                    <v-text-field
                        style='margin-top: 28px;'
                        dense
                        :rules='[validate.required]'
                        placeholder='Type username...'
                        outlined
                        v-model='user._id'
                    ></v-text-field>
                </td>
            <!--password textbox-->
                <td class='text-left' style='width: 45%;'>
                    <v-text-field
                        style='margin-top: 28px;'
                        dense
                        :rules='[validate.required]'
                        placeholder='Type password...'
                        outlined
                        v-model='user.password'
                    ></v-text-field>
                </td>
            <!--delete button-->
                <td>
                    <v-btn 
                        dense 
                        dark color='error' 
                        style='width: 100px;'
                        @click='deleteUser(index)'>
                        <i class='fa fa-trash fa-fw'></i>
                        Delete
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
    import bridge from '../bridge';
//master
    export default {
	//on load
		async created(){

          //  this.users = await bridge.getUsers() || [];
          this.users.sort((a, b) => a._id.localeCompare(b._id));
           this.originals = JSON.parse(JSON.stringify(this.users));
        },
        destroyed(){
            //check dirty flag
            if(JSON.stringify(this.originals) != JSON.stringify(this.users)){
                alert('need confirmation modal');
            }
        },
        methods: {
            addUser(){
                this.users.unshift({
                    _id: this.username,
                    password: this.password,
                    privilege: 'user'
                });
                this.username = '';
                this.password = '';
            },
            deleteUser(index){
                this.users.splice(index, 1);
            },
            save(){
                toastr.success(`Users saved!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            },
            logout(){
                this.$router.push({ path: '/login', params: {}});
            }
        },
    //global vars
          data: global => ({
                username: '',
                password: '',
                users: [],
                originals: [],
                validate: {
                required: a => !!a || 'This entry is empty!'
            }
        }),
    }
</script>