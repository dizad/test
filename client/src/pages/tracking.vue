<template>
<v-app>
<!--dialogs-->
  <!--save-->
    <transition name="fade">
      <save 
        v-if="dialogs.save.show" 
        @closeDialog="closeDialog($event)">
      </save>
    </transition>
  <!--confirm-->
    <transition name="fade">
      <confirm 
        :data='dialogs.confirm.question' 
        v-if="dialogs.confirm.show" 
        @processConfirmation="processConfirmation($event)">
      </confirm>
    </transition>
  <!--dialogs-->
    <transition name="fade">
        <schedule 
          :data='schedule' 
          :params='params'
          v-if="dialogs.schedule.show" 
          @closeDialog="closeDialog($event)">
        </schedule>
    </transition>
<!--banner bar-->
  <banner class='no-print'></banner>
<!--sub bar-->
  <v-card-title primary-title 
      style='color: white; background-color: #192c45 !important;'>
    <!--title-->
      <span class='mdi mdi-24px dizagara-margin-right' id='headerIcon'></span>
      <small>{{title}}</small>
    <!--export button-->
      <v-btn dense dark 
        class='dizagara-button-blue'
        style='position: absolute; right: 295px;'
        @click='exportSpreadsheet()'>
        <span class="mdi mdi-18px dizagara-margin-right" id='exportIcon'></span>
        EXPORT
      </v-btn>
    <!--delete all button-->
      <v-btn dense dark 
        class='dizagara-button-red'
        style='position: absolute; right: 130px;'
        @click='deleteAll()'>
        <span class="mdi mdi-18px dizagara-margin-right" id='deleteIcon'></span>
        DELETE ALL
      </v-btn>
    <!--save button-->
      <v-btn dense dark 
        class='dizagara-button-green'
        style='position: absolute; right: 15px;'
        @click='save()'>
        <span class="mdi mdi-18px dizagara-margin-right" id='saveIcon'></span>
        SAVE
      </v-btn>
  </v-card-title>
