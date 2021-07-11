<template>
  <q-page>
    <div class="q-pa-md row warp justify-center items-start">
      <div class="col-xs-12 col-sm-6 col-6 q-pa-sm">
        <q-carousel v-if="event && eventType" v-model="inviteslide"
          transition-prev="slide-right" transition-next="slide-left"
          animated navigation navigation-position="bottom" control-type="flat"
          control-color="primary" class="rounded-borders" :height="`${$q.screen.height*0.8}px`"
        >
          <q-carousel-slide :name="0" class="q-pa-xs col-xs-10 col-sm-6">
            <q-img class="full-height" transition="rotate" contain
             placeholder-src="statics/WE_Invites_logo.png" :src="file" />
          </q-carousel-slide>
          <q-carousel-slide :name="1" class="row justify-center q-pa-xs col-11">
            <div class="row justify-center q-pa-lg text-primary" style="font-weight: bolder;">
              <div class="text-center col-12 q-pb-md" style="font-size: 34px;">
               {{event.eventtitle !== null ? event.eventtitle : 'Untitled Event'}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4" v-if="event.hostedby !== null">
                <div class="text-subtitle1 text-center">Host</div>
                <div class="text-h6 text-center">{{ event.hostedby }}</div>
                <div class="text-h6 text-center">Ph: {{ event.phone }}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4" v-if="event.startdate !== null">
                <div class="text-subtitle1 text-center">Date</div>
                <div class="text-h6 text-center">
                 {{ dates[0] }}
                </div>
                <div class="text-h6 text-center">
                 {{ dates[1] }}
                </div>
                <div class="text-h6 text-center">
                 {{ dates[2] }}
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4" v-if="event.addresses !== null">
                <div class="text-subtitle1 text-center">Venue</div>
                <div class="text-h6 text-center">{{ getAddress(event) }}</div>
              </div>
              <div class="col-12 q-py-lg">
                <div class="text-subtitle1 text-center">Message</div>
                <div class="text-h6 text-center" style="max-width: 350px; margin: auto;"
                 v-html="event.eventmessagehtml"></div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-xs-12 col-sm-6 col-6 q-pa-sm">
        <q-card class="q-pa-sm text-primary row warp justify-center items-center">
          <div class="text-subtitle1 text-center col-12 q-py-md">RSVP</div>
          <div class="q-pa-sm" style="width: max(150px, 33.33%);">
            <q-btn style="width:100%;" unelevated label="Will Attend" no-caps
             :outline="status !== 1" color="green" @click="status = 1"/>
          </div>
          <div class="q-pa-sm" style="width: max(150px, 33.33%);">
            <q-btn style="width:100%;" unelevated label="Tentaive" no-caps
             :outline="status !== 2" color="yellow" @click="status = 2"/>
          </div>
          <div class="q-pa-sm" style="width: max(150px, 33.33%);">
            <q-btn style="width:100%;" unelevated label="Regrets" no-caps
             :outline="status !== 3" color="red" @click="status = 3"/>
          </div>
          <div class="col-12 text-center text-red q-pa-xs text-caption"
           v-if="!([1, 2, 3].includes(this.status)) && error">Please select an option above</div>

          <div class="col-12 q-py-md">
            <q-form
              v-show="status !== null && status !== 0"
              class="q-pa-sm row"
              style="max-width: max(600px, 100%); margin: auto;"
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
                v-show="!([3, 5].includes(status))"
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
                v-show="!([3, 5].includes(status))"
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
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Loading, QSpinnerBars, date } from 'quasar';
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
      inviteslide: 0,
      event: {},
      eventType: [],
      height: 50,
      file: null,
      name: '',
      phone: '',
      email: '',
      status: 1,
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
      format: date.formatDate,
      timezone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1].split(/[a-z\s]+/).join(''),
      dates: ['', '', ''],
    };
  },
  mounted() {
    this.viewInviteId = this.$route.params.viewInviteId;
    this.viewInviteAlpha = this.$route.params.viewInviteAlpha;
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
        this.createDates();
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
    createDates() {
      const start = this.event.startdate;
      const end = this.event.enddate;
      if (!this.event.eventtimeadded) {
        this.dates[0] = this.format(start, 'ddd, MMM DD YYYY');
      } else if (start === end) {
        this.dates[0] = this.format(start, 'ddd, MMM DD YYYY hh:mm A ') + this.timezone;
      } else if (this.format(start, 'ddd, MMM DD YYYY') === this.format(end, 'ddd, MMM DD YYYY')) {
        this.dates[0] = this.format(start, 'ddd, MMM DD YYYY');
        this.dates[1] = `Start: ${this.format(start, 'hh:mm A ')}${this.timezone}`;
        this.dates[2] = `End: ${this.format(end, 'hh:mm A ')}${this.timezone}`;
      } else {
        this.dates[0] = `Start: ${this.format(start, 'ddd, MMM DD YYYY hh:mm A ')}${this.timezone}`;
        this.dates[1] = `End: ${this.format(end, 'ddd, MMM DD YYYY hh:mm A ')}${this.timezone}`;
      }
    },
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

<style scoped>
  .q-carousel {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
     0 3px 1px -2px rgb(0 0 0 / 12%);
  }
</style>
