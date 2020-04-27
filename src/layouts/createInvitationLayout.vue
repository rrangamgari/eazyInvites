<template>
  <q-layout view="lHh Lpr lFf"> <!-- Be sure to play with the Layout demo on docs -->


    <!-- (Optional) The Footer -->
<footer-component></footer-component>


    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->


    <q-page-container>
      <!-- This is where pages get injected -->
      <create-invitation-component></create-invitation-component>
           <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import createInvitationComponent from '../components/createInvitationComponent.vue';


import footerComponent from '../components/footer.vue';


export default {
  name: 'login',
  components: {
    createInvitationComponent,


    footerComponent,
  },
};
</script>