<!--filters-->
  <span style='overflow-y: auto; height: calc(100vh - 150px)'>
    <v-card-title style = 'margin-bottom: -40px;'>
      <!--filter term-->
        <v-text-field dense outlined autocomplete='off'
            style='margin-right: 10px;'
            append-icon='mdi-magnify'
            background-color='yellow lighten-4'
            v-model='searchTerm'
            placeholder='Type search term.'
            label='Filter Term'
            v-on:keyup='filterTerm'
        ></v-text-field>
      <!--fitler dropdown-->
        <v-autocomplete dense outlined 
          style='margin-left: 10px;'
          background-color='yellow lighten-4'
          v-model='filterCol'
          :items='filterCols'
          :item-text='a => a.name'
          :item-value='a => a.key'
          label='Filter Column'
          @change="filterTerm"
        ></v-autocomplete>
    </v-card-title>
  <!--table-->
    <v-simple-table 
      style='margin: 20px; padding-bottom: 20px;'
      v-if='schedules.length && isShows' 
      @sorted="saveOrder">
      <template v-slot:default>
      <!--header-->
          <thead>
            <tr>
              <th class='text-left' v-for='header in headers' :key='header.key' :style='header.key == "track" ? "width: 1000px; text-align: center !important;" : ""'>
              <!--name-->
                {{header.key == 'isShow' ? '' : header.name}}
              <!--sort-->
                <v-btn dense dark small icon v-if='header.key != "isShow"'
                  :class='header.sort == 0 ? "dizagara-button-blue dizagara-round-small" : "dizagara-button-green dizagara-round-small"'
                  style='margin-right: 10px;'
                  @click='sortHeader(header)'
                  title='Sort header.'>
                  <!--icon-->
                  <span v-if='header.sort == 1' class="mdi mdi-12px mdi-arrow-up"></span>
                  <span v-if='header.sort == 0' class="mdi mdi-12px mdi-minus"></span>
                  <span v-if='header.sort == -1' class="mdi mdi-12px mdi-arrow-down"></span>
                </v-btn>
              </th>
              <th class='text-center'>
                Action
              </th>
            </tr>
          </thead>
      <!--body-->
          <tbody>
            <tr v-for='(item, index) in schedules' :key='item._id' v-show='item.isShow'>
          <!--identity chip-->
              <td class='text-left' v-for='key in keys' :key='key'>
                <!--identity-->
                  <span v-if='key == "_id"'>
                    <v-chip dark>
                    {{item._id}}
                    </v-chip>
                  </span>
                <!--patient-->
                  <span v-else-if='key == "patient"'>
                    {{item[key].first}}, {{item[key].last}}
                  </span>
                <!--stage-->
                  <span v-else-if='key == "stage"'>
                    <v-chip dark color='error' v-if='item[key] == "drafted"'><strong>DRAFTED</strong></v-chip>
                    <v-chip dark color='warning' v-if='item[key] == "submitted"'><strong>SUBMITTED</strong></v-chip>
                    <v-chip dark color='success' v-if='item[key] == "approved"'><strong>APPROVED</strong></v-chip>
                  </span>
                <!--tracking-->
                  <span v-else-if='key == "track"'>
                  <!--slider-->
                    <v-slider v-if='item["stage"] == "approved"' 
                      :step='100 / (tracks.length - 1)'
                      v-model='item.track'
                      :tick-labels='tracks'
                      ticks>
                    <template v-slot:thumb-label="{ value }">
                      {{ Math.floor(value / (100 / (tracks.length - 1))) }}           
                      </template>
                    </v-slider> 
                  <!--waiting approval-->
                    <label v-if='item["stage"] != "approved"' class='text-danger'>
                      Track will display after schedule has been approved
                    </label>                
                  </span>
                <!--moded by-->
                  <span v-else-if='key == "modBy"'>
                   {{item[key]}}
                  </span>
                <!--moded date-->
                  <span v-else-if='key == "modDate"'>
                   {{getFriendlyDateTime(item[key])}}
                  </span>
              </td>
            <!--action-->
              <td class='text-center'>
              <!--edit-->
                <v-btn dense dark small icon
                  class='dizagara-button-blue dizagara-round-medium'
                  style='margin-right: 10px;'
                  @click='edit(item)'
                  title='Edit this item.'>
                  <span class="mdi mdi-18px mdi-pencil"></span>
                </v-btn>
              <!--remove-->
                <v-btn dense dark small icon
                    class='dizagara-button-red dizagara-round-medium'
                    @click='remove(index)'
                    title='Delete this item.'>
                  <span class="mdi mdi-18px mdi-close"></span>
                </v-btn>
              </td>
            </tr>
          </tbody>
      </template>
    </v-simple-table>
</span>
<label v-if='!schedules.length || !isShows' style='color: gray; text-align: center; margin: 20px auto auto auto;'>No Data</label>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
  import confirm from '../components/dialogs/confirm.vue';
	import schedule from '../components/dialogs/schedule.vue';
  import save from '../components/dialogs/save.vue';
  import banner from '../components/generics/banner.vue';
  import converters from '../utils/converters.js';
  import references from '../utils/references.js';
  import utils from '../utils/utils.js';
