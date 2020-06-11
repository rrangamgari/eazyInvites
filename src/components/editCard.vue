<template>
  <q-page>
    <div class="q-pa-lg row warp justify-left">
      <div class="col-9 q-pa-xs">
        <q-responsive :ratio="16/9" width="100%">
        <canvas id="Canvas" class="absolute" width="100%" height="100%"
         v-touch-pan.prevent.mouse="drag"></canvas>
        <q-card square style="position: relative; z-index: -1; overflow: hidden;">
          <q-img v-for="layer in layers" :key="layer.name" :id="`Img_${layer.name}`"
           :ref="`Img_${layer.name}`"
           :ratio="16/9" :width="`${layer.width}%`" style="position: absolute;"
           :style="`z-index: ${layer.zIndex}; top: ${layer.top}px; left: ${layer.left}px;
            ${selected === layer ? 'outline: 1px solid #000000; outline-offset: -1px;' : ''}`"
           :src="require(`../assets/${layer.src}`)"/>
        </q-card>
        </q-responsive>
      </div>
      <div class="col-3 q-pa-xs">
        <q-card>
          <q-card-section class="q-pa-none">
          <q-list label="Layers">
            <q-item clickable v-ripple v-for="(layer) in layers" :key="layer.name"
             @click="selectLayer(layer)" :focused="selected === layer">
              <q-item-section thumbnail>
                <img :id="layer.name" class="q-pa-xs" :src="require(`../assets/${layer.src}`)">
              </q-item-section>
              <q-item-section>{{layer.name}}</q-item-section>
            </q-item>
          </q-list>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="q-pa-sm q-gutter-sm">
              {{'X Pos : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeX(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="add" @click="changeX(+1)"/>
            </div>
            <div class="q-pa-sm q-gutter-sm">
              {{'Y Pos : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeY(-1)"/>
              <q-btn color="primary"  dense round padding="none"
               icon="add" @click="changeY(+1)"/>
            </div>
            <div class="q-pa-sm q-gutter-sm">
              {{'Scale :  '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeScale(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="add" @click="changeScale(+1)"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

let canvas = null;
let ctx = null;

export default {
  name: 'statusComponent',
  data() {
    return {
      cardId: '',
      layers: [],
      selected: '',
      img: '',
      dragToggle: false,
      info: null,
      x: 0,
      y: 0,
    };
  },
  created() {
    this.cardId = this.$route.params.cardId;
    console.log(`Card: ${this.cardId}`);

    this.layers = [{
      src: `home/ez${this.cardId}.jpg`, zIndex: 1, width: 90, name: 'Photo', top: 0, left: 0,
    },
    {
      src: 'logo/Easy_Invites.png', zIndex: 2, width: 50, name: 'Card', top: 0, left: 0,
    }];
    console.log(this.layers);
  },
  mounted() {
    canvas = document.getElementById('Canvas');
    ctx = canvas.getContext('2d');
    console.log(canvas);
    console.log(ctx);

    /* this.layers.forEach((layer) => {
      const img = document.getElementById(layer.name);
      console.log(img);
      ctx.drawImage(img, 0, 0, 600, 500);
    });
    /* axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
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
        this.eventType = Response.data.data;
      })
      .catch((e) => {
        Loading.hide();
        if (e.message === 'Request failed with status code 401') {
          this.$router.push('/login');
        }

        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top',
        });
      }); */
  },
  methods: {
    selectWarn() {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Please Select a layer!',
        position: 'top',
      });
    },
    selectLayer(layer) {
      // this.deselect(this.selected);
      if (this.selected === layer) {
        this.selected = '';
      } else {
        this.selected = layer;
        // this.select(layer.name);
      }
    },
    select(layer) {
      const img = document.getElementById(`Img_${layer}`);
      console.log(img.clientHeight);
      console.log(img.clientWidth);
      console.log(this.$refs[`Img_${layer}`]);

      ctx.fillStyle = '#000000';
      ctx.strokeRect(0, 0, img.clientWidth, img.clientHeight * (16 / 9));
    },
    deselect(layer) {
      console.log(layer);
      if (layer === null || layer === '') return;
      const img = document.getElementById(`Img_${layer}`);
      console.log(img.clientHeight);
      console.log(img.clientWidth);
      console.log(this.$refs[`Img_${layer}`]);

      ctx.clearRect(0, 0, img.clientWidth, img.clientHeight * (16 / 9));
    },
    changeX(offset) {
      if (this.selected === '') {
        this.selectWarn();
        return;
      }
      this.selected.left += offset;
    },
    changeY(offset) {
      if (this.selected === '') {
        this.selectWarn();
        return;
      }
      this.selected.top += offset;
    },
    changeScale(offset) {
      if (this.selected === '') return;
      this.selected.width += offset;
    },
    drag({ evt, ...info }) {
      this.info = info;
      console.log(info);
      if (info.isFirst) {
        if (this.selected === '') {
          this.selectWarn();
          return;
        }
        this.dragToggle = true;
      } else if (info.isFinal) {
        this.dragToggle = false;
      }

      if (this.dragToggle) {
        this.selected.left += info.delta.x;
        this.selected.top += info.delta.y;
      }
    },
    captureOn(evt) {
      if (this.selected !== '') {
        console.log(evt);
        this.x = evt.x;
        this.y = evt.y;
        this.captureToggle = true;
      } else {
        this.selectWarn();
      }
    },
    captureOff() {
      this.captureToggle = false;
    },
  },
};
</script>
