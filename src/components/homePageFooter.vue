<template>
  <div>
    <q-toolbar class="glossy center">
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
    <q-dialog v-model="layout">
      <q-layout container class="bg-white" style="max-height:500px;">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Feedback</q-toolbar-title>

            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <q-form
              style="padding:20px;"
              class="q-gutter-md"
              @submit="onSubmit"
              @reset="onReset"
            >
              <q-rating
                name="quality"
                v-model="quality"
                max="5"
                size="3.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                no-dimming
              />
              <q-input
                label="Name"
                type="text"
                v-model="name"
                name="name"
                filled="filled"
              />
              <q-input
                label="Comments"
                type="textarea"
                v-model="comments"
                name="comments"
                filled="filled"
              />
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <div class="icon-bar">
      <a href="#" @click="layout = true" class="chat">
        <img
          src="../assets/chat.png"
          class="q-icon"
          style="height:45px;width:45px"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeFooterComponent',
  data() {
    return {
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      layout: false,
      quality: 5,
      submitResult: [],
      moreContent: true,
      drawer: false,
      drawerR: false,
      name: null,
      comments: null,
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
  methods: {
    onSubmit(evt) {
      // const formData = new FormData(evt.target);
      const submitResult = [evt];

      /* for (const [name, value] of formData.entries()) {
        submitResult.push({
          name,
          value,
        });
      } */

      this.submitResult = submitResult;
    },
    onReset() {
      this.quality = 0;
      this.name = null;
      this.comments = null;
    },
  },
};
</script>
