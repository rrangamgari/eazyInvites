<template>
  <q-page>
  <q-img v-if="file !== null" class="full-width bg-white" :height="`${$q.screen.height-height}px`"
   transition="rotate" contain :src="file"/>
  <div class="row justify-center q-pa-lg">
    <div class="text-h5 text-center col-12 q-pb-md">
    {{invite.eventDetails.eventtitle ? invite.eventDetails.eventtitle : 'Untitled Event'}}
    </div>
    <div class="col-xs-12 col-sm-4" v-if="invite.eventDetails.hostedby">
      <div class="text-subtitle1 text-center">Host</div>
      <div class="text-h6 text-center">{{ invite.eventDetails.hostedby }}</div>
      <div class="text-h6 text-center">Ph: {{ invite.eventDetails.phone }}</div>
    </div>
    <div class="col-xs-12 col-sm-4" v-if="invite.eventDetails.startdate">
      <div class="text-subtitle1 text-center">Date</div>
      <div class="text-h6 text-center">
        Start: {{ new Date(invite.eventDetails.startdate).toUTCString() }}
      </div>
      <div class="text-h6 text-center">
        End: {{ new Date(invite.eventDetails.enddate).toUTCString() }}
      </div>
    </div>
    <div class="col-xs-12 col-sm-4" v-if="invite.eventDetails.addresses">
      <div class="text-subtitle1 text-center">Venue</div>
      <div class="text-h6 text-center">{{ getAddress(invite) }}</div>
    </div>
    <div class="col-12 q-py-lg">
      <div class="text-subtitle1 text-center">Message</div>
      <div class="text-h6 text-center" style="max-width: 350px; margin: auto;"
       v-html="invite.eventDetails.eventmessagehtml"></div>
    </div>
    <div class="text-subtitle1 text-center col-12 q-py-md">RSVP</div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Will Attend" no-caps
             :outline="status !== 1" color="green" @click="status = 1"/>
    </div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Tentaive" no-caps
             :outline="status !== 2" color="yellow" @click="status = 2"/>
    </div>
    <div class="q-pa-sm" :style="`width: ${max(200, ($q.screen.width/6))}px;`">
      <q-btn style="width:100%;" unelevated label="Regrets" no-caps
             :outline="status !== 3" color="red" @click="status = 3"/>
    </div>
    <div class="col-12 text-center text-red q-pa-xs text-caption"
     v-if="!([1, 2, 3].includes(this.status)) && error">Please select an option above</div>

    <div class="col-12 q-py-md">
      <q-form
        v-show="status !== null && status !== 0"
        class="q-pa-sm row"
        :style="`max-width: ${max(600, ($q.screen.width/2))}px; margin: auto;`"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-input
          v-show="status !== 3"

          class="col-xs-12 col-sm-6"
          :class="`${$q.screen.gt.xs ? 'q-pr-xs' : ''}`"
          type="number"
          :max="invite.eventDetails.maxguests"
          min=1
          v-model.number="adults"
          label="Adults"
          lazy-rules
          :rules="[ val=> val !== null || 'Invalid Number']"
        />

        <q-input
          v-show="status !== 3"

          class="col-xs-12 col-sm-6"
          :class="`${$q.screen.gt.xs ? 'q-pl-xs' : ''}`"
          :disable="!invite.eventDetails.eventallowkids"
          type="number"
          :max="invite.eventDetails.maxguests"
          min=0
          v-model.number="kids"
          suffix="Kids"
          lazy-rules
          :rules="[ val=> val !== null  || 'Invalid Number']"
        />

        <q-input

          class="col-12 q-pb-md"
          type="textarea"
          v-model="message"
          label="Message to Host"
          maxlength="800"
        />

        <!--div class="col-12" v-for="(poll,index) in polls" :key="index">
          <q-field
            class="q-pt-md q-pb-md"

            label-width="12"
            :label="poll.question"
            v-model="poll.answer"
            lazy-rules
            :rules="[ val => !poll.required ||
             ( val !== null && val !== '' && val.length !== 0 || 'Please choose an option' )]"
          >
          <div style="padding:0px; margin:0px; font-size:16px; color:black;">
            <q-option-group
              class="q-pt-md q-pb-xs"
              :options="poll.options"
              :label="`poll-${index+1}`"
              :type="(poll.type === 'S') ? 'radio' : 'checkbox'"
              v-model="poll.answer"
              size="xs"
              style="font-size:14px"
            />
          </div>
          </q-field>
        </div-->

        <div class="q-pt-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
  </q-page>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
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
      invite: { eventDetails: {} },
      eventType: [],
      height: 50,
      file: null,
      status: Number(this.$route.query.status) || 0,
      adults: 1,
      kids: 0,
      message: '',
      error: false,
      polls: [{
        type: 'S',
        required: false,
        question: 'Some Non-Mandatory Sngle Option Poll Question with Three Options',
        options: [{ label: 'Option 1', value: 'op1' }, { label: 'Option 2', value: 'op2' }, { label: 'Option 3', value: 'op3' }],
        answer: '',
      },
      {
        type: 'M',
        required: true,
        question: 'Some Mandatory Multiple Option Poll Question with Four Options',
        options: [{ label: 'Option 1', value: 'op1' }, { label: 'Option 2', value: 'op2' }, { label: 'Option 3', value: 'op3' }, { label: 'Option 4', value: 'op4' }],
        answer: [],
      },
      ],
    };
  },
  created() {
    this.inviteId = this.$route.params.inviteId;
    this.inviteAplhaId = this.$route.params.inviteAplhaId;
    this.auth = this.$route.query.auth;
  },
  mounted() {
    this.height = document.getElementById('header').clientHeight;
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios.defaults.headers.Authorization = !this.auth ? `Bearer ${this.$q.localStorage.getItem('login-token')}` : null;

    axios.get(`/api/userEvents/invites/${this.inviteId}/${this.inviteAplhaId}`,
      this.auth ? { params: { auth: this.auth } } : null)
      .then((response) => {
        this.invite = response.data.data;
        if (this.invite.status.eventstatusid >= 6) {
          this.status = Number(this.$route.query.status) || 5;
          axios.put(`/api/userEvents/invites/${this.inviteId}`,
            {
              status: { eventstatusid: 5, eventstatusdescription: '' },
              headcount: 1,
              kidscount: 0,
            },
            this.auth ? { params: { auth: this.auth } } : null);
        } else this.status = Number(this.$route.query.status) || this.invite.status.eventstatusid;
        this.adults = this.invite.headcount || 1;
        this.kids = this.invite.kidscount;
        this.message = this.invite.message;
        if (this.invite.eventDetails.attachmentlink !== null) {
          axios
            .get(this.invite.eventDetails.attachmentlink, { responseType: 'arraybuffer' })
            .then((Response) => {
              const image = btoa(
                new Uint8Array(Response.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), ''),
              );
              this.file = `data:${Response.headers['content-type'].toLowerCase()};base64,${image}`;
              Loading.hide();
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
        } else Loading.hide();
      })
      .catch((e) => {
        if (e.message === 'Request failed with status code 401') {
          this.$q.localStorage.remove('login-token');
          this.$login(() => this.$router.go(0), () => this.$router.push('/'));
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
      window.console.log(this.polls);

      if (!([1, 2, 3].includes(this.status))) {
        this.error = true;
        return;
      }

      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = !this.auth ? `Bearer ${this.$q.localStorage.getItem('login-token')}` : null;

      axios.put(`/api/userEvents/invites/${this.inviteId}`,
        {
          status: { eventstatusid: this.status, eventstatusdescription: '' },
          headcount: `${this.status === 3 ? '0' : this.adults}`,
          kidscount: `${this.status === 3 ? '0' : this.kids}`,
        },
        this.auth ? { params: { auth: this.auth } } : null)
        .then((response) => {
          if (response.data.data === 'User is null') {
            Loading.hide();
            this.$login(this.onSubmit, () => this.$router.push('/'));
          } else {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Response Successful',
              position: 'top',
            });
            Loading.hide();

            if (this.auth && !this.$q.localStorage.getItem('login-token')) this.$router.push('/');
            else this.$router.push('/invites');
          }
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
            this.$login(this.onSubmit, () => this.$router.push('/'));
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
    onReset() {
      this.status = this.invite.status.eventstatusid;
      this.adults = this.invite.headcount || 1;
      this.kids = this.invite.kidscount;
      this.message = '';
      this.polls.forEach((poll) => { poll.answer = []; });
      this.error = false;
    },
  },
};
</script>
