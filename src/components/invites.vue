<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md row warp items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="text-h6 q-px-md q-pb-md text-left col-12">
        {{ ((invites(index).length == 0) ? 'No ' : '') + title }}</div>
      <div class="col-12 q-px-md q-pr-lg q-py-sm"
       v-for="invite in invites(index)" :key="invite.eventguestsid">
        <q-card class="q-pa-xs row items-center">
          <q-card-section class="col-9 justify-left">
            <div class="text-weight-medium" style="font-size: 16px;">
              {{ (invite.eventDetails.eventtitle !== null &&
              invite.eventDetails.eventtitle.trim() !== '') ?
              invite.eventDetails.eventtitle : 'Untitled Event' }}
            </div>
            <div class="text-left q-px-xs" style="font-size: 10px;">
              Host: {{ invite.eventDetails.hostedby }}
            </div>
            <div class="text-left q-px-xs" style="font-size: 10px;">
              Type: {{ eventType[invite.eventDetails.eventtypeid-1].label }}
            </div>
          </q-card-section>
          <q-card-actions class="col-3 q-pl-sm">
            <q-space/>
            <q-btn no-caps :to="`/invites/${invite.eventguestsid}`" label="View"/>
          </q-card-actions>
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
  name: 'invitesComponent',
  data() {
    return {
      data: [],
      invites0: [],
      invites1: [],
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
      .get('/api/userEvents/invites')
      .then((response) => {
        this.data = response.data.data;
        this.createInvites();
        axios
          .get('/api/eventSystem/eventType')
          .then((Response) => {
            this.eventType = Response.data.data;
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
      });
    Loading.hide();
  },
  methods: {
    createInvites() {
      const date = new Date();
      this.data.forEach((invite) => {
        if ((new Date(invite.eventDetails.enddate)).getTime() < date.getTime()) {
          this.invites1 = this.invites1.concat(invite);
        } else {
          this.invites0 = this.invites0.concat(invite);
        }
      });
    },
    invites(index) {
      if (index === 0) {
        return this.invites0;
      }
      return this.invites1;
    },
  },
};
</script>
