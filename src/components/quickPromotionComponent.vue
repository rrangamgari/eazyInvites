<template>
  <div class="q-pa-md">
    <q-card>
      <div class="row no-wrap items-center q-pa-sm">
        <div class="col-4">
          <div class="step" :class="`${step >= 1 ? 'bg-primary' : 'bg-grey-3'}`">
            <div class="step-label">Upload Promotion</div>
          </div>
        </div>
        <div class="col-4">
          <div class="step" :class="`${step >= 2 ? 'bg-primary' : 'bg-grey-3'}`">
            <div class="step-label" :class="`${step >= 2 ? '' : 'text-grey-7'}`"
            >Select Contacts or Groups</div>
          </div>
        </div>
        <div class="col-4">
          <div class="step" :class="`${step >= 4 ? 'bg-primary' : 'bg-grey-3'}`">
            <div class="step-label" :class="`${step >= 4 ? '' : 'text-grey-7'}`"
            >Review and Send</div>
          </div>
        </div>
      </div>
      <q-separator />

      <q-tab-panels :value="step" keep-alive animated>
        <q-tab-panel :name="1" class="q-pa-lg">
          <div class="q-pa-md flex flex-center">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md q-pa-xs q-pr-md"
              style="width:450px"
            >
              <q-input
                v-model="hostname"
                type="text"
                label="Host"
                name="host"
                @input="val => { onEventTypeChange() }"
              />
              <div v-show="first" class="row">
                <q-input style="width: 80%"
                         v-model="eventtime"   mask="time" stack-label label="Event Start Time">
                  <template v-slot:append>
                    <q-icon name="schedule" class="cursor-pointer">
                      <q-popup-proxy ref="qTimeProxy" transition-show="scale"
                                     transition-hide="scale">
                        <q-time v-model="eventtime" @input="() => $refs.qTimeProxy.hide()"
                        />
                        <q-tooltip content-class="bg-primary"
                                   content-style="font-size: 16px" :offset="[10, 10]">
                          Add Time
                        </q-tooltip>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <div style="width: 4%;"/>
                <q-toggle style="width: 10%;"
                          v-model="second"
                          v-show="first"
                          icon="alarm"
                          size="50px"
                />
              </div>
              <div v-show="first&&second" class="row">
                <q-input style="width: 80%"
                         v-model="eventendtime"   mask="time" stack-label label="Event End Time">
                  <template v-slot:append>
                    <q-icon name="query_builder" class="cursor-pointer">
                      <q-popup-proxy ref="qTimeProxy" transition-show="scale"
                                     transition-hide="scale">
                        <q-time v-model="eventendtime" @input="() => $refs.qTimeProxy.hide()"
                        />
                        <q-tooltip content-class="bg-primary"
                                   content-style="font-size: 16px" :offset="[10, 10]">
                          Add Time
                        </q-tooltip>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

              </div>
            <q-input
              v-model="eventtitle"
              type="text"
              label="Promotion Title"
              name="eventtitle"
              @change="val => { onEventTitleChange() }"
            />
              <div class="row items-center">
                <div style="width: 100%;">
                  <q-file
                    :disable="card"

                    v-model="file"
                    label="Upload Promotion"
                    lazy-rules>
                    <template v-slot:append>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>

              </div>
              <q-input
                v-model="eventmessage"
                autogrow
                label="Custom Message"
                name="eventmessage"
              />
              <q-btn
                label="More Custom Messages"
                type="button"
                color="primary"
                flat
                class="q-ml-sm"
                @click="openDialog"
              />
              <q-btn
                label="More Options"
                type="button"
                color="primary"
                flat
                class="q-ml-sm"
                @click="openMoreOptionsDialog"
              />
              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  class ="q-px-xl q-py-xs"
                  label="Continue"
                  type="submit"
                  size="md"
                />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  class ="q-px-xl q-py-xs"
                  flat
                />
              </q-stepper-navigation>
            </q-form>
          </div>
          <div class="absolute" style="bottom: 50%; right: 10%;">
            <div>
              <!--<q-fab
                v-model="fab"
                color="primary"
                glossy
                icon="keyboard_arrow_left"
                direction="left"
                :label="fabLabel"
                label-position="right"
                @mouseover="fabLabelChange"
                @mouseleave="fabLabelChanged"
                @click="fabLabelChange"
                push
                style="z-index: 1"
              >

                <q-fab-action square  label-position="bottom"
                              color="primary"
                              @click="toggeGPS" icon="mail" label="RSVP" anchor="center"/>
                <q-fab-action square  label-position="bottom"
                              color="secondary" anchor="center"
                              @click="onEventTypeChange" icon="alarm" label="Add End-Time" />
                <q-fab-action square  label-position="bottom"
                              color="orange"
                              @click="onEventTypeChange" icon="airplay" label="Add Venue" />
                <q-fab-action square  label-position="bottom"
                              color="accent"
                              @click="onEventTypeChange" icon="room" label="Add GPS" />
              </q-fab>-->
            </div>

          </div>
        </q-tab-panel>

        <q-tab-panel :name="2" class="q-pa-lg">
          <add-contacts-component :offset="90" select :selected.sync="selected"/>
          <q-stepper-navigation class="q-pa-md">
            <q-btn @click="onContinue()" color="primary" label="Continue" class="q-px-xl q-py-xs"/>
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-tab-panel>

        <q-tab-panel :name="4" class="q-pa-lg">
          <div class="col-12 q-px-md q-py-sm q-pb-lg row justify-center"
               :class="$q.screen.xs ? 'q-gutter-sm' : ''">
            <q-expansion-item
              class="col-xs-12 col-sm-6 overflow-hidden"
              style="border-radius: 8px"
              icon="edit" expand-icon-class="text-white"
              label="Details"
              v-if="$q.screen.xs"
              header-class="bg-primary"
              :header-style="{ color: '#FFFFFF' }"
            >
              <q-card class="full-height -borders">
                <q-card-section class="q-pa-xs col-xs-10 col-sm-6" style="font-family:
                    'Montserrat', cursive;  font-weight:bolder; color:#18d26e">
                  <q-card-section class="q-pa-xs">
                    <div class="text-center text-decoration-underline" style="font-size: 34px;">
                      {{ (eventtitle !== null && eventtitle.trim() !== '') ?
                       eventtitle : 'Untitled Promotion' }}
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-xs row items-center">
                    <!-- <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                      <p style="font-size: 34px;">Type: {{ eventType.label }}</p>
                    </div> -->
                    <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                      Host: {{ hostname }}
                    </div>
                    <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                      Message: <br>{{ eventmessage }}<br>
                    </div>
                    <!--div class="text-left q-px-xs col-12" style="font-size: 10px;">
                      Start: {{ (new Date(event.startdate)).toDateString() }}
                    </div>{{ event.hostedby }}
                    <div class="text-left q-px-xs col-12" style="font-size: 10px;">
                      End: {{ (new Date(event.enddate)).toDateString() }}
                    </div-->
                    <div class="text-left q-px-xs q-py-sm col-12" style="font-size: 12px;">
                      {{ selected.length }} contacts selected
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <div v-else class="col-6 q-pa-xs row">
              <q-card class="full-height">
                <q-card-section class="q-pa-xs col-xs-10 col-sm-6" style="font-family:
                    'Montserrat', cursive;  font-weight:bolder; color:#18d26e">
                  <q-card-section class="q-pa-xs">
                    <div class="text-center text-decoration-underline" style="font-size: 34px;">
                      {{ (eventtitle !== null && eventtitle.trim() !== '') ?
                       eventtitle : 'Untitled Promotion' }}
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-xs row items-center logo" style="font-family:
              'Montserrat', cursive;  font-weight:bolder; color:#18d26e">
                    <!-- <div class="text-left q-px-xs col-12 " style="font-size: 34px;">
                      Type: {{ eventType.label }}
                    </div>
                    <div>&nbsp;</div> -->
                    <div class="text-left q-px-xs col-12" style="font-size: 34px;">
                      Host: {{ hostname }}
                    </div>
                    <div>&nbsp;</div>
                    <div class="text-left q-px-xs col-12" style="font-size: 20px; ">
                      Message: <br>{{ eventmessage }}<br>
                    </div>
                    <!--div class="text-left q-px-xs col-12" style="font-size: 10px;">
                      Start: {{ (new Date(event.startdate)).toDateString() }}
                    </div>{{ event.hostedby }}
                    <div class="text-left q-px-xs col-12" style="font-size: 10px;">
                      End: {{ (new Date(event.enddate)).toDateString() }}
                    </div-->
                    <div>&nbsp;</div>
                    <div class="text-left q-px-xs q-py-sm col-12" style="font-size: 20px;">
                      {{ selected.length }} contacts selected
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
            <q-expansion-item
              class="col-xs-12 col-sm-6 overflow-hidden"
              style="border-radius: 8px"
              icon="attachment" expand-icon-class="text-white"
              label="Invitation"
              v-if="$q.screen.xs"
              header-class="bg-primary"
              :header-style="{ color: '#FFFFFF' }"
            >
              <q-card class="full-height">
                <q-card-section class="q-pa-xs">
                  <q-img :src="url" placeholder-src="~assets/logo/logo_final.png" />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <div v-else class="col-6 q-pa-xs">
              <q-card class="full-height">
                <q-card-section class="q-pa-xs full-height">
                  <q-img :src="url" placeholder-src="~assets/logo/logo_final.png" />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="q-pa-md text-h6">
            Price : ${{ price }} <br>
            Disc. : ${{ discount}} <br>
            Total : ${{ total}} <br>
          </div>

          <q-form @submit="applyCoupon" class="q-pa-sm row">
            <q-input  class="q-pt-sm col-xs-10 col-sm-4 col-md-3"
                      :class="`${$q.screen.gt.xs ? 'q-mr-sm' : ''}`"
                      type="text" label="Coupon" v-model="coupon" clearable
            />
            <div class="q-pt-sm col-xs-10 col-sm-3 col-md-2">
              <q-btn color="primary" type="submit" class="full-width full-height"
                     label="Apply Coupon"/>
            </div>
          </q-form>

          <q-stepper-navigation>
            <q-btn color="primary" class="q-px-xl q-py-xs"  label="Finish" @click="onFinish()"/>
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerBars, date } from 'quasar';
import customMessageDialog from './customMessageDialog.vue';
import addContactsComponent from './addContactsComponent.vue';
import moreEventDetailsDialog from './moreEventDetailsDialog.vue';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

