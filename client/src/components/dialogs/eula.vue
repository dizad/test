<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 1000px; margin-top: 150px;'>    
	<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
	<!--title-->
		<v-card-title
			class="primary"
			style='color: white;'>
			<span class="mdi mdi-24px iconRight" id='headerIcon'></span>
			EULA   
		</v-card-title>		
	<!--content-->
		<v-card-text style='padding: 20px; overflow-y: scroll; height: calc(100vh - 400px);'>
            {{about}}
		</v-card-text>             
		<v-card-actions >
			<v-row>
				<v-col class="text-center">
					<v-btn 
						id='firstFocus'
						class='dizagara-button-blue dizagara-button-width-medium' 
						dense dark
						@click='closeDialog(`submit`)'>
						<span class="mdi mdi-24px iconRight" id='acceptIcon'></span>
						ACCEPT
					</v-btn>
                    <v-btn 
						style='margin-left: 20px;'
						class='dizagara-button-red dizagara-button-width-medium' 
						dense dark
						@click='closeDialog(`cancel`)'>
						<span class="mdi mdi-24px iconRight" id='denyIcon'></span>
						DENY
					</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</div>
</div>
</template>
<script>
//imports
    import references from '../../utils/references.js';
	import bridge from '../../bridge.js';
//master
	export default {
//name
	name: 'eula',
//components
	components: {
	},
//cycle methods
    async created(){
	//get icons
		setTimeout(() => {
			$('#firstFocus').focus();
            $('#headerIcon').addClass(references.getIcon('eula'));
			$('#acceptIcon').addClass(references.getIcon('submit'));
            $('#denyIcon').addClass(references.getIcon('delete'));
		}, 0);
	//get data
		this.about = await bridge.getField({
			collection: 'configs',
			matchField: '_id',
			matchValue: 'application',
			getField: 'eula'
		}) || ``;
	},
//custom methods
    methods: {
	//close modal
		closeDialog(action){
			this.$emit('closeDialog', {
                action: action
            });
		}
    },
//global vars
	data: global => ({
		about: ``
    	})
	}
</script>