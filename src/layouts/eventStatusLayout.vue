<template>
  <q-layout view="hHh lpr fff">

    <footer-component></footer-component>

    <q-page-container>
      <status-component></status-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import statusComponent from '../components/status.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'staus',
  components: {
    statusComponent,
    footerComponent,
  },
};
</script>
