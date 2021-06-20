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
  <!--schedule-->
    <transition name="fade">
        <schedule 
          :data='schedule' 
          :params='params'
          v-if="dialogs.schedule.show" 
          @closeDialog="closeDialog($event)">
        </schedule>
    </transition>
  <!--zone-->
    <transition name="fade">
        <zone 
          :data='zone' 
          :params='params'
          v-if="dialogs.zone.show" 
          @closeDialog="closeDialog($event)">
        </zone>
    </transition>
  <!--event-->
    <transition name="fade">
        <event
          v-if='dialogs.event.show' 
          @closeDialog="closeDialog($event)">
        </event>
    </transition>
<!--header bar-->
  <banner class='no-print'></banner><!--height provides upper offset-->
<!--sub bar-->
<v-card-title
	primary-title 
	style='color: white; background-color: #192c45 !important;'>
<!--title-->
	<v-icon dark left>event</v-icon>
	<small>Scheduling</small>
    <!--export button-->
      <v-btn dense dark 
        class='dizagara-button-blue dizagara-width-medium'
        style='position: absolute; right: 130px;'
        @click='exportSpreadsheet()'>
        <span class="mdi mdi-18px dizagara-margin-right" id='exportIcon'></span>
        EXPORT
      </v-btn>
    <!--save button-->
      <v-btn dense dark 
        class='dizagara-button-green dizagara-width-medium'
        style='position: absolute; right: 15px; width: 100px !important;'
        @click='saveEvents()'>
        <span class="mdi mdi-18px dizagara-margin-right" id='saveIcon'></span>
        SAVE
      </v-btn>
</v-card-title>
<!--filters-->
<v-row style='margin-bottom: -50px; margin-left: 5px;'>
<v-col class='col-md-2'>
  <!--filter centers-->
  <v-autocomplete dense outlined
    background-color='yellow lighten-4'
    v-model='filter.center'
    :items='props.centers'
    :item-text='a => a.name'
    :item-value='a => a'
    @change='loadEvents(true)'
    label='Filter Center'
  ></v-autocomplete>
</v-col>
<span v-if='filter.center && filter.center.rooms'>
  <!--filter rooms-->
  <v-col class='col-md-9'  style='width: calc(80vw)'>
    <div id='filterRooms'>
    <v-autocomplete outlined dense chips small-chips multiple
      v-model='filter.rooms'
      :items="filter.center.rooms"
      :item-text='a => a.name'
      :item-value='a => a'
      label='Filter Room(s)'  
      @change='loadEvents()'>
      <template #selection="{item, index}">
        <v-chip dark close 
           @click:close="removeFilter(index)"
          :color="getColor(item.key)">
          <strong style='color: white;'>{{item.name}}</strong>
        </v-chip>
      </template>
    </v-autocomplete>
    </div>
  </v-col>
 <v-col class='col-md-1'>
  <v-btn dense dark icon
    class='dizagara-button-blue dizagara-width-medium'
    title='Hide/show all room filters...'
    @click='toggleFilters()'>
    <span class="mdi mdi-18px dizagara-margin-right mdi-eye" id='viewIcon'></span>
  </v-btn>
