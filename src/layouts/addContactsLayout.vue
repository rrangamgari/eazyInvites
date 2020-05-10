<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated> </q-header>

    <!-- (Optional) The Footer -->


    <q-page-container>
      <!-- This is where pages get injected -->
       <add-contacts-component></add-contacts-component>
      <router-view />
    </q-page-container>
    <footer-component></footer-component>
  </q-layout>

</template>

<script>
import addContactsComponent from '../components/addContactsComponent.vue';
import footerComponent from '../components/footer.vue';

export default {
  // name: 'LayoutName',
  components: {
    addContactsComponent,

    footerComponent,
  },
  data() {
    return {

    };
  },
};
</script>
