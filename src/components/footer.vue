<template>
  <q-footer >
    <q-toolbar class="glossy center">
      <q-toolbar-title style="align:center;text-align: center;">
        <div class="" style="color:#FFFFFF;font-family: 'Merienda', cursive;">
          Follow us
        </div>
        <div style="height:60px">
          <a href="https://www.instagram.com/" target="_blank">
            <img
              src="../assets/instagram.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          <!--&nbsp;
          <a href="https://skype.com" target="_blank">
            <img
              src="../assets/skype.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>-->

          &nbsp;
          <a href="https://twitter.com" target="_blank">
            <img
              src="../assets/twitter.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          &nbsp;
          <a href="https://www.pinterest.com/" target="_blank">
            <img
              src="../assets/pinint.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          &nbsp;
          <a href="https://facebook.com" target="_blank">
            <img
              src="../assets/facebook.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          &nbsp;
          <a href="https://linkedin.com" target="_blank">
            <img
              src="../assets/linkedin.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          <!--&nbsp;
          <a href="https://youtube.com" target="_blank">
            <img
              src="../assets/youtube.png"
              class="q-icon"
              style="height:25px;width:25px"
          /></a>

          &nbsp;
          <a href="https://web.whatsapp.com" target="_blank">
            <img
              src="../assets/whatsapp.png"
              class="q-icon"
              style="height:48px;width:48px"
          /></a>-->

          &nbsp;
        </div>
        <div
          style="font-size:12px;color:#FFFFFF;font-family: 'Merienda', cursive;"
        >
          Privacy Policy | About Us | Contact us
        </div>
        <div>&nbsp;</div>
      </q-toolbar-title>
    </q-toolbar>

    <addFeedbackComponent></addFeedbackComponent>

  </q-footer>
</template>

<script>
import addFeedbackComponent from './addFeedbackComponent.vue';

export default {
  name: 'footerComponent',
  components: {
    addFeedbackComponent,
  },
  data() {
    return {
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      moreContent: true,
      drawer: false,
      drawerR: false,
      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,'
        + 'ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
    };
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    },
  },
};
</script>
