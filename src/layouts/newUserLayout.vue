<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Header
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs>
    </q-header>


<footer-component></footer-component>
    <q-page-container>
      <!-- This is where pages get injected -->
      <newUserComponent></newUserComponent>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import newUserComponent from '../components/newUserComponent.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'main',
  components: {
    newUserComponent,
    footerComponent,
  },
};
</script>
