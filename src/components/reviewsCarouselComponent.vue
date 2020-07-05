<template>
  <div class="q-pa-md" >
<q-parallax
      src="../assets/home/review.jpg"
      :height="600"
    >
  <template v-slot:media>
    <img src="../assets/home/review.jpg">
  </template>
    <div class="q-pa-sm absolute-right" >
      <q-btn label="My Feedback" size="md" no-caps rounded icon="add" dense color="primary" />
    </div>
  <header class="section-header absolute-top text-white" style="margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;font-family: 'Montserrat', sans-serif;font-size: 32px;text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    padding-bottom: 15px">
    <h3>Reviews</h3>
  </header>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      infinite
      :autoplay="5000"
      transition-prev="slide-right"
      transition-next="slide-left"
      :padding="padding"
      :vertical="vertical"
      :arrows="arrows"
      :navigation="navigation"
      :navigation-position="navPos"
      navigation-icon="radio_button_unchecked"
      class="bg-transparent text-white rounded-borders"
    style="max-width: 800px;min-height: 550px">

      <q-carousel-slide :name="feedback.id" class="column no-wrap flex-center"
                        v-for="feedback in feedbackList"
                        :key="feedback.id" >
        <div class="q-mt-md text-center" >
          <!--<img src="~assets/logo/user.png" width="100px" height="100px"
               class="whatsapp_tab_right">
          <br>-->
          <img src="~assets/testimonial-1.jpg" class="testimonial-img" alt="">
          <h3 style="font-size: 20px;font-weight: bold;font-family: 'Montserrat', sans-serif;"
           class="">{{ feedback.name }}</h3>
          <!--<body style="font-size:17px; white-space: pre-line;background: rgba(0, 35, 85, 0.3)"
           class="merienda ellipsis">-->
          <p>
          <img src="~assets/quote-sign-left.png" class="quote-sign-left" alt="">
          {{ feedback.comment }}
          <img src="~assets/quote-sign-right.png" class="quote-sign-right" alt="">
          </p>
          <q-rating
            :value="feedback.rating"
            size="2em"
            color="grey"
            color-selected="yellow"
            icon="star_border"
            icon-selected="star"
            readonly
          />
        </div>
      </q-carousel-slide>

    </q-carousel>
    </q-parallax>
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
      padding: false,
      vertical: false,
      arrows: false,
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
          message: 'Welcome to Eazy Invites',
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
