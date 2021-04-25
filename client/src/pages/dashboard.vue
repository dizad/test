<template>
<v-app>
<!--banner bar-->
  <banner></banner><!--height provides upper offset-->
  <!--sub bar-->
  <v-card-title primary-title style='color: white; background-color: #192c45 !important;'>
  <!--title-->
    <span class='mdi mdi-18px mdi-view-dashboard'></span>&nbsp;
    <small>Dashboard</small>
</v-card-title>

<!--content-->
<!--abc-->
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
  import banner from '../components/generics/banner.vue';
//master
	export default {
//name
	name: 'dashboard',
//components
  components: {
    banner
	},
//cycle methods
  created(){
    //check user

  },
//custom methods
//used for picker to update dynamically
//global vars
	data: global => ({

	})
}
</script>