<template>
<v-app>
<div class='splashBackground'>
<!--master page-->	
<v-card style='margin:30px 30px auto 30px; height: calc(100vh - 200px);'> 
<!--banner-->
<v-card-title
	class='headline primary'
	primary-title 
	style='color: white;'>
<!--title-->
	<v-icon dark left>monetization_on</v-icon>
	Quote
<!--reset button-->
	<v-btn 
		style='position: absolute; right: 280px; width: 110px;'
		dense dark color='error' 
		@click='reset()'>
		<v-icon dark left>power_settings_new</v-icon>
		Reset
	</v-btn>
<!--save button-->
	<v-btn 
		style='position: absolute; right: 150px; width: 110px;'
		dense dark color='info' 
		@click='saveData()'>
		<v-icon dark left>save</v-icon>
		Save
	</v-btn>
<!--logout button-->
	<v-btn 
		style='position: absolute; right: 20px; width: 110px;'
		dense dark color='info' 
		@click='logout()'>
		<v-icon dark left>logout</v-icon>
		Logout
	</v-btn>
</v-card-title>
<!--content-->
<v-form ref='form' lazy-validation style='background-color: #94d1ff; height: 100%;'>
	<v-row no-gutters>
<!--1st card-->
	<v-col class="pt-4 pr-2 pb-4 pl-4">
	<v-card style='height: calc(100vh - 230px);' v-on:keyup.enter='updateQuote()'>
	<!--title-->
		<v-card-title class="subheading font-weight-bold primary--text" style='background-color: #d2f4ff; text-color'>
			<i class='fa fa-fw fa-cube'></i>&nbsp;Component(s)
		</v-card-title>
	<!--divider-->
		<v-divider style='margin:0px; border-color: #aae2ff;'></v-divider>
	<!--content-->
		<!--switch boards-->
		<v-text-field
			style='margin: 20px 20px -10px 20px;'
			label='Switch Boards'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.switchBoards'
		></v-text-field>
		<!--panel boards-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Panel Boards'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.panelBoards'
		></v-text-field>
		<!--transformers-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Transformers'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.transformers'
		></v-text-field>
		<!--disconnect switches-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Disconnect Switches'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.disconnectSwitches'
		></v-text-field>
		<!--enclosed circuit breakers-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Enclosed Circuit Breakers'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.enclosedCircuitBreakers'
		></v-text-field>
		<!--motors over 30hp-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Motors(>30hp)'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.motorsOver30Hp'
		></v-text-field>
		<!--generators-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Generators'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.generators'
		></v-text-field>			
		<!--automatic transfer switches-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Automatic Transfer Switches(ATS)'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.automaticTransferSwitches'
		></v-text-field>		
		<!--motor control centers-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Motor Control Centers(MCC)'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.motorControlCenters'
		></v-text-field>		
		<!--universal power supplies-->
		<v-text-field
			style='margin: 0px 20px -10px 20px;'
			label='Universal Power Supplies(UPS)'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.universalPowerSupplies'
		></v-text-field>
		</v-card>
	</v-col>
<!--2nd card-->
	<v-col class="pt-4 pr-2 pb-4 pl-2">
	<v-card style='height: calc(100vh - 230px);'>
	<!--title-->
		<v-card-title class="subheading font-weight-bold primary--text" style='background-color: #d2f4ff;'>
			<i class='fa fa-fw fa-cubes'></i>&nbsp;Option(s)
		</v-card-title>
	<!--divider-->
		<v-divider style='margin:0px; border-color: #aae2ff;'></v-divider>
	<!--content-->
		<!--arc flash study-->	
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isArcFlashStudy'
				label="Arc Flash Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--short circuit study-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isShortCircuitStudy'
				label="Short Circuit Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--coordination study-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isCoordinationStudy'
				label="Coordination Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--arc flash labels-->	
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isArcFlashLabels'
				label="Arc Flash Labels"
				color="primary"
				hide-details
			></v-checkbox>
		<!--harmonic study-->	
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isHarmonicStudy'
				label="Harmonic Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--motor start study-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isMotorStartStudy'
				label="Motor Start Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--load study-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isLoadFlowStudy'
				label = 'Load Flow Study'
				color="primary"
				hide-details
			></v-checkbox>
		</v-card>
	</v-col>
