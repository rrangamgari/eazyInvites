<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf"  style="" class="shadow-2 rounded-borders">

      <header-component></header-component>
<footer-component></footer-component>

      <q-page-container>
        <q-page class="q-pa-md">Login
<loginComponent>zzczxcxz</loginComponent>
<PageIndex></PageIndex>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import loginComponent from '../components/login.vue';
import PageIndex from '../pages/index.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';


export default {
  name: 'main',
  components: {
    loginComponent,
    PageIndex,
    headerComponent,
    footerComponent,
  },
};
</script>
