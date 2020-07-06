<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-layout container class="bg-white" style="max-height:650px;">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Register</q-toolbar-title>

          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
  <q-page class="q-pa-md q-pt-lg flex flex-center">

    <q-form
      id="login"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      style="width:350px;"
    >
      <q-input
        color="primary" outlined
        type="text"
        v-model="firstname"
        label="First Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Firstname']"
      />
      <q-input
        color="primary" outlined
        type="text"
        v-model="lastname"
        label="Last Name"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Lastname']"
      />
      <q-input
        color="primary" outlined
        v-model="phone"
        label="Phone Number"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' || 'Please enter Phone']"
      />

      <q-input
        color="primary" outlined
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
        color="primary" outlined
        type="password"
        v-model="cpassword"
        label="Confirm Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
      />
      <!--
      <q-toggle v-model="accept" label="I accept the license and terms" />
      -->
      <div>
        <q-btn label="Register" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" outlined/>
      </div>
    </q-form>

  </q-page>
  </q-page-container>
    </q-layout>
  </q-dialog>
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
  data() {
    return {
      firstname: null,
      lastname: null,
      phone: null,
      password: null,
      cpassword: null,
      passwordFieldType: 'password',
      iconName: 'visibility_off',
    };
  },
  methods: {
    onReset() {
      this.firstname = null;
      this.lastname = null;
      this.phone = null;
      this.password = null;
      this.cpassword = null;
    },
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },
    onSubmit() {
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
          }
          // this.$q.sessionStorage.set('login-token', this.posts.token);
          Loading.hide();
          this.$router.push('/login');
        })
        .catch((e) => {
          //  this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
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