<!--3rd row-->
<v-col class="pt-4 pr-2 pb-4 pl-2">
	<v-card style='height: calc(100vh - 230px);'>
	<!--title-->
		<v-card-title class="subheading font-weight-bold primary--text" style='background-color: #d2f4ff;'>
			<i class='fa fa-fw fa-paper-plane'></i>&nbsp;Delivery
		</v-card-title>
	<!--divider-->
		<v-divider style='margin:0px; border-color: #aae2ff;'></v-divider>
	<!--content-->
		<!--training-->	
		<v-checkbox
			style='margin: 20px'
			v-model = 'isTraining'
			label="Arc Flash Training Required"
			color="primary"
			hide-details
		></v-checkbox>
	<!--deadline date picker-->
	<v-layout style='margin: 20px;'>
		<v-menu
			ref='menu'
			v-model='menu'
			:close-on-content-click='false'
			:nudge-right='0'
			transition='scale-transition'
			offset-y
			max-width='290px'
			min-width='290px'
		>
			<template v-slot:activator='{ on }'>
			<v-text-field
				append-icon='event'
				outlined
				readonly
				v-model='dateFormatted'
				label='Deadline'
				hint='MM-DD-YYYY format'
				persistent-hint
				@blur='deadline = parseDate(dateFormatted)'
				v-on='on'
			></v-text-field>
			</template>
			<v-date-picker v-model='deadline' no-title @input='menu = false'></v-date-picker>
		</v-menu>
	</v-layout>
	<!--special instructions-->
	<v-textarea
	auto-grow
	style='margin: 20px;'
	name="input-7-1"
	label="Special Instructions"
	placeholder='Type special instructions...'
	v-model='specialInstructions'
	@keyup="controlTextarea"
	outlined
	></v-textarea>
	</v-card>
</v-col>
<!--4th card-->
<v-col style='' class="pt-4 pr-4 pb-4 pl-2">
<!--<v-card style='width: calc(65vh); height: calc(100vh - 230px)'>--><!--DON'T DELETE-->
<v-card style='height: calc(100vh - 230px)'>
<!--title-->
	<v-card-title class="subheading font-weight-bold primary--text" style='background-color: #d2f4ff;'>
		<i class='fa fa-fw fa-user-circle'></i>&nbsp;Project
	</v-card-title>
<!--divider-->
	<v-divider style='margin:0px; border-color: #aae2ff;' ></v-divider>
<!--content-->
	<!--contact name-->
		<v-text-field
			style='margin: 20px 20px 0px 20px;'
			label='Project Name'
			dense
			:rules='[validate.required]'
			placeholder='Type contact name...'
			outlined
			autocomplete="off"
			v-model='contact.project'
		></v-text-field>
		<v-divider style='margin:0px; border: 1px solid #ededed;'></v-divider>
	<v-row>
	<!--first name--> 
		<v-col>
			<v-text-field 
				style='margin: 10px 0px 0px 20px;'
				label='First Name'
				dense
				:rules='[validate.required]'
				placeholder='Type first name...'
				outlined
				autocomplete="off"
				v-model='contact.firstName'
			></v-text-field>
		</v-col>
	<!--last name-->
		<v-col>
			<v-text-field
				style='margin: 10px 20px 0px 0px;'
				label='Last Name'
				dense
				:rules='[validate.required]'
				placeholder='Type last name...'
				outlined
				autocomplete="off"
				v-model='contact.lastName'
			></v-text-field>
		</v-col>
	</v-row>
	<!--company-->
		<v-text-field
			style='margin: -10px 20px 0px 20px;'
			label='Company'
			dense
			:rules='[validate.required]'
			placeholder='Type company name...'
			outlined
			autocomplete="off"
			v-model='contact.company'
		></v-text-field>
	<!--street address-->
		<v-text-field
			style='margin: 0px 20px 0px 20px;'
			label='Street Address'
			dense
			:rules='[validate.required]'
			placeholder='Type street address...'
			outlined
			autocomplete="off"
			v-model='contact.streetAddress'
		></v-text-field>
	<!--city-->
		<v-row>	
		<v-col>
			<v-text-field
				style='margin: -10px 0px 0px 20px;'
				label='City'
				dense
				:rules='[validate.required]'
				placeholder='Type city...'
				outlined
				autocomplete="off"
				v-model='contact.city'
			></v-text-field>
		</v-col>			
	<!--state-->
		<v-col>
			<v-text-field
				style='margin: -10px 0px 0px 0px;'
				label='State'
				dense
				:rules='[validate.required]'
				placeholder='Type state...'
				outlined
				autocomplete="off"
				v-model='contact.state'
			></v-text-field>
		</v-col>	
	<!--zip-->
		<v-col>
			<v-text-field
				style='margin: -10px 20px 0px 0px;'
				label='Zip'
				dense
				:rules='[validate.required, validate.number]'
				placeholder='Type zip...'
				outlined
				autocomplete="off"
				v-model='contact.zip'
			></v-text-field>
		</v-col>
		</v-row>		
	<!--phone-->
		<v-text-field
			style='margin: -10px 20px 0px 20px;'
			label='Phone'
			dense
			:rules='[validate.required, validate.phone]'
			placeholder='Type the 9 digits of (123)456-7890...'
			outlined
			autocomplete="off"
			v-model= "contact.phone"
			@keyup="controlPhone"
		></v-text-field>
	<!--email-->
		<v-text-field
			style='margin: 0px 20px 0px 20px;'
			label='Email'
			dense
			:rules='[validate.required, validate.email]'
			placeholder='Type email in format x@x.com...'
			outlined
			autocomplete="off"
			v-model='contact.email'
		></v-text-field>
	</v-card>
