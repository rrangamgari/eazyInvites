<template>
  <section id="portfolio"  class="portfolio section-bg" >
      <header class="section-header">
        <h3 style="font-size: 32px;">Browse Cards</h3>
      </header>

      <div class="row">
        <div class="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <ul id="portfolio-flters">
            <!--<li data-filter="*" class="filter-active">All</li>
            <li data-filter=".filter-app">Birthday</li>
            <li data-filter=".filter-card">Engagement</li>
            <li data-filter=".filter-web">Wedding</li>-->
            <li
              v-for="item in items"
              :key="item.id"
              :class="item.class"
              :data-filter="item.datafilter"
              @click="portfolioClick(item.id)"
            >{{ item.text }}</li>
          </ul>
        </div>
      </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 q-px-md q-py-sm"
           v-for="index in indices" :key="index">
          <div class="portfolio-item">
            <div class="portfolio-wrap">
              <figure>
                <img  style="width: 100%;height: 100%"
                     :src="require(`../assets/cards/ez${index}.jpg`)" >
                <a @click= "showCard(require(`../assets/cards/ez${index}.jpg`))"
                   data-lightbox="portfolio" data-title="Card"
                   class="link-preview" title="Preview"><i class="ion ion-eye">
                  <q-icon name="remove_red_eye" />
                </i></a>
                <a  @click= "$router.push(`/editcard/${index}`)"
                    class="link-details" title="Use this card">
                  <i class="ion ion-android-open">
                    <q-icon name="open_in_new" />
                  </i></a>
              </figure>
            </div>
          </div>
      </div>
      <VueEasyLightbox
        :visible="visible"
        :imgs="imgs"
        @hide="handleHide"
      ></VueEasyLightbox>
    </div>
  </section>
</template>

<script>
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
      indices: [3, 33, 333, 3333, 1, 2, 11, 22, 111, 222, 2222, 1111],
      selected: null,
      primary: '',
      imgs: '',
      visible: false,
      items: [
        {
          id: 1,
          text: 'All',
          datafilter: '*',
          class: 'filter-active',
        }, // default active
        {
          id: 2,
          text: 'Party',
          class: '',
          datafilter: '.filter-app',
        },
        {
          id: 3,
          text: 'Wedding',
          class: '',
          datafilter: '.filter-card',
        },
        {
          id: 4,
          text: 'Birthday',
          class: '',
          datafilter: '.filter-web',
        },
        {
          id: 5,
          text: 'More...',
          class: '',
        },
      ],
      previous_active_id: 1,
    };
  },
  mounted() {

  },
  methods: {
    showCard(src) {
      this.imgs = src;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    portfolioClick(id) {
      if (this.previous_active_id === id) {
        return; // no need to go further
      }
      this.indices = [];
      this.items.find((item) => item.id === this.previous_active_id).class = ''; // remove the active class from old active li
      this.items.find((item) => item.id === id).class = 'filter-active';// set active class to new li
      this.previous_active_id = id;// store the new active li id
      if (id === 1) {
        this.indices = [1, 2, 3, 11, 22, 33, 111, 222, 333, 1111, 2222, 3333];
      }
      if (id === 2) {
        this.indices = [3, 33, 333, 3333];
      }
      if (id === 3) {
        this.indices = [2, 22, 222, 2222];
      }
      if (id === 4) {
        this.indices = [1, 11, 111, 1111];
      } else {
        this.$router.push('/browseCards');
      }
    },
  },
};
</script>
<style>
  /* Portfolio Section
--------------------------------*/

  #portfolio {
    padding: 60px 0;
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
  #portfolio-flters li.filter-active {
    background: #18d26e;
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
    border-radius: 4px 4px 0 0;
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
    background: #18d26e;
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
    color: #18d26e;
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
