<template>
  <div class="q-pa-md text-primary text-h6 text-center"> </div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'oauth2Component',
  data() {
    return {
      clients: ['google'], // 'facebook'],
      client: this.$route.params.client || '',
      code: this.$route.query.code || '',
      error: this.$route.query.error || '',
    };
  },
  mounted() {
    if (!this.clients.includes(this.client)) window.close();
    if (this.$route.path.includes('contacts')) this.handleContacts();
    else if (!this.$route.path.includes('handler')) this.forwardToOAuth2();
    else this.validateCode();
  },
  methods: {
    handleContacts() {
      if (this.error !== '' && this.code === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Error Occurred',
          position: 'top',
        });
        setTimeout(window.close, 3000);
      }
      Loading.show({
        message: 'Fetching User Details',
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios.get(`/api/oauth2/contacts/${this.client}/handler`, { params: { code: this.code } })
        .then(() => {
          this.$q.localStorage.set('oauth2-contacts', true);
          Loading.hide();
          window.close();
        })
        .catch((e) => {
          Loading.hide();
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          setTimeout(window.close, 3000);
        });
    },
    forwardToOAuth2() {
      Loading.show({
        message: `Redirecting to ${this.client.substr(0, 1).toUpperCase()}${this.client.substring(1)} SignIn`,
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.get(`/api/oauth2/${this.client}?host=https://www.wepromotes.com`)
        .then((response) => {
          Loading.hide();
          window.open(response.data.data, '_self');
        })
        .catch((e) => {
          Loading.hide();
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          setTimeout(window.close, 3000);
        });
    },
    validateCode() {
      if (this.error !== '' && this.code === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Error Occurred',
          position: 'top',
        });
        setTimeout(window.close, 3000);
      }
      Loading.show({
        message: 'Fetching User Details',
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.get(`/api/oauth2/${this.client}/handler`, { params: { code: this.code } })
        .then((response) => {
          this.$q.localStorage.set('oauth2-token', response.data.token);
          Loading.hide();
          window.close();
        })
        .catch((e) => {
          Loading.hide();
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          setTimeout(window.close, 3000);
        });
    },
  },
};
</script>
