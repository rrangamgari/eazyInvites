<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" color="primary" animated>
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
            <q-file
              filled
              v-model="model"
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
              @click="step = 2"
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
        An ad group contains one or more ads which target a shared set of
        keywords.

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
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
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" />
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
      model: null,
      step: 1,
      eventType: '',
      eventmessage: `\nDear {{Invitee Name}}, {{Inviter Name}} has invited you for a ${this.eventType} party. \nIf you are interested to attend please reply 'yes' and we will notify him.\n`,
      options: [
        { value: 1, label: 'Birthday' },
        { value: 2, label: 'Engagement' },
        { value: 3, label: 'Wedding' },
        { value: 4, label: 'Party' },
        { value: 5, label: 'Pooja' },
      ],

      accept: false,
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
        axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
          'login-token',
        )}`;
        axios
          .post('/api/userEvents/event', {
            eventtypeid: this.eventType.value,
            eventtitle: null,
            eventmessage: this.eventmessage,
          })
          .then((response) => {
            // JSON responses are automatically parsed.
            this.posts = response.data;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: this.posts.status,
              position: 'center',
            });
            Loading.hide();
            this.$router.push('/addContacts');
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
            Loading.hide();
          });
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
