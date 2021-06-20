<template>
<div><!--empty div required to contain component-->
<!--dialogs-->
    <!--about-->
        <transition name="fade">
            <about 
            v-if="dialogs.about.show" 
            @closeDialog='closeDialog($event, "about")'>
            </about>
        </transition>
    <!--users-->
        <transition name="fade">
            <user 
            :data='user' 
            :params='params'
            v-if='dialogs.user.show'
            @closeDialog='closeDialog($event, "user")'>
            </user>
        </transition>
<!--dialogs-->
    <v-toolbar color="primary" dark style='border-radius:0px; box-shadow: none !important;'>
    <img id="imageBanner" src="../../../public/banner.jpg" 
        style='height: 65px; margin: -20px;'/>
    <v-spacer></v-spacer><!--pushes buttons to the right-->
<!--banner buttons-->
    <!--identity-->
        <!--username-->
            <v-chip
                color="success"
                text-color="white"
                title='User status.'
            style='margin-right: 10px;'>
            {{user.first}}, {{user.last}} ({{user.username}})
            </v-chip>
        <!--privilege-->
            <v-chip v-if='ready.right'
                color="success"
                text-color="white"
                style='margin-right: 10px;'
                title='User privilege.'
            ><span style='color: yellow; font-weight: bold;'>{{user.privilege.toUpperCase()}}</span>
            </v-chip>
    <!--account-->
        <v-btn icon class='blue darken-4' style='margin-right: 10px; border: 1px solid #00376b !important;' title='User' @click='edit()'>
            <span class='mdi mdi-24px' id='userIcon'></span>
        </v-btn>
    <!--help-->  
        <v-btn icon class='blue darken-4' style='margin-right: 10px; border: 1px solid #00376b !important;' title='Help' @click='help()'>
            <span class='mdi mdi-24px' id='helpIcon'></span>
        </v-btn>
    <!--about-->
        <v-btn icon class='blue darken-4' style='margin-right: 10px; border: 1px solid #00376b !important;' title='About' @click='about()'>
            <span class='mdi mdi-24px' id='aboutIcon'></span>
        </v-btn>
    <!--logout-->
        <v-btn icon class='blue darken-4' style='margin-right: 0px; border: 1px solid #00376b !important;' title='Logout' @click='logout()'>
            <span class='mdi mdi-24px' id='logoutIcon'></span>
        </v-btn>
<!--menu dropdowns-->
  </v-toolbar>
    <v-toolbar dense dark 
        style='border-radius:0px; background-color: #244170; height: 60px;' >
        <v-toolbar-items style='margin-left: -10px; height: 40px;'>
        <!--services-->
            <v-btn small class='dizagara-home-button dizagara-outline-blue' @click='redirect("dashboard")' title='Go to dashboard.'>
                <span class='mdi mdi-24px mdi-view-dashboard'></span>
            </v-btn>
        <!--services-->
            <v-menu open-on-hover offset-y transition="slide-y-transition" v-if='["master", "center", "hospital"].includes(user.privilege) && !isExpired'>
            <!--header-->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-hospital-box dizagara-margin-right'></span>
                        SERVICES
                    </v-btn>
                </template>
            <!--item-->
                <v-list>
                <span v-for='item of dropdowns.services' :key='item.id'>
                    <v-list-item @click='redirect(item.id)' v-if='item.access.includes(user.privilege)'>
                        <v-list-item-action>
                            <v-list-item-title>
                                <span :class='`${item.icon} ${dropdowns.params.icon}`'></span>
                                {{item.name}}
                            </v-list-item-title>
                        </v-list-item-action>
        
                    </v-list-item>
                </span>
                </v-list>
            </v-menu>
        <!--properties-->
            <v-menu open-on-hover offset-y transition="slide-y-transition" v-if='["master", "center", "hospital"].includes(user.privilege) && !isExpired'>
            <!--header-->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-book-open dizagara-margin-right'></span>
                        Properties
                    </v-btn>
                </template>
            <!--item-->
                <v-list dense>
                    <span v-for='item of dropdowns.properties' :key='item.id'>
                        <v-list-item @click='redirect("properties", item.id)' v-if='item.access.includes(user.privilege)'>
                            <v-list-item-action>
                                <v-list-item-title>
                                    <span :class='`${item.icon} ${dropdowns.params.icon}`'></span>
                                    {{item.name}}
                                </v-list-item-title>
                            </v-list-item-action>
                        </v-list-item>
                    </span>
                </v-list>
            </v-menu>
        <!--restricted-->
            <v-menu open-on-hover offset-y transition="slide-y-transition" v-if='["master"].includes(user.privilege) && !isExpired'>
            <!--header-->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-key dizagara-margin-right'></span>
                        Restricted
                    </v-btn>
                </template>
            <!--item-->
                <v-list dense>
                    <span v-for='item of dropdowns.restricted' :key='item.id'>
                        <v-list-item @click='redirect("properties", item.id)' v-if='item.access.includes(user.privilege)'>
                            <v-list-item-action>
                                <v-list-item-title>
                                    <span :class='`${item.icon} ${dropdowns.params.icon}`'></span>
                                    {{item.name}}
                                </v-list-item-title>
                            </v-list-item-action>
                        </v-list-item>
                    </span>
                </v-list>
            </v-menu>
        <!--settings-->
            <v-menu open-on-hover offset-y transition="slide-y-transition" v-if='["master"].includes(user.privilege) && !isExpired'>
            <!--header-->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-settings dizagara-margin-right'></span>
                        Settings
                    </v-btn>
                </template>
            <!--item-->
                <v-list dense>
                    <span v-for='item of dropdowns.settings' :key='item.id'>
                        <v-list-item @click='redirect("settings", item.id)' v-if='item.access.includes(user.privilege)'>
                            <v-list-item-action>
                                <v-list-item-title>
                                    <span :class='`${item.icon} ${dropdowns.params.icon}`'></span>
                                    {{item.name}}
                                </v-list-item-title>
                            </v-list-item-action>
                        </v-list-item>
                    </span>
                </v-list>
            </v-menu>
        </v-toolbar-items>
  </v-toolbar>
 </div>