// let newDate = date.buildDate({ year:2010, date:5, hours:15, milliseconds:123})
export default {
  name: 'createInvitationComponent',
  components: {
    addContactsComponent,
  },
  props: ['eventId', 'eventAlphaId'],
  data() {
    return {
      fab: false,
      fabLabel: '',
      file: null,
      fileId: null,
      card: false,
      first: false,
      second: false,
      url: null,
      step: 1,
      et: true,
      event: {},
      eventtitle: '',
      eventdate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      eventtime: '00:00',
      eventendtime: '00:00',
      eventType: '',
      selection: ['teal'],
      selected: [],
      hostname: '',
      eventmessage: '\nDear {{Guest Name}},\n\nLast Chance for BOGO or 30% off on the purchase or $30 or more, Buy one biryani and get another free \nDon\'t miss out.',
      options: [
        { value: 1, label: 'Birthday' },
        { value: 2, label: 'Engagement' },
        { value: 3, label: 'Wedding' },
        { value: 4, label: 'Party' },
        { value: 5, label: 'Pooja' },
      ],

      // accept: false,
      // columns: [
      //   {
      //     name: 'firstname',
      //     required: true,
      //     label: 'First Name *',
      //     align: 'left',
      //     field: (row) => `${row.firstname}`,
      //     sortable: true,
      //   },
      //   {
      //     name: 'lastname',
      //     label: 'Last Name',
      //     align: 'left',
      //     field: (row) => `${row.lastname}`,
      //     sortable: true,
      //   },
      //   {
      //     name: 'primaryPhone',
      //     align: 'center',
      //     label: 'Primary Phone',
      //     required: true,
      //     field: 'primaryPhone',
      //     sortable: true,
      //     headerStyle: 'icon-right:archive',
      //   },
      //   {
      //     name: 'secondaryPhone',
      //     label: 'Secondary Phone',
      //     field: 'secondaryPhone',
      //     sortable: true,
      //     icon: 'contacts',
      //   },
      //   {
      //     name: 'email',
      //     label: 'Email',
      //     field: 'email',
      //     sortable: true,
      //   },
      // ],
      // dataLoaded: false,
      // data: undefined,
      coupon: '',
      accCoupon: { label: '', discount: 0 },
      coupons: [{ label: 'NEW10', discount: 10 }, { label: 'EAZY20', discount: 20 }],
      price: 0,
      discount: 0,
      total: 0,
      errorMessageProtein: '',
      errorProtein: '',
    };
  },
  methods: {
    openMoreOptionsDialog() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: moreEventDetailsDialog,
        persistent: true,
        parent: this,
      }).onOk((me) => {
        console.log('OK');
        this.eventmessage = me;
        // this.$router.push('/events');
        console.log('OK2');
      }).onCancel(() => {
        console.log('Cancel');
      }).onDismiss(() => {
        console.log('Called on OK or Cancel');
      });
      Loading.hide();
    },
    openDialog() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: customMessageDialog,
        persistent: true,
        parent: this,
      }).onOk((me) => {
        console.log('OK');
        this.eventmessage = me;
        // this.$router.push('/events');
        console.log('OK2');
      }).onCancel(() => {
        console.log('Cancel');
      }).onDismiss(() => {
        console.log('Called on OK or Cancel');
      });
      Loading.hide();
    },
    optionsFn(date_) {
      const futuredate = new Date(); // Now
      futuredate.setDate(futuredate.getDate() + 365); // Set now + 30 days as the new date
      return date_ >= date.formatDate(Date.now(), 'YYYY/MM/DD') && date_ <= date.formatDate(futuredate, 'YYYY/MM/DD');
    },
    loadData() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      this.event = {
        eventtitle: this.eventtitle,
        eventdate: this.eventdate,
        eventtime: this.eventtime,
        eventendtime: this.eventendtime,
        eventType: this.eventType,
        hostname: this.hostname,
        eventmessage: this.eventmessage,
        first: false,
        second: false,
      };

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.get('/api/UserDetails/getCurrentUser')
        .then((response1) => {
          this.$q.localStorage.set('user-token', response1.data.data);
          this.hostname = `${this.$q.localStorage.getItem('user-token').givenname} ${this.$q.localStorage.getItem('user-token').familyname}`;
          this.event.hostname = this.hostname;
          if (this.et) this.eventtitle = `${this.hostname}'s Promotion`;

          if (this.eventId) this.loadEvent();

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
    },
    loadEvent() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;

      axios
        .get(`/api/userEvents/event/${this.eventId}/${this.eventAlphaId}`)
        .then((response) => {
          const event = response.data.data;
          if (event.attachmentlink !== null) {
            Loading.show({
              spinner: QSpinnerBars,
              spinnerColor: 'primary',
              thickness: '3',
            });
            axios
              .get(event.attachmentlink, { responseType: 'blob' })
              .then((response1) => {
                this.file = new File([response1.data], response1.headers['content-disposition'].split('"')[1],
                  { type: response1.headers['content-type'] });
                console.log(this.file);
                Loading.hide();
              })
              .catch((e) => {
                if (e.message === 'Request failed with status code 401') {
                  this.$q.localStorage.remove('login-token');
                  this.$router.push('/login');
                }
                Loading.hide();
              });
          }

          this.event = {
            eventtitle: event.eventtitle,
            eventdate: date.formatDate(event.startdate, 'DD/MM/YYYY'),
            eventtime: date.formatDate(event.startdate, 'HH:mm'),
            eventendtime: date.formatDate(event.enddate, 'HH:mm'),
            eventType: this.options[event.eventtypeid - 1],
            hostname: event.hostedby,
            eventmessage: event.eventmessage,
            first: false,
            second: false,
          };
          this.event.first = this.event.eventtime !== '00:00';
          this.event.second = this.event.eventtime !== this.event.eventendtime;
          this.onReset();

          Loading.hide();
          this.loadEventmembers();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
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
    loadEventmembers() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios
        .get(`/api/userEvents/guestlist/${this.eventId}`)
        .then((response) => {
          const { data } = response.data;
          this.selected = data.map((a) => a.eventMembers);
          this.selected.forEach((em) => { em.readonly = true; });
          Loading.hide();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
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
    onSubmit() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      if (!this.card && this.file) this.url = URL.createObjectURL(this.file);
      console.log(this.url);
      Loading.hide();
      this.step = 2;
    },
    onReset() {
      this.eventtitle = this.event.eventtitle;
      this.et = true;
      this.eventType = this.event.eventType;
      this.eventdate = this.event.eventdate;
      this.eventtime = this.event.eventtime;
      this.eventendtime = this.event.eventendtime;
      if (!this.card && !this.eventId) this.file = null;
      this.eventmessage = this.event.eventmessage;
      this.first = this.event.first;
      this.second = this.event.second;
    },
    firstnameValidation(val) {
      if (val === '') {
        this.errorProtein = true;
        this.errorMessageProtein = 'The firstname cannot be empty';
        return false;
      }
      this.errorProtein = false;
      this.errorMessageProtein = 'dasasds';
      return true;
    },
    onEventTypeChange() {
      // eslint-disable-next-line no-alert
      // alert(this.eventType);
      // eslint-disable-next-line max-len
      this.eventmessage = '\nDear {{Guest Name}},\n\nLast Chance for BOGO or 30% off on the purchase or $30 or more, Buy one biryani and get another free \nDon\'t miss out.';
      if (this.et) this.eventtitle = `${this.hostname}'s Promotion`;
      // this.eventmessage = `\nDear {{Invitee Name}}, {{Inviter Name}} has
      // invited you for a ${this.eventType.label} party.
      // \nIf you are interested to attend please reply 'yes' and we will notify him.\n`;
    },
    onEventTitleChange() {
      if (this.et && (this.eventtitle.trim().toLowerCase() !== `${this.hostname}'s Promotion`.toLowerCase())) this.et = false;
    },
    onContinue() {
      this.step = 4;
      console.log(this.selected);
      this.price = this.selected.length * 2; // Calculate Price
      this.discount = this.price * (this.accCoupon.discount / 100.0);
      this.total = this.price - this.discount;
    },
    applyCoupon() {
      let valid = false;
      this.coupons.forEach((coupon) => {
        if (coupon.label === this.coupon) {
          valid = true;
          this.accCoupon = coupon;
          this.discount = this.price * (this.accCoupon.discount / 100.0);
        }
      });
      this.total = this.price - this.discount;
      if (valid) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Coupon Applied',
          position: 'top',
        });
      } else {
        this.accCoupon = { label: '', discount: 0 };
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Invalid Coupon',
          position: 'top',
        });
      }
    },
    onFinish() {
      if (this.eventId) {
        this.onEditFinish();
        return;
      }
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;

      if (!this.eventtitle || this.eventtitle === '') this.eventtitle = `Event ${(new Date()).toUTCString()}`;

      const from = `${this.eventdate}`.split('/');
      const fromMonth = (from[1]);
      const startDate = `${from[2]}-${fromMonth}-${from[0]}`;
      const startTime = `${this.first ? this.eventtime : '00:00'}`;
      let endTime = `${this.first ? this.eventtime : '00:00'}`;
      endTime = `${this.second ? this.eventendtime : endTime}`;

      const eventDetails = {
        eventtypeid: this.eventType.value,
        eventtitle: this.eventtitle,
        eventmessage: this.eventmessage,
        startdate: new Date(`${startDate}T${startTime}:00`),
        enddate: new Date(`${startDate}T${endTime}:00`),
        attachmentlink: `${this.card ? this.fileId : null}`,
        eventallowkids: true,
        hostedby: this.hostname,
      };

      const eventMemberIdList = this.selected.map((el) => el.eventmemberidUI);

      const formData = new FormData();
      formData.append('file', this.card ? null : this.file);
      formData.append('eventDetails', new Blob([JSON.stringify(eventDetails)], { type: 'application/json' }));
      formData.append('eventGuests', new Blob([JSON.stringify(eventMemberIdList)], { type: 'application/json' }));
      axios.post('/api/userEvents/event', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          if (!response.data.data || response.data.data === 'null') {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: response.data.message,
              position: 'top',
            });
            Loading.hide();
            return;
          }
          const eventId = response.data.data;
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: response.data.data,
            position: 'center',
          });

          Loading.hide();
          this.$router.push(`/events/${eventId}`);
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
    onEditFinish() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;

      if (!this.eventtitle || this.eventtitle === '') this.eventtitle = `Event ${(new Date()).toUTCString()}`;

      const from = `${this.eventdate}`.split('/');
      const fromMonth = (from[1]);
      const startDate = `${from[2]}-${fromMonth}-${from[0]}`;
      const startTime = `${this.first ? this.eventtime : '00:00'}`;
      let endTime = `${this.first ? this.eventtime : '00:00'}`;
      endTime = `${this.second ? this.eventendtime : endTime}`;

      const eventDetails = {
        eventtypeid: this.eventType.value,
        eventtitle: this.eventtitle,
        eventmessage: this.eventmessage,
        startdate: new Date(`${startDate}T${startTime}:00`),
        enddate: new Date(`${startDate}T${endTime}:00`),
        attachmentlink: `${this.card ? this.fileId : null}`,
        eventallowkids: true,
        hostedby: this.hostname,
      };

      const eventMemberIdList = this.selected.filter((e) => !e.readonly)
        .map((el) => el.eventmemberidUI);

      const formData = new FormData();
      formData.append('file', this.card ? null : this.file);
      formData.append('eventDetails', new Blob([JSON.stringify(eventDetails)], { type: 'application/json' }));
      formData.append('eventGuests', new Blob([JSON.stringify(eventMemberIdList)], { type: 'application/json' }));
      axios.post(`/api/userEvents/event/${this.eventId}/${this.eventAlphaId}`, formData)
        .then((response) => {
          if (!response.data.data || response.data.data === 'null') {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: response.data.message,
              position: 'top',
            });
            Loading.hide();
            return;
          }
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: response.data.data,
            position: 'center',
          });

          Loading.hide();
          this.$router.push(`/events/${this.eventId}/${this.eventAlphaId}`);
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
    fabLabelChange() {
      this.fabLabel = 'Add More Options';
    },
    fabLabelChanged() {
      this.fabLabel = '';
    },
    toggeGPS() {

    },
  },
  mounted() {
    const { id, file, data } = this.$route.params;
    if (id) {
      this.card = true;
      this.fileId = id;
      this.file = file;
      this.url = data;
    }
    if (this.$route.params.eventType) this.eventType = this.$route.params.eventType;

    this.loadData();
  },
};
</script>

<style lang="sass">
  .step-var, .step, .step-label
    --h : 50px;
    --d : calc((var(--h)/2) / 1.732);
    --w : calc(100% - var(--d));
    cursor: pointer;
  .step
    width : 100%;
    height : var(--h);
    clip-path: polygon(0 0, var(--w) 0%, 100% 50%, var(--w) 100%, 0% 100%, var(--d) 50%);
    display: flex;
    align-items: center;
    justify-content: center;
  .step-label
    padding : 10px calc(var(--d) + 3px);
    text-align : center;
    color: white;
    font-size: calc(min(2.7vw, 1em));
</style>
