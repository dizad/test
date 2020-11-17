<template>
<v-app style='margin:30px'>
	<v-card v-on:keyup.enter='updateQuote()'>
 	<!--banner-->
        <v-card-title
            class='headline primary'
            primary-title style='color: white;'>
        <!--title-->
            <small><i class='fa fa-bars fa-fw'></i>Quote</small>
        <!--logout button-->
            <v-btn 
                style='position: absolute; right: 20px; width: 100px;'
                dense dark color='info' 
                @click='logout()'>
                <i class='fa fa-fw fa-sign-out'></i>
                Logout
            </v-btn>
        </v-card-title>
		<v-row>
		<!--input01-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		<!--input02-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		<!--input02-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		</v-row>
		<v-row>
		<!--input01-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		<!--input02-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		<!--input02-->
			<v-text-field
				style='width: 100px;'
				label='Input01'
				dense
				:rules='[validate.required]'
				placeholder='Type input01...'
				outlined
			></v-text-field>
		</v-row>
	<!--update quote button-->
		<v-btn 
			style='width: 100px;'
			dense dark color='info' 
			@click='updateQuote()'>
			<i class='fa fa-fw fa-refresh'></i>
			Update Quote
		</v-btn>
	<!--udpate quote button-->
		<v-btn 
			style='width: 100px;'
			dense dark color='info' 
			@click='downloadPdf()'>
			<i class='fa fa-fw fa-download'></i>
			Download PDF
		</v-btn>
	</v-card>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge';
//master
    export default {
	//on load
		async created(){
		//authentication

		},
      methods: {
		  updateQuote(){
			  alert('updated');
		  },
			logout(){
				this.$router.push({ path: '/login', params: {}});
			},
			downloadPdf(){

			},updateQuote(){

			}
	  },
	//global vars
          data: global => ({
			  	quote: 0,
				validate: {
					required: a => !!a || 'This entry is empty!'
				}
        }),
    }
</script>