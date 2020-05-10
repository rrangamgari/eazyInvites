<template>
  <div>
    <q-toolbar class="glossy center">
      <q-toolbar-title style="align:center;text-align: center;">
        <div class="" style="color:#FFFFFF;font-family: 'Merienda', cursive;">
          Follow us
        </div>
        <div>&nbsp;</div>
        <a href="https://www.instagram.com/" target="_blank">
          <img
            src="../assets/instagram.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

       <!-- &nbsp;
        <a href="https://skype.com" target="_blank">
          <img
            src="../assets/skype.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a> -->

        &nbsp;
        <a href="https://twitter.com" target="_blank">
          <img
            src="../assets/twitter.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://www.pinterest.com/" target="_blank">
          <img
            src="../assets/pinint.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://facebook.com" target="_blank">
          <img
            src="../assets/facebook.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://linkedin.com" target="_blank">
          <img
            src="../assets/linkedin.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

       <!-- &nbsp;
        <a href="https://youtube.com" target="_blank">
          <img
            src="../assets/youtube.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://web.whatsapp.com" target="_blank">
          <img
            src="../assets/whatsapp.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a> -->

        &nbsp;

        <div>&nbsp;</div>
        <div
          style="font-size:12px;color:#FFFFFF;font-family: 'Merienda', cursive;"
        >
          &copy; copyright 2020 | Privacy Policy | About Us | Contact Us
        </div>
        <div>&nbsp;</div>
      </q-toolbar-title>
    </q-toolbar>
    <q-dialog v-model="layout">
      <q-layout container class="bg-white" style="max-height:650px;">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Feedback</q-toolbar-title>

            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <q-form
              style="padding:20px;"
              class="q-gutter-sm"
              @submit="onSubmit"
              @reset="onReset"
            >
              <q-rating
                name="quality"
                v-model="quality"
                max="5"
                size="3.5em"
                color="grey"
                color-selected="yellow"
                icon="star_border"
                icon-selected="star"
                no-dimming
              />
              <q-input
                label="Name"
                type="text"
                v-model="name"
                name="name"
                filled="filled"
                lazy-rules
                :rules="[ val=> val !== null && val !== '' || 'Please enter your Name']"
              />
              <q-input
                label="Comments"
                type="textarea"
                v-model="comment"
                name="comments"
                filled="filled"
              />
              <div class="q-pa-md" style="font-size:16px">
                How likely are you to recommend us to a friend?
                <q-option-group
                  :options="options"
                  label="Recommendations"
                  type="radio"
                  v-model="group"
                  size="xs"
                  style="font-size:14px"
                />
              </div>
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                  :rules="[ val=> val !== null && val !== '' || 'Please choose any one of above']"
                />
              </div>
            </q-form>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <div >
      <a id="ei_tab" class="ei_tab_right" href="#" @click="layout = true">
    <img src="../assets/icon/ei_tab_icon_retina.gif" alt="">
    Feedback<span class="screen_reader"> Will open a new window</span></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'homeFooterComponent',
  data() {
    return {
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      layout: false,
      quality: 0,
      submitResult: [],
      moreContent: true,
      drawer: false,
      drawerR: false,
      name: null,
      comment: null,
      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,'
        + 'ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
      group: '',
      options: [{ label: 'Not at all likely', value: 0 },
        { label: 'Maybe, it depends', value: 1 },
        { label: 'I definitely would', value: 2 }],
    };
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    },
  },
  methods: {
    onSubmit(evt) {
      // const formData = new FormData(evt.target);
      const submitResult = [evt];

      const post = {
        rating: this.quality,
        name: this.name,
        comment: this.comment,
        recommend: this.group,
      };

      axios.post('/api/feedback', post)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data.data) {
            // Notification for testing api
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: response.data.message,
              position: 'center',
            });
          } else {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_notdone',
              message: response.data.message,
              position: 'center',
            });
          }
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

      this.submitResult = submitResult;
      this.onReset();
    },
    onReset() {
      this.quality = 0;
      this.name = null;
      this.comment = null;
      this.group = '';
    },
  },
};
</script>
