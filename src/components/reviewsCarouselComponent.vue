<template>
  <div class="q-pa-md" >

    <q-carousel
      v-model="slide"
      swipeable
      animated
      infinite
      :autoplay="1000"
      transition-prev="slide-right"
      transition-next="slide-left"
      :padding="padding"
      :vertical="vertical"
      :arrows="arrows"
      :navigation="navigation"
      :navigation-position="navPos"
      height="300px"
      class="bg-white text-black rounded-borders">
      <q-carousel-slide :name="feedback.id" class="column no-wrap flex-center"
                        v-for="feedback in feedbackList"
                        :key="feedback.id" >
        <div class="q-mt-md text-center">
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
          <body style="font-size:12px; white-space: pre-line">{{ feedback.comment }}</body>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
export default {
  data() {
    return {
      padding: true,
      vertical: false,
      arrows: true,
      navigation: true,

      navPos: 'bottom',
      navigationPositions: [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom (default)' },
        { value: 'left', label: 'left' },
      ],

      slide: 'style',
      lorem: 'Lorem ipsum doloraesentium libero ab nemo.',
      feedbackList: [
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
