<template>
  <q-layout view="lhr lpr lfr"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <newUserComponent></newUserComponent>
      <router-view />
    </q-page-container>
    <footer-component></footer-component>
  </q-layout>
</template>

<script>
import newUserComponent from '../components/newUserComponent.vue';
import footerComponent from '../components/homePageFooter.vue';

export default {
  name: 'main',
  components: {
    newUserComponent,
    footerComponent,
  },
};
</script>
