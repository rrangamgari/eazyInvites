<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <browse-cards-component></browse-cards-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';
import browseCardsComponent from '../components/browseCards.vue';


export default {
  name: 'browseCardsLayout',
  components: {
    headerComponent,
    footerComponent,
    browseCardsComponent,
  },
};
</script>
