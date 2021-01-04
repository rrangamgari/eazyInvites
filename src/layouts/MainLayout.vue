<template>
  <div class="bg-grey-3">
    <q-layout view="hhh lpr fff" class="shadow-2 rounded-borders">

      <header-component></header-component>
      <carouselComponent id="images" v-if="showUS"></carouselComponent>
      <indiacarouselComponent id="images" v-else></indiacarouselComponent>
      <video-component id="videos"></video-component>
      <cards-component id="portfolio"></cards-component>
      <reviewsCarouselComponent id="reviews"></reviewsCarouselComponent>
      <price-component id="prices" v-if="showUS"></price-component>
      <indianPriceComponent id="prices" v-else></indianPriceComponent>
      <router-view/>
      <footer-component class="bg-primary"></footer-component>
    </q-layout>
  </div>
</template>
<script>
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';
import carouselComponent from '../components/homePageCarousel.vue';
import indiacarouselComponent from '../components/indiaHomePageCarousel.vue';
import videoComponent from '../components/homePageVideo.vue';
import cardsComponent from '../components/homePageBrowseCards.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/homePageFooter.vue';
import indianPriceComponent from '../components/indianPriceComponent.vue';
import priceComponent from '../components/priceComponent.vue';
import reviewsCarouselComponent from '../components/reviewsCarouselComponent.vue';

export default {
  name: 'main',
  components: {
    carouselComponent,
    indiacarouselComponent,
    videoComponent,
    cardsComponent,
    headerComponent,
    footerComponent,
    priceComponent,
    indianPriceComponent,
    reviewsCarouselComponent,
  },
  data() {
    return {
      showUS: true,
      showInd: false,
    };
  },
  mounted() {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    if (this.$q.localStorage.getItem('country-token') !== null
      && this.$q.localStorage.getItem('country-token') === 'US') {
      this.showUS = true;
      this.showInd = false;
      Loading.hide();
    } else {
      this.showUS = false;
      this.showInd = true;
      Loading.hide();
    }
    if (this.$q.localStorage.getItem('time-zone-token') === null) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.get('/api/feedback/gps')
        .then((response) => {
          // JSON responses are automatically parsed.
          // this.feedbackList = this.feedbackList.concat(response.data.data);
          // Notification for testing api
          this.$q.localStorage.set('country-token', response.data.countryCode);
          this.$q.localStorage.set('time-zone-token', response.data.timezone);
          if (response.data.countryCode === 'IN') {
            this.showUS = false;
            this.showInd = true;
          } else {
            this.showUS = true;
            this.showInd = false;
          }
          Loading.hide();
        })
        .catch((e) => {
          this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'oops Something went wrong...',
            position: 'top',
          });
          Loading.hide();
        });
    }
  },
};
</script>
