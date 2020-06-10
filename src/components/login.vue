
<template>


<q-page class="q-pa-md q-pt-lg flex flex-center">

    <q-form
      id="login"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-xs q-pr-md"
      style="width:350px;"
    >
      <q-input
        outlined
        type="text"
        v-model="name"
        label="Phone"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter  Phone']"
      />

      <q-input
        outlined
        type="password"
        v-model="age"
        label="Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
      />

      <!--
      <q-toggle v-model="accept" label="I accept the license and terms" />
      -->
      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

</q-page>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerTail } from 'quasar';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'loginComponent',
  components: {

  },
  data() {
    return {
      name: null,
      age: null,
      // accept: false,
    };
  },
  mounted() {
    // if (this.$q.sessionStorage.getItem('login-token') !== null
    // && this.$q.sessionStorage.getItem('login-token') !== 'null') this.$router.push('/events');

    axios.defaults.headers.Authorization = '';
  },
  methods: {
    onSubmit() {
      Loading.show({
        spinner: QSpinnerTail,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.post('/api/authenticate', {
        username: this.name,
        password: this.age,
      })
        .then((response) => {
          // JSON responses are automatically parsed.
          this.posts = response.data;
          /* this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: this.posts.token,
            position: 'center',
          }); */
          this.$q.sessionStorage.set('login-token', this.posts.token);
          Loading.hide();
          this.$router.push('/events');
        })
        .catch((e) => {
        //  this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          Loading.hide();
        });
    },

    onReset() {
      this.name = null;
      this.age = null;
      // this.accept = false;
    },
  },
};

</script>