</v-col>
</span>
</v-row>
<!--calendar-->
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
          <!--today button-->
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday()">
              Today
            </v-btn>
          <!--move left button-->
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev()">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
          <!--move right button-->
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next()">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
          <!--title-->
            <v-toolbar-title v-if="$refs.calendar">
              {{$refs.calendar.title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          <!--period-->
            <v-menu
              bottom
              right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on">
                  <span>{{ typeLabels[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
      <!--calendar-->
        <v-sheet style='height: calc(100vh - 350px)'>
          <!--don't add args, will error out-->
          <v-calendar 
            ref='calendar'
            v-model='focus'
            color='primary'
            :events='events'
            :event-color='getEventColor'
            :type='type'
            @click:more="viewDay"
            @click:date="viewDay"
            @click:event='editEvent'
            @change='updateRange'
            @mousedown:event='startDrag'
            @mousedown:time='startTime'
            @mousemove:time='mouseMove'
            @mouseup:time='endDrag'
            @mouseleave.native='cancelDrag'>
            <template v-slot:event="{ event, timed, eventSummary }" >
              <div
                class="v-event-draggable"
                v-html="eventSummary()"
              ></div>
              <div
                v-if="timed"
                class="v-event-drag-bottom"
                @mousedown.stop="extendBottom(event)"
              ></div>
            </template>
            <template v-slot:day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              ></div>
            </template>
          </v-calendar>
          <v-menu
            v-model='selectedOpen'
            :close-on-content-click='false'
            :activator='selectedElement'
            offset-x>
            <v-card
              color='grey lighten-4'
              min-width='350px'
              flat>
            <v-toolbar
              :color='selectedEvent.color'
              dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html='selectedEvent.name'></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html='selectedEvent.details'></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color='secondary'
                @click='selectedOpen = false'>
                CANCEL
              </v-btn>
            </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
  import banner from '../components/generics/banner.vue';
	import schedule from '../components/dialogs/schedule.vue';
  import zone from '../components/dialogs/zone.vue';
  import save from '../components/dialogs/save.vue';
  import event from '../components/dialogs/event.vue';
  import references from '../utils/references.js';
  import converters from '../utils/converters.js';
  import utils from '../utils/utils.js';
//master
	export default {
//name
	name: 'scheduling',
//components
	components: {
    banner, schedule, zone, event, save
	},
//cycle methods
  //created
    async created(){
      //init timeout
        setTimeout(() => {
          $('#zoneIcon').addClass(references.getIcon('add'));
          $('#exportIcon').addClass(references.getIcon('download'));
          $('#saveIcon').addClass(references.getIcon('save'));
          $('#viewIcon').addClass(references.getIcon('show'));//has trouble loading
        }, 0);
    //get data
      this.user = await bridge.getUser({
          id: this.$route.params.id
      });
      this.schedules = await bridge.getCollection({collection: 'schedules'}) || [];
      this.zones = await bridge.getCollection({collection: 'zones'}) || [];
    //update originals
      this.original.schedules = utils.deepClone(this.schedules);
      this.original.zones = utils.deepClone(this.zones);
    //get preps
      let preps = await bridge.getCollection({collection: `preps`}) || [];
      this.props.preps = {};
      this.props.preps.patients = preps.filter(a => a.type == 'patient');
    //get centers
      this.props.centers = await bridge.getCollection({collection: 'centers'}) || [];
      if(this.props.centers && this.props.centers.length){
        this.filter.center = this.props.centers[0];
      }
      this.loadEvents(true);
      this.ready = true; //don't move below scrollToTime() or udpateTime()
      this.scrollToTime();
      this.updateTime();
    //instructions
      toastr.info(`Click and drag anywhere on the calendar to create a schedule event!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
    },
//before exit
  beforeRouteLeave (to, from, next){
    if(!this.redirect.hasConfirmed){
      let originalJson = {
        schedules: JSON.stringify(this.original.schedules),
        zones: JSON.stringify(this.original.zones)
      }
      let modifiedJson = {
        schedules: JSON.stringify(this.schedules),
        zones: JSON.stringify(this.zones)
      }
      if(originalJson.schedules.localeCompare(modifiedJson.schedules) != 0 || 
        originalJson.zones.localeCompare(modifiedJson.zones) != 0){ 
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
    //load events
      loadEvents(resetFilters){
      //init
        this.events = [];
        if(resetFilters && this.filter.center.rooms.length){
          this.filter.rooms = [];
          this.filter.rooms.push(this.filter.center.rooms[0]);   
        }
      //schedules
        this.schedules.forEach(a => {
          if(this.filter.center._id == a.location.center._id){
            if(this.filter.center.rooms.some(b => this.filter.rooms.some(c => b.key == c.key) && b.key == a.location.room.key)){
              this.events.push({
                name: `${a.patient.first} ${a.patient.last} - ${a.procedure.procedure.name}`,
                color: this.getColor(a.location.room.key),
                start: moment(`${a.schedule.date} ${a.schedule.start}`).valueOf(),
                end: moment(`${a.schedule.date} ${a.schedule.end}`).valueOf(),
                timed: true,
                type: 'schedule',
                key: a._id,
                isNew: false
              });
            }
          }
        });
      //zones
        this.zones.forEach(a => {
          if(this.filter.center._id == a.location.center._id){
            if(this.filter.center.rooms.some(b => this.filter.rooms.some(c => b.key == c.key) && b.key == a.location.room.key)){
            //init
              let occurrences = [];
            //single
              if(a.schedule.type == `single`){
                occurrences.push({
                  start: moment(`${a.schedule.date} ${a.schedule.start}`).valueOf(),
                  end: moment(`${a.schedule.date} ${a.schedule.end}`).valueOf()
                });
              } 
            //repeat
              else if(a.schedule.type == `repeat`){
              //init
                let start = ``;
                let end = ``;
              //forever
                if(a.schedule.frequency == `forever`){
                  start = moment(this.range.start.date).startOf('day');
                  end = moment(this.range.end.date).startOf('day');
                } 
              //range
                else if(a.schedule.frequency == `range`){
                  start = moment(a.schedule.rangeStart).startOf('day');
                  end = moment(a.schedule.rangeEnd).startOf('day');
                }
              //add to occurences
                while(start.diff(end) <= 0){
                  let date = start.format(`YYYY-MM-DD`);
                  let weekIndex = start.day();
                  if(a.schedule.repeat[weekIndex]){
                    occurrences.push({
                      start: moment(`${date} ${a.schedule.start}`).valueOf(),
                      end: moment(`${date} ${a.schedule.end}`).valueOf()
                    });
                  }
                  start.add(1, 'days');
                }
              }
              //occurences
                occurrences.forEach(b => {
                  this.events.push({
                    name: `${a.label}`,
                    color: `red`,
                    start: b.start,
                    end: b.end,
                    timed: true,
                    type: 'zone',
                    key: a._id,
                    isNew: false
                  });
                });
            }
          }
        });
      },
  //start drag
    startDrag ({ event, timed }) {
      //avoid adding events on zones
        if(event.type){
          this.abortEvent = true;
          return;
        }
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
    },
  //start time
    startTime (currentTime, b, c, d) {
    //don't allow editing schedules if more than one room is selected
      if(this.filter.center.rooms.filter(a => this.filter.rooms.some(b => a.key == b.key)).length != 1){
        //this.params && this.params.event && this.params.event.isNew
        $('#filterRooms').effect( 'shake' ,{times:2, distance: 5}, 400 ); //shake the room filter
        toastr.error(`Exactly ONE room must be filtered to add an event!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        return;
      }
    //avoid adding events on zones
      if(this.abortEvent){
        this.abortEvent = false;
        return;
      }
    //add event
      let mouse = this.toTime(currentTime)
      if (this.dragEvent && this.dragTime === null) {
        let start = this.dragEvent.start;
        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);
        this.createEvent = {
          name: `Draft Event #${this.events.length + 1}`,
          color: `grey`,
          start: this.createStart,
          end: this.createStart,
          timed: true,
          isNew: true
        }
        this.events.push(this.createEvent)
      }
    },
  //mouse move
    mouseMove (tms) {
      let mouse = this.toTime(tms)
      if (this.dragEvent && this.dragTime !== null) {
        let start = this.dragEvent.start
        let end = this.dragEvent.end
        let duration = end - start
        let newStartTime = mouse - this.dragTime
        let newStart = this.roundTime(newStartTime)
        let newEnd = newStart + duration
        this.dragEvent.start = newStart
        this.dragEvent.end = newEnd
      } else if (this.createEvent && this.createStart !== null) {
        let mouseRounded = this.roundTime(mouse, false)
        let min = Math.min(mouseRounded, this.createStart)
        let max = Math.max(mouseRounded, this.createStart)
        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
  //end drag
    endDrag () {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
      this.extendOriginal = null
    },
  //cancel drag
    cancelDrag () {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          let i = this.events.indexOf(this.createEvent)
          if (i !== -1) {
            this.events.splice(i, 1)
          }
        }
      }
      this.createEvent = null
      this.createStart = null
      this.dragTime = null
      this.dragEvent = null
    },
  //round time
    roundTime (time, down = true) {
      let roundTo = 15 // minutes
      let roundDownTime = roundTo * 60 * 1000
      return down
        ? time - time % roundDownTime
        : time + (roundDownTime - (time % roundDownTime))
    },
  //to time
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    },
  //get event color
    getEventColor(event) {
      return event.color;
    },
  //cross-reference the event color
    getColor(room){
      let index = this.filter.center.rooms.findIndex(a => a.key == room);
      return this.colors[parseInt(index%this.colors.length)];
    },
  //toggle filters
    toggleFilters(){
      this.viewAll = !this.viewAll;
      let icon01 = this.viewAll ? `show` : `hide`;
      let icon02 = this.viewAll ? `hide` : `show`;
      $('#viewIcon').removeClass(references.getIcon(icon01));
      $('#viewIcon').addClass(references.getIcon(icon02));
      if(this.viewAll){
        this.filter.rooms = utils.deepClone(this.filter.center.rooms);
      }else{
        this.filter.rooms = [];
      }
      this.loadEvents();
    },
  //close dialog
    async closeDialog(params){
    //process input
      if(this.params.dialog == `save`){
        this.dialogs.save.show = false;
        if(params.action == 'submit'){
          this.saveEvents();
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
    //generics
        this.dialogs[this.params.type].show = false;
      //cancel action
        if(params.action == `cancel`){
          return;
        }
      //event dialog
        else if(this.params.type == `event`){
          this.params.type = params.data.type;
          this.dialogs[this.params.type].show = true;
        }
      //zone + schedule dialog
        else if(this.params.type == `zone` || this.params.type == `schedule`){
        //close dialog
          //init
            let term = ``;
            if(params.action == 'submit'){
            //new zone
              if(this.params.isNew){
                //get unique id
                  term = `added`;
                  let ids = this[`${this.params.type}s`].map(a => a._id);
                  params.data._id = `${this.params.type.slice(0,3)}#${utils.getNextId(ids)}`;
                //load zones
                  this[`${this.params.type}s`].push(params.data);
              }
            //existing zone
              else{
                term = `edited`;
                this[`${this.params.type}s`][this.params.index] = utils.deepClone(params.data);
              }
            }else if(params.action == 'delete'){
              term = `deleted`;
              this[`${this.params.type}s`].splice([this.params.index], 1);
            }
          //notify
            toastr.info(`${converters.capitalizeFirst(this.params.type)}(s) ${term} successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
          //update filters
            this.loadEvents();
        }
      }   
    },
  //set today
    setToday(){
      this.focus = ''
    },
  //prev calendar page
    prev(){
      this.$refs.calendar.prev();
    },
  //next calendar page
    next(){
      this.$refs.calendar.next();
    },
  //extend bottom of event
    extendBottom (event) {
      if(event.type){
        toastr.error(`Can not drag event after it's already created, open the dialog to modify date times!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
        return;
      }
      this.createEvent = event
      this.createStart = event.start
      this.extendOriginal = event.end
    },
  //edit event
    editEvent({nativeEvent, event}){
    //exit out if more than one room filtered, startTime() will take care of toastr
      if(this.filter.rooms.length > 1){
        return;
      }
    //update params
      this.params.zones = utils.deepClone(this.zones);
      this.params.schedules = utils.deepClone(this.schedules);
      this.params.center = this.filter.center;
      this.params.room = this.filter.rooms[0];
      this.params.isNew = event.isNew;
      this.params.event = event;
      this.params.type = ``;
      if(event.isNew){
         if(['master', 'center'].includes(this.user.privilege)){
           this.params.type = `event`;
         }else{
           this.params.type = `schedule`;
         }
      }else{
        this.params.type = event.type;
      //if existing, get params
        //zone
          if(event.type == `zone`){
            this.params.index = this.zones.findIndex(a => a._id == event.key);
            this.zone = utils.deepClone(this.zones[this.params.index]);
          }
        //schedule
          else if(event.type == `schedule`){
            this.params.index = this.schedules.findIndex(a => a._id == event.key);
            this.schedule = utils.deepClone(this.schedules[this.params.index]);
          }
      }
      //load dialog
        this.dialogs[this.params.type].show = true;
    },
  //view the date that is clicked on
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
  //update start/end time
    updateRange ({start, end}) {
      this.range.start = start;
      this.range.end = end;
      this.loadEvents();
    },
  //remove filter
    removeFilter(index){
      this.filter.rooms.splice(index, 1);
      this.loadEvents();
    },
  //get current time
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
  //scroll to time
    scrollToTime () {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)
      this.cal.scrollToTime(first)
    },
  //update the time
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
  //save schedules and zones
    async saveEvents(){
    //save property
      await bridge.setCollection({
        collection: `schedules`,
        data: this.schedules
      });
      await bridge.setCollection({
        collection: `zones`,
        data: this.zones
      });
    //update originals
      this.original.schedules = utils.deepClone(this.schedules);
      this.original.zones = utils.deepClone(this.zones);
    //notify
      toastr.success(`Event(s) saved successfully!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
    },
  //flatters
    flattenAsIs(schedule, object){
      Object.keys(object).forEach(a => {
        if(typeof object[a] == `boolean`){
          if(object[a]){
            schedule[a] = `yes`;
          }else{
            schedule[a] = `no`;
          }
        }else{
          schedule[a] = object[a] ? object[a] : `(none)`;
        }
      });
    },
  //export to csv
    exportSpreadsheet(){
      //init
        let csvStructure = [];
      //condition
        let toExport = [];
        this.schedules.forEach(a => {
          let schedule = {};
          Object.keys(a).forEach(b => {
            if(b == `location`){
              schedule.center = converters.getKeyValueFriendly(a[b].center._id, a[b].center.name);
              schedule.room = converters.getKeyValueFriendly(a[b].room.key, a[b].room.name);
            }else if(b == `patient`){
              schedule.patient = converters.getKeyValueFriendly(a[b].id, `${a[b].first} ${a[b].last}`);
              schedule.patientPreps = a[b] && a[b].preps && a[b].preps.length ? a[b].preps.map(a => converters.getKeyValueFriendly(a.key, a.name)).join(`+`) : `(none)`;
            }else if(b == `communication`){
              this.flattenAsIs(schedule, a[b]);
            }else if(b == `diagnose`){
              schedule.diagnose = converters.getKeyValueFriendly(a[b].diagnose._id, `${a[b].diagnose.name}`);
              schedule.code = converters.getKeyValueFriendly(a[b].code._id, `${a[b].code.name}`);
            }else if(b == `procedure`){
              schedule.procedure = converters.getKeyValueFriendly(a[b].procedure._id, `${a[b].procedure.name}`);
              schedule.code = converters.getKeyValueFriendly(a[b].code._id, `${a[b].code.name}`);
              schedule.surgeon = converters.getKeyValueFriendly(a[b].surgeon._id, `${a[b].surgeon.first} ${a[b].surgeon.last}`);
              schedule.procedurePreps = a[b] && a[b].preps && a[b].preps.length ? a[b].preps.map(a => converters.getKeyValueFriendly(a.key, a.name)).join(`+`) : `(none)`;
            }else if(b == `schedule`){
              this.flattenAsIs(schedule, a[b]);
            }else if(b == `insurance`){
              schedule.primary = converters.getKeyValueFriendly(a[b].primary._id, `${a[b].primary.name}`);
              schedule.secondary = converters.getKeyValueFriendly(a[b].secondary._id, `${a[b].secondary.name}`);
            }else if(b == `comments`){
              this.flattenAsIs(schedule, a[b]);
            }else if(b != `track`){//everything else, except track, don't feel like belongs here
              if(b == `modDate`){
                schedule[b] = converters.getFriendlyDate(a[b]);
              }else{
                schedule[b] = a[b];
              }
            }
          });
          toExport.push(schedule);
        });
        toExport.forEach(a => delete a.isShow);
      //build data
        //headers
          let headers = Object.keys(toExport[0]);
          csvStructure.push(headers);
        //content
          toExport.forEach(a => {
            let row = [];
            headers.forEach(b => {
            //filter types
              let element = a[b].toString();
              element = element.replace(/#/g, '');
              element = element.replace(/,/g, ' ');
            //push element
              row.push(element);
            });
            csvStructure.push(row);
          });
      //bind
        let csvContent = "data:text/csv;charset=utf-8," + csvStructure.map(e => e.join(",")).join("\n");
      //download
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `schedules.csv`);
        document.body.appendChild(link);
        link.click();
    }
  },
  //mounted
    mounted () {
      this.$refs.calendar.checkChange();
    },
  //computed
    computed: {
      cal(){
        return this.ready ? this.$refs.calendar : null
      },
      nowY(){
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
  },
//global vars
	data: global => ({
    value: '',
    user: {},
    ready: false,
    abortEvent: false,
    redirect: {
      path: ``,
      hasConfirmed: false
    },
    filter: {
      center: {rooms: []},
      rooms: []
    },
    viewAll: false,
    props: {},
    params: {},
    original: {
      schedules: [],
      zones: []
    },
    zone: {},
    zones: [],
    schedule: {},
    schedules: [],
    focus: '',
    type: 'week',
    typeLabels: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['indigo', 'blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'amber', 'orange', 'pink lighten-2', 'pink', 'purple', 'deep-purple'],
    range: {
      start: {},
      end: {}
    },
    dialogs: {
    //textboxes only
      schedule: {
        show: false,
        dialog: 'schedule'
      },
      zone: {
        show: false,
        dialog: 'zone'
      },
      event: {
        show: false,
        dialog: 'event'
      },
      save: {
        show: false
      }
    }
	})
}
</script>