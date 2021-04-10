<template>
<v-app>
<div class='splashBackground'>
<!--master page-->	
<v-card style='margin:30px 30px auto 30px; height: calc(100vh - 200px);'> 
<!--banner-->
<v-card-title
	class='headline deep-orange'
	primary-title 
	style='color: white;'>
<!--title-->
	<v-icon dark left>euro</v-icon>
	<span class='title'>INVOICE - <span style='color: yellow; font-weight: bold;'>{{userId.toUpperCase()}}</span></span>
<!--save button-->
	<v-btn 
		style='position: absolute; right: 215px; width: 175px; font-weight: bold;'
		dense dark color='success' 
		@click='saveAll()'>
		<v-icon dark left>save</v-icon>
		Save All
	</v-btn>
<!--logout button-->
	<v-btn 
		style='position: absolute; right: 20px; width: 175px; font-weight: bold;'
		dense dark color='success' 
		@click='logout()'>
		<v-icon dark left>logout</v-icon>
		Logout
	</v-btn>
</v-card-title>
<!--content-->
<v-form ref='form' lazy-validation style='height: 100%; background-color: rgba(156, 43, 10, 1.0)'>
	<v-row no-gutters>	
	<!--card column-->
<!--MASTER LEFT COL------------------------------------------------------------------------------------------------------------------------------------------->	
	<v-col :class="colSize.left" style='overflow-y: scroll; height: calc(100vh - 200px)'><!--MASTER LEFT COL->col-md-9 is the MASTER WIDTH-->
	<v-card class='deep-orange darken-4' style='resize: horizontal; padding: 0px 20px 0px 20px;'>
      <v-toolbar flat class='deep-orange darken-4'>
		<!--toolbar-->
			<v-toolbar-title>
				<v-icon dark left>work</v-icon>
				<span class='header02'>CARD(S)</span>
			</v-toolbar-title>
		<!--sort button-->
			<v-btn 
				style='width: 175px; position: absolute; right: 390px; font-weight: bold;'
				dense color='success' 
				@click='sortCards()'>
				<v-icon dark left>sort</v-icon>
				SORT ASC
			</v-btn>
		<!--add button-->
			<v-btn 
				style='width: 175px; position: absolute; right: 195px; font-weight: bold;'
				dense color='success' 
				@click='addCard()'>
				<v-icon dark left>add_circle</v-icon>
				Add Card
			</v-btn>
		<!--reset button-->
			<v-btn 
				style='width: 175px; position: absolute; right: 0px; font-weight: bold;'
				dense dark color='warning' 
				@click='deleteCards()'>
				<v-icon dark left>cancel</v-icon>
				Delete Card(s)
			</v-btn>
      </v-toolbar>
<!--expansion cards-->
    <v-expansion-panels :style= "cards.length > 0 ? 'padding-bottom: 20px;' : 'margin-bottom: 0px;'" >
      <v-expansion-panel
	  v-on:keyup.enter='getFriendlyTotal()'
		v-for='(card, index) in cards'
		:key='index'
      >
<!--if last header, add border radius at bottom(bug with vuetify)-->
	<v-expansion-panel-header hide-actions class='deep-orange darken-2' :style= "index == (cards.length - 1) ? 'border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;' : ''" >
	<!--badge-->
		<span style='width: 50px;' > 
			<!--index badge-->
				<v-avatar color="yellow" size="24">
					<span class="red--text headline" style='font-size: small; font-weight: bold;'><small>{{ index + 1}}</small></span>
				</v-avatar>
		</span>
	<!--date picker-->
	<span style='width: 290px; position: absolute; top: 10px; left: 70px;' > 
		<v-dialog
			ref="menu"
			v-model='card.showDatePicker'
					:close-on-content-click='false'
					:nudge-right='0'
					transition='scale-transition'
					offset-y
					max-width='290px'
					min-width='290px'
			>
			<template v-slot:activator="{on}">
			<v-text-field style='font-weight: bold; '
					label='Date'
					append-icon='event'
					outlined readonly
					color='red darken-4'
					background-color= 'yellow lighten-4'
					v-model='card.dateFormatted'
					@blur='card.date = parseDate(card.dateFormatted)'
					v-on='on'
					dense
				></v-text-field>
			</template>
			<v-date-picker
				color='orange darken-4'
				v-model='card.date' 
				dense
				@input='card.showDatePicker = false'
			></v-date-picker>
			</v-dialog>
	</span>
	<!--delete-->
		<span style='width: 175px; position: absolute; right: 0px;'>
			<v-btn 
				style="font-weight: bold;"
				dense dark color='warning' 
				@click='deleteCard($event, index)'>
				<v-icon dark left>cancel</v-icon>
				Delete Card
			</v-btn>
		</span>
	</v-expansion-panel-header>
<!--panel content-->
	<v-expansion-panel-content>
