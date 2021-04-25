<template>
<v-app>
<!--dialogs-->
  <transition name="fade">
      <license 
        v-if="dialogs.license.show" 
        @closeLicenseDialog="closeLicenseDialog">
      </license>
  </transition>
<!--banner bar-->
  <banner></banner>
<!--sub bar-->
  <v-card-title primary-title 
      style='color: white; background-color: #192c45 !important;'>
    <!--title-->
      <v-icon dark left>event</v-icon>
      <small>{{title}}</small>
    <!--plus button-->
      <v-btn dense dark 
        class='dizagara-banner-button dizagara-outline-blue'
        style='position: absolute; right: 10px; width: 100px !important;'
        @click='add()'>
        <v-icon dark left>add_circle</v-icon>
        ADD
      </v-btn>
  </v-card-title>
<!--datatable-->
  <datatable v-bind:data='data'></datatable>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
  import license from '../components/dialogs/license.vue';
  import banner from '../components/generics/banner.vue';
  import datatable from '../components/generics/datatable.vue';
  import converters from '../utils/converters.js';
//master
	export default {
//name
	name: 'dashboard',
//components
	components: {
    license, banner, datatable, converters
	},
//cycle methods
  async created(){
    this.prop = this.$route.params.prop;
    this.title = converters.capitalizeFirst(this.prop);
    //get data
    if(this.prop == 'license'){
      this.data.type = 'license';
      this.data.data = await bridge.getAllLicenses();
    }
  },
//custom methods
  methods: {
  //add prop to datatable
    add(){
      this.dialogs[this.prop].isNew = true;
      this.dialogs[this.prop].show = true;
    },
  //dialogs
    closeLicenseDialog(){
      this.dialogs.license.show = false;
    }
  },
//global vars
	data: global => ({
    prop: '',
    title: '',
    data: {type: '', data: []},
		dialogs: {
			license: {
				show: false
			}
		}
  })
}
</script>