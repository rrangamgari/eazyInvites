<template>
  <q-page>
  <q-img v-if="file !== null" class="full-width bg-white" :height="`${$q.screen.height-height}px`"
   transition="rotate" contain :src="file"/>
  <div class="row justify-center q-pa-lg">
    <div class="text-h5 text-center col-12 q-pb-md">
    {{event.eventtitle !== null ? event.eventtitle : 'Untitled Event'}}
    </div>
    <div class="col-xs-12 col-sm-4" v-if="event.hostedby !== null">
      <div class="text-subtitle1 text-center">Host</div>
      <div class="text-h6 text-center">{{ event.hostedby }}</div>
      <div class="text-h6 text-center">Ph: {{ event.phone }}</div>
    </div>
    <div class="col-xs-12 col-sm-4" v-if="event.startdate !== null">
      <div class="text-subtitle1 text-center">Date</div>
      <div class="text-h6 text-center">
        Start: {{ new Date(event.startdate).toUTCString() }}
      </div>
      <div class="text-h6 text-center">
        End: {{ new Date(event.enddate).toUTCString() }}
      </div>
    </div>
    <div class="col-xs-12 col-sm-4" v-if="event.addresses !== null">
      <div class="text-subtitle1 text-center">Venue</div>
      <div class="text-h6 text-center">{{ getAddress(event) }}</div>
    </div>
    <div class="col-12 q-py-lg">
      <div class="text-subtitle1 text-center">Message</div>
      <div class="text-h6 text-center" style="max-width: 350px; margin: auto;">
        {{ event.eventmessage }}
      </div>
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

          class="col-12 q-pb-lg"
          type="text"
          v-model="name"
          label="Name"
          lazy-rules
          :rules="[ val=> val !== null && val !== '' || 'Please enter a Name']"
        />

        <q-input

          class="col-12 q-pb-lg"
          type="text"
          v-model="phone"
          label="Phone"
          lazy-rules
          :rules="[ val=> val !== null && val !== '' ||
           ( email !== null && email !== '' || 'Please enter Phone or Email')]"
        />

        <q-input

          class="col-12 q-pb-md"
          type="text"
          v-model="email"
          label="Email"
        />

        <q-input
          v-show="status !== 3"

          class="col-xs-12 col-sm-6"
          :class="`${$q.screen.gt.xs ? 'q-pr-xs' : ''}`"
          type="number"
          :max="event.maxguests"
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
          :disable="!event.eventallowkids"
          type="number"
          :max="event.maxguests"
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
      viewInviteId: '',
      viewInviteAlpha: '',
      event: {},
      eventType: [],
      height: 50,
      file: null,
      name: '',
      phone: '',
      email: '',
      status: 5,
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
  mounted() {
    this.viewInviteId = this.$route.params.viewInviteId;
    this.viewInviteAlpha = this.$route.params.viewInviteAlpha;
    console.log(`$${this.viewInviteId}/${this.viewInviteAlpha}`);
    this.height = document.getElementById('header').clientHeight;
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios
      .get(`/api/userEvents/guestInvites/${this.viewInviteId}/${this.viewInviteAlpha}`)
      .then((response) => {
        this.event = response.data.data;
        this.file = this.event.attachmentlink;
        Loading.hide();
      })
      .catch((e) => {
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
    getAddress(event) {
      const address = event.addresses;
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

      axios.put(`/api/userEvents/guestInvites/${this.viewInviteId}`,
        {
          eventMembers: { firstname: this.name, primaryPhone: this.phone, email: this.email },
          status: { eventstatusid: this.status, eventstatusdescription: '' },
          headcount: `${this.status === 3 ? '0' : this.adults}`,
          kidscount: `${this.status === 3 ? '0' : this.kids}`,
        })
        .then((response) => {
          if (response.data.data === 'User is null') {
            Loading.hide();
            this.$router.push('/login');
          } else {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Response Successful',
              position: 'top',
            });
            Loading.hide();
          }
        })
        .catch((e) => {
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
      this.name = '';
      this.phone = '';
      this.email = '';
      this.status = 5;
      this.adults = 1;
      this.kids = 0;
      this.message = '';
      this.polls.forEach((poll) => { poll.answer = []; });
      this.error = false;
    },
  },
};
</script>