<!--simple table-->
 		<v-simple-table dense style='margin: 20px;'>
            <template v-slot:default>
                <thead>
					<tr>
						<th class='text-left' style='width: 200px;'>
						Description
						</th>
						<th class='text-center' style='width: 400px;'>
						Quantity
						</th>
						<th class='text-center' style='width:50px;'>
						Unit</th>
						<th class='text-center' style='width:50px;'></th>
						<th class='text-center' style='width: 150px;'>
						Rate
						</th>
						<th class='text-center'></th>
						<th class='text-right'>
						Total
						</th>
					</tr>
                </thead>
                <tbody>
				<!--consulting row-->
					<tr>
						<td class='text-left'>
							<v-icon left>history</v-icon>
							Consulting Time
						</td>
						<td class='text-center'>
						<v-row>
				<!--start time picker-->
				<v-dialog
					ref="dialog"
					v-model="card.consultations.showStartPicker"
					:return-value.sync="card.consultations.start"
					persistent
					full-width
					width="290px"
					>
					<template v-slot:activator="{on}">
					<v-text-field
						v-model="card.consultations.start"
						label="Start Time"
						append-icon="mdi-clock-outline"
						background-color= 'yellow lighten-4'
						style='width: 50px; margin: 10px 10px -15px 10px; font-weight: bold;'
						autocomplete="off"
						color='rgba(77, 187, 64, 1.0)'
						readonly
						v-on="on"
						outlined dense
					></v-text-field>
					</template>
					<v-time-picker
						v-if="card.consultations.showStartPicker"
						v-model="card.consultations.start"
						full-width
						format="24hr"
						color='orange darken-4'
						@click:minute="closeTimePicker(card.consultations.start, index, 'start', 'showStartPicker')"
					>
					</v-time-picker>
				</v-dialog>
				<span class='header01' style='margin-top: 20px;'>&#10143;</span><!--arrow to icon-->
			<!--end time picker-->
				<v-dialog
					ref="dialog"
					v-model="card.consultations.showEndPicker"
					:return-value.sync="card.consultations.end"
					persistent        
					full-width
					width="290px"
				>
				<template v-slot:activator="{on}">
				<v-text-field
					v-model="card.consultations.end"
					label="End Time"
					append-icon="mdi-clock-outline"
					background-color= 'yellow lighten-4'
					style='width: 50px; margin: 10px 10px -15px 10px; font-weight: bold;'
					autocomplete="off"
					color='rgba(77, 187, 64, 1.0)'
					readonly
					v-on="on"
					outlined dense
				></v-text-field>
				</template>
				<v-time-picker
					v-if="card.consultations.showEndPicker"
					v-model="card.consultations.end"
					full-width
					format="24hr"
					color='orange darken-4'
					@click:minute="closeTimePicker(card.consultations.end, index, 'end', 'showEndPicker')"
				>
				</v-time-picker>
				</v-dialog>
			<!--time difference-->
			<span class='header01' style='margin-top: 20px; margin-right: 10px;'>= {{displayTwoDecimals(getHours(card.consultations.start, card.consultations.end))}}</span>
		</v-row>
		</td>
			<td class='text-center'>Hrs</td>
			<td><span class='header01'>X</span></td>
			<td class='text-center'>
				<v-text-field
					v-model='card.consultations.rate'
					outlined dense
					placeholder='Type rate...'
					autocomplete="off"
					type="number"
					color='rgba(77, 187, 64, 1.0)'
					background-color= 'yellow lighten-4'
					style='margin: 10px 10px -15px 10px; width: 100%; font-weight: bold;'
				></v-text-field>
			</td>
			<td>
				<span class='header01'>=</span>
			</td>
			<td class='text-right'>
				<span class='header01'>{{displayTwoDecimals(getHours(card.consultations.start, card.consultations.end) * card.consultations.rate)}} &euro;</span>
			</td>
			</tr>
		<!--commuting distance-->
			<tr>
				<td class='text-left'>
					<v-icon left>directions_car</v-icon>
					Commuting Distance
				</td>
				<td class='text-center'>
					<v-text-field
						v-model='card.commutes.km'
						outlined dense
						placeholder='Type km...'
						autocomplete="off"
						type="number"
						color='rgba(77, 187, 64, 1.0)'
						background-color= 'yellow lighten-4'
						style='margin: 10px 0px -15px 0px; width: 100%; font-weight: bold;'
					></v-text-field>
				</td>
				<td class='text-center'>Km</td>
				<td><span class='header01'>X</span></td>
				<td class='text-center'>
					<v-text-field
						v-model='card.commutes.rate'
						outlined dense
						placeholder='Type rate...'
						autocomplete="off"
						type="number"
						color='rgba(77, 187, 64, 1.0)'
						background-color= 'yellow lighten-4'
						style='margin: 10px 10px -15px 10px; width: 100%; font-weight: bold;'
					></v-text-field>
				</td>
				<td>
					<span class='header01'>=</span>
				</td>
				<td class='text-right'>
					<span class='header01'>{{displayTwoDecimals(card.commutes.km * card.commutes.rate)}} &euro;</span>
				</td>
			</tr>
		<!--house call distance-->
			<tr>
				<td class='text-left'>
					<v-icon left>home</v-icon>
					House Call Distance</td>
				<td class='text-center'>
					<v-text-field
						v-model='card.houseCalls.km'
						outlined dense
						placeholder='Type km...'
						autocomplete="off"
						type="number"
						color='rgba(77, 187, 64, 1.0)'
						background-color= 'yellow lighten-4'
						style='margin: 10px 0px -15px 0px; width: 100%; font-weight: bold;'
					></v-text-field>
				</td>
				<td class='text-center'>Km</td>
				<td><span class='header01'>X</span></td>
				<td class='text-center'>
					<v-text-field
						v-model='card.houseCalls.rate'
						outlined dense
						placeholder='Type value...'
						autocomplete="off"
						type="number"
						color='rgba(77, 187, 64, 1.0)'
						background-color= 'yellow lighten-4'
						style='margin: 10px 10px -15px 10px; width: 100%; font-weight: bold;'
					></v-text-field>
				</td>
				<td>
					<span class='header01'>=</span>
				</td>
				<td class='text-right'>
					<span class='header01'>{{displayTwoDecimals(card.houseCalls.km * card.houseCalls.rate)}} &euro;</span>
				</td>
			</tr>
		</tbody>
        </template>
	</v-simple-table>
	</v-expansion-panel-content>
	</v-expansion-panel>
</v-expansion-panels>
</v-card>
</v-col>
<!--contact card-->
<!--MASTER RIGHT COL------------------------------------------------------------------------------------------------------------------------------------------->
<v-col :class="colSize.right">
<v-card class='deep-orange darken-4' style='padding: 0px 20px 20px 20px;'>
<v-toolbar flat class='deep-orange darken-4'>
	<!--toggle button-->
		<v-btn 
			style='width: 50px; font-weight: bold; padding: 0px; margin-left: -15px; margin-right: 10px;'
			title='Toggle the width of the column...'
			dense dark color='success'
			@click='toggleColSize()'>
			<v-icon style='font-weight: bold' v-if='isLeftLong'>arrow_back</v-icon>
			<v-icon style='font-weight: bold' v-if='!isLeftLong'>arrow_forward</v-icon>
		</v-btn>
	<v-toolbar-title>
	<!--icon-->
		<v-icon dark left>account_circle</v-icon>
	<!--label-->
		<span class='header02'>CONTACT</span>
	</v-toolbar-title>