</v-col>
</v-row>
</v-form>			
<!--footer-->
<v-footer class="primary" style='border-top-left-radius: 0px; border-top-right-radius: 0px; '>
<v-row  justify="center" style='padding: 10px 10px 10px 10px;'>
<!--quote value-->
	<v-btn
		style='width: 200px; margin: 0px 10px 0px 10px; background-color: white;'
		dense
		outlined
		dark
		color="primary"
		readonly
	>{{getFriendlyQuote(this.quote)}}</v-btn>
<!--update quote button-->
	<v-btn 
		style='width: 200px; margin: 0px 10px 0px 10px;'
		dense  color='info' 
		@click='updateQuote()'>
		<v-icon dark left>loop</v-icon>
		Update Quote
	</v-btn>
<!--udpate quote button-->
	<v-btn 
		style='width: 200px; margin: 0px 20px 0px 10px;'
		dense dark color='success' 
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
import session from "../utils/session.js";
import jsPDF  from "jspdf";
//master
export default {
//name
name: 'users',
//components
components: {
	session
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
	if(data && Object.keys(data).length > 0){
		this.components = data.components;
		this.options = data.options;
		this.contact = data.contact;
		this.quote = data.quote;
		this.specialInstructions = data.specialInstructions;
		this.isTraining = data.isTraining;
	}
},
methods: {
//update the quote dollar
	updateQuote(){
	//zero empties
		this.zeroEmpties();
	//calculate
		//get counts
			let counts = 
			this.components.panelBoards + this.components.transformers + this.components.disconnectSwitches + this.components.generators + 
			this.components.automaticTransferSwitches + this.components.motorControlCenters + this.components.universalPowerSupplies;
		//components 
			//generator and ATS components raise price per component
			let unitCost = this.costs.components.standard;
			if(this.components.generators > 0 || this.components.automaticTransferSwitches > 0){
				unitCost = this.costs.components.premium;
			}
		//bank!
			let totalCost = counts * unitCost;
		//options
			let optionsCost = 0;
			//harmonic increases lump by 30%
			if(this.options.isHarmonicStudy){
				optionsCost += totalCost * this.costs.options.harmonic;
			}
			//motor start increases lump by 25%
			if(this.options.isMotorStartStudy){
				optionsCost += totalCost * this.costs.options.motor;
			}
			//load flow increases by 20%
			if(this.options.isLoadFlowStudy){
				optionsCost += totalCost * this.costs.options.loadFlow;
			}
			totalCost += optionsCost;
		//cap at minimum price
			if(totalCost <= this.costs.minimum){
				this.quote = this.costs.minimum;
			}else{
				this.quote = totalCost;
			}
		//deadline
			if(moment(this.deadline).isBefore(moment().add(14,'days'))){
				this.quote += this.costs.expedite;
			}
	//bind and round off
		this.quote = this.quote.toFixed(2);
	//notify
		toastr.info('Quote updated!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
	//return
		return true;
	},
//validate page
	validatePage(){
		if(!this.$refs.form.validate()){
			//notify
			toastr.error('Field(s) are invalid!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
			return false;
		}
		return true;
	},
//zero empties
	zeroEmpties(){
	//reset empties to zeroes
		let keys = Object.keys(this.components);
		keys.forEach(field => {
			if(this.components[field] == '' || this.components[field] == null || isNaN(this.components[field]) || this.components[field] < 0){
				this.components[field] = 0;
			};	
		});
	},
//logout of page
	logout(){
	//clear cookie
		document.cookie = 'null';
	//re-direct to login page
		this.$router.push({ path: '/login'});
	//notify
		toastr.info('Logged out!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
	},
//reset all fields
	reset(){
		this.resetKeys(this.components, 0);
		this.resetKeys(this.options, false);
		this.resetKeys(this.contact, '');
		this.deadline = this.getDefaultDate();
		this.specialInstructions = null;
		this.isTraining = false;
	},
//reset all keys
	resetKeys(object, value){
		let keys = Object.keys(object);
		keys.forEach(field => {
			object[field] = value;	
		});
	},
//save account
	async saveData(){
	//validate
		this.zeroEmpties();
		if(!this.validatePage()){
			return false;
		}
	//get params
		let params = {
			userId: this.userId,
			data: {
				components: this.components,
				options: this.options,
				contact: this.contact,
				isTraining: this.isTraining,
				specialInstructions: this.specialInstructions,
				quote: this.quote
			}
		}
	//save data
		await bridge.saveData(params);
	//notify
		toastr.success('Contact saved!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
	},
	//control phone#
	controlPhone() {
		if(this.contact.phone){
			let x = this.contact.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			this.contact.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
		}
	},
	//control textarea
	controlTextarea(){
		//get rid of carriage returns and multiple spaces
		this.specialInstructions = this.specialInstructions.replace(/[\n\r]+/g, ''); //replace carriage returns with dots
		this.specialInstructions = this.specialInstructions.replace(/\s{3,10}/g, ' '); //remove double white spaces
		//limit char count
		if(this.specialInstructions.length >= this.charLimit){
			this.specialInstructions = this.limitedSpecialInstructions;
		}else{
			this.limitedSpecialInstructions = this.specialInstructions;
		}
	},
//download pdf and send email
	async downloadPdf(){
	//update quote
		if(!this.validatePage()){
			return false;
		};
		this.updateQuote();
	//get quote number
		let result = await bridge.getQuoteCount();
		let quoteId = result.quoteId.toString();
		while(quoteId.length < 5){
			quoteId = `0` + quoteId;
		}
		let prefix = `KA#`;
		quoteId = `${prefix}${quoteId}`;
	//send email
		//build body
		let html = ``;
		let titleColor = `#007bff`;
		let subColor = `black`;
		//get components
			html += `<strong style='color: ${titleColor}'><u>Component(s)</u></strong>`;
			html += `<ul>`;
			let keys = Object.keys(this.components);
			let count = 0;
			keys.forEach(key => {
				if(this.components[key] > 0){
					count++;
					html += `<li><span style='color: ${subColor}'>${this.friendlyConverter[key]} Count = ${this.components[key]}</span></li>`;
				}
			});
			if(count <= 0){
				html += `<li><span style='color: ${subColor}'>[None Selected]</span></li>`;
			}
			html += `</ul>`;
		//get options
			html += `<strong style='color: ${titleColor}'><u>Option(s)</u></strong>`;
			html += `<ul>`;
			keys = Object.keys(this.options);
			count = 0;
			keys.forEach(key => {
				if(this.options[key]){
					count++;
					html += `<li><span style='color: ${subColor}'>${this.friendlyConverter[key]}</span></li>`;
				}
			});
			if(count <= 0){
				html += `<li><span style='color: ${subColor}'>[None Selected]</span></li>`;
			}
			html += `</ul>`;
		//get delivery
			html += `<strong style='color: ${titleColor}'><u>Delivery</u></strong>`;
			html += `<ul>`;
			//deadline
				html += `<li><span style='color: ${subColor}'>Deadline = ${this.formatDate(this.deadline).replace(/-/g, '/')}</span></li>`;
			//training
				if(this.isTraining){
					html += `<li><span style='color: ${subColor}'>Arc Flash Training Requested</span></li>`;
				}
			//instructions
				if(this.specialInstructions){
					html += `<li><span style='color: ${subColor}'>Special Instructions = ${this.specialInstructions}</span></li>`;
				}
			html += `</ul>`;
		//get contact
			html += `<strong style='color: ${titleColor}'><u>Contact</u></strong>`;
			html += `<ul>`;
			keys = Object.keys(this.contact);
			keys.forEach(key => {
				if(this.contact[key]){
				html += `<li><span style='color: ${subColor}'>${this.friendlyConverter[key]} = ${this.contact[key]}</span></li>`;
				}
			});
			html += `</ul>`;
		//build email object
			let email = {
				subject: `${quoteId} = ${this.userId} quoted $${this.quote}`,
				html: html
			};
		//send email
			await bridge.sendEmail(email);
	//save pdf
		//inits
			let options = {
				orientation: 'p',
				unit: 'px',
				format: 'letter',
				compress:true
			};
			let pdf = new jsPDF(options);
			let image = new Image();
			this.pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
			this.pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
			let margin = 40;
			let indent = 10;
			let newLine = 15;
			let wrapWidth = this.pageWidth - (margin * 2);
			let friendlyFirstName = this.contact.firstName.charAt(0).toUpperCase() + this.contact.firstName.slice(1);
			let friendlyLastName = this.contact.lastName.charAt(0).toUpperCase() + this.contact.lastName.slice(1);
			let text = ``;
			let wrap = ``;
//page#01-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				let verticalBuild = 170;
			//add logo
				image.src = 'logo.jpg';
				let imageSize = 125;
				let xPos = (this.pageWidth / 2) - (imageSize / 2);
				pdf.addImage(image, 'jpg', xPos, verticalBuild, imageSize, imageSize); // x, y, width, height				
			//add quoteId
				this.setFont(pdf, 'cover');
				text = `${quoteId}`;
				verticalBuild += 160;
				pdf.text(text, this.pageWidth / 2, verticalBuild, {align: 'center'});
			//add date
				this.setFont(pdf, 'cover');
				text = moment().format('MM/DD/YY');
				verticalBuild += 80;
				pdf.text(text, this.pageWidth / 2, verticalBuild, {align: 'center'});
//page#02-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = margin;
			//customer address
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `${friendlyFirstName} ${friendlyLastName}
${this.contact.company}
${this.contact.streetAddress}
${this.contact.city}, ${this.contact.state} ${this.contact.zip}`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//add message
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************
text = `Dear ${friendlyFirstName},

K&A Engineering is pleased to provide the following Power System Study quotation for the ${this.contact.project} project at ${this.contact.company} located in ${this.contact.city}, ${this.contact.state}.

K&A Engineering is a professional engineering firm licensed in the State of Texas. The short circuit and coordination study performed by K&A engineering and shall be submitted to the principal design firm for reviewal and approval.

Thank you for this opportunity to be of service. Should you have any questions, please do not hesitate to call.


Respectfully Submitted,`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += newLine * 4; // space between address and message
				pdf.text(wrap, margin, verticalBuild, {align: 'left'});	
			//add signature
				image = new Image();
				image.src = 'signature.jpg';
				verticalBuild += 140;
				pdf.addImage(image, 'jpg', margin, verticalBuild, 100, 30); // x, y, width, height		
			//company address
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `Khaled Elgamal
Senior Electrical Engineer
kelgamal@kaiengineers.com
214.422.1086 (Mobile)
K&A Engineering, LLC
9330 LBJ Freeway
Dallas, TX 75243`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				verticalBuild += 40;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//break line
				pdf.setLineDash([4, 4], 0);
				verticalBuild += newLine * 5;
				pdf.line(margin, verticalBuild, this.pageWidth - margin, verticalBuild); //x1, y1, x2, y2
			//price
				this.setFont(pdf, 'header');
				text = `Engineering = ${this.getFriendlyQuote(this.quote)}`;
				verticalBuild += newLine + 3;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//training
				if(this.isTraining){
					text = `Arc Flash Training = ${this.getFriendlyQuote(this.costs.training)}`;
					pdf.text(text, this.pageWidth - margin, verticalBuild, {align: 'right'});	
				}			
			//deadline
				this.setFont(pdf, 'default');
				text = `Deadline = ${this.formatDate(this.deadline).replace(/-/g, '/')}`;
				verticalBuild += newLine;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//instructions
				if(this.specialInstructions){
					text = `Special Instructions = ${this.specialInstructions}`;
					wrap = pdf.splitTextToSize(text, wrapWidth);
					verticalBuild += newLine;
					pdf.text(wrap, margin, verticalBuild, {align: 'left'});	
				}
			//add specks
				pdf.setLineDash(0); //change back to solid line
			//init
				let rows = [];
				let selections = ``;
			//build components
				keys = Object.keys(this.components);
				keys.forEach((key, index) => {
					if(this.components[key] > 0){
						selections += `${this.friendlyConverter[key]}(X${this.components[key]}), `;
					}
				});
				if(selections[selections.length - 1] == ' ' && selections[selections.length - 2] == ','){
					selections = selections.slice(0, -2);
				}
				rows.push({
					Items: "Component(s)",
					Selections: selections || '[None Selected]'
				});
			//build options
				selections = ``;
				keys = Object.keys(this.options);
				keys.forEach((key, index) => {
					if(this.options[key]){
						selections += `${this.friendlyConverter[key]}, `;
					}
				});
				if(selections[selections.length - 1] == ' ' && selections[selections.length - 2] == ','){
					selections = selections.slice(0, -2);
				}
				rows.push({
					Items: "Option(s)",
					Selections: selections || '[None Selected]'
				});
			//build headers
				let firstColWidth = 100;
				let headers = [{
					'name': 'Items',
					'prompt': 'Item(s)',
					'width': firstColWidth,
					'align': 'left',
					'padding': 0
					}, {
					'name': 'Selections',
					'prompt': 'Selection(s)',
					'width': this.pageWidth - margin - 10,
					'align':'left',
					'padding': 0
					}];
			//bind table
				verticalBuild = newLine * 31;
				pdf.table(margin, verticalBuild, rows, headers);
			//set footer
				this.setFooter(pdf, '1');
//page#03-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = margin;
			//terms header
				text = 'Work Description:';
				this.setFont(pdf, 'header');
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//terms content
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `Applicable taxes not included terms net 30 days.

There are many components to properly incorporate arc flash safety into your electrical safety program. As a multi-step process, it is important to execute the contact in such a manner as to be efficient upon completion, as well as achieving the overall goal of implementing an effective and useful study. This study includes the following:

   1. Gathering of Site Data.
   2. Perform a Short Circuit Study.
   3. Perform a Coordination Study.
   4. Perform an Arc Flash Study.

K&A Engineering is pleased to provide the following items in reference to the listed price above:

`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				verticalBuild += newLine;
				wrap = pdf.splitTextToSize(text, wrapWidth);
				pdf.text(wrap, margin, verticalBuild, {align: 'left'});	
			//1st item
				text = `On-Site Data Collection/System modeling:`;
				this.setFont(pdf, 'sub');
				verticalBuild += newLine + 130;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	

				text = `1. Gathering of available One-Line diagrams and other pertinent electrical prints and information.`;
				this.setFont(pdf, 'default');
				verticalBuild += newLine;
				pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

				text = `2. Data provided by the contractor.`;
				this.setFont(pdf, 'default');
				verticalBuild += newLine;
				pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

				text = `3. Input of collected data into the SKM Power Tools for Windows software to create a database and the system One-Line diagram.`;
				this.setFont(pdf, 'default');
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += newLine;
				pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//2nd item
				text = `Short Circuit Study:`;
				this.setFont(pdf, 'sub');
				verticalBuild += newLine + 15;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	

				text = `1. The study will identify any protective devices that are not adequately rated to interrupt the fault current that is available at a particular location in the power system.`;
				this.setFont(pdf, 'default');
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += newLine;
				pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//3rd item
				text = `Coordination Study:`;
				this.setFont(pdf, 'sub');
				verticalBuild += newLine + 15;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	

				text = `1. K&A Engineering will perform and supply a coordination study that will determine the settings for the protective devices studied and also provide acceptable protection for all equipment and conductors during periods of overload or fault conditions. The study will review equipment operation for a fault on each bus, describe any unacceptable coordination conditions.`;
				this.setFont(pdf, 'default');	
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += newLine;
				pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//4th item
				text = `Arc Flash Study:`;
				this.setFont(pdf, 'sub');
				verticalBuild += newLine + 35;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	

				text = `1. K&A Engineering will provide an arc flash study detailing the Flash Hazard Boundaries, Limited Approach Boundaries, Restricted Approach Boundaries, and Incident Energies (in cal/cm2) encountered at specific distances, Specified Hazard Class and subsequent PPE required, and impending shock risk. Our study will commence from the utility service entrance point and will include the items as shown on the supplied electrical One-Line diagram.`;
				this.setFont(pdf, 'default');
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += newLine;
				pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//footer
				this.setFooter(pdf, '2');
//page#04-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = margin;
			//report content
			//1st item - provided report
				//header
					this.setFont(pdf, 'header');
					text = 'Provided Report:';
					pdf.text(text, margin, verticalBuild, {align: 'left'});
				//sub-header
					this.setFont(pdf, 'default');
					text = `The results of the protective device short circuit, coordination and arc flash hazard analysis studies shall be summarized in a final electronic report.  The report shall include the following sections:`;
					wrap = pdf.splitTextToSize(text, wrapWidth);
					verticalBuild += newLine;
					pdf.text(wrap, margin, verticalBuild, {align: 'left'});	
				//list
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `1. Executive Summary including Introduction, Scope of work and results/ recommendations.
2. Short Circuit methodology analysis results and recommendations.
3. Electrical equipment evaluation output report.
4. Protective device coordination methodology analysis results and recommendations.
5. Time-current coordination curves and recommendations(TCC drawings in 11x17 page format).
6. Arc Flash hazard methodology analysis results and recommendations, including the details of the incident energy and flash protection boundary calculations, along with Arc Flash boundary distances, working distances, Incident energy levels and personal protection equipment levels.
7. One-Line system diagram shall be computer generated and will clearly identify individual equipment buses, bus numbers used in the Short Circuit analysis, cable and bus connections between the equipment, calculated maximum Short Circuit current at each bus location, device numbers used in the time-current coordination analysis and other information pertinent to the computer analysis.`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					this.setFont(pdf, 'default');
					wrap = pdf.splitTextToSize(text, wrapWidth);
					verticalBuild += newLine + 20;
					pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//2nd item - general conditions
				//header
					this.setFont(pdf, 'header');
					text = 'General Conditions:';
					verticalBuild += 170;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	
				//sub-header
					this.setFont(pdf, 'default');
					text = `Work performed by K&A Engineering will be in accordance with the following:`;
					verticalBuild += newLine;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	
				//list
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `1. This quotation is effective for 30 days from quotation date, unless otherwise authorized by K&A Engineering.
2. Cancellations, which may include weather-related issues, will be assessed with a mobilization and or contact management/completion charge based on expenses incurred.
3. The price is based on normal working hours (M-F 7am-4pm).
4. The equipment / Manufacturer shall be specified prior to the study.
5. Unless requested, the study will be based on the recommended settings of the Short Circuit, Coordination and Arc Flash study.
6. All data required included but not limited to cable lengths, cable size, protective devices type and settings, utility fault current information shall be provided to K&A Engineering, prior to the beginning of the contact.
7. Customer drawings and other records may be used in lieu of physical inspection where appropriate.
8. The customer is responsible for providing all facility One-Line drawings / diagrams, control schematics, and equipment drawings to K&A Engineering.  K&A Engineering will require as much site information on the distribution system (one line diagrams, known changes to the system, etc.) prior to the beginning of the contact.`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
					this.setFont(pdf, 'default');
					wrap = pdf.splitTextToSize(text, wrapWidth);
					verticalBuild += newLine;
					pdf.text(wrap, margin + indent, verticalBuild, {align: 'left'});
			//footer
				this.setFooter(pdf, '3');
//page#05-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = margin;
			//report header
				text = 'Deliverables:';
				this.setFont(pdf, 'header');
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//report content
				//1st item
					text = `Input Data Information:`;
					this.setFont(pdf, 'sub');
					verticalBuild += newLine;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	

					text = `1. Software input data report.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});
				//2nd item
					text = `Short Circuit Current Analysis Information:`;
					this.setFont(pdf, 'sub');
					verticalBuild += newLine;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	

					text = `1. Short Circuit current output report.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

					text = `2. One-Line drawing with Short Circuit current values.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});
				//3rd item
					text = `Protective Coordination Study:`;
					this.setFont(pdf, 'sub');
					verticalBuild += newLine;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	

					text = `1. Time-Current Characteristics(TCC) curves.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

					text = `2. Software generated protective devices recommended settings.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});
				//4th item
					text = `Arc-Flash Hazard Analysis:`;
					this.setFont(pdf, 'sub');
					verticalBuild += newLine;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	

					text = `1. Report with detailed arc-flash information.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

					text = `2. One-Line with arc flash values.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});

					text = `3. Software generated protective devices recommended settings.`;
					this.setFont(pdf, 'default');
					verticalBuild += newLine;
					pdf.text(text, margin + indent, verticalBuild, {align: 'left'});
				//set footer
					this.setFooter(pdf, '4');
			//download
				pdf.save(`${quoteId}.pdf`);
	}, 
//pdf helpers
	setFont(pdf, type){
		if(type == 'cover'){
			pdf.setFont('Helvetica', 'bold');
			pdf.setTextColor(101, 107, 110);
			pdf.setFontSize(14);
		//	pdf.setFontType("bold");
		}else if(type == 'header'){
			pdf.setFont('Helvetica', 'bold');
			pdf.setTextColor(0, 123, 255);
			pdf.setFontSize(14);
		}else if(type == 'default'){
			pdf.setFont('Helvetica', 'normal');
			pdf.setTextColor(86,91,97);
			pdf.setFontSize(12);
		}else if(type == 'sub'){
			pdf.setFont('Helvetica', 'bold');
			pdf.setTextColor(86,91,97);
			pdf.setFontSize(12);
		}else if(type == 'footer'){
			pdf.setFont('Helvetica', 'normal');
			pdf.setTextColor(150,150,150);
			pdf.setFontSize(11);
		}
	},
//set footer
	setFooter(pdf, page){
		this.setFont(pdf, 'footer');
		let text = `${page} of 4`;
		pdf.text(text, (this.pageWidth / 2) - 10, this.pageHeight - 25, {align: 'left'});
	},
//get default date
	getDefaultDate(){
		let today = new Date();
		let delay = 21; // 3 weeks
		today.setDate(today.getDate() + delay);
		return today.toISOString().substr(0, 10);
	},    
//format date to people friendly
	formatDate (date) {
		if (!date) return null;
		let [year, month, day] = date.split('-')
		return `${month}-${day}-${year}`
	},
//format date to picker friendly
	parseDate (date) {
		if (!date) return null
		let [month, day, year] = date.split('-')
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
	},
//getFriendlyQuote
	getFriendlyQuote(value){
		let friendly = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return `$${friendly}`;
	}
}, 
//used for picker to update dynamically
	watch: {
		deadline () {
			this.dateFormatted = this.formatDate(this.deadline)
		}
	},
//global vars
	data: global => ({
		friendlyConverter:{
			switchBoards: 'Switch Boards',
			panelBoards: 'Panel Board',
			transformers: 'Transformer',
			disconnectSwitches: 'Disconnect Switch',
			enclosedCircuitBreakers: 'Enclosed Circuit Breakers',
			motorsOver30Hp: 'Motors(>30hp)',
			generators: 'Generator',
			automaticTransferSwitches: 'Automatic Transfer Switch(ats)',
			motorControlCenters: 'Motor Control Center(mcc)',
			universalPowerSupplies: 'Universal Power Supply(ups)',
			isShortCircuitStudy: 'Short Circuit Study',
			isCoordinationStudy: 'Coordination Study',
			isHarmonicStudy: 'Harmonic Study',
			isMotorStartStudy: 'Motor Start Study',
			isLoadFlowStudy: 'Load Flow Study',
			isArcFlashStudy: 'Arc Flash Study',
			isArcFlashLabels: 'Arc Flash Label',
			firstName: 'First Name',
			lastName: 'Last Name',
			project: 'Project Name',
			company: 'Company',
			streetAddress: 'Street Address',
			city: 'City',
			state: 'State',
			zip: 'Zip',
			phone: 'Phone',
			email: 'E-mail'
		},
		components: {
			switchBoards: 0,
			panelBoards: 0,
			transformers: 0,
			disconnectSwitches: 0,
			enclosedCircuitBreakers: 0,
			motorsOver30Hp: 0,
			generators: 0,
			automaticTransferSwitches: 0,
			motorControlCenters: 0,
			universalPowerSupplies: 0
		},
		options:{
			isArcFlashStudy: false,
			isShortCircuitStudy: false,
			isCoodinationStudy: false,
			isArcFlashLabels: false,
			isHarmonicStudy: false,
			isMotorStartStudy: false,
			isLoadFlowStudy: false,
		},
		contact: {
			firstName: null,
			lastName: null,
			project: null,
			company: null,
			streetAddress: null,
			city: null,
			state: null,
			zip: null,
			phone: null,
			email: null
		},
		costs: {
			minimum: 1200.00,
			training: 3200.00,
			expedite: 100.00,
			components: {
				standard: 110.00,
				premium: 130.00
			},
			options: {
				harmonic: 0.30,
				motor: 0.25,
				loadFlow: 0.20
			}
		},
		pageWidth: 0,
		pageHeight: 0,
		isTraining: false,
		specialInstructions: '',
		limitedSpecialInstructions: '',
		deadline: global.getDefaultDate(),
		dateFormatted: global.formatDate(global.getDefaultDate()),
		showInfoModal: false,
		menu: false,
		quote: '0.00',
		userId: '',
		charLimit: 435, //without this, textarea can grow outside of container
		validate: {
			required: a => !!a || 'Entry required!',
			number: a => !isNaN(a) || 'Digits required!',
			email: a => {        
				let regex = new RegExp(/.+@.+\..+/);
				return regex.test(a) || 'Email must be in x@x.x format!';
			}, 
			phone: a => {        
				let regex = new RegExp(/\d{3}.+?\d{3}.+?\d{4}/);
				return regex.test(a) || 'Phone must contain 9 digits!';
			}
		}
	})
}
</script>