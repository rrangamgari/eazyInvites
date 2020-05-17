<template>
  <q-layout view="hHh lpr fff">
    <!-- Be sure to play with the Layout demo on docs -->

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
