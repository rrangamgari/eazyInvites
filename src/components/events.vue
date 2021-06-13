<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="full-width q-px-md q-pb-md text-center col-12">
        <header class="section-header">
          <h3 style="color: #757575">{{ ((events(index).length == 0) ? 'No ' : '') + title }}</h3>
        </header>
      </div>
      <!-- <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-smr"> -->
        <div class="row warp ">
          <div class=" col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 q-px-md q-py-sm"
           v-for="event in events(index)" :key="event.eventdetailsidUI">
          <router-link :to="eventUrl(event.eventdetailsidUI,event.eventdetailsalphaid)">
          <div class="member rounded-borders" >
            <q-card class="rounded-borders text-grey">
              <q-img :src="event.attachmentlink" placeholder-src="~assets/logo/bird.png"
               :alt="event.eventtitle" :ratio="4/3" >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ (event.eventtitle && event.eventtitle.trim() !== '') ?
                  event.eventtitle : 'Untitled Event' }}
              </div>
              </q-img>
              <div class="member-info">
                  <div class="member-info-content">
                      <h4>Host: {{ event.hostedby }}</h4>
                      <span>Start: {{ (new Date(event.startdate)).toDateString() }}</span>
                      <span>End: {{ (new Date(event.enddate)).toDateString() }}</span>
                  </div>
              </div>
            </q-card>
          </div>
          </router-link>
          </div>
        </div>
        <!-- <div v-else class="row warp">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 q-px-md q-py-sm"
          v-for="event in events(index)" :key="event.eventdetailsidUI">
            <div class="member" >
          <q-card clickable v-ripple
                  @click="onCardClick(event.eventdetailsidUI,event.eventdetailsalphaid)">
              <q-img :src="event.attachmentlink && event.attachmentlink.startsWith('data:')
               ? (event.attachmentlink) : require('../assets/logo/bird.png')" alt :ratio="4/3">
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                  event.eventtitle : 'Untitled Event' }}
              </div>
              </q-img>
              <div class="member-info">
                  <div class="member-info-content">
                      <h4>Host: {{ event.hostedby }}</h4>
                      <span>Start: {{ (new Date(event.startdate)).toDateString() }}</span>
                      <span>End: {{ (new Date(event.enddate)).toDateString() }}</span>
                  </div>
              </div>
            </q-card>
              </div>
          </div>
        </div> -->
        <!-- <q-card clickable v-ripple @click="onCardClick(event.eventdetailsidUI)"> -->
          <!-- <div>
          <img src="../assets/logo/bird.png">
          <transition name="fade-in" mode="out-in">
            <slot v-if="!isShowing"></slot>
            <img v-else src="../assets/logo/bird.png" />
          </transition>
          </div> -->
          <!-- <img src="../assets/logo/bird.png"> -->
          <!-- <div class="member">
          <q-img
            src="../assets/logo/bird.png"
            basic
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                event.eventtitle : 'Untitled Event' }}
            </div>
            <span v-if="hover">This is a secret message.</span>
          </q-img>
          </div> -->
          <!-- <q-card-section class="q-pa-xs">
            <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
            {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                event.eventtitle : 'Untitled Event' }}
            </div>
          </q-card-section>
          <q-card-section class="q-pa-xs row items-center">
            <div class="col-7  q-px-xs">
              <div class="text-left q-px-xs" style="font-size: 10px;"
                   v-if="eventType[event.eventtypeid-1] != null">
                Type:  {{ eventType[event.eventtypeid-1].label }}
              </div>
              <div class="text-left q-px-xs" style="font-size: 10px;">
                Host: {{ event.hostedby }}
              </div>
            </div>
            <div class="col-5 q-px-xs">
              <div class="text-right q-px-xs" style="font-size: 10px;">
                Start: {{ (new Date(event.startdate)).toDateString() }}
              </div>
              <div class="text-right q-px-xs" style="font-size: 10px;">
                End: {{ (new Date(event.enddate)).toDateString() }}
              </div>
            </div>
          </q-card-section> -->
        <!-- </q-card> -->
    </div>
  </div>
</template>

