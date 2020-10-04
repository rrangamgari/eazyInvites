<template>
  <div class="q-pa-md flex flex-center">
    <q-form
      id="register"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-xs q-pr-md"
      style="width: 350px;"
    >
      <q-input

        :dark="$props.dark"
        type="text"
        v-model="firstname"
        label="First Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Firstname']"
        autofocus
      />
      <q-input

        :dark="$props.dark"
        type="text"
        v-model="lastname"
        label="Last Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Lastname']"
      />
      <q-input

        :dark="$props.dark"
        v-model="phone"
        label="Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter Phone']"
      />

      <q-input

        :dark="$props.dark"
        :type="passwordFieldType"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
      >
        <template v-slot:append>
          <q-icon :name="iconName" @click="switchVisibility" style="cursor: pointer"/>
        </template>
      </q-input>
      <q-input

        :dark="$props.dark"
        type="password"
        v-model="cpassword"
        label="Confirm Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
      />
      <div class="col q-pb-xs">
        <div class="col row items-center">
          <q-checkbox dense :dark="$props.dark" :value="accept"
           :class="$props.dark ? 'text-white' : 'text-black'"
           @input="(v) => {accept = v; error = !v;}" label="I accept the " />
          &nbsp;
          <a href="/termsconditions" target="_blank"> Terms & Conditions</a>
        </div>
        <div class="col text-negative" style="font-size: 12px; line-height: 1;"
         :style="`padding-top: ${error ? 8.75 : 20}px;`">
          <div v-if="error">Please accept the Terms & Conditons</div>
        </div>
      </div>
      <div>
        <q-btn label="Register" type="submit" color="primary" class="q-mr-sm"/>
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
  // name: 'ComponentName',
  props: ['dark'],
  data() {
    return {
      firstname: null,
      lastname: null,
      phone: null,
      password: null,
      cpassword: null,
      passwordFieldType: 'password',
      iconName: 'visibility_off',
      accept: false,
      error: false,
    };
  },
  mounted() {
    if (this.$q.localStorage.getItem('login-token') !== null) this.$router.push('/events');

    axios.defaults.headers.Authorization = '';
  },
  methods: {
    onReset() {
      this.firstname = null;
      this.lastname = null;
      this.phone = null;
      this.password = null;
      this.cpassword = null;
      this.accept = false;
      this.error = false;
    },
    onSubmit() {
      if (!this.accept) {
        this.error = true;
        return;
      }
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.post('/api/userSystem/register', {
        mobile: this.phone,
        password: { password: this.password },
        givenname: this.firstname,
        familyname: this.lastname,
        fax: this.$q.localStorage.getItem('country-token') === 'US' ? '1' : '91',
        role: { roleid: 3, active: true },
      })
        .then((response) => {
          // JSON responses are automatically parsed.
          this.posts = response.data;
          if (this.posts.status === 'success') {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'User Created',
              position: 'center',
            });
            this.$q.localStorage.set('login-token', this.posts.data);
            axios.defaults.headers.Authorization = `Bearer ${this.posts.data}`;

            axios.get('/api/UserDetails/getCurrentUser')
              .then((response1) => {
                // JSON responses are automatically parsed.
                this.$q.localStorage.set('user-token', response1.data);
                // Notification for testing api
                this.$router.push('/createInvitation');
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
          }
          if (this.posts.status === 'failed') {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: this.posts.data,
              position: 'center',
            });
          }
          // this.$q.localStorage.set('login-token', this.posts.token);
          Loading.hide();
        })
        .catch((e) => {
          //  this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.data,
            position: 'center',
          });
          Loading.hide();
        });
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.iconName = this.iconName === 'visibility_off' ? 'visibility' : 'visibility_off';
    },
  },
};
</script>
