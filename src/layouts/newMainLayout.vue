<template>
  <q-layout view="hhh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';


export default {
  name: 'login',
  components: {
    headerComponent,
    footerComponent,
  },
};
</script>
