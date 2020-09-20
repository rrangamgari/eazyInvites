<template>
  <q-layout view="hHh lpr fff" >
    <q-page-container>
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
