<template>
  <q-layout view="hHh lpr fff">

    <header-component></header-component>
    <footer-component></footer-component>

    <q-page-container>
      <invites-component></invites-component>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import invitesComponent from '../components/invites.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'invites',
  components: {
    invitesComponent,
    headerComponent,
    footerComponent,
  },
};
</script>
