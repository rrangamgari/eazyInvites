
<template>


<div class="q-pa-md flex flex-center">

  <div>&nbsp;</div>
    <q-form
      id="login"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md  q-pt-xl"
      style="width:60vh"
    >
      <q-input
        filled
        type="text"
        v-model="name"
        label="Email or Phone"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Email or Phone']"
      />

      <q-input
        filled
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

  </div>
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
          this.$router.push('/createInvitation');
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
