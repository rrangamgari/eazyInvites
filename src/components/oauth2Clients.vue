<template>
    <div class="q-pa-xs row items-center justify-center">
        <div class="q-px-xs" v-for="client in clients" :key="client">
            <q-btn :size="size" ripple unelevated dense @click="oauth2Login(client)"
             :icon="`img:statics/icons/${client}.png`"/>
             <!-- :label="label ? `Continue with ${client}` : ''" no-caps/> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  props: {
    size: {
      default: '16px',
    },
    label: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      clients: ['google'], // 'facebook'], // OAuth2 Clients (client logo must exist as statics/icons/client.png)
    };
  },
  mounted() {
    window.addEventListener('storage', this.oauth2SuccessCheck);
  },
  destroyed() {
    window.removeEventListener('storage', this.oauth2SuccessCheck);
  },
  methods: {
    oauth2Login(client) {
      window.open(`/oauth2/${client}`, `${client} Login`, `left=${Math.max(0, (window.screen.width / 2) - 250)},top=50,width=500,height=600,location=no`);
    },
    oauth2SuccessCheck(evt) {
      if (evt && evt.key === 'oauth2-token'
       && this.$q.localStorage.getItem('oauth2-token') !== null) this.oauth2Success();
    },
    oauth2Success() {
      window.removeEventListener('storage', this.oauth2SuccessCheck);
      const token = this.$q.localStorage.getItem('oauth2-token');
      this.$q.localStorage.remove('oauth2-token');
      this.$q.localStorage.set('login-token', token);
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios.get('/api/UserDetails/getCurrentUser')
        .then((response) => {
          this.$q.localStorage.set('user-token', response.data.data);
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: response.data.message,
            position: 'top',
          });
          Loading.hide();
          this.$emit('oauth2-login-success');
        })
        .catch((e) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          Loading.hide();
          this.$emit('oauth2-login-success');
        });
    },
  },
};
</script>
