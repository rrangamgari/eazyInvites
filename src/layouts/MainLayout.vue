<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf"  style="" class="shadow-2 rounded-borders">

      <header-component></header-component>


      <q-page-container>

<loginComponent>zzczxcxz</loginComponent>
<video-component></video-component>
<feed-back-component></feed-back-component>


      </q-page-container>
    </q-layout>
    <footer-component class="bg-primary"></footer-component>
  </div>
</template>
<script>
import loginComponent from '../components/homePageCarousel.vue';
import videoComponent from '../components/homePageVideo.vue';
import feedBackComponent from '../components/homePageFeedback.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/homePageFooter.vue';


export default {
  name: 'main',
  components: {
    loginComponent,
    videoComponent,
    headerComponent,
    footerComponent,
    feedBackComponent,
  },
};
</script>
