<template>
  <div>
    <q-layout view="hhh lpr fff" class="shadow-2 rounded-borders">

      <header-component></header-component>
      <carouselComponent id="images"></carouselComponent>

      <q-page-container>

<video-component id="videos"></video-component>
<feed-back-component id="reviews"></feed-back-component>
<price-component id="prices"></price-component>
<reviewsCarouselComponent id="articles"></reviewsCarouselComponent>
        <router-view />
      </q-page-container>
    <footer-component class="bg-primary"></footer-component>
    </q-layout>
  </div>
</template>
<script>
import carouselComponent from '../components/homePageCarousel.vue';
import videoComponent from '../components/homePageVideo.vue';
import feedBackComponent from '../components/homePageFeedback.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/homePageFooter.vue';
import priceComponent from '../components/priceComponent.vue';
import reviewsCarouselComponent from '../components/reviewsCarouselComponent.vue';

export default {
  name: 'main',
  components: {
    carouselComponent,
    videoComponent,
    headerComponent,
    footerComponent,
    feedBackComponent,
    priceComponent,
    reviewsCarouselComponent,
  },
  mounted() {
  },
};
</script>
