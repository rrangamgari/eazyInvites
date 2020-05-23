<template>
  <q-layout view="hHh lpr fff">

    <footer-component></footer-component>

    <q-page-container>
      <events-component></events-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import eventsComponent from '../components/events.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'staus',
  components: {
    eventsComponent,
    footerComponent,
  },
};
</script>