<!--reset button-->
	<v-btn 
		style='width: 175px; position: absolute; right: 0px; font-weight: bold;'
		dense dark color='success' 
		@click='clearContact()'>
		<v-icon dark left>power_settings_new</v-icon>
		CLEAR CONTACT
	</v-btn>
</v-toolbar>
 <v-expansion-panels>
<!--client-->
	<v-expansion-panel flat = true>
        <v-expansion-panel-header hide-actions class='deep-orange darken-2'>
			<span class='header02'>
				<v-icon dark left>sentiment_very_dissatisfied</v-icon>
				Client
			</span>
        </v-expansion-panel-header>
	<v-expansion-panel-content style='background-color: #FFF176;'>
	<!--list-->
		<v-row>
		<!--new client textbox-->
			<v-text-field 
				v-model='newClient'
				outlined dense
				label='New Client Id'
				placeholder='Type client id...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 20px 20px 0px 10px;'
			></v-text-field>
		<!--add client button-->
			<v-btn
				style='width: 175px; margin: 20px 10px 0px 0px; font-weight: bold;'
				dense dark color='success' 
				@click='addClient()'
				><v-icon dark left>add_circle</v-icon>
				ADD CLIENT
			</v-btn>
		</v-row>
		<v-row style='margin-bottom: -20px;'>
		<!--client dropdown-->
			<v-autocomplete
				style='margin: 0px 10px 0px 10px;'
				background-color= 'yellow lighten-4'
				v-model='contact.clientId'
				:items="contact.clients"
				dense
				outlined
				item-text="id"
                item-value="id"
				label="Client Book"
				color='rgba(77, 187, 64, 1.0)'
				@change="selectedClientChanged()"
			></v-autocomplete>
		<!--delete client button-->
			<v-btn
				style='width: 175px; margin: 0px 10px 0px 10px; font-weight: bold;'
				dense dark color='warning' 
				@click='deleteClient()'
				><v-icon dark left>cancel</v-icon>
				DELETE CLIENT
			</v-btn>
		</v-row>
		<v-card style='margin-top: 20px; margin-bottom: 10px;' v-if="contact.clients.length"><!--client contact card-->
		<v-row>
	<!--name--> 
		<v-col>
			<v-text-field 
				v-model='contact.clients[contact.clientIndex].name'
				:rules='[validate.required]'
				outlined dense
				label='Name'
				placeholder='Type name...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 10px 0px 0px 20px;'
			></v-text-field>
		</v-col>
	<!--e-mail-->
		<v-col>
			<v-text-field
				v-model='contact.clients[contact.clientIndex].email'
				:rules='[validate.required, validate.email]'
				outlined dense
				label='E-mail'
				placeholder='Type e-mail...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 10px 20px 0px 0px;'
			></v-text-field>
		</v-col>
		</v-row>
	<v-row>
	<!--street name--> 
		<v-col>
			<v-text-field 
				v-model='contact.clients[contact.clientIndex].streetName'
				:rules='[validate.required]'
				outlined dense
				label='Street Name'
				placeholder='Type street name...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 0px 0px 20px;'
			></v-text-field>
		</v-col>
	<!--street number-->
		<v-col>
			<v-text-field
				v-model='contact.clients[contact.clientIndex].streetCode'
				:rules='[validate.required]'
				outlined dense
				label='Street Number'
				placeholder='Type street number...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 20px 0px 0px;'
			></v-text-field>
		</v-col>
	</v-row>
	<v-row>
	<!--post code--> 
		<v-col>
			<v-text-field 
				v-model='contact.clients[contact.clientIndex].postCode'
				:rules='[validate.required]'
				outlined dense
				label='Post Code'
				placeholder='Type post code...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 0px -20px 20px;'
			></v-text-field>
		</v-col>
	<!--city-->
		<v-col>
			<v-text-field
				v-model='contact.clients[contact.clientIndex].city'
				:rules='[validate.required]'
				outlined dense
				label='City'
				placeholder='Type city...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 20px -20px 0px;'
			></v-text-field>
		</v-col>
	</v-row>
	</v-card>
	</v-expansion-panel-content>
</v-expansion-panel>
<!--doctor-->
	<v-expansion-panel flat = true>
	<!--header-->
        <v-expansion-panel-header hide-actions class='deep-orange darken-2' style='padding-top: 0px; padding-bottom: 0px;'>
			<span class='header02'>
				<v-icon dark filled left>sentiment_satisfied_alt</v-icon>
				Doctor
			</span>
        </v-expansion-panel-header>
		<v-expansion-panel-content>
	<!--content-->
		<v-row>
	<!--name--> 
		<v-col>
			<v-text-field 
				v-model='contact.doctor.name'
				:rules='[validate.required]'
				outlined dense
				label='Name'
				placeholder='Type name...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 20px 0px 0px 20px;'
			></v-text-field>
		</v-col>
	<!--e-mail-->
		<v-col>
			<v-text-field
				v-model='contact.doctor.email'
				:rules='[validate.required, validate.email]'
				outlined dense
				label='E-mail'
				placeholder='Type e-mail...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 20px 20px 0px 0px;'
			></v-text-field>
		</v-col>
		</v-row>
	<v-row>
	<!--street name--> 
		<v-col>
			<v-text-field 
				v-model='contact.doctor.streetName'
				:rules='[validate.required]'
				outlined dense
				label='Street Name'
				placeholder='Type street name...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 0px 0px 20px;'
			></v-text-field>
		</v-col>
	<!--street number-->
		<v-col>
			<v-text-field
				v-model='contact.doctor.streetCode'
				:rules='[validate.required]'
				outlined dense
				label='Street Number'
				placeholder='Type street number...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 20px 0px 0px;'
			></v-text-field>
		</v-col>
	</v-row>
	<v-row>
	<!--post code--> 
		<v-col>
			<v-text-field 
				v-model='contact.doctor.postCode'
				:rules='[validate.required]'
				outlined dense
				label='Post Code'
				placeholder='Type post code...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 0px -20px 20px;'
			></v-text-field>
		</v-col>
	<!--city-->
		<v-col>
			<v-text-field
				v-model='contact.doctor.city'
				:rules='[validate.required]'
				outlined dense
				label='City'
				placeholder='Type city...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 20px -20px 0px;'
			></v-text-field>
		</v-col>
	</v-row>
		</v-expansion-panel-content>
	</v-expansion-panel>
