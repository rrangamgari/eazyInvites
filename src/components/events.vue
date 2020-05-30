<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md row warp items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="text-h6 q-px-md q-pb-md text-left col-12">
        {{ ((events(index).length == 0) ? 'No ' : '') + title }}</div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
       v-for="event in events(index)" :key="event.eventdetailsid">
        <q-card clickable v-ripple @click="onCardClick(event.eventdetailsid)">
          <q-card-section class="q-pa-xs">
            <div class="text-center text-weight-medium" style="font-size: 16px;">
            {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                event.eventtitle : 'Untitled Event' }}
            </div>
          </q-card-section>
          <q-card-section class="q-pa-xs row items-center">
            <div class="col-7  q-px-xs">
              <div class="text-left q-px-xs" style="font-size: 10px;">
                Type: {{ eventType[event.eventtypeid-1].label }}
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
import { Loading, QSpinnerTail } from 'quasar';
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
      titles: ['Upcoming Events', 'Past Events'],
      eventType: [],
    };
  },
  mounted() {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;
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
          this.$router.push('/login');
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
    onCardClick(eventdetailsid) {
      this.$router.push(`/events/${eventdetailsid}`);
    },
  },
};
</script>
