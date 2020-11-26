<template>
<v-app>
<div class='splashBackground'>
<!--confirmation modal-->
<transition name='fade'>
	<div class='modal-mask' transition='modal' v-if='showInfoModal' @closeInfoModal = 'closeInfoModal'>
		<div class='center-block' style='width: 450px; margin-top: 150px;'>     
		<v-card v-on:keyup.enter='closeInfoModal()'>
		<!--title-->
			<v-card-title
				class='headline primary' primary-title style='color: white;'>
				<v-icon dark left>error_outline</v-icon>
                Pricing
			</v-card-title>
		<!--content-->
			<v-card-text style='padding: 20px;'>
				<v-icon left>arrow_forward</v-icon>
					<label>Minimum Base Price=</label>&nbsp;
					<v-chip color='success'><i class='fa fa-fw fa-plus'></i>${{costs.minimum}}</v-chip><br>
				<v-icon left>arrow_forward</v-icon>
					<label style='padding-top: 10px;'>Unit Price (Without Any Option)=</label>&nbsp;
					<v-chip color='success'><i class='fa fa-fw fa-plus'></i>${{costs.unitStandard}} / Component</v-chip><br>
				<v-icon left>arrow_forward</v-icon>
					<label style='padding-top: 10px;'>Unit Price (With Any Option)=</label>&nbsp;
					<v-chip color='success'><i class='fa fa-fw fa-plus'></i>${{costs.unitOptions}} / Component</v-chip><br>
				<v-icon left>arrow_forward</v-icon>
					<label style='padding-top: 10px;'>With Training=</label>&nbsp;
					<v-chip color='success'><i class='fa fa-fw fa-plus'></i>${{costs.training}}</v-chip><br>
				<v-icon left>arrow_forward</v-icon>
					<label style='padding-top: 10px;'>With Expedite(Less than 2 weeks)=</label>&nbsp;
					<v-chip color='success'><i class='fa fa-fw fa-plus'></i>${{costs.expedite}}</v-chip><br>
            </v-card-text>              
            <v-card-actions>
            <!--cancel button-->
                <v-btn 
                    style='width: 100%;'
                    dense dark color='primary' 
                    @click='closeInfoModal()'                     
                    >
                    <v-icon dark left>check_circle</v-icon>
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
        </div>
    </div>
</transition>
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
<!--clear button-->
	<v-btn 
		style='position: absolute; right: 410px; width: 110px;'
		dense dark color='error' 
		@click='reset()'>
		<v-icon dark left>power_settings_new</v-icon>
		Reset
	</v-btn>
<!--save button-->
	<v-btn 
		style='position: absolute; right: 280px; width: 110px;'
		dense dark color='info' 
		@click='saveData()'>
		<v-icon dark left>save</v-icon>
		Save
	</v-btn>
<!--info button-->
	<v-btn 
		style='position: absolute; right: 150px; width: 110px;'
		dense dark color='info' 
		@click='openInfoModal()'>
		<v-icon dark left>error_outline</v-icon>
		Pricing
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
		<!--panel boards-->
		<v-text-field
			style='margin: 20px 20px 0px 20px;'
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
			style='margin: 0px 20px 0px 20px;'
			label='Transformers'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.transformers'
		></v-text-field>
		<!--switches-->
		<v-text-field
			style='margin: 0px 20px 0px 20px;'
			label='Disconnect Switches'
			dense
			placeholder='Type count...'
			outlined
			autocomplete="off"
			type="number"
			v-model.number='components.disconnectSwitches'
		></v-text-field>
		<!--generators-->
		<v-text-field
			style='margin: 0px 20px 0px 20px;'
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
			style='margin: 0px 20px 0px 20px;'
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
			style='margin: 0px 20px 0px 20px;'
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
			style='margin: 0px 20px 0px 20px;'
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
		<!--short circuit coordination-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isShortCircuitStudy'
				label="Short Circuit Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--selective Coordination-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isDeviceStudy'
				label="Device Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--harmonics-->	
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isHarmonicStudy'
				label="Harmonic Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--motor starting study-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isMotorStartStudy'
				label="Motor Start Study"
				color="primary"
				hide-details
			></v-checkbox>
		<!--short circuit coordination-->
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isLoadFlowStudy'
				label = 'Load Flow Study'
				color="primary"
				hide-details
			></v-checkbox>
		<!--arc flash-->	
			<v-checkbox
				style='margin: 20px'
				v-model = 'options.isArcFlashStudy'
				label="Arc Flash Study"
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
			label="Require Training"
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
		<i class='fa fa-fw fa-user-circle'></i>&nbsp;Contact
	</v-card-title>