<!--bank-->
	<v-expansion-panel flat=true accordion=true popout=true>
        <v-expansion-panel-header hide-actions class='deep-orange darken-2' style='padding-top: 0px; padding-bottom: 0px;border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;'>
			<span class='header02'>
				<v-icon dark left>savings</v-icon>Bank
			</span>
        </v-expansion-panel-header>
		<v-expansion-panel-content>
<!--label-->
	<span style='margin: 20px 0px 0px 20px;' class='header02'>Bank:</span>
	<v-row>
	<!--RABOBANK--> 
		<v-col>
			<v-text-field 
				v-model='contact.bank.rabobank'
				:rules='[validate.required]'
				outlined dense
				label='RABOBANK#'
				placeholder='Type RABOBANK...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 0px 0px 0px 20px;'
			></v-text-field>
		</v-col>
	<!--IBAN-->
		<v-col>
			<v-text-field
				v-model='contact.bank.iban'
				:rules='[validate.required]'
				outlined dense
				label='IBAN#'
				placeholder='Type IBAN...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: 0px 20px 0px 0px;'
			></v-text-field>
		</v-col>
	</v-row>
	<v-row>
	<!--BIC--> 
		<v-col>
			<v-text-field
				v-model='contact.bank.bic'
				:rules='[validate.required]'
				outlined dense
				label='BIC#'
				placeholder='Type BIC...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 0px -20px 20px;'
			></v-text-field>
		</v-col>
	<!--KVK-->
		<v-col>
			<v-text-field
				v-model='contact.bank.kvk'
				:rules='[validate.required]'
				outlined dense
				label='KVK#'
				placeholder='Type KVK...'
				autocomplete="off"
				type="text"
				color='rgba(77, 187, 64, 1.0)'
				background-color= 'yellow lighten-4'
				style='margin: -20px 20px -20px 0px;'							
			></v-text-field>
		</v-col>
	</v-row>		
		</v-expansion-panel-content>
	</v-expansion-panel>
</v-expansion-panels>
</v-card>
</v-col>
</v-row>
</v-form>			
<!--footer-->
<v-footer class="deep-orange" style='border-top-left-radius: 0px; border-top-right-radius: 0px; '>
<v-row  justify="center" style='padding: 10px 10px 10px 10px;'>
<!--grand total-->
	<span class='title' style='color: white; font-weight: bold;'>GRAND TOTAL =</span>
	<v-btn
		style='width: 200px; margin: 0px 10px 0px 10px; background-color: white; font-weight: bold; color: orangered;'
		elevated dense
		elevation = '2'
		readonly
	>{{getFriendlyTotal(this.cards)}} &euro;
	</v-btn>
<!--invoice count-->
	<span class='title' style='color: white; font-weight: bold;'>INVOICE COUNT# =</span>
	<span style='width: 200px;'>
		<v-text-field
			v-model='invoiceCount'
			solo dense hide-details
			placeholder='Type count#...'
			autocomplete="off"
			type="number"
			background-color= 'white'
			style='font-weight: bold; margin: 0px 10px 0px 10px;'
		></v-text-field>
	</span>
<!--invoice id#-->
	<span class='title' style='color: white; font-weight: bold;'>INVOICE ID# =</span>
	<span style='width: 200px;'>
		<v-text-field
			v-model='invoiceId'
			solo dense hide-details
			placeholder='Type id#...'
			autocomplete="off"
			type="text"
			background-color= 'white'
			style='font-weight: bold; margin: 0px 20px 0px 10px;'
		></v-text-field>
	</span>
<!--udpate quote button-->
	<v-btn 
		style='width: 200px; margin: 0px 20px 0px 0px; color: orangered; font-weight: bold;'
		dense color='yellow accent-2'
		@click='downloadPdf()'>
		<v-icon dark left>arrow_circle_down</v-icon>
		Download PDF
	</v-btn>
	</v-row>
</v-footer>
</v-card>
</div>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
	import jsPDF  from "jspdf";