//master
	export default {
//name
	name: 'tracking',
//components
	components: {
    confirm, banner, schedule, save
	},
//cycle methods
  async created(){
    //get data
      let tracks = await bridge.getCollection({collection: 'tracks'}) || [];
      this.schedules = await bridge.getCollection({collection: 'schedules'}) || [];
      this.original = utils.deepClone(this.schedules);
      this.tracks = tracks.map(a => a.name);
      this.increment = 100 / (tracks.length - 1);
    //get prop
      this.userId = this.$route.params.id;
    //get icon
      setTimeout(() => {
        $('#headerIcon').addClass(references.getIcon(`track`));
        $('#addIcon').addClass(references.getIcon('add'));
        $('#saveIcon').addClass(references.getIcon('save'));
        $('#deleteIcon').addClass(references.getIcon('delete'));
        $('#exportIcon').addClass(references.getIcon('download'));
      }, 0);
      this.initTable();
  },
//before exit
  beforeRouteLeave (to, from, next){
    if(!this.redirect.hasConfirmed){
      let cleanMods = utils.deepClone(this.schedules);
      cleanMods.forEach(a => delete a.isShow);
      let originalJson = JSON.stringify(this.original);
      let modifiedJson = JSON.stringify(cleanMods);
      if(originalJson.localeCompare(modifiedJson) != 0){ 
        this.redirect.path = to.fullPath;
        this.params.dialog = `save`;
        this.dialogs.save.show = true;
      }else{
        next();
      }
    }else{
      this.redirect.hasConfirmed = false;
      next();
    }
  },
//custom methods
  methods: {
  //init table
    initTable(){
    //get schedules
      this.schedules.forEach(a => a.isShow = true); //add show to each
    //get headers
      this.headers = [];
      this.filterCols = [{key: 'all', name: 'All'}];
      this.filterCol = this.filterCols[0].key; //select 1st item
      if(this.schedules.length){
        //let keys = Object.keys(this.data[0]);
        let modCount = 0;
        this.keys.forEach(a => {
        //add all schedules
            let name = converters.capitalizeFirst(a);
            if(a == '_id'){
              name = 'Key';
            } else if(a == 'modBy' && modCount == 0){
              name = 'Moded By';
              modCount++;
            } else if(a == 'modDate' && modCount == 1){
              name = 'Moded Date';
            }
          //determine type
            this.headers.push({
                key: a,
                name: name,
                type: typeof this.schedules[0][a],
                sort: 0
            });
            if(!this.omitFields.includes(a)){
              this.filterCols.push({
                key: a,
                name: name
              });
            }
        });
      }
    },
  //dialogs
    processConfirmation(action){
      if(action == `submit`){
          if(this.dialogs.confirm.command == 'deleteAll'){
            this.schedules = [];
          }       
      }
     this.dialogs.confirm.show = false;
    },
  //get next highest id
    getNextId(){
      let max = 0;
      this.schedules.forEach(a => {
        let fields = a._id.split('#');
        if(max < parseInt(fields[1])){
          max = fields[1];
        }
      });
      max++; //increment one
      max = max.toString();
      while(max.length < 3){
        max = `0` + max;
      }
      return max;
    },
  //close dialog
    closeDialog(params){
      if(this.params.dialog == `save`){
        this.dialogs.save.show = false;
        if(params.action == 'submit'){
          this.save();
          this.redirect.hasConfirmed = true;
          this.$router.push({path: this.redirect.path});
        }else if(params.action == 'ignore'){
          this.redirect.hasConfirmed = true;
          this.$router.push({path: this.redirect.path});
        }else if(params.action == 'cancel'){
          this.params.dialog = `other`;
          return;
        }
      }else{
      //hide dialog
        this.dialogs['schedule'].show = false;
      //cancel action
        if(params.action == `cancel`){
          return;
        }
      //submit action
        else if(params.action == `submit`){
          this.schedules[this.params.index] = utils.deepClone(params.data);
          this.initTable();
        }
      //delete action
        else if(params.action == `delete`){
          this.schedules.splice(this.params.index, 1);
        }
      }
    },
  //edit item
    edit(item){
      this.params.isNew = false;
      this.params.isReview = true;
      this.schedule = item;
      this.params.index = this.schedules.findIndex(a => a._id == item._id);
      this.dialogs.schedule.show = true;
    },
  //remove item
      remove(index){
        this.schedules.splice(index, 1);
    },
  //save schedules
    async save(){
      //conditioning
        let toSave = utils.deepClone(this.schedules);
        toSave.forEach(a => {
          delete a['isShow'];
        });
      //save property
          await bridge.setCollection({
            collection: `schedules`,
            data: toSave
          });
      //notify
        this.original = utils.deepClone(toSave);
        toastr.success(`Schedule(s) saved successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
    },
  //delete all items
    deleteAll(){
      this.dialogs.confirm.command = 'deleteAll';
      this.dialogs.confirm.question = 'Are you sure you want to delete all items?';
      this.dialogs.confirm.show = true;
    },
  //round robin header sort
    sortHeader(header){
      //reset headers
        this.headers.forEach(a => {
          if(a != header){
            a.sort = 0;
          }
        });
      //determine direction
        if(header.sort == -1){
          header.sort = 0; 
        }else if(header.sort == 0){
          header.sort = 1;
          //sort
            this.schedules.sort((a, b) => {
              //get first and second
                let compare = this.getCompareObject(a, b, header.key);
              //return sort
                if(header.type == 'number'){
                  return compare.first - compare.second;
                }else{
                  return compare.first.localeCompare(compare.second);
                }
            });
        }else if(header.sort == 1){
          header.sort = -1;
          //sort
            this.schedules.sort((a, b) => {
            //get first and second
              let compare = this.getCompareObject(a, b, header.key);
            //return sort
              if(header.type == 'number'){
                return compare.second - compare.first;
              }else{
                return compare.second.localeCompare(compare.first);
              }
            });
        }
    },
  //get compare object
    getCompareObject(a, b, key){
      let compare = {
        first: ``,
        second: ``
      }
      if(key == `patient`){
        compare.first = `${a[key].first}, ${a[key].last}`;
        compare.second = `${b[key].first}, ${b[key].last}`;
      }else{
        compare.first = a[key];
        compare.second = b[key];
      }
      return compare;
    },
  //save order
    saveOrder (event){
      this.schedules.splice(event.newIndex, 0, this.schedules.splice(event.oldIndex, 1)[0]);
    },
  //filter table
    filterTerm(){
      //reset
        this.isShows = true;
      //filter data
        this.schedules.forEach(a => {
          a.isShow = false;
          let keys = Object.keys(a);
          if(this.filterCol == 'all'){
              for(let i = 0; i < keys.length; i++){
                if(!this.omitFields.includes(keys[i]) && typeof a[keys[i]] == 'string' && a[keys[i]].toLowerCase().includes(this.searchTerm.toLowerCase())){
                  a.isShow = true;
                  break;
                }
              }
            }else{
              if(!this.omitFields.includes(this.filterCol)){
                if((this.filterCol == `patient` && (`${a.patient.first}, ${a.patient.last}`).includes(this.searchTerm.toLowerCase())) || 
                  (typeof a[this.filterCol] == 'string' && a[this.filterCol].toLowerCase().includes(this.searchTerm.toLowerCase()))){
                  a.isShow = true;
                }               
              }
            }
        });
      //check if empty
        if(!this.schedules.filter(a => a.isShow).length){
          this.isShows = false;
        }
      //reset data
        this.schedules.push({});
        this.schedules.pop();
    },
  //get friendly date time
    getFriendlyDateTime(date){
     return converters.getFriendlyDateTime(date);
    },
  //export to csv
    exportSpreadsheet(){
      //init
        let csvStructure = [];
      //remove is show
        let toExport = utils.deepClone(this.schedules);
        toExport.forEach(a => delete a.isShow);
      //build data
        //headers
          let headers = ['_id', 'patient', 'stage', 'track', 'modBy', 'modDate'];
          csvStructure.push(headers);
        //content
          toExport.forEach(a => {
            let row = [];
            headers.forEach(b => {
              if(b == 'patient'){
                let name = `${a[b].first} ${a[b].last}`;
                row.push(name.replace(/#/g, ''));
              }else if(b == 'track'){
                if(a[b] > 1){
                  let track = this.tracks[a[b] / this.increment];
                  row.push(track);
                }else{
                  row.push('(none)');
                }
              }else if(b == `modDate`){
                row.push(converters.getFriendlyDate(a[b]));
              }else{
                row.push(a[b].replace(/#/g, '').toString());
              }            
            });
            csvStructure.push(row);
          });
      //bind
        let csvContent = "data:text/csv;charset=utf-8," + csvStructure.map(e => e.join(",")).join("\n");
      //download
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${this.prop}.csv`);
        document.body.appendChild(link);
        link.click();
    },
  },
//computed
    watch: {
    },
//global vars
	data: global => ({
    redirect: {
      path: ``,
      hasConfirmed: false
    },
    isShows: true,
    userId: '',
    prop: 'tracking',
    title: 'Tracking',
    increment: 0,
    tracks: [],
    schedules: [],
    original: [],
    schedule: {},
    params: {},
    keys: ['_id', 'patient', 'stage', 'track', 'modBy', 'modDate', 'isShow'],
    omitFields: ['isShow','modDate','_id','track'],
    filterCol: '',
    filterCols: [],
    headers: [],
    searchTerm: '',
    deleteIndex: 0,
		dialogs: {
    //textboxes only
      track: {
        show: false,
        dialog: 'generic',
        fields: ['patient'],
        dropdowns: [{field: 'patient', items: []}]
      },
    //textboxes only
      schedule: {
        show: false,
        dialog: 'schedule'
      },
    //other
      confirm: {
        show: false,
        command: '',
        question: ''
      },
    //save
      save: {
        show: false
      }
		}
  })
}
</script>