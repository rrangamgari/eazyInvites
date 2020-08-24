<template>
  <div >
    <q-dialog v-model="layout">
      <q-layout container class="bg-white" style="max-height:650px;">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Feedback</q-toolbar-title>

            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page class="q-pa-sm q-pl-md q-pr-md ">
            <q-form
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
                class="q-pt-sm"
                label="Name"
                type="text"
                v-model="name"
                name="name"

                lazy-rules='ondemand'
                :rules="[ val=> val !== null && val !== '' || 'Please enter your Name']"
              />
              <q-input
                label="Comments"
                type="textarea"
                v-model="comment"
                name="comments"

                autogrow
              />
              <q-field
                class="q-pt-md q-pb-md"

                label="How likely are you to recommend us to a friend?"
                v-model="group"
                lazy-rules="ondemand"
                :rules="[ val=> val !== null && val !== '' || 'Please choose an option']"
              >
                <div style="padding:0px; margin:0px; font-size:16px; color:black;">
                <!--  How likely are you to recommend us to a friend? -->
                <q-option-group
                  class="q-pt-md q-pb-xs"
                  :options="options"
                  label="Recommendations"
                  type="radio"
                  v-model="group"
                  size="xs"
                  style="font-size:14px"
                />
                </div>
              </q-field>
              <div class="q-pt-md">
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
    <a id="ei_tab" class="ei_tab_right" @click="layout = true">
      <img src="../assets/icon/ei_tab_icon_retina.gif" alt="">
      Feedback
      <span class="screen_reader"> Will open a new window</span>
    </a>
<a href="https://wa.me/13022206686?text=Hi EazyInvites, I love to start using this..."
   target="_blank">
      <img
        id="whatsapp_tab" class="whatsapp_tab_right"
        src="../statics/icons/whatsapp.png"
        style="height:50px;width:50px"

      />
</a>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'addFeedbackComponent',
  data() {
    return {
      layout: false,
      quality: 0,
      submitResult: [],
      name: null,
      comment: null,
      group: '',
      options: [{ label: 'Not at all likely', value: 0 },
        { label: 'Maybe, it depends', value: 1 },
        { label: 'I definitely would', value: 2 }],
    };
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
            this.layout = false;
            this.onReset();
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
