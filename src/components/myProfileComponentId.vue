<template>
    <div  class="q-py-md q-pr-md q-mt-md">
      <div class="row">
      <div class="col-5" >
      </div>
      <div class="col-7" style="width: 50%">
        <q-btn label="Download" icon="cloud_download" type="submit"
               color="primary" class="q-mr-sm mdi-format-align-right"
        @click="download"/>
      </div>
      </div>
      <br>
      <div>
        <q-card  v-ripple v-for="item in items" :key="item.message" style="width: 50%">
          <q-card-section class="q-pa-xs row" >
            <div class="text-center text-weight-medium text-black col-6" style="font-size: 14px;">
              {{ item.userdatatype }}
            </div>
            <div class="text-center text-weight-medium text-black col-6"
                 style="font-size: 14px;font-weight: bold">
             {{ item.userdataanswer }}
            </div>
          </q-card-section>
        </q-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerBars, exportFile } from 'quasar';

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
      mobile: null,
      phone: null,
      items: [
      ],
    };
  },
  mounted() {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });
    axios
      .get(`/api/UserDetails/getUserProfile/${this.$route.params.profileId}`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.items = this.items.concat(response.data.data);
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
    download() {
      let content = '';
      for (let i = 0; i < this.items.length; i += 1) {
        content += this.items[i].userdatatype;
        content += ',';
        content += this.items[i].userdataanswer;
        content += ',\n';
      }

      const status = exportFile(
        'Ravinder_details.csv',
        content,
        'text/csv',
      );

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },
    onSubmit() {
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
