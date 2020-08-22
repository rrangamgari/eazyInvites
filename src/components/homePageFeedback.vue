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
            <body style="font-size:12px; white-space: pre-line">{{ feedback.comment }}</body>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--==========================
     Clients Section
   ============================-->
    <section id="testimonials" class="section-bg wow fadeInUp">
      <div class="container">

        <header class="section-header">
          <h3>Testimonials</h3>
        </header>

        <div class="owl-carousel testimonials-carousel">

          <div class="testimonial-item">
            <img src="img/testimonial-1.jpg" class="testimonial-img" alt="">
            <h3>Saul Goodman</h3>
            <h4>Ceo &amp; Founder</h4>
            <p>
              <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus.
 Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
              <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
            </p>
          </div>

          <div class="testimonial-item">
            <img src="img/testimonial-2.jpg" class="testimonial-img" alt="">
            <h3>Sara Wilsson</h3>
            <h4>Designer</h4>
            <p>
              <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis
 quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
              <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
            </p>
          </div>

          <div class="testimonial-item">
            <img src="img/testimonial-3.jpg" class="testimonial-img" alt="">
            <h3>Jena Karlis</h3>
            <h4>Store Owner</h4>
            <p>
              <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
Enim nisi quem export duis labore cillum quae magna enim sint quorum
 nulla quem veniam duis minim tempor
 labore quem eram duis noster aute amet eram fore quis sint minim.
              <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
            </p>
          </div>

          <div class="testimonial-item">
            <img src="img/testimonial-4.jpg" class="testimonial-img" alt="">
            <h3>Matt Brandon</h3>
            <h4>Freelancer</h4>
            <p>
              <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit
 minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
              <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
            </p>
          </div>

          <div class="testimonial-item">
            <img src="img/testimonial-5.jpg" class="testimonial-img" alt="">
            <h3>John Larson</h3>
            <h4>Entrepreneur</h4>
            <p>
              <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor
 noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat
 legam esse veniam culpa fore nisi cillum quid.
              <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
            </p>
          </div>

        </div>

      </div>
    </section><!-- #testimonials -->
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
          comment: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 5,
          name: 'Sridevi Rangamgari',
          comment: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 4,
          name: 'Vivek Rangamgari',
          comment: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
        {
          id: 1,
          rating: 3,
          name: 'Divya Molugu',
          comment: 'Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards. Used this recently for My son\'s 12 birthday party. Invitees loved it , it has gps feature for identifying the location with ease...\nthe best part is it send reminders to the guests a day before...\n\nThank you for this awesome product!',
        },
      ],
    };
  },
  mounted() {
    axios.get('http://invites-env.eba-662y8mnq.ap-south-1.elasticbeanstalk.com/api/feedback')
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