//master
	export default {
//name
	name: 'users',
//components
	components: {
	},
//on load
	async created(){
	//authenticate
		let fields = document.cookie.split('+');
		if(fields && fields.length && fields[0] != 'user'){
			this.$router.push({ path: '/login'});
		}
	//get user
		this.userId = this.$route.params.id; //id from url
	//get user data
		let params = {userId: this.userId};
		let data = await bridge.getData(params);
	//bind
		if(data){
			if(Object.keys(data.cards).length > 0){
				this.cards = data.cards;
			}
			if(Object.keys(data.contact).length > 0){
			//bind data
				this.contact = data.contact;
			//sort clients
				this.contact.clients.sort((a, b) => a.id.localeCompare(b.id));
			}
		}
	//update invoice numbers
		this.updateInvoiceNumbers();
	},
//custom methods
	methods: {
	//update invoice numbers
		async updateInvoiceNumbers(){
		//get invoice id
			let result = await bridge.getInvoiceCount();
			this.invoiceCount = result.invoiceCount.toString();
		},
	//update invoice id
		updateInvoiceId(){
			this.invoiceId = this.invoiceCount;
			while(this.invoiceId.length < this.charCap){
				this.invoiceId = `0` + this.invoiceId;
			}
			let prefix = new Date().getFullYear();
			this.invoiceId = `${prefix}${this.invoiceId}`;
		},
	//validate page
		validateContact(){
		//init
			let isValid = true;
			let keys = [];
		//check that clients exist
			if(this.contact.clients.length <= 0){
				toastr.error(`At least one client is required in the book!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return false;
			}
		//check client
			keys = Object.keys(this.contact.clients[this.contact.clientIndex]);
			keys.forEach(field => {
				if(this.validate.required(this.contact.clients[this.contact.clientIndex][field]) != true){
					toastr.error(`Client field [${this.friendlies[field]}] is required!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					isValid = false; 
				}
				if(field == 'email'){
					if(this.validate.email(this.contact.clients[this.contact.clientIndex][field]) != true){
						toastr.error(`Client field [${this.friendlies[field]}] is not in x@x.com format!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
						isValid = false; 
					}
				}
			});
		//check doctor
			keys = Object.keys(this.contact.doctor);
			keys.forEach(field => {
				if(this.validate.required(this.contact.doctor[field]) != true){
					toastr.error(`Doctor field [${this.friendlies[field]}] is invalid!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					isValid = false; 
				}
				if(field == 'email'){
					if(this.validate.email(this.contact.doctor[field]) != true){
						toastr.error(`Doctor field [${this.friendlies[field]}] is not in x@x.com format!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
						isValid = false; 
					}
				}
			});
		//check bank
			keys = Object.keys(this.contact.bank);
			keys.forEach(field => {
				if(this.validate.required(this.contact.bank[field]) != true){
					toastr.error(`Bank field [${this.friendlies[field]}] is invalid!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					isValid = false; 
				}
			});
		//return
			return isValid;
		},
	//zero empties
		zeroEmpties(){
		//reset empties to zeroes
			this.cards.forEach((a, ai) => {
			//consultations
				this.cards[ai].consultations.rate = this.zeroEmpty(a.consultations.rate);
			//commutes
				this.cards[ai].commutes.km = this.zeroEmpty(a.commutes.km);
				this.cards[ai].commutes.rate = this.zeroEmpty(a.commutes.rate);
			//house calls
				this.cards[ai].houseCalls.km = this.zeroEmpty(a.houseCalls.km);
				this.cards[ai].houseCalls.rate = this.zeroEmpty(a.houseCalls.rate);
			});
		},
	//zero empty
		zeroEmpty(value){
			if(value == '' || value == null || isNaN(value) || value < 0){
				return 0;
			}else{
				return Math.round(value * 100) / 100; //round to 2
			}
		},
	//logout of page
		logout(){
		//clear cookie
			document.cookie = 'null';
		//re-direct to login page
			this.$router.push({ path: '/login'});
		//notify
			toastr.success('Logged out successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
		closeTimePicker(value, index, type, picker){
		//hide modal(must be before timeout)
			this.cards[index].consultations[picker] = false;
		//set value(must be inside time-out)
			setTimeout(() => {	
				this.cards[index].consultations[type] = value;
			}, 0);			
		},
		selectedClientChanged(){
		//	this.contact.clientId = ;
		},
	//add jumps
		addCard(){
		//main fields
			let card = {
				date: this.getNow(),
				consultations : {
					showStartPicker: false,
					showEndPicker: false,
					start: "00:00",
					end: "00:00",
					hours: 0.00,
					rate: 0.00
				}, commutes : {
					km: 0.00,
					rate: 0.00
				}, houseCalls: {
					km: 0.00,
					rate: 0.00
				}
			};
		//temp fields
			card.showDatePicker = false;
			card.dateFormatted = this.formatDate(this.getNow());
		//push to global
			this.cards.push(card);
		//notify
			toastr.success('Card added successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//sort cards
		sortCards(){
			this.cards.sort((a, b) => a.date.localeCompare(b.date));
		},
	//delete card
		deleteCard(event, index){
		//required to avoid collapsing/expanding
			event.stopPropagation();
			event.preventDefault();
		//remove card from cards
			this.cards.splice(index, 1);
		//notify
			toastr.success('Card deleted successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//reset all fields
		clearContact(){
		//reset clients
			let tempClients = JSON.parse(JSON.stringify(this.contact.clients));
			let tempClient = JSON.parse(JSON.stringify(this.contact.clients[this.contact.clientIndex]));
			this.resetKeys(tempClient, '');
			this.contact.clients = tempClients;
			this.contact.clients[this.contact.clientIndex] = tempClient;
		//reset doctor
			this.resetKeys(this.contact.doctor, '');
		//reset bank
			this.resetKeys(this.contact.bank, '');		
		//notify
			toastr.success('Contact cleared successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});	
		},
	//clear all cards
		deleteCards(){
		//clear cards
			this.cards = [];
		//notify
			toastr.success('Card(s) deleted successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			},
	//toggle the width of the col
		toggleColSize(){
			this.isLeftLong = !this.isLeftLong;
			if(this.isLeftLong){
				let temp = this.colSize.right;
				this.colSize.right = this.colSize.left;
				this.colSize.left = temp;
			} else{
				let temp = this.colSize.left;
				this.colSize.left = this.colSize.right;
				this.colSize.right = temp;
			}
		},
	//reset all keys
		resetKeys(object, value){
			let keys = Object.keys(object);
			keys.forEach(field => {
				object[field] = value;	
			});
		},
	//validate and condition data as necessary
		conditionData(){
		//validate contact information
			if(!this.validateContact()){
				return false;
			}
		//validate cards by assigning zero to empties
			this.zeroEmpties();
		//make sure end time is after start time
			let hasTimeError = false;
			this.cards.forEach((a, ai) => {
				let diff = this.getHours(a.consultations.start, a.consultations.end);
				if(diff < 0){
					toastr.error(`Card#<span style='color: yellow; font-weight: bolder;'>${ai + 1}</span> has an end time that is before its start time!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
					hasTimeError = true;
				}
			});
			if(hasTimeError){
				return false;
			}
		//condition invoiceCount
			if(!this.invoiceCount || this.validate.number(this.invoiceCount) != true){
				toastr.error(`The provided invoice count# is not valid!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return false;
			}
		//condition invoiceId
			if(!this.invoiceId){
				toastr.error(`The provided invoice id# is required!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
				return false;
			}
		//return pass
			return true;
		},
	//save all
		async saveAll(){
		//condition data
			if(!this.conditionData()){
				return false;
			}
		//get params
			let params = {
				userId: this.userId,
				cards: this.cards,
				contact: this.contact
			}
		//delete temp vars
			this.cards.forEach(a => {
				delete a.showDatePicker;
				delete a.dateFormatted;
				delete a.consultations.showStartPicker;
				delete a.consultations.showEndPicker;
			});
		//save data
			await bridge.saveData(params);
		//notify
			toastr.success('Card(s) saved successfully!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		},
	//control phone#
		controlPhone() {
			if(this.contact.phone){
				let x = this.contact.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				this.contact.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
			}
		},
	//download pdf and send email
		async downloadPdf(){
		//validate contact
			if(!this.conditionData()){
				return false;
			};
		//validate cards
			if(this.cards.length == 0){
			//notify
				toastr.error('No cards were added!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});	
				return false;
			}
		//get secondary id
			//truncate zip
				let truncateZip = this.contact.clients[this.contact.clientIndex].postCode.substring(0, 4);
			//truncate street code
				//remove numbers
					let rawStreetCode = this.contact.clients[this.contact.clientIndex].streetCode;
					let streetCodeNumbers = rawStreetCode.match(/\d/g);
					let truncateStreetCode = streetCodeNumbers.join("");
				//make 4 chars
					if(truncateStreetCode.length < this.charCap){
						while(truncateStreetCode.length < this.charCap){
							truncateStreetCode = `0` + truncateStreetCode;
						}
					}
			let secondaryId = `${truncateZip}${truncateStreetCode}`;
		//save pdf
			//init
				//setup
					let options = {
						orientation: 'p',
						unit: 'px',
						format: 'letter',
						compress:true
					};
					let pdf = new jsPDF(options);
					let image = new Image();
				//formatting
					let pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
					let pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
					let margin = 40;
					let newLine = 15;
					let text = ``;
					let verticalBuild = margin;
					let footerBuild = 0;
					let retainLine = 0;
				//dates
					let now = moment().format('DD/MM/YYYY');
					let due = moment().add(7, 'days').format('DD/MM/YYYY');
			//build page structure
				//init
					let remainingCards = this.cards.length;
					let firstBreak = 4;
					let secondBreak = 6;
					let thirdBreak = 7;
					let pages = [];
				//1 page doc
					if(this.cards.length <= firstBreak){
						pages.push({
							start: 0,
							end: this.cards.length
						});
					}
				//1+ page doc
					else {
					//1st page
						pages.push({
							start: 0,
							end: firstBreak
						});
						remainingCards -= firstBreak;
					//other pages
						while(remainingCards > 0){
						//end page
							if(remainingCards <= secondBreak){
							//push page
								pages.push({
									start: this.cards.length - remainingCards,
									end: this.cards.length
								});
							//update remaining
								remainingCards = 0;
							}
						//intermittent pages
							else{
							//push page
								pages.push({
									start: this.cards.length - remainingCards,
									end: this.cards.length - remainingCards + thirdBreak
								});
							//update remaining
								remainingCards -= thirdBreak;
							}
						}
					//add another page if cards filled page
						let lastCardCount = pages[pages.length - 1].end - pages[pages.length - 1].start;
						if(lastCardCount == thirdBreak){
							pages.push({
								isBlank: true
							});
						}
					}
			//build pages
				for(let i = 0; i < pages.length; i++){
				//if first page
					if(i == 0){
					//title
						//add logo
							image.src = 'kievit.jpg';
							let imageSize = 25;
							let xPos = (pageWidth / 2) - (imageSize / 2);
							pdf.addImage(image, 'jpg', xPos, verticalBuild - margin / 2, imageSize, imageSize); // x, y, width, height				
						//add title
							this.setFont(pdf, 'fontHeader');
							text = `Waarnemend Huisarts K.M.M.Kievit`;
							verticalBuild += 25;
							pdf.text(text, pageWidth / 2, verticalBuild, {align: 'center'});
//header block+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						//client name
							this.setFont(pdf, 'fontHeader');
							text = `Huisarts:`;
							verticalBuild += newLine * 2;
							retainLine = verticalBuild;
							pdf.text(text, margin, verticalBuild, {align: 'left'});	
						//client address
							this.setFont(pdf, 'fontDefault');
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `${this.contact.clients[this.contact.clientIndex].name}
${this.contact.clients[this.contact.clientIndex].streetName} ${this.contact.clients[this.contact.clientIndex].streetCode}
${this.contact.clients[this.contact.clientIndex].postCode} ${this.contact.clients[this.contact.clientIndex].city}
${this.contact.clients[this.contact.clientIndex].email}
`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
							verticalBuild += newLine;
							pdf.text(text, margin, verticalBuild, {align: 'left'});	
						//factuur block
							//title
								this.setFont(pdf, 'fontHeader');
								text = `Factuur:`;
								pdf.text(text, margin + pageWidth - 205, retainLine, {align: 'left'});	
							//information
								this.setFont(pdf, 'fontDefault');
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************	
text = `
Debiteurnummer: ${secondaryId}
Factuurnummer: ${this.invoiceId}
Factuurdatum: ${now}`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					//bind
						pdf.text(text, margin + pageWidth - 205, retainLine + 5, {align: 'left'});						
					//break line
						pdf.setLineDash([4, 4], 0);
						verticalBuild += newLine * 3;
						pdf.line(margin, verticalBuild, pageWidth - margin, verticalBuild); //x1, y1, x2, y2
					//intro to content
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************	
text = `Geachte mevrouw/mijnheer,

Hierbij brengen wij u het onderstaande in rekening:`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					//bind
						verticalBuild += newLine;
						pdf.text(text, margin, verticalBuild, {align: 'left'});
					}//end first page
//table block+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					if(!pages[i].isBlank){
					//init
						pdf.setLineDash(0); //change back to solid line
						this.setFont(pdf, 'fontDefault');
						let rows = [];
					//build cards
						//start loop
						for(let j = pages[i].start; j < pages[i].end; j++){
						//consulting time
							rows.push({
								Datum: `${this.formatDate(this.cards[j].date)}`,
								Aantal: `${this.eurofy(this.getHours(this.cards[j].consultations.start, this.cards[j].consultations.end))} hr(${this.cards[j].consultations.start}-${this.cards[j].consultations.end})`,
								Omschrijving: `Basisuren`,
								Tarief: `${this.eurofy(this.cards[j].consultations.rate)} EUR/hr`,
								Totaal: `${this.eurofy(this.getHours(this.cards[j].consultations.start, this.cards[j].consultations.end) * this.cards[j].consultations.rate)} EUR`
							});
						//commuting distance
							rows.push({
								Datum: `${this.formatDate(this.cards[j].date)}`,
								Aantal: `${this.eurofy(this.cards[j].commutes.km)} km(woon-werk)`,
								Omschrijving: `Reiskosten in km`,
								Tarief: `${this.eurofy(this.cards[j].commutes.rate)} EUR/km`,
								Totaal: `${this.eurofy(this.cards[j].commutes.km * this.cards[j].commutes.rate)} EUR`
							});
						//house call distance
							rows.push({
								Datum: `${this.formatDate(this.cards[j].date)}`,
								Aantal: `${this.eurofy(this.cards[j].houseCalls.km)} km(visite)`,
								Omschrijving: `Reiskosten in km`,
								Tarief: `${this.eurofy(this.cards[j].houseCalls.rate)} EUR/km`,
								Totaal: `${this.eurofy(this.cards[j].houseCalls.km * this.cards[j].houseCalls.rate)} EUR`
							});
						//house call distance
							rows.push({
								Datum: ``,
								Aantal: ``,
								Omschrijving: ``,
								Tarief: ``,
								Totaal: ``
							});	
						}
					//build headers
						let colWidth = 100;
						let headers = [{
							'name': 'Datum',
							'prompt': 'Datum',
							'width': 75,
							'align': 'left',
							'padding': 0
							}, {
							'name': 'Aantal',
							'prompt': 'Aantal',
							'width': 130,
							'align': 'left',
							'padding': 0
							},{
							'name': 'Omschrijving',
							'prompt': 'Omschrijving',
							'width': colWidth,
							'align': 'left',
							'padding': 0
							},{
							'name': 'Tarief',
							'prompt': 'Tarief',
							'width': colWidth,
							'align': 'left',
							'padding': 0
							},{
							'name': 'Totaal',
							'prompt': 'Totaal',
							'width': colWidth,
							'align': 'left',
							'padding': 0
							}];
					//update vertical build
						verticalBuild += newLine * 2;
					//if it has more cards to print on another page, add space to make it more centered
						if(pages.length > 1){
							verticalBuild += 27;
						}
					//if it's on a future page, reset page and build
						if(i > 0){
							pdf.addPage();
							verticalBuild = margin;
						}
					//bind table
						pdf.table(margin, verticalBuild, rows, headers, {fontSize: 10});
					}
//total block+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					if(i == pages.length - 1){
						if(pages[i].isBlank){
							pdf.addPage();
							verticalBuild = margin;
						}else{
							let pageCardCount = pages[i].end - pages[i].start;
							let factor = 4.9
							let cardLines = (factor * pageCardCount * newLine) - (newLine * (pageCardCount - 1)); //have no idea y this works but does so don't touch it
							verticalBuild += cardLines;
						}
					//total title
						this.setFont(pdf, 'fontHeader');
						text = `Totaal bedrag = ${this.eurofy(this.total)} EUR`;					
						pdf.text(text, margin, verticalBuild, {align: 'left'});	
					//conclusion	
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************	
text = `
Betaling van deze nota dient binnen 14 dagen na ontvangst te geschieden op banknummer
(IBAN) ${this.contact.bank.iban} t.n.v. K.M.M. Kievit o.v.v. factuurnummer ${this.invoiceId}`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					//update font
						this.setFont(pdf, 'fontDefault');
					//bind
						pdf.text(text, margin, verticalBuild + 5, {align: 'left'});
					}
//footer block+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++(must be before table because it .addPage() messes things up)
				//break line
					this.setFont(pdf, 'fontHeader');
					pdf.setLineDash([4, 4], 0);
					footerBuild = pageHeight - 110;
					pdf.line(margin, footerBuild, pageWidth - margin, footerBuild); //x1, y1, x2, y2
				//add footer
					//doctor address
						//title
							this.setFont(pdf, 'fontHeader');
							text = `Postadres:`;
							footerBuild += newLine + 5;
							retainLine = footerBuild;
							pdf.text(text, margin, footerBuild, {align: 'left'});	
						//information
							this.setFont(pdf, 'fontDefault');
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************	
text = `${this.contact.doctor.name}
${this.contact.doctor.streetName} ${this.contact.doctor.streetCode}
${this.contact.doctor.postCode} ${this.contact.doctor.city}
${this.contact.doctor.email}
`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					//bind
						footerBuild += newLine;
						pdf.text(text, margin, footerBuild, {align: 'left'});	
					//bank info
						//title
							this.setFont(pdf, 'fontHeader');
							text = `Bank:`;
							pdf.text(text, margin + pageWidth - 205, retainLine, {align: 'left'});	
						//information
							this.setFont(pdf, 'fontDefault');
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************	
text = `
RABOBANK#: ${this.contact.bank.rabobank}
IBAN#: ${this.contact.bank.iban}
BIC#: ${this.contact.bank.bic}
KVK#: ${this.contact.bank.kvk}`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
						//bind
							pdf.text(text, margin + pageWidth - 205, retainLine + 5, {align: 'left'});	
					//invoice id
						this.setFont(pdf, 'fontFooter');
						text = `${this.invoiceId} / ${secondaryId}`;
						pdf.text(text, margin, pageHeight - 25, {align: 'left'});
					//page number
						this.setFont(pdf, 'fontFooter');
						text = `pagina ${i + 1} of ${pages.length}`;
						pdf.text(text, pageWidth - margin - 45, pageHeight - 25, {align: 'left'});
				}//end page build loop
			//download pdf
				pdf.save(`KK#${this.invoiceId}.pdf`);
			//save new invoice count
				this.invoiceCount++;
				let params = {
					invoiceCount: this.invoiceCount
				}
				await bridge.saveInvoiceCount(params);
			//update invoice numbers
				this.updateInvoiceNumbers();
		},
	//pdf helpers
		setFont(pdf, type){
			if(type == 'fontHeader'){//bold large gray
				pdf.setFont('Helvetica', 'bold');
				pdf.setTextColor(101, 107, 110);
				pdf.setFontSize(14);
			}else if(type == 'fontFooter'){//normal 
				pdf.setFont('Helvetica', 'bold');
				pdf.setTextColor(150,150,150);
				pdf.setFontSize(10);
			}else if(type == 'fontDefault'){//default font
				pdf.setFont('Helvetica', 'normal');
				pdf.setTextColor(86,91,97);
				pdf.setFontSize(12);
			}else if(type == 'fontBlue'){//bold large blue
				pdf.setFont('Helvetica', 'bold');
				pdf.setTextColor(0, 123, 255);
				pdf.setFontSize(14);
			}else if(type == 'fontSmall'){//bold large blue
				pdf.setFont('Helvetica', 'normal');
				pdf.setTextColor(86,91,97);
				pdf.setFontSize(10);
			}
		},
	//get default date
		getNow(){
			let today = new Date();
			let delay = 0; // 0 delay
			today.setDate(today.getDate() + delay);
			return today.toISOString().substr(0, 10);
		},    
	//format date to people friendly
		formatDate (date) {
			if (!date) return null;
			let [year, month, day] = date.split('-')
			return `${day}-${month}-${year}`
		},
	//format date to picker friendly
		parseDate (date) {
			if (!date) return null
			let [day, month, year] = date.split('-')
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		},
	//replace commas with periods and vice-versa
		eurofy(value){
			value = Math.round(value * 100) / 100; //round to 2(required for totals)
			return value.toLocaleString('de-DE', { maximumFractionDigits : 2, minimumFractionDigits : 2 }).toString();
		},
	//getFriendlyTotal
		getFriendlyTotal(cards){
			if(cards){
				let friendly = 0.00;
				cards.forEach(card => {
					friendly += this.getHours(card.consultations.start, card.consultations.end) * card.consultations.rate;
					friendly += card.commutes.km * card.commutes.rate;
					friendly += card.houseCalls.km * card.houseCalls.rate;
				});
				this.total = friendly;
				return this.displayTwoDecimals(friendly);
			}
		},
//add commas on sets of 3 digits
	displayTwoDecimals(value){
		//return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' , maximumFractionDigits : 2, minimumFractionDigits : 2 });
		return value.toLocaleString('en-US', {maximumFractionDigits : 2, minimumFractionDigits : 2 });
	},
//get hours between 2 values
	getHours(start, end){
		let startArray = start.split(':');
		let endArray = end.split(':');
		let startHour = parseInt(startArray[0]) + parseInt(startArray[1]) / 60;
		let endHour = parseInt(endArray[0]) + parseInt(endArray[1]) / 60;
		let diff = endHour - startHour;
		if(endHour == 0 && diff < 0){
			diff = 24 - startHour;
		}
		return diff;
	},
//add client
	addClient(){
	//check for empty
		if(!this.newClient){
			toastr.error('New client id is missing!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			return false;
		}
	//check for existing
		else if(this.contact.clients.some(a => a.id == this.newClient)){
			toastr.error('New client id already exists!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			return false;
		}
	//add client
		this.contact.clients.unshift({
			id: this.newClient,
			name: '',
			email: '',
			streetName: '',
			streetCode: '',
			postCode: '',
			city: ''
		});
	//contact
		this.contact.clientId = this.newClient;
		this.newClient = '';		
	//notify
		toastr.success(`Client added successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
	},
//delete client
	deleteClient(){
		if(this.contact.clients.length < 1){
			toastr.error(`There are no clients to delete!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			return false;
		}else{
			this.contact.clients.splice(this.contact.clientIndex, 1);
			this.contact.clientId = this.contact.clients[0].id;
			toastr.success(`Client deleted successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
		}
	}
}, 
//used for picker to update dynamically
	watch: {
		'cards':  {
			deep: true,
			handler: function(){
				this.cards.forEach((a, ai) => {
					this.cards[ai].dateFormatted = this.formatDate(this.cards[ai].date);
				});
			}
		}, 'contact.clientId':  {
			handler: function(){
				this.contact.clientIndex = this.contact.clients.findIndex(a => a.id == this.contact.clientId);
			}
		}, 'invoiceCount':  {
			handler: function(){
				this.updateInvoiceId();
			}
		}
	},
//global variables
	data: global => ({
		userId: '',
		invoiceId: '',
		invoiceCount: '',
		cards: [],
		total: 0.00,
		charCap: 4,
		isLeftLong: true,
		colSize: {
			left: 'pt-4 pr-4 pb-4 pl-4 col-md-8',
			right: 'pt-4 pr-4 pb-4 pl-4 col-md-4'
		},
		newClient: '',
		contact: {
			clientId: 'Default',
			clientIndex: 0, 
			doctor: {
				name: '',
				email: '',
				streetName: '',
				streetCode: '',
				postCode: '',
				city: ''
			}, bank: {
				rabobank: '',
				iban: '',
				bic: '',
				kvk: ''
			},  clients: [{
				id: 'Default',
				name: '',
				email: '',
				streetName: '',
				streetCode: '',
				postCode: '',
				city: ''
			}]
		},
	  	friendlies: {
			name: 'Name',
			email: 'E-mail',
			streetName: 'Street Name',
			streetCode: 'Street Code',
			postCode: 'Post Code',
			city: 'City',
			rabobank: 'RABOBANK#',
			iban: 'IBAN#',
			bic: 'BIC#',
			kvk: 'KVK#'
	  	},
		showTimePicker: false,
		modal2: false,
		validate: {
			required: a => !!a || 'Entry is missing!',
			number: a => !isNaN(a) || 'Entry is not a number!',
			email: a => {        
				let regex = new RegExp(/.+@.+\..+/);
				return regex.test(a) || 'Email is not in x@x.x format!';
			}
		}
	})
}
</script>