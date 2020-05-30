<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <status-component></status-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import statusComponent from '../components/status.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'eventStatus',
  components: {
    statusComponent,
    headerComponent,
    footerComponent,
  },
};
</script>
