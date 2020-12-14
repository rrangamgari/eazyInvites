<template>
  <div class="bg-grey-3">
    <q-layout view="hhh lpr fff" class="shadow-2 rounded-borders">

      <header-component></header-component>
      <login-dialog></login-dialog>
      <indiacarouselComponent id="images" ></indiacarouselComponent>
      <router-view/>
      <footer-component class="bg-primary"></footer-component>
    </q-layout>
  </div>
</template>
<script>
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';
import indiacarouselComponent from '../components/indiaHomePageCarousel.vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/homePageFooter.vue';
import loginDialog from '../components/loginDialog.vue';

export default {
  name: 'main',
  components: {
    headerComponent,
    footerComponent,
    indiacarouselComponent,
    loginDialog,
  },
  data() {
    return {
      showUS: true,
      showInd: false,
    };
  },
  mounted() {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    this.openDialog(true);
    if (this.$q.localStorage.getItem('country-token') !== null
      && this.$q.localStorage.getItem('country-token') === 'US') {
      this.showUS = true;
      this.showInd = false;
      Loading.hide();
    } else {
      this.showUS = false;
      this.showInd = true;
      Loading.hide();
    }
    if (this.$q.localStorage.getItem('country-token') === null) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.get('/api/feedback/gps')
        .then((response) => {
          // JSON responses are automatically parsed.
          // this.feedbackList = this.feedbackList.concat(response.data.data);
          // Notification for testing api
          this.$q.localStorage.set('country-token', response.data.countryCode);
          if (response.data.countryCode === 'IN') {
            this.showUS = false;
            this.showInd = true;
          } else {
            this.showUS = true;
            this.showInd = false;
          }
          Loading.hide();
        })
        .catch((e) => {
          this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'oops Something went wrong...',
            position: 'top',
          });
          Loading.hide();
        });
    }
  },
  methods: {
    openDialog(login, username = '') {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: loginDialog,
        parent: this,
        login,
        username,
      }).onOk(() => {
        this.$router.push('/events');
      }).onCancel(() => {
      });
      Loading.hide();
    },
  },
};
</script>
