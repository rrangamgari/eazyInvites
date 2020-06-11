<template>
  <div>
    <div class="q-pa-lg row warp justify-left items-center">
      <div class="col-12 q-px-md q-py-sm row">
        <q-select class="col-8" style="max-width: 300px;" label="Event Type"
         outlined v-model="eventType" :options="eventTypeOptions"/>
         <q-space/>
        <q-btn style="max-width: 100px;" class="col-3" no-caps label="Select" color="primary"
         @click="selected !== null ? $router.push(`/editcard/${selected}`) : ''"/>
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-px-md q-py-sm"
       v-for="index in indices" :key="index">
        <q-card @click="selected === index ? selected = null : selected = index;"
         :style="selected === index ? `outline: 3px solid ${primary};
          border-radius: 0px; margin: -8px;` : ''">
          {{index}}
            <q-img class="q-pa-xs" :ratio="16/9" width="100%"
             :src="require(`../assets/home/ez${index}.jpg`)" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading, QSpinnerTail, colors } from 'quasar';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'statusComponent',
  data() {
    return {
      eventTypeOptions: [],
      eventType: [],
      indices: [11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23],
      selected: null,
      primary: '',
    };
  },
  mounted() {
    this.primary = colors.getBrand('primary');
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;

    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios
      .get('/api/eventSystem/eventType')
      .then((Response) => {
        Loading.hide();
        this.eventTypeOptions = Response.data.data;
      })
      .catch((e) => {
        Loading.hide();
        if (e.message === 'Request failed with status code 401') {
          this.$q.sessionStorage.remove('login-token');
          this.$q.sessionStorage.set('login-token', null);
          this.$router.push('/login');
        }

        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top',
        });
      });
  },
  methods: {
  },
};
</script>
