<template>
    <div>
    <v-card>
      <v-card-title>
        <!--search box-->
        <v-text-field dense outlined autocomplete='off'
            append-icon="mdi-magnify"
            background-color='yellow lighten-4'
            v-model="search"
            placeholder="Type # of accounts valid to license."
            label="Search"
        ></v-text-field>

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data.data"
        :search="search"
      >      

          <template v-slot:[`item._id`]="{ item }">
        <v-chip dark>
          {{ item._id }}
        </v-chip>
      </template>
      
                

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                    >
                    mdi-pencil
                    </v-icon>
                    <v-icon
                    small
                    @click="deleteItem(item)"
                    >
                    mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn
                    color="primary"
                    @click="initialize"
                    >
                    Reset
                    </v-btn>
                </template>



      
      
    </v-data-table>

      
    </v-card>
    </div>
</template>
<script>
//import
	import converters from '../../utils/converters.js';
//master
	export default {
//name
	name: 'datatable',
//components
	components: {
        converters
	},
//props
    props: ['data'],
//cycle methods
  created(){
    //build headers
    this.headers = [];
    if(this.data.data.length){
        let keys = Object.keys(this.data.data[0])
        keys.forEach(a => {
            let text = converters.capitalizeFirst(a);
            if(a == '_id'){
                text = 'Identity';
            }
            this.headers.push({
                text: text,
                value: a,
                align: 'center',
                sortable: true
            });
        }); 
    }
    this.headers.push({ 
        text: 'Actions', 
        value: 'actions', 
        sortable: false });
  },
//custom methods
//used for picker to update dynamically
//global variables
	data: global => ({
      search: ''
	})
}
</script>