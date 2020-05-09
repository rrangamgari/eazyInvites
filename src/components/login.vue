
<template>


<div class="q-pa-md" style="max-width: 600px;padding:20px;">

<div>&nbsp;</div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="text"
        v-model="name"
        label="Username"
                lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="age"
        label="Password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import axios from 'axios';


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

      accept: false,
    };
  },


  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
          position: 'center',
        });
      } else {
        axios.post('/api/authenticate', {
          username: this.name,
          password: this.age,
        })
          .then((response) => {
            // JSON responses are automatically parsed.
            this.posts = response.data;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: this.posts.token,
              position: 'center',
            });
            this.$router.push('/createInvitation');
          })
          .catch((e) => {
            this.errors.push(e);
            window.location = '/login1';
          });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
  },
};

</script>
