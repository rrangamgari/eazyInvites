<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg q-px-md row warp items-center"
     v-for="(title,index) in titles" :key="index">
      <div class="full-width q-px-md q-pb-md text-center col-12">
        <header class="section-header">
          <h3 style="color: #757575">{{ ((invites(index).length == 0) ? 'No ' : '') + title }}</h3>
        </header>
      </div>
      <div class=" col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 q-px-md q-py-sm"
       v-for="invite in invites(index)" :key="invite.eventguestsidUI">
        <router-link :to="inviteUrl(invite.eventguestsidUI,
         invite.eventDetails.eventdetailsalphaid)">
        <div class="member rounded-borders" >
        <q-card>
          <q-img :src="invite.eventDetails.attachmentlink" placeholder-src="~assets/logo/bird.png"
           :alt="invite.eventDetails.eventtitle" :ratio="4/3">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ (invite.eventDetails.eventtitle !== null &&
              invite.eventDetails.eventtitle.trim() !== '') ?
              invite.eventDetails.eventtitle : 'Untitled Event' }}
            </div>
          </q-img>
          <div class="member-info">
            <div class="member-info-content">
              <h4>Host: {{ invite.eventDetails.hostedby }}</h4>
              <span> Type: {{ eventType[invite.eventDetails.eventtypeid-1] !== null &&
               eventType[invite.eventDetails.eventtypeid-1] !== undefined ?
               eventType[invite.eventDetails.eventtypeid-1].label : '' }}</span>
            </div>
          </div>
        </q-card>
        </div>
        </router-link>
      </div>
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
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
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
            Loading.hide();
            this.getImages();
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
    createInvites() {
      const today = new Date();
      this.data.forEach((invite) => {
        if (date.getDateDiff(new Date(invite.eventDetails.enddate), today, 'days') < 0) {
          this.invites1 = this.invites1.concat(invite);
        } else {
          this.invites0 = this.invites0.concat(invite);
        }
      });
    },
    getImages() {
      this.data.forEach((invite) => {
        if (invite.eventDetails.attachmentlink !== null) {
          axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
          axios
            .get(invite.eventDetails.attachmentlink, { responseType: 'arraybuffer' })
            .then((Response) => {
              const image = btoa(
                new Uint8Array(Response.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), ''),
              );
              invite.eventDetails.attachmentlink = `data:${Response.headers['content-type'].toLowerCase()};base64,${image}`;
            });
        }
      });
    },
    invites(index) {
      if (index === 0) {
        return this.invites0;
      }
      return this.invites1;
    },
    inviteUrl(eventguestsidUI, eventdetailsalphaid) {
      return `/invites/${eventguestsidUI}/${eventdetailsalphaid}`;
    },
    onCardClick(eventguestsidUI, eventdetailsalphaid) {
      this.$router.push(`/invites/${eventguestsidUI}/${eventdetailsalphaid}`);
    },
  },
};
</script>
