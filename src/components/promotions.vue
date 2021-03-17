<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="full-width q-px-md q-pb-md text-center col-12">
        <header class="section-header">
          <h3 style="color: #252524">{{ ((events(index).length == 0) ? 'No ' : '') + title }}</h3>
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
      <!--<div id = "sse" @click="webSocketTest">
        Run WebSocket
      </div>-->
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
      titles: ['CURRENT PROMOTIONS', 'PAST PROMOTIONS'],
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
    loadEvents() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'positive',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .get('/api/userEvents/events')
        .then((response) => {
          this.data = response.data.data;
          if (this.data === 'User is null') {
            this.$q.localStorage.remove('login-token');
            if (this.$route.path === '/') this.$router.go(0);
            else this.$router.push('/');
          } else {
            this.createEvents();
            axios
              .get('/api/eventSystem/eventType')
              .then((Response) => {
                this.eventType = Response.data.data;
                Loading.hide();
                this.getImages();
              });
          }
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
          axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
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
      return `/promotions/${eventdetailsidUI}/${eventdetailsalphaid}`;
    },
    onCardClick(eventdetailsidUI, eventdetailsalphaid) {
      this.$router.push(`/promotions/${eventdetailsidUI}/${eventdetailsalphaid}`);
    },
    getcard(url) {
      return axios
        .get(url, { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'));
    },
  },
};
</script>
