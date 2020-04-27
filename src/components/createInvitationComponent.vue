
<template>


<div class="q-pa-md" style="max-width: 700px;padding:20px;">

<div>&nbsp;</div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"

      class="q-gutter-md"
     >
      <q-select name="eventType"  filled


        label="Event Type"
        v-model="eventType"
        :options="options"
        @input='val => { onEventTypeChange() }'>

</q-select>
 <q-file filled v-model="model" label="Upload Invitation"
 style="padding-right:15px">
 <template v-slot:append>
          <q-icon name="attach_file" />
        </template>
 </q-file>
<q-input
      v-model="name"
      filled
      autogrow
      label="Custom Message"
 name="name"
    />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from 'axios';


axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'createInvitationComponent',
  components: {

  },
  data() {
    return {
      model: null,
      eventType: '',
      name: `\nDear {{Invitee Name}}, {{Inviter Name}} has invited you for a ${this.eventType} party. \nIf you are interested to attend please reply 'yes' and we will notify him.\n`,
      options: [
        'Birthday', 'Engagement', 'Wedding', 'Party', 'Pooja',
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
        axios.post('http://localhost:5000/Emantran/api/authenticate', {
          username: this.name,
          password: this.age,
        })
          .then((response) => {
            // JSON responses are automatically parsed.
            this.posts = response.data;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: this.posts.token,
              position: 'center',
            });
            this.$router.push('/createInvitation');
          })
          .catch((e) => {
            this.errors.push(e);
            window.location = '/login1';
          });
      }
    },

    onReset() {
      this.name = null;
      this.eventType = null;
      this.model = null;
    },
    onEventTypeChange() {
      // eslint-disable-next-line no-alert
      // alert(this.eventType);
      // eslint-disable-next-line max-len
      this.name = `\nDear {{Invitee Name}}, {{Inviter Name}} has invited you for a ${this.eventType} party. \nIf you are interested to attend please reply 'yes' and we will notify him.\n`;
    },

  },
};

</script>
