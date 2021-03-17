<template>
  <div v-scroll="scrollHandler">
    <div class="q-pa-lg row warp justify-left items-center">
      <div class="col-12 q-px-md q-py-sm row">
        <q-select class="col-8" style="max-width: 300px;" label="Event Type"
          v-model="eventType" @input="eventTypeInput" :options="eventTypeOptions"/>
        <!-- <q-space/>
        <q-btn style="max-width: 100px;" class="col-3" no-caps label="Select" color="primary"
         @click="selected !== null ? $router.push(`/editcard/${selected}`) : ''"/> -->
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-md"
       v-for="card in cards" :key="card.id">
            <div id="portfolio"  class="section-bg" >
              <div class="col-lg-4 col-md-6 portfolio-item data-card wow fadeInUp">
                <div class="portfolio-wrap">
                  <figure>
                    <img :height="`${height}px`" style="width: 100%;"
                     :src="card.thumbnail" loading="lazy">
                    <a @click="showCard(card.img)"
                     cards-lightbox="portfolio" cards-title="Card"
                     class="link-preview" title="Preview"><q-icon name="remove_red_eye" /></a>
                    <a @click="$router.push(`/editcard/${card.id}?eventtype=${card.eventTypeId}`)"
                     class="link-details" title="Use this card">
                    <q-icon name="open_in_new" /></a>
                  </figure>
                </div>
              </div>
            </div>
      </div>
      <div v-if="load" class="full-width q-pa-md row justify-center">
        <q-spinner-bars class="col-3" color="primary" />
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
      eventTypeOptions: [{ value: 0, label: 'All' }],
      eventType: { value: 0, label: 'All' },
      all: [],
      data: [],
      cards: [],
      n: 0,
      k: 20,
      load: false,
      height: 200,
      selected: null,
      primary: '',
      imgs: '',
      visible: false,
    };
  },
  mounted() {
    this.primary = colors.getBrand('primary');

    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token') || ''}`;

    axios
      .get('/api/eventSystem/eventType')
      .then((Response) => {
        this.eventTypeOptions = this.eventTypeOptions.concat(Response.data.data);
      });

    this.loadCards();
  },
  methods: {
    loadCards() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios
        .get('/api/cards')
        .then((Response) => {
          this.all = Response.data.data;
          this.data = this.all.filter((e) => (e.eventTypeId > 0));
          // Image Height: 200px, Padding-Y: 32px, Max Images along Width: 6
          this.k = Math.floor(window.innerHeight / (this.height + 32)) * 6;
          this.n = 2 * this.k;
          this.cards = this.data.splice(0, this.n);
          Loading.hide();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
            this.$login(this.loadCards, () => this.$router.push('/'));
          }

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
    showCard(src) {
      this.imgs = src;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    eventTypeInput(eventType) {
      if (eventType.value === 0) this.data = this.all.filter((e) => (e.eventTypeId > 0));
      else this.data = this.all.filter((e) => (e.eventTypeId === eventType.value));
      this.n = 2 * this.k;
      this.cards = this.data.splice(0, this.n);
    },
    scrollHandler(pos) {
      const h = document.body.scrollHeight - window.innerHeight - pos;
      if (h <= (this.height + 150) && this.data.length > 0) {
        this.load = true;
        this.cards = this.cards.concat(this.data.splice(0, this.k));
        this.n += this.k;
      } else this.load = false;
    },
  },
};
</script>

<style>
  /* Portfolio Section
--------------------------------*/

  #portfolio {
    padding: 0px;
    animation: zoomInDown; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s; /* don't forget to set a duration! */
    animate-delay: 0.1s;
  }

  #portfolio-flters {
    padding: 0;
    margin: 5px 0 35px 0;
    list-style: none;
    text-align: center;
  }

  #portfolio-flters li {
    cursor: pointer;
    margin: 15px 15px 15px 0;
    display: inline-block;
    padding: 10px 20px;
    font-size: 12px;
    line-height: 20px;
    color: #666666;
    border-radius: 4px;
    text-transform: uppercase;
    background: #fff;
    margin-bottom: 5px;
    transition: all 0.3s ease-in-out;
  }

  #portfolio-flters li:hover,
  #portfolio-flters li.data-active {
    background: #05944F;
    color: #fff;
  }

  #portfolio-flters li:last-child {
    margin-right: 0;
  }

  #portfolio .portfolio-wrap {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    transition: 0.3s;
  }

  #portfolio .portfolio-wrap:hover {
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.16);
  }

  #portfolio .portfolio-item {
    position: relative;
    height: 200px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    animation: jackInTheBox; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s; /* don't forget to set a duration! */
    animate-delay: 0.1s;
  }

  #portfolio .portfolio-item figure {
    background: #000;
    overflow: hidden;
    height: 200px;
    position: relative;
    /* border-radius: 4px 4px 0 0; */
    margin: 0;
  }

  #portfolio .portfolio-item figure:hover img {
    opacity: 0.4;
    transition: 0.3s;
  }

  #portfolio .portfolio-item figure .link-preview,
  #portfolio .portfolio-item figure .link-details {
    position: absolute;
    display: inline-block;
    opacity: 0;
    line-height: 1;
    text-align: center;
    width: 36px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    transition: 0.2s linear;
  }

  #portfolio .portfolio-item figure .link-preview i,
  #portfolio .portfolio-item figure .link-details i {
    padding-top: 6px;
    font-size: 22px;
    color: #333;
  }

  #portfolio .portfolio-item figure .link-preview:hover,
  #portfolio .portfolio-item figure .link-details:hover {
    background: #05944F;
  }

  #portfolio .portfolio-item figure .link-preview:hover i,
  #portfolio .portfolio-item figure .link-details:hover i {
    color: #fff;
  }

  #portfolio .portfolio-item figure .link-preview {
    left: calc(50% - 38px);
    top: calc(50% - 18px);
  }

  #portfolio .portfolio-item figure .link-details {
    right: calc(50% - 38px);
    top: calc(50% - 18px);
  }

  #portfolio .portfolio-item figure:hover .link-preview {
    opacity: 1;
    left: calc(50% - 44px);
  }

  #portfolio .portfolio-item figure:hover .link-details {
    opacity: 1;
    right: calc(50% - 44px);
  }

  #portfolio .portfolio-item .portfolio-info {
    background: #fff;
    text-align: center;
    padding: 30px;
    height: 10px;
    border-radius: 0 0 3px 3px;
  }

  #portfolio .portfolio-item .portfolio-info h4 {
    font-size: 18px;
    line-height: 1px;
    font-weight: 700;
    margin-bottom: 18px;
    padding-bottom: 0;
  }

  #portfolio .portfolio-item .portfolio-info h4 a {
    color: #333;
  }

  #portfolio .portfolio-item .portfolio-info h4 a:hover {
    color: #05944F;
  }

  #portfolio .portfolio-item .portfolio-info p {
    padding: 0;
    margin: 0;
    color: #b8b8b8;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
  }
  .portfolio h3 {
    font-weight: 400;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    color: #334242;
    margin-bottom: 10px;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
</style>
