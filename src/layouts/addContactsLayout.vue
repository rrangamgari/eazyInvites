<template>
  <q-layout view="hHh lpr fff" >
    <!-- Be sure to play with the Layout demo on docs -->

    <q-page-container class="bg-grey-4">
      <!-- This is where pages get injected -->
       <add-contacts-component v-show="!mobileView"></add-contacts-component>
      <add-contacts-mobile-component v-show="mobileView"></add-contacts-mobile-component>
      <router-view />
    </q-page-container>
    <footer-component></footer-component>
  </q-layout>

</template>

<script>
import addContactsComponent from '../components/addContactsComponent.vue';
import addContactsMobileComponent from '../components/addContactsMobileComponent.vue';
import footerComponent from '../components/footer.vue';

export default {
  // name: 'LayoutName',
  components: {
    addContactsComponent,
    addContactsMobileComponent,
    footerComponent,
  },
  data() {
    return {
      mobileView: this.$q.screen.width <= 600,
    };
  },
  watch: {
    // '$q.screen.width': function () {
    // this.mobileView = this.$q.screen.width <= 600;
    // },
  },
};
</script>
