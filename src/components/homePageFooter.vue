<template>
  <div>
    <q-toolbar class="center">
      <q-toolbar-title style="align:center;text-align: center;">
        <div class="" style="color:#FFFFFF;font-family: 'Merienda', cursive;">
          Follow us
        </div>
        <div>&nbsp;</div>
        <a href="https://www.instagram.com/" target="_blank">
          <img
            src="../assets/instagram.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

       <!-- &nbsp;
        <a href="https://skype.com" target="_blank">
          <img
            src="../assets/skype.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a> -->

        &nbsp;
        <a href="https://twitter.com" target="_blank">
          <img
            src="../assets/twitter.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://www.pinterest.com/" target="_blank">
          <img
            src="../assets/pinint.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://facebook.com" target="_blank">
          <img
            src="../assets/facebook.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://linkedin.com" target="_blank">
          <img
            src="../assets/linkedin.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

       <!-- &nbsp;
        <a href="https://youtube.com" target="_blank">
          <img
            src="../assets/youtube.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a>

        &nbsp;
        <a href="https://web.whatsapp.com" target="_blank">
          <img
            src="../assets/whatsapp.png"
            class="q-icon"
            style="height:45px;width:45px"
        /></a> -->

        &nbsp;

        <div>&nbsp;</div>
        <div
          style="font-size:12px;color:#FFFFFF;font-family: 'Merienda', cursive;"
        >
          &copy; copyright 2020 | Privacy Policy | About Us | Contact Us
        </div>
        <div>&nbsp;</div>
      </q-toolbar-title>
    </q-toolbar>

    <addFeedbackComponent></addFeedbackComponent>

  </div>
</template>

<script>
import addFeedbackComponent from './addFeedbackComponent.vue';

export default {
  name: 'homeFooterComponent',
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
