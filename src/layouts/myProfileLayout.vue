<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <my-profile-component></my-profile-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';
import myProfileComponent from '../components/myProfileComponent.vue';


export default {
  name: 'browseCardsLayout',
  components: {
    headerComponent,
    footerComponent,
    myProfileComponent,
  },
};
</script>
