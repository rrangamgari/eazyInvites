<template>
  <div>
    <q-card class="q-pt-sm q-pb-xs q-px-xs flex flex-center">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            style="width: 350px;"
          >
            <q-input
              class="q-pt-sm"
              label="Email"
              type="text"
              v-model="email"
              name="email"
              readOnly="readOnly"
              lazy-rules='ondemand'
              :rules="[ val=> val !== null && val !== '' || 'Please enter your Email']"
            />
            <q-input
              class="q-pt-sm"
              label="First Name"
              type="text"
              v-model="firstName"
              name="fname"

              lazy-rules='ondemand'
              :rules="[ val=> val !== null && val !== '' || 'Please enter your First Name']"
            />
            <q-input
              class="q-pt-sm"
              label="Last Name"
              type="text"
              v-model="lastName"
              name="lname"

              lazy-rules='ondemand'
              :rules="[ val=> val !== null && val !== '' || 'Please enter your Last Name']"
            />
            <q-input
              class="q-pt-sm"
              label="Phone"
              type="text"
              v-model="phone"
              name="name"

              lazy-rules='ondemand'
              :rules="[ val=> val !== null && val !== '' || 'Please enter your Phone']"
            />
            <q-input
              class="q-pt-sm"
              label="Time Zone"
              type="text"
              v-model="timeZone"
              name="tz"

              lazy-rules='ondemand'
              :rules="[ val=> val !== null && val !== '' || 'Please enter your Phone']"
            />
            <div class="q-pt-md">
              <q-btn label="Save" type="submit" color="primary"/>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
                :rules="[ val=> val !== null && val !== '' || 'Please choose any one of above']"
              />
            </div>
          </q-form>
    </q-card>
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
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      timeZone: null,
    };
  },
  mounted() {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
      'login-token',
    )}`;
    axios
      .get('/api/UserDetails/getCurrentUser')
      .then((response) => {
        // JSON responses are automatically parsed.
        const res = response.data.data;
        this.phone = res.mobile;
        this.firstName = res.givenname;
        this.lastName = res.familyname;
        this.email = res.email;
        this.timeZone = res.commonname;
        if (res.commonname === null) {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          axios.get('https://timezoneapi.io/api/ip/?token=aUVcYLrWezMlqueIcmzI')
            .then((response1) => {
              this.timeZone = response1.data.datetime.offset_tzid;
              Loading.hide();
              this.onSubmit();
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
          // = this.$q.localStorage.getItem('time-zone-token');
        }
        // this.data = this.data.concat(response.data.data);
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
  },
  methods: {
    onSubmit() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios.put('/api/UserDetails/updateCurrentUser',
        {
          mobile: this.phone,
          givenname: this.firstName,
          familyname: this.lastName,
          email: this.email,
          commonname: this.timeZone,
        })
        .then((response) => {
          // JSON responses are automatically parsed.
          this.posts = response.data;
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: this.posts.status,
            position: 'center',
          });
          Loading.hide();
          this.$router.push('/myProfile');
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
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      axios
        .get('/api/UserDetails/getCurrentUser')
        .then((response) => {
          // JSON responses are automatically parsed.
          const res = response.data.data;
          this.phone = res.mobile;
          this.firstName = res.givenname;
          this.lastName = res.familyname;
          this.email = res.email;
          this.timeZone = res.commonname;
          // this.data = this.data.concat(response.data.data);
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
    },
  },
};
</script>
