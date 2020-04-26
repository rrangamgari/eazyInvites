<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
<footer-component></footer-component>

<header-component></header-component>
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->


    <q-page-container>
      <!-- This is where pages get injected -->

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';


export default {
  name: 'createInvitation',
  components: {

    headerComponent,
    footerComponent,
  },
};
</script>
