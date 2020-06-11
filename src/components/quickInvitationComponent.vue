<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" color="primary" :vertical="$q.screen.width < 677" animated>
      <q-step
        :name="1"
        title="Upload Invitation"
        icon="settings"
        :done="step > 1"
      >
        <q-page class="q-pa-md flex flex-center" >
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-pa-xs q-pr-md"
          style="width:350px"
        >
            <q-input
              v-model="eventtitle"
              type="text"
              filled
              label="Event Title"
              name="eventtitle"
            />
            <q-select
              name="eventType"
              filled
              label="Event Type"
              v-model="eventType"
              :options="options"
              @input="
                val => {
                  onEventTypeChange();
                }
              "
            >
            </q-select>
            <div class="row">
            <q-input style="width: 48%;"
             v-model="eventdate" filled type="date" stack-label label="Event Date"/>
            <div style="width: 4%;"/>
            <q-input style="width: 48%;"
             v-model="eventtime" filled type="time" stack-label label="Event Time"/>
            </div>
            <q-file
              filled
              v-model="file"
              label="Upload Invitation"
              style="padding-right:15px"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-input
              v-model="eventmessage"
              filled
              autogrow
              label="Custom Message"
              name="eventmessage"
            />
          <q-stepper-navigation>
            <q-btn
              color="primary"
              label="Continue"
              type="submit"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-form>
        </q-page>
      </q-step>
      <q-step
        :name="2"
        title="Select Contacts or Groups"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-table
          title="Contacts"
          :data="data"
          :columns="columns"
          color="primary"
          row-key="eventmemberid"
          :rows-per-page-options="[0]"
          :table-header-style="{ backgroundColor: '#0072C6', color: '#FFFFFF' }"
          selection="multiple"
          :selected.sync="selected"
        >
          <template v-slot:header-cell="props">
            <q-th :props="props">
              <b style="font-size:14px;"> {{ props.col.label }} &nbsp;</b>
              <q-icon
                name="contact_mail"
                size="2.5em"
                v-show="props.col.label == 'Email'"
              />
              <q-icon
                name="contact_phone"
                size="2.5em"
                v-show="props.col.name == 'primaryPhone'"
              />
              <q-icon
                name="contact_phone"
                size="2.5em"
                v-show="props.col.name == 'secondaryPhone'"
              />
            </q-th>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="checkBox" >
                <q-checkbox :val="props.row"
                  v-model="selected"/>
              </q-td>
              <q-td key="firstname" :props="props">
                {{ props.row.firstname }}
                <q-popup-edit
                  v-model="props.row.firstname"
                  title="Edit the Name"
                  buttons
                  :validate="firstnameValidation"
                  @hide="firstnameValidation"
                >
                  <q-input
                    v-model="props.row.firstname"
                    dense
                    autofocus
                    counter
                    :error="errorProtein"
                    :error-message="errorMessageProtein"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="lastname" :props="props">
                {{ props.row.lastname }}
                <q-popup-edit
                  v-model="props.row.lastname"
                  title="Edit the Name"
                  buttons
                >
                  <q-input v-model="props.row.lastname" dense autofocus counter />
                </q-popup-edit>
              </q-td>
              <q-td key="primaryPhone" :props="props">
                {{ props.row.primaryPhone }}
                <q-popup-edit
                  v-model="props.row.primaryPhone"
                  title="Edit the Phone"
                  buttons
                >
                  <q-input
                    v-model="props.row.primaryPhone"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="secondaryPhone" :props="props">
                {{ props.row.secondaryPhone }}
                <q-popup-edit
                  v-model="props.row.secondaryPhone"
                  title="Edit the phone"
                  buttons
                >
                  <q-input
                    v-model="props.row.secondaryPhone"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
                <q-popup-edit
                  v-model="props.row.email"
                  title="Edit the Email"
                  buttons
                >
                  <q-input v-model="props.row.email" dense autofocus counter />
                </q-popup-edit>
              </q-td>
              <q-td key="delete" :props="props">
                <img
                  src="~assets/icon/delete-file-icon.png"
                  style="cursor:pointer;"
                  @click="deleteMe(props.row.eventmemberid)"
                />
              </q-td>

            </q-tr>
          </template>
        </q-table>
        <q-stepper-navigation>
          <q-btn @click="onContinue()" color="primary" label="Continue" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="Review and Send" icon="add_comment">
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
        <q-card class="full-height rounded-borders">
          <q-card-section class="q-pa-xs">
            <!--q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium" style="font-size: 16px;">
              {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                  event.eventtitle : 'Untitled Event' }}
              </div>
            </q-card-section-->
            <q-card-section class="q-pa-xs row items-center">
              <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                Type: {{ eventType.label }}
              </div>
              <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                Host: Self
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
          <q-card-section class="q-pa-xs">
            <!--q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium" style="font-size: 16px;">
              {{ (event.eventtitle !== null && event.eventtitle.trim() !== '') ?
                  event.eventtitle : 'Untitled Event' }}
              </div>
            </q-card-section-->
            <q-card-section class="q-pa-xs row items-center">
              <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                Type: {{ eventType.label }}
              </div>
              <div class="text-left q-px-xs col-12" style="font-size: 14px;">
                Host: Self
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
            <q-img :src="url !== '' ? url : require('../assets/logo/Easy_Invites.png')" />
          </q-card-section>
        </q-card>
        </q-expansion-item>
        <div v-else class="col-6 q-pa-xs">
        <q-card class="full-height">
          <q-card-section class="q-pa-xs full-height">
            <q-img class="full-height" :src="url"/>
          </q-card-section>
        </q-card>
        </div>
      </div>

      <div class="q-pa-md text-h6">
        Price : ${{ price }} <br>
        Disc. : ${{ discount}} <br>
        Total : ${{ total}} <br>
      </div>

      <div class="q-pa-sm row">
        <q- filled type="text"
         label="Coupon" v-model="coupon" clearable/>
         <q-input filled class="q-pt-sm col-xs-10 col-sm-4 col-md-3"
          :class="`${$q.screen.gt.xs ? 'q-mr-sm' : ''}`"
          type="text" label="Coupon" v-model="coupon" clearable
        />
        <div class="q-pt-sm col-xs-10 col-sm-3 col-md-2">
          <q-btn color="primary" class="full-width full-height"
           label="Apply Coupon" @click="applyCoupon()"/>
        </div>
      </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="onFinish()"/>
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerTail } from 'quasar';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'createInvitationComponent',
  components: {},
  data() {
    return {
      file: null,
      fileId: null,
      url: '',
      step: 1,
      eventtitle: '',
      eventdate: null,
      eventtime: null,
      eventType: '',
      selection: ['teal'],
      selected: [],
      eventmessage: `\nDear {{Invitee Name}}, {{Inviter Name}} has invited you for a ${this.eventType} party. \nIf you are interested to attend please reply 'yes' and we will notify him.\n`,
      options: [
        { value: 1, label: 'Birthday' },
        { value: 2, label: 'Engagement' },
        { value: 3, label: 'Wedding' },
        { value: 4, label: 'Party' },
        { value: 5, label: 'Pooja' },
      ],

      accept: false,
      columns: [
        {
          name: 'firstname',
          required: true,
          label: 'First Name *',
          align: 'left',
          field: (row) => `${row.firstname}`,
          sortable: true,
        },
        {
          name: 'lastname',
          label: 'Last Name',
          align: 'left',
          field: (row) => `${row.lastname}`,
          sortable: true,
        },
        {
          name: 'primaryPhone',
          align: 'center',
          label: 'Primary Phone',
          required: true,
          field: 'primaryPhone',
          sortable: true,
          headerStyle: 'icon-right:archive',
        },
        {
          name: 'secondaryPhone',
          label: 'Secondary Phone',
          field: 'secondaryPhone',
          sortable: true,
          icon: 'contacts',
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          sortable: true,
        },
        {
          name: 'delete',
          label: 'Delete',
          sortable: false,
          field: (row) => `${row.eventmemberid}`,
        },
      ],
      dataLoaded: false,
      data: [
        {
          firstname: 'Frozen Yogurt',
          primaryPhone: 159,
          secondaryPhone: 6.0,
          email: 24,
        },
      ],
      coupon: '',
      coupons: [{ label: 'NEW10', discount: 10 }, { label: 'EAZY20', discount: 20 }],
      price: 0,
      discount: 0,
      total: 0,
    };
  },

  methods: {
    onSubmit() {
      if (this.eventType === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Please select Event Type',
          position: 'center',
        });
      } else {
        Loading.show({
          spinner: QSpinnerTail,
          spinnerColor: 'primary',
          thickness: '3',
        });
        this.step = 2;
        if (this.file !== null) this.url = URL.createObjectURL(this.file);

        if (this.dataLoaded) {
          Loading.hide();
          return;
        }

        axios
          .get('/api/userEvents/userguestlist')
          .then((response) => {
            Loading.hide();
            // JSON responses are automatically parsed.
            this.data = response.data.data;
            // this.data = this.data.concat(response.data.data);
          })
          .catch((e) => {
            //  this.errors.push(e);
            Loading.hide();
            if (e.message === 'Request failed with status code 401') {
              this.$q.sessionStorage.remove('login-token');
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

        this.dataLoaded = true;
      }
    },

    onReset() {
      this.eventmessage = null;
      this.eventType = null;
      this.model = null;
    },
    onEventTypeChange() {
      // eslint-disable-next-line no-alert
      // alert(this.eventType);
      // eslint-disable-next-line max-len
      this.eventmessage = `\nDear {{Invitee Name}}, {{Inviter Name}} has invited you for a ${this.eventType.label} party. \nIf you are interested to attend please reply 'yes' and we will notify him.\n`;
    },
    onContinue() {
      this.step = 4;
      window.console.log(this.selected);
      this.price = this.selected.length * 2;
      this.total = this.price;
    },
    applyCoupon() {
      let valid = false;
      this.coupons.forEach((coupon) => {
        if (coupon.label === this.coupon) {
          valid = true;
          this.discount = this.price * (coupon.discount / 100.0);
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
      axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem('login-token')}`;

      if (this.eventtitle === null || this.eventtitle === '') this.eventtitle = `Event ${(new Date()).toUTCString()}`;
      if (this.file !== null) {
        const formData = new FormData();
        formData.append('file', this.file);
        axios.post('/api/userEvents/uploadFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((response) => {
            this.fileId = response.data.data;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: response.data.data,
              position: 'center',
            });
          })
          .catch((e) => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: e.message,
              position: 'top',
            });
          });
      } else {
        this.fileId = null;
      }

      axios.post('/api/userEvents/event',
        {
          eventtypeid: this.eventType.value,
          eventtitle: this.eventtitle,
          eventmessage: this.eventmessage,
          startdate: new Date(`${this.eventdate}T${this.eventtime}:00`),
          enddate: new Date(`${this.eventdate}T${this.eventtime}:00`),
          attachmentlink: this.fileId !== null ? `/api/userEvents/file/${this.fileId}` : null,
          eventallowkids: true,
        })
        .then((Response) => {
          const eventId = Response.data.data;
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: Response.data.data,
            position: 'center',
          });

          const eventMemberIdList = this.selected.map((el) => el.eventmemberid);
          axios.post(`/api/userEvents/eventGuests/${eventId}`, eventMemberIdList)
            .then((Response1) => {
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: Response1.data.data,
                position: 'center',
              });
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
            });
        })
        .catch((e) => {
          //  this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
        });
    },
  },
  mounted() {
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;
    axios
      .get('/api/eventSystem/eventType')
      .then((response) => {
        // JSON responses are automatically parsed.
        this.options = response.data.data;
        // this.data = this.data.concat(response.data.data);
      })
      .catch((e) => {
        //  this.errors.push(e);
        if (e.message === 'Request failed with status code 401') {
          this.$q.sessionStorage.remove('login-token');
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
  },
};
</script>
