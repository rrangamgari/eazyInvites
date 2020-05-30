<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <events-component></events-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import eventsComponent from '../components/events.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'events',
  components: {
    eventsComponent,
    headerComponent,
    footerComponent,
  },
};
</script>