<!--divider-->
	<v-divider style='margin:0px; border-color: #aae2ff;' ></v-divider>
<!--content-->
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
	>{{getFriendlyQuote(quote)}}</v-btn>
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
		//options
			let unitCost = this.costs.unitStandard;
			if(this.options.isShortCircuitStudy || this.options.isDeviceStudy || this.options.isHarmonicStudy ||
			this.options.isMotorStartStudy || this.options.isLoadFlowStudy || this.options.isArcFlashStudy || this.options.isArcFlashLabels){
				unitCost = 130.00;
			}
		//get counts
			let counts = 
			this.components.panelBoards + this.components.transformers + this.components.disconnectSwitches + this.components.generators + 
			this.components.automaticTransferSwitches + this.components.motorControlCenters + this.components.universalPowerSupplies;		
		//components
			let totalCost = counts * unitCost;
			if(totalCost <= this.costs.minimum){
				this.quote = this.costs.minimum;
			}else{
				this.quote = totalCost;
			}
		//training
			if(this.isTraining){
				this.quote += this.costs.training;
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
			toastr.error('Fields are missing!', ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
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
//clear all fields
	reset(){
		this.resetKeys(this.components, 0);
		this.resetKeys(this.options, false);
		this.resetKeys(this.contact, '');
		this.deadline = this.getDefaultDate();
		this.specialInstructions = null;
	},
//clear all keys
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
//close info modal
	closeInfoModal(){
		this.showInfoModal = false;
	},
//open info modal
	openInfoModal(){
		this.showInfoModal = true;
	},
	controlPhone() {
		if(this.contact.phone){
			let x = this.contact.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			this.contact.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
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
		quoteId = `ka#${quoteId}`;
	//send email
		//build body
		let html = ``;
		let titleColor = `#007bff`;
		let subColor = `black`;
		//get components
			html += `<strong style='color: ${titleColor}'><u>Components:</u></strong>`;
			html += `<ul>`;
			let keys = Object.keys(this.components);
			keys.forEach(key => {
				if(this.components[key] > 0){
					html += `<li><span style='color: ${subColor}'>${this.friendlyConverter[key]} Count = ${this.components[key]}</span></li>`;
				}
			});
			html += `</ul>`;
		//get options
			html += `<br><strong style='color: ${titleColor}'><u>Options:</u></strong>`;
			html += `<ul>`;
			keys = Object.keys(this.options);
			keys.forEach(key => {
				if(this.options[key]){
					html += `<li><span style='color: ${subColor}'>${this.friendlyConverter[key]}</span></li>`;
				}
			});
			html += `</ul>`;
		//get delivery
			html += `<br><strong style='color: ${titleColor}'><u>Delivery:</u></strong>`;
			html += `<ul>`;
			//deadline
				html += `<li><span style='color: ${subColor}'>Deliver By ${this.formatDate(this.deadline)}</span></li>`;
			//training
				if(this.isTraining){
				html += `<li><span style='color: ${subColor}'>Training Required</span></li>`;
				}
			//instructions
				if(this.specialInstructions){
				html += `<li><span style='color: ${subColor}'>Special Instructions = ${this.specialInstructions}</span></li>`;
				}
			html += `</ul>`;
		//get contact
			html += `<br><strong style='color: ${titleColor}'><u>Contact:</u></strong>`;
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
				subject: `${quoteId}: ${this.userId} quoted $${this.quote}`,
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
			let pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
			let pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
			let margin = 40;
			let wrapWidth = pageWidth - (margin * 2);
			let friendlyFirstName = this.contact.firstName.charAt(0).toUpperCase() + this.contact.firstName.slice(1);
			let friendlyLastName = this.contact.lastName.charAt(0).toUpperCase() + this.contact.lastName.slice(1);
			let text = ``;
			let wrap = ``;
//page#01-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				let verticalBuild = margin;
			//add logo
				image.src = 'logo.jpg';
				let imageSize = 125;
				let xPos = (pageWidth / 2) - (imageSize / 2);
				pdf.addImage(image, 'jpg', xPos, 160, imageSize, imageSize); // x, y, width, height				
			//add quoteId
				this.setFont(pdf, 'cover');
				text = `${quoteId}`;
				pdf.text(text, pageWidth / 2, 320, {align: 'center'});
			//add date
				this.setFont(pdf, 'cover');
				text = moment().format('MM/DD/YY');
				pdf.text(text, pageWidth / 2, 400, {align: 'center'});
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
text = `Dear ${friendlyFirstName}:

K&A Engineering is pleased to provide the following Power System Study quotation for ${this.contact.company} located in ${this.contact.city}, ${this.contact.state}.

K&A Engineering is a professional engineering firm licensed in the State of Texas. The short circuit and coordination study is being performed by K&A engineering and shall be submitted to the principal design firm for reviewal and approval.

Thank you for this opportunity to be of service. Should you have any questions please do not hesitate to give me a call.



Respectfully Submitted,`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				wrap = pdf.splitTextToSize(text, wrapWidth);
				verticalBuild += 70;
				pdf.text(wrap, margin, verticalBuild, {align: 'left'});	
			//add signature
				image = new Image();
				image.src = 'signature.jpg';
				verticalBuild += 150;
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
				pdf.setLineDash([3, 3], 0);
				verticalBuild += 90;
				pdf.line(margin, verticalBuild, pageWidth - margin, verticalBuild); //x1, y1, x2, y2
			//price
				this.setFont(pdf, 'default');
				text = `Price = `;
				verticalBuild += 15;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	

				this.setFont(pdf, 'header');
				text = `${this.getFriendlyQuote(this.quote)}`;
				pdf.text(text, margin + 50, verticalBuild, {align: 'left'});	
			//deadline
				this.setFont(pdf, 'default');
				text = `Deadline = ${this.formatDate(this.deadline).replace(/-/g, '/')}`;
				verticalBuild += 15;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//training
				if(this.isTraining){
					this.setFont(pdf, 'default');
					text = `Require Training`;
					verticalBuild += 15;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	
				}
			//instructions
				if(this.specialInstructions){
					this.setFont(pdf, 'default');
					text = `Special Instructions: Do this and that`;
					verticalBuild += 15;
					pdf.text(text, margin, verticalBuild, {align: 'left'});	
				}
			//add specks
				this.setFont(pdf, 'default');
				pdf.setLineDash(0); //straight line
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
				if(selections[selections.length-1] == ' ' && selections[selections.length-2] == ','){
					selections = selections.slice(0, -2);
				}
				rows.push({
					Items: "Component(s) =",
					Selections: selections || '[none selected]'
				});
			//build options
				selections = ``;
				keys = Object.keys(this.options);
				keys.forEach((key, index) => {
					if(this.options[key]){
						selections += `${this.friendlyConverter[key]}, `;
					}
				});
				if(selections[selections.length-1] == ' ' && selections[selections.length-2] == ','){
					selections = selections.slice(0, -2);
				}
				rows.push({
					Items: "Option(s) =",
					Selections: selections || '[none selected]'
				});
			//build headers
				let firstColWidth = 100;
				let headers = [{
					'name': 'Items',
					'prompt': 'Items',
					'width': firstColWidth,
					'align': 'left',
					'padding': 0
					}, {
					'name': 'Selections',
					'prompt': 'Selections',
					'width': pageWidth - margin - 10,
					'align':'left',
					'padding': 0
					}];
			//bind table
				verticalBuild += 10;
				pdf.table(margin, verticalBuild, rows, headers);

//page#03-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = 0;
			//terms header
				this.setFont(pdf, 'header');
				text = `Deliverables:`;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//terms content
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `Applicable taxes not included terms net 30 days.
There are many components to properly incorporate arc flash safety into your electrical safety
program. As a multi-step process, it is important to execute the project in such a manner as to be
efficient upon completion, as well as achieving the overall goal of implementing an effective and
useful study. This study includes the following:
1. Gathering of Site Data
2. Perform a Short Circuit Study
3. Perform a Coordination Study
4. Perform an Arc Flash Study
K&A Engineering is pleased to provide the following items in reference to the listed price above: 

1. On-Site Data Collection/System modeling:
 Gathering of available one-line diagrams and other pertinent electrical prints and
information
 Data provided by the contractor
 Input of collected data into the SKM Power Tools for Windows software to create a
database and the system one-line diagram 
2. Short-Circuit Study:
The study will identify any protective devices that are not adequately rated to interrupt the fault
current that is available at a particular location in the power system
3. Device Coordination Study:
K&A Engineering, will perform and supply a coordination study that will determine the settings
for the protective devices studied and also provide acceptable protection for all equipment and
conductors during periods of overload or fault conditions. The study will review equipment
operation for a fault on each bus, describe any unacceptable coordination conditions.
4. Arc Flash Study:
K&A Engineering, will provide an arc flash study detailing the Flash Hazard Boundaries, Limited
Approach Boundaries, Restricted Approach Boundaries, and Incident Energies (in cal/cm2)
encountered at specific distances, Specified Hazard Class and subsequent PPE required, and
impending shock risk. Our study will commence from the utility service entrance point and will
include the items as shown on the supplied electrical one-line diagram.
Project deliverables:
 Input data Information
 Software Input data report
 Short-Circuit current analysis Information
 Short-Circuit current output report
 One-line drawing with Short-Circuit current values
 Protective Device Coordination study
 Time-Current Characteristics (TCC) curves
 Software generated protective devices recommended settings
 Arc-Flash Hazard Analysis
 Report with detailed arc-flash information
 One-line with arc flash values
 Arc-Flash Labels 
`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				verticalBuild += 40;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
//page#04-----------------------------------------------------------------------------------------------------------------------------------------------------------------------<
			//init
				pdf.addPage();
				verticalBuild = 0;
			//report header
				this.setFont(pdf, 'header');
				text = `Report:`;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//report content
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `The results of the protective device short circuit, coordination and arc flash hazard analysis studies
shall be summarized in a final report, one (1) electronic copy.
The report shall include the following sections:
1. Executive Summary including Introduction, Scope of work and results/ recommendations
2. Short-Circuit methodology analysis results and recommendations
3. Electrical equipment evaluation output report.
4. Protective device coordination methodology analysis results and recommendations
5. Time-current coordination curves and recommendations. (TCC drawings in 11x17 page 
format)
6. Arc Flash hazard methodology analysis results and recommendations, including the details of
the incident energy and flash protection boundary calculations, along with Arc Flash boundary
distances, working distances, Incident energy levels and personal protection equipment levels
7. One-line system diagram shall be computer generated and will clearly identify individual
equipment buses, bus numbers used in the short-circuit analysis, cable and bus connections
between the equipment, calculated maximum short-circuit current at each bus location, device
numbers used in the time-current coordination analysis and other information pertinent to the
computer analysis `;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				verticalBuild += 40;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//general conditions header
				this.setFont(pdf, 'header');
				text = `General Conditions:`;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
			//general conditions content
//RESERVED TEXT-DON'T CHANGE BELOW***********************************************************************************************************************************************		
text = `Work performed by K&A Engineering will be in accordance with the following:
1. This quotation is effective for 30 days from quotation date, unless otherwise authorized by
K&A Engineering.
2. Cancellations, which may include weather-related issues, will be assessed with a
mobilization and or project management/completion charge based on expenses incurred.
3. The price is based on normal working hours (M-F 7am-4pm).
4. The equipment / Manufacturer shall be specified prior to the study.
5. Unless requested, the study will be based on the recommended settings of the Short
Circuit, Coordination and Arc Flash study.
6. All data required included but not limited to cable lengths, cable size, protective devices
type and settings, utility fault current information shall be provided to K&A Engineering,
prior to the beginning of the project.
7. Customer drawings and other records may be used in lieu of physical inspection where
appropriate.
8. The customer is responsible for providing all facility one-line drawings/ diagrams, control
schematics, and equipment drawings to K&A Engineering. K&A Engineering will require
as much site information on the distribution system (one line diagrams, known changes to
the system, etc.) prior to the beginning of the project. 
`;
//RESERVED TEXT-DON'T CHANGE ABOVE***********************************************************************************************************************************************
				this.setFont(pdf, 'default');
				verticalBuild += 200;
				pdf.text(text, margin, verticalBuild, {align: 'left'});	
		//download
			pdf.save(`${quoteId}.pdf`);
	}, 
//pdf helpers
	setFont(pdf, type){
		if(type == 'cover'){
			pdf.setTextColor(86,91,97);
			pdf.setFontSize(14);
		//	pdf.setFontType("bold");
		}else if(type == 'header'){
			pdf.setTextColor(0, 123, 255);
			pdf.setFontSize(12);
		}else if(type == 'default'){
			pdf.setTextColor(86,91,97);
			pdf.setFontSize(12);
		}
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
	getFriendlyQuote(){
		let friendly = this.quote.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
			panelBoards: 'Panel Board',
			transformers: 'Transformer',
			disconnectSwitches: 'Disconnect Switch',
			generators: 'Generator',
			automaticTransferSwitches: 'Automatic Transfer Switch(ats)',
			motorControlCenters: 'Motor Control Center(mcc)',
			universalPowerSupplies: 'Universal Power Supply(ups)',
			isShortCircuitStudy: 'Short Circuit Study',
			isDeviceStudy: 'Device Study',
			isHarmonicStudy: 'Harmonic Study',
			isMotorStartStudy: 'Motor Start Study',
			isLoadFlowStudy: 'Load Flow Study',
			isArcFlashStudy: 'Arc Flash Study',
			isArcFlashLabels: 'Arc Flash Label',
			firstName: 'First Name',
			lastName: 'Last Name',
			company: 'Company',
			streetAddress: 'Street Address',
			city: 'City',
			state: 'State',
			zip: 'Zip',
			phone: 'Phone',
			email: 'E-mail'
		},
		components: {
			panelBoards: 0,
			transformers: 0,
			disconnectSwitches: 0,
			generators: 0,
			automaticTransferSwitches: 0,
			motorControlCenters: 0,
			universalPowerSupplies: 0
		},
		options:{
			isShortCircuitStudy: false,
			isDeviceStudy: false,
			isHarmonicStudy: false,
			isMotorStartStudy: false,
			isLoadFlowStudy: false,
			isArcFlashStudy: false,
			isArcFlashLabels: false
		},
		contact: {
			firstName: null,
			lastName: null,
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
			unitStandard: 110.00,
			unitOptions: 130.00,
			training: 2000.00,
			expedite: 250.00
		},
		isTraining: false,
		specialInstructions: '',
		deadline: global.getDefaultDate(),
		dateFormatted: global.formatDate(global.getDefaultDate()),
		showInfoModal: false,
		menu: false,
		quote: '0.00',
		userId: '',
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
			},
		}
	})
}
</script>