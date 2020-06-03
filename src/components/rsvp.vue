<template>
  <div class="row justify-center q-pa-lg">
      {{invite}}
    <div class="text-h5 text-center col-12 q-pb-md">{{ invite.eventDetails.eventtitle }}</div>
    <div class="col-4">
      <div class="text-subtitle1 text-center">Host</div>
      <div class="text-h6 text-center">{{ invite.eventDetails.hostedby }}</div>
      <div class="text-h6 text-center">Ph: {{ invite.eventDetails.phone }}</div>
    </div>
    <div class="col-4">
      <div class="text-subtitle1 text-center">Date</div>
      <div class="text-h6 text-center">
        Start: {{ new Date(invite.eventDetails.startdate).toDateString() }}
      </div>
      <div class="text-h6 text-center">
        End: {{ new Date(invite.eventDetails.enddate).toDateString() }}
      </div>
    </div>
    <div class="col-4">
      <div class="text-subtitle1 text-center">Venue</div>
      <div class="text-h6 text-center">{{ getAddress(invite) }}</div>
    </div>
    <div class="col-12 q-py-lg">
      <div class="text-subtitle1 text-center">Message</div>
      <div class="text-h6 text-center" style="max-width: 350px; margin: auto;">
        {{ invite.eventDetails.eventmessage }}
      </div>
    </div>
    <div class="text-subtitle1 text-center col-12 q-py-md">RSVP</div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Will Attend" no-caps
             :outline="status !== 1" color="green" @click="status = 1"/>
    </div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Tentaive" no-caps
             :outline="status !== 3" color="yellow" @click="status = 3"/>
    </div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Regrets" no-caps
             :outline="status !== 4" color="red" @click="status = 4"/>
    </div>
    <div class="col-12 q-py-md">
      <q-form
        v-show="status !== null && status !== 0"
        class="q-pa-sm row"
        :style="`max-width: ${max(600, ($q.screen.width/2))}px; margin: auto;`"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-input
          v-show="status !== 4"
          filled
          class="col-xs-12 col-sm-6"
          :class="`${$q.screen.gt.xs ? 'q-pr-xs' : ''}`"
          type="number"
          v-model.number="adults"
          label="Adults"
          lazy-rules
          :rules="[ val=> val !== null && val > 0 &&
           val <= invite.eventDetails.maxguests || 'Invalid Number']"
        />

        <q-input
          v-show="status !== 4"
          filled
          class="col-xs-12 col-sm-6"
          :class="`${$q.screen.gt.xs ? 'q-pl-xs' : ''}`"
          :disable="!invite.eventDetails.eventallowkids"
          type="number"
          v-model.number="kids"
          suffix="Kids"
          lazy-rules
          :rules="[ val=> val !== null && val >= 0 &&
           val <= invite.eventDetails.maxguests || 'Invalid Number']"
        />

        <q-input
          filled
          class="col-12 q-pb-md"
          type="textarea"
          v-model="message"
          label="Message to Host"
        />

        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
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
  name: 'statusComponent',
  data() {
    return {
      inviteId: '',
      invite: {},
      eventType: [],
      status: 0,
      adults: 1,
      kids: 0,
      message: '',
      colour: ['white', 'green', 'yellow', 'red', 'grey', 'black'],
    };
  },
  mounted() {
    this.inviteId = this.$route.params.inviteId;

    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;

    axios
      .get(`/api/userEvents/invites/${this.inviteId}`)
      .then((response) => {
        this.invite = response.data.data;
        console.log(this.invite);
        Loading.hide();
      })
      .catch((e) => {
        if (e.message === 'Request failed with status code 401') {
          this.$router.push('/login');
        } else if (e.message === 'Request failed with status code 400') {
          this.$router.push('/invites');
          e.message = 'Invite not found!';
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
    axios
      .get('/api/eventSystem/eventType')
      .then((Response) => {
        this.eventType = Response.data.data;
      });
  },
  methods: {
    getAddress(invite) {
      const address = invite.eventDetails.addresses;
      return `${address.eventaddress}, ${address.eventcity}, ${address.eventstate}, ${address.eventcountry} - ${address.eventzip}`;
    },
    max(a, b) {
      return (a > b) ? a : b;
    },
    onSubmit() {

    },
    onReset() {
      this.status = null;
      this.adults = 1;
      this.kids = 0;
      this.message = '';
    },
  },
};
</script>
