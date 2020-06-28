<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <rsvp-guest-component></rsvp-guest-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import rsvpGuestComponent from '../components/rsvpGuest.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'eventStatus',
  components: {
    rsvpGuestComponent,
    headerComponent,
    footerComponent,
  },
};
</script>
