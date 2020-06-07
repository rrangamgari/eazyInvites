<template>
  <div class="bg-grey-3">
    <q-layout view="hhh lpr fff" class="shadow-2 rounded-borders">

      <header-component></header-component>
      <carouselComponent id="images"></carouselComponent>
      <video-component id="videos"></video-component>
      <reviewsCarouselComponent id="reviews"></reviewsCarouselComponent>
      <price-component id="prices"></price-component>

      <router-view/>
      <footer-component class="bg-primary"></footer-component>
    </q-layout>
  </div>
</template>
<script>
import carouselComponent from '../components/homePageCarousel.vue';
import videoComponent from '../components/homePageVideo.vue';
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
    priceComponent,
    reviewsCarouselComponent,
  },
  mounted() {
  },
};
</script>