</template>
<script>
//imports
    import about from '../dialogs/about.vue';
    import user from '../dialogs/user.vue';
    import bridge from '../../bridge.js';
    import references from '../../utils/references.js';
    import utils from '../../utils/utils.js';
//master
	export default {
//name
	name: 'banner',
//components
	components: {
        about, user
	},
//cycle methods
    async created(){
    //get icon
      setTimeout(() => {
        $('#userIcon').addClass(references.getIcon('user'));
        $('#helpIcon').addClass(references.getIcon('help'));
        $('#aboutIcon').addClass(references.getIcon('about'));
        $('#logoutIcon').addClass(references.getIcon('logout'));
      }, 0);
    //sort dropdowns
        this.dropdowns.properties.sort((a, b) => a.id.localeCompare(b.id));
    //authenticate
        this.user = await bridge.getUser({
            id: this.$route.params.id
        });
        if(!this.user){
            this.$router.push({ path: '/login'});
        }
    //check if expired
		let expiration = await bridge.getField({
			collection: 'licenses',
			matchField: 'license',
			matchValue: this.user.license,
			getField: 'expiration'
		}) || ``;
        if(utils.getHoursFromNow(expiration) < 0){
            this.isExpired = true;
        }
        this.ready.right = true;
	},
//custom methods
    methods: {
    //generics
        //redirect page
            redirect(page, prop){
                let path = ``;
                if(prop){
                    path = `/${page}/${prop}/${this.user.username}`;
                }else{
                    path = `/${page}/${this.user.username}`;
                }
                if(this.$route.path != path) {
                    this.$router.push({path: path});
                }
            },
        //logout
            logout(){
            //re-direct to login page
                this.$router.push({ path: '/login' });
            //notify
                toastr.info(`Logged out successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            },
        //download user guide
            help(){
                window.open('guide.pdf');           
            },
        //change user edit
            edit(){
                this.dialogs.user.show = true; 
            },
        //display software about
            about(){
               this.dialogs.about.show = true; 
            },
    //dialogs
        //close about modal
            async closeDialog(params, prop){
                this.dialogs[prop].show = false;
                if(params.action == `submit`){
                //add standards
                    params.data.modBy = this.user.username;
                    params.data.modDate = moment();
                //save to database
                    await bridge.setDocument({
                        collection: `users`,
                        item: params.data
                    }); 
                //update
                    this.user = utils.deepClone(params.data);
                //notify
                    toastr.success(`user updated successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                }
            },
        //close account modal
            closeAccountModal(){
                this.showModals.user = false; 
            }
    },
//global vars
	data: global => ({
        isExpired: false,
        dialogs: {
            user: {
                show: false
            },
            about: {
                show: false
            }
        },
        showModals: {
            about: false,
            user: false
        },
        ready: {
            right: false
        },
        dropdowns: {
        //params
            params: {
                icon: 'mdi mdi-18px dizagara-icon-gray icon-right'
            },
        //settings
            settings: [{
                id: 'calibration',
                name: 'Calibration',
                icon: references.getIcon('calibration'),
                access: ['master']
            },{
                id: 'application',
                name: 'Application',
                icon: references.getIcon('application'),
                access: ['master']
            }],
        //restricted
            restricted: [{
                id: 'user',
                name: 'Users',
                icon: references.getIcon('user'),
                access: ['master']
            },{
                id: 'license',
                name: 'Licenses',
                icon: references.getIcon('license'),
                access: ['master']
            },{
                id: 'center',
                name: 'Centers',
                icon: references.getIcon('center'),
                access: ['master']
            },{
                id: 'hospital',
                name: 'Hospitals',
                icon: references.getIcon('hospital'),
                access: ['master']
            },{
                id: 'track',
                name: 'Tracks',
                icon: references.getIcon('track'),
                access: ['master']
            }],
        //services
            services: [{
                id: 'scheduling',
                name: 'Scheduling',
                icon: references.getIcon('schedule'),
                access: ['master', 'center', 'hospital']
            },{
                id: 'tracking',
                name: 'Tracking',
                icon: references.getIcon('track'),
                access: ['master', 'center']
            }],
        //properties
            properties: [
                {
                    id: 'procedure',
                    name: 'Procedures',
                    icon: references.getIcon('procedure'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'diagnose',
                    name: 'Diagnoses',
                    icon: references.getIcon('diagnose'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'insurance',
                    name: 'Insurances',
                    icon: references.getIcon('insurance'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'code',
                    name: 'Codes',
                    icon: references.getIcon('code'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'patient',
                    name: 'Patients',
                    icon: references.getIcon('patient'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'room',
                    name: 'Rooms',
                    icon: references.getIcon('room'),
                    access: ['master', 'center']
                },{
                    id: 'prep',
                    name: 'Preps',
                    icon: references.getIcon('prep'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'physician',
                    name: 'Physicians',
                    icon: references.getIcon('physician'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'anesthesia',
                    name: 'Anesthesias',
                    icon: references.getIcon('anesthesia'),
                    access: ['master', 'center', 'hospital']
                },{
                    id: 'specialty',
                    name: 'Specialties',
                    icon: references.getIcon('specialty'),
                    access: ['master', 'center', 'hospital']
                }]
        },
        user: {},
        params: {}
    })
}
</script>