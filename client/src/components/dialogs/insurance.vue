<template>
    <v-app><!--required for vuetify-->
        <div class='container'><!--empty div required to contain component-->
        <!--edit-->
            <v-btn color="success" small style='margin-left: 5px; height: 40px;'>
                <v-icon>edit</v-icon>
            </v-btn>
        <!--add-->
            <v-btn color="primary" small style='margin-left: 5px; height: 40px;'>
                <v-icon dark>add_circle</v-icon>
            </v-btn>
        <!--remove-->
            <v-btn  color="error" small style='margin-left: 5px; height: 40px;'>
                <v-icon dark>cancel</v-icon>
            </v-btn> 
        </div>
    </v-app>
</template>
<script>
//master
	export default {
//name
	name: 'editors',
//life cycle
    async created(){
	},
//customs
    methods: {
    },
//data
	data: global => ({
    })
}
</script>