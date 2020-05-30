<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <rsvp-component></rsvp-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import rsvpComponent from '../components/rsvp.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'eventStatus',
  components: {
    rsvpComponent,
    headerComponent,
    footerComponent,
  },
};
</script>
