<template>
<div><!--empty div required to contain component-->
<!--dialogs-->
    <!--about-->
        <transition name="fade">
            <about v-if="showModals.about" @closeAboutModal="closeAboutModal"></about>
        </transition>
    <!--settings-->
        <transition name="fade">
            <account v-if="showModals.account" @closeAccountModal="closeAccountModal"></account>
        </transition>
<!--dialogs-->
    <v-toolbar color="primary" dark style='border-radius:0px; box-shadow: none !important;'>
    <img id="imageBanner" src="../../../public/banner.jpg" 
        style='height: 65px; margin: -20px; cursor: pointer;' 
        @click='redirect("dashboard")' title='Go to dashboard.'/>
    <v-spacer></v-spacer><!--pushes buttons to the right-->
<!--banner buttons-->
    <!--account-->
        <v-btn icon class='blue darken-4' style='margin-right: 10px;' title='Settings' @click='settings()' v-if='!["master"].includes(user.privilege)'>
            <span class='mdi mdi-24px mdi-account-circle'></span>
        </v-btn>
    <!--help-->  
        <v-btn icon class='blue darken-4' style='margin-right: 10px;' title='Help' @click='help()'>
            <span class='mdi mdi-24px mdi-help'></span>
        </v-btn>
    <!--about-->
        <v-btn icon class='blue darken-4' style='margin-right: 10px;' title='About' @click='about()'>
            <span class='mdi mdi-24px mdi-exclamation-thick'></span>
        </v-btn>
    <!--logout-->
        <v-btn icon class='blue darken-4' style='margin-right: 0px;' title='Logout' @click='logout()'>
            <span class='mdi mdi-24px mdi-logout'></span>
        </v-btn>
<!--menu dropdowns-->
  </v-toolbar>
    <v-toolbar dense dark 
        style='border-radius:0px; background-color: #244170; height: 60px;' >
        <v-toolbar-items style='margin-left: -10px; height: 40px;'>
        <!--services-->
            <v-menu open-on-hover offset-y transition="slide-y-transition" v-if='["operator", "admin", "master"].includes(user.privilege)'>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' flat v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-hospital-box icon-right'></span>
                        Services
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item :key="Scheduling" @click='redirect("scheduling")'>
                       <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-calendar dizagara-icon-gray icon-right'></span>
                                Scheduling
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-menu>
        <!--properties-->
            <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-y-transition" v-if='["operator", "admin", "master"].includes(user.privilege)'>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='dizagara-banner-button dizagara-outline-blue' flat v-bind="attrs" v-on="on">
                        <span class='mdi mdi-18px mdi-book-open'></span>&nbsp;
                        Properties
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item :key="Patients" @click='redirect("properties", "patients")'>
                       <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-human-handsdown dizagara-icon-gray icon-right'></span>
                                Patients
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item :key="Patients" @click='redirect("patients")'>
                       <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-hail dizagara-icon-gray icon-right'></span>
                                Surgeons
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item :key="Patients" @click='redirect("patients")'>
                       <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-domain dizagara-icon-gray icon-right'></span>
                                Laboratories
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item :key="Procedures">
                       <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-needle dizagara-icon-gray icon-right'></span>
                                Codes
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item :key="Insurances">
                       <v-list-item-action>
                            <v-list-item-title>
                                 <span class='mdi mdi-18px mdi-credit-card dizagara-icon-gray'></span>
                                 Insurances
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>


                <!--licenses-->
                    <v-list-item :key="Scheduling" @click='redirect("properties", "license")'>
                    <v-list-item-action>
                        <v-list-item-title>
                            <span class='mdi mdi-18px mdi-license dizagara-icon-gray dizagara-icon-right'></span>Licenses
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>
                <!--users-->
                    <v-list-item :key="Scheduling" @click='redirect("users")'>
                        <v-list-item-action>
                            <v-list-item-title>
                                <span class='mdi mdi-18px mdi-account-group dizagara-icon-gray dizagara-icon-right'></span>Users
                            </v-list-item-title>
                        </v-list-item-action>
                    </v-list-item>

                </v-list>
            </v-menu>
        </v-toolbar-items>
  </v-toolbar>
 </div>
</template>
<script>
//imports
    import about from '../dialogs/about.vue';
    import account from '../dialogs/account.vue';
    import bridge from '../../bridge.js';
//master
	export default {
//name
	name: 'banner',
//components
	components: {
        about, account
	},
//cycle methods
    async created(){
	//get user
        let params = {
            id: this.$route.params.id
        }
    //authenticate
        this.user = await bridge.getUser(params);
        if(!this.user){
            this.$router.push({ path: '/login'});
        }
	},
//custom methods
    methods: {
    //generics
        //redirect page
            redirect(page, prop){
                this.$router.push({path: `/${page}/${this.user._id}/${prop}`});
            },
        //logout
            logout(){
            //reset cookie
                document.cookie = 'denied';
            //re-direct to login page
                this.$router.push({ path: '/login' });
            //notify
                toastr.success(`Logged out successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            },
        //change user settings
            settings(){
                this.showModals.account = true; 
            },
        //download user guide
            help(){
                window.open('guide.pdf');           
            },
        //display software about
            about(){
               this.showModals.about = true; 
            },
    //dialogs
        //close about modal
            closeAboutModal(){
                this.showModals.about = false; 
            },
        //close account modal
            closeAccountModal(){
                this.showModals.account = false; 
            }
    },
//global vars
	data: global => ({
        showModals: {
            about: false,
            account: false
        },
        user: {
        }
    })
}
</script>