<script>
import { Loading, QSpinnerBars, date } from 'quasar';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'eventsComponent',
  data() {
    return {
      data: [],
      events0: [],
      events1: [],
      titles: ['UPCOMING EVENTS', 'PAST EVENTS'],
      eventType: [],
      eventcard: null,
      // tmpImgSrc:"../assets/logo/bird.png"
    };
  },
  mounted() {
    if (this.$q.localStorage.getItem('login-token') === null) {
      this.$login(this.loadEvents, () => this.$router.push('/'));
    } else this.loadEvents();
  },
  methods: {
    // geteventcard(attachmentlink) {
    //   axios
    //     .get(attachmentlink, { responseType: 'arraybuffer' })
    //     .then((Response) => {
    //       const image = btoa(
    //         new Uint8Array(Response.data)
    //           .reduce((data, byte) => data + String.fromCharCode(byte), ''),
    //       );
    //       console.log(Response.headers);
    //       this.eventcard = `data:${Response.headers['content-type'].
    // toLowerCase()};base64,${image}`;
    //       // const bytes = new Uint8Array(response.data);
    //       // const binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
    //       // this.eventcard = 'data:image/jpeg;base64,' + btoa(binary);
    //       // return Buffer.from(Response.data, 'binary').toString('base64');
    //     });
    //   return this.eventcard;
    // },
    loadEvents() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'positive',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = this.$q.localStorage.getItem('login-token');
      axios
        .get('/api/userEvents/events')
        .then((response) => {
          this.data = response.data.data;
          this.createEvents();
          axios
            .get('/api/eventSystem/eventType')
            .then((Response) => {
              this.eventType = Response.data.data;
              Loading.hide();
              this.getImages();
            });
          Loading.hide();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'You need to Login to view this Content',
              position: 'top',
            });
            Loading.hide();
            this.$login(this.loadEvents, () => this.$router.push('/'));
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: e.message,
              position: 'top',
            });
            Loading.hide();
          }
        });
    },
    createEvents() {
      const today = new Date();
      this.data.forEach((event) => {
        if (date.getDateDiff(new Date(event.enddate), today, 'days') < 0) {
          this.events1 = this.events1.concat(event);
        } else {
          this.events0 = this.events0.concat(event);
        }
      });
    },
    getImages() {
      this.data.forEach((event) => {
        if (event.attachmentlink !== null) {
          axios.defaults.headers.Authorization = this.$q.localStorage.getItem('login-token');
          axios
            .get(event.attachmentlink, { responseType: 'arraybuffer' })
            .then((Response) => {
              const image = btoa(
                new Uint8Array(Response.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), ''),
              );
              event.attachmentlink = `data:${Response.headers['content-type'].toLowerCase()};base64,${image}`;
            });
        }
      });
    },
    events(index) {
      if (index === 0) {
        return this.events0;
      }
      return this.events1;
    },
    eventUrl(eventdetailsidUI, eventdetailsalphaid) {
      return `/events/${eventdetailsidUI}/${eventdetailsalphaid}`;
    },
    onCardClick(eventdetailsidUI, eventdetailsalphaid) {
      this.$router.push(`/events/${eventdetailsidUI}/${eventdetailsalphaid}`);
    },
    getcard(url) {
      return axios
        .get(url, { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'));
    },
  },
};
</script>
<!-- <template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md row warp items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="text-h6 q-px-md q-pb-md text-left col-12 text-primary">
        {{ ((events(index).length == 0) ? 'No ' : '') + title }}</div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
       v-for="event in events(index)" :key="event.eventdetailsidUI">
        <q-card clickable v-ripple @click="onCardClick(event.eventdetailsidUI)">
          <q-card-section class="q-pa-xs">
            <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
            {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                event.eventtitle : 'Untitled Event' }}
            </div>
          </q-card-section>
          <q-card-section class="q-pa-xs row items-center">
            <div class="col-7  q-px-xs">
              <div class="text-left q-px-xs" style="font-size: 10px;"
                   v-if="eventType[event.eventtypeid-1] != null">
                Type:  {{ eventType[event.eventtypeid-1].label }}
              </div>
              <div class="text-left q-px-xs" style="font-size: 10px;">
                Host: {{ event.hostedby }}
              </div>
            </div>
            <div class="col-5 q-px-xs">
              <div class="text-right q-px-xs" style="font-size: 10px;">
                Start: {{ (new Date(event.startdate)).toDateString() }}
              </div>
              <div class="text-right q-px-xs" style="font-size: 10px;">
                End: {{ (new Date(event.enddate)).toDateString() }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
import axios from 'axios';


axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'eventsComponent',
  data() {
    return {
      data: [],
      events0: [],
      events1: [],
      titles: ['Upcoming Events', 'Past Events'],
      eventType: [],
    };
  },
  mounted() {
    if (this.$q.localStorage.getItem('login-token') === null) {
      this.$login(() => this.$router.go(0), () => this.$router.push('/'));
    }
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios.defaults.headers.Authorization = this.$q.localStorage.getItem('login-token');
    axios
      .get('/api/userEvents/events')
      .then((response) => {
        this.data = response.data.data;
        this.createEvents();
        axios
          .get('/api/eventSystem/eventType')
          .then((Response) => {
            this.eventType = Response.data.data;
            Loading.hide();
          });
      })
      .catch((e) => {
        if (e.message === 'Request failed with status code 401') {
          this.$q.localStorage.remove('login-token');
          this.$login(() => this.$router.go(0), () => this.$router.push('/'));
        }
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top',
        });
        Loading.hide();
      });
  },
  methods: {
    createEvents() {
      const date = new Date();
      this.data.forEach((event) => {
        if ((new Date(event.enddate)).getTime() < date.getTime()) {
          this.events1 = this.events1.concat(event);
        } else {
          this.events0 = this.events0.concat(event);
        }
      });
    },
    events(index) {
      if (index === 0) {
        return this.events0;
      }
      return this.events1;
    },
    onCardClick(eventdetailsidUI) {
      this.$router.push(`/events/${eventdetailsidUI}`);
    },
  },
};
</script> -->
