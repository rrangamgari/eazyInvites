<template>
  <q-layout view="hhh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <edit-card-component></edit-card-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';
import editCardComponent from '../components/editCard.vue';


export default {
  name: 'editCardLayout',
  components: {
    headerComponent,
    footerComponent,
    editCardComponent,
  },
};
</script>
