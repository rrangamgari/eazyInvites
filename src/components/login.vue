<template>
<div class="q-pa-md flex flex-center">
    <q-form
      id="login"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-xs q-pr-md"
      style="width: 350px;"
    >
      <q-input

        :dark="$props.dark"
        type="text"
        v-model="name"
        label="Phone"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' && val.length === 10 || 'Please enter Phone']"
        :autofocus="!name || name.length != 10"
      />

      <q-input

        :dark="$props.dark"
        type="password"
        v-model="age"
        label="Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
        :autofocus="name.length == 10"
      />

      <!--
      <q-toggle v-model="accept" label="I accept the license and terms" />
      -->
      <div>
        <q-btn label="Login" type="submit" color="primary" class="q-mr-sm"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>

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
  name: 'loginComponent',
  props: ['dark', 'username'],
  data() {
    return {
      name: this.$props.username || '',
      age: '',
    };
  },
  mounted() {
    if (this.$q.localStorage.getItem('login-token') !== null) this.$router.push('/events');

    axios.defaults.headers.Authorization = '';
  },
  methods: {
    onSubmit() {
      Loading.show({
        spinner: QSpinnerBars,
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
          this.$q.localStorage.set('login-token', this.posts.token);
          axios.defaults.headers.Authorization = `Bearer ${this.posts.token}`;

          axios.get('/api/UserDetails/getCurrentUser')
            .then((response1) => {
              // JSON responses are automatically parsed.
              this.$q.localStorage.set('user-token', response1.data.data);
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: response1,
                position: 'top',
              });

              // Notification for testing api
              this.$emit('login-success');
              Loading.hide();
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
    },
  },
};

</script>
