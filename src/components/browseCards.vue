<template>
  <div>
    <div class="q-pa-lg row warp justify-left items-center" style="background: #f7f7f7;">
      <div class="col-12 q-px-md q-py-sm row">
        <q-select class="col-8" style="max-width: 300px;" label="Event Type"
         outlined v-model="eventType" :options="eventTypeOptions"/>
         <q-space/>
        <q-btn style="max-width: 100px;" class="col-3" no-caps label="Select" color="primary"
         @click="selected !== null ? $router.push(`/editcard/${selected}`) : ''"/>
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-px-md q-py-sm"
       v-for="index in indices" :key="index">
            <section id="portfolio"  class="section-bg" >
              <div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
                <div class="portfolio-wrap">
                  <figure>
                    <img height="250px" :ratio="16/9" style="width: 100%;"
                     :src="require(`../assets/home/ez${index}.jpg`)" >
                    <a @click= "showCard(require(`../assets/home/ez${index}.jpg`))"
                    data-lightbox="portfolio" data-title="Card"
                    class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                    <a  @click= "$router.push(`/editcard/${index}`)"
                     class="link-details" title="Use this card">
                    <i class="ion ion-android-open"></i></a>
                  </figure>
                  <div class="portfolio-info">
                    <h4>{{index}}</h4>
                  </div>
                </div>
              </div>
            </section>
      </div>
      <VueEasyLightbox
        :visible="visible"
        :imgs="imgs"
        @hide="handleHide"
      ></VueEasyLightbox>
    </div>
  </div>
</template>

<script>
import { Loading, QSpinnerBars, colors } from 'quasar';
import axios from 'axios';
import VueEasyLightbox from 'vue-easy-lightbox';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  components: {
    VueEasyLightbox,
  },
  name: 'statusComponent',
  data() {
    return {
      eventTypeOptions: [],
      eventType: [],
      indices: [11, 12, 13, 14, 16, 23],
      selected: null,
      primary: '',
      imgs: '',
      visible: false,
    };
  },
  mounted() {
    this.primary = colors.getBrand('primary');
    axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
      'login-token',
    )}`;

    Loading.show({
      spinner: QSpinnerBars,
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
    showCard(src) {
      this.imgs = src;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>
