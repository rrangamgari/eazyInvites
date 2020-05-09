<template>
  <div>

    <template>
      <div class="q-pa-md">
        <b style="font-size:25px">&nbsp; Our Customer Reviews </b>
        <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
          <div class="col-xs-12 col-sm-6 col-md-4" v-for="feedback in feedbackList"
           :key="feedback.id">
            <div class="my-content" style="padding:20px">
            <q-rating
              :value="feedback.rating"
              size="3.5em"
              color="grey"
              color-selected="yellow"
              icon="star_border"
              icon-selected="star"
              readonly
            />
            <br>
            <b style="font-size:18px">{{ feedback.name }}</b>
            <body style="font-size:12px; white-space: pre-line">{{ feedback.description }}</body>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  // name: 'ComponentName',
  data() {
    return {
      feedbackList: [
        {
          id: 1,
          rating: 5,
          name: 'Ravinder Rangamgari',
          description: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 5,
          name: 'Sridevi Rangamgari',
          description: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 4,
          name: 'Vivek Rangamgari',
          description: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 3,
          name: 'Divya Molugu',
          description: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
      ],
    };
  },
  mounted() {
    axios.get('/api/feedback')
      .then((response) => {
        // JSON responses are automatically parsed.
        this.feedbackList = this.feedbackList.concat(response.data.data);
        // Notification for testing api
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: response.data.message,
          position: 'center',
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
};
</script>
