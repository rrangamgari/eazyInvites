<template>
  <q-page>
    <div class="q-pa-lg row warp justify-left">
      <div class="col-9 q-pa-xs" style="display: block;">
        <div style="position: relative; width: 100%; padding-bottom: 56.25%;"
         v-touch-pan.prevent.mouse="drag">
        <svg id="svg" width="100%" height="100%"
         style="position: absolute; overflow: visible;" v-if="selected !== ''">
         <g :style="`transform: rotate(${selected.rotate}deg);
           transform-box: fill-box; transform-origin: center;`">
          <rect :x="`${selected.left}%`" :y="`${selected.top}%`"
           :width="`${selected.width}%`" :height="`${selected.height}%`"
           :stroke="primary" stroke-width="2" fill="transparent"/>
          <circle v-for="(c,i) in circles" :key="i" :cx="`${selected.left + selected.width*c.cx}%`"
           :cy="`${selected.top + selected.height*c.cy}%`" r="5px" :fill="primary"
           v-touch-pan.prevent.mouse="({evt, ...info}) => { scale({evt, ...info}, i) }"
           @mouseover="c.hover = true" @mouseleave="c.hover = false"
           :style="`${c.hover ? `cursor: ${c.cur}-resize;` : ''}`"/>
          <circle :cx="`${selected.left + selected.width*0.5}%`"
           :cy="`${selected.top - 5}%`" r="5px" :fill="primary"
           @mouseover="rotater = true" @mouseleave="rotater = false"
           :style="`cursor: url(~assets/rotate.png), grab;`"
           v-touch-pan.prevent.mouse="rotate"/>
          <line :x1="`${selected.left + selected.width*0.5}%`" :y1="`${selected.top - 5}%`"
           :x2="`${selected.left + selected.width*0.5}%`" :y2="`${selected.top}%`"
           stroke-width="2" :stroke="primary"/>
         </g>
        </svg>
        <q-card id="editor" square style="position:absolute;  width: 100%; height: 100%;
        z-index: -1; overflow: hidden;">
        <canvas id="Canvas" :width="`${width}px`" :height="`${height}px`"
         style="position: absolute; z-index: 100">
        </canvas>
          <img v-for="layer in layers" :key="layer.name" :id="`Img_${layer.name}`"
           :ref="`Img_${layer.name}`" style="position: absolute; max-width: none; max-height: none;"
           :style="`width: ${layer.width}%; height: ${layer.height}%;  z-index: ${layer.zIndex};
            top: ${layer.top}%; left: ${layer.left}%; transform: rotate(${layer.rotate}deg);`"
           :src="require(`../assets/${layer.src}`)"/>
        </q-card>
        </div>
      </div>
      <div class="col-3 q-pa-xs">
        <q-card>
          <q-card-section class="q-pa-none">
          <div class="text-center text-primary">Layers</div>
          <q-list>
            <q-item clickable v-ripple v-for="(layer) in layers" :key="layer.name"
             @click="selectLayer(layer)" :focused="selected === layer">
              <q-item-section thumbnail>
                <img :id="layer.name" class="q-pa-xs" :src="require(`../assets/${layer.src}`)">
              </q-item-section>
              <q-item-section class="text-primary">{{layer.name}}</q-item-section>
            </q-item>
          </q-list>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-sm">
            <div class="text-center text-primary">Position</div>
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'X : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeX(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="add" @click="changeX(+1)"/>
            </div>
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'Y : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeY(-1)"/>
              <q-btn color="primary"  dense round padding="none"
               icon="add" @click="changeY(+1)"/>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-sm">
            <div class="text-center text-primary">Scale</div>
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'X : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeScaleX(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="add" @click="changeScaleX(+1)"/>
            </div>
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'Y : '}}
              <q-btn color="primary" dense round padding="none"
               icon="remove" @click="changeScaleY(-1)"/>
              <q-btn color="primary"  dense round padding="none"
               icon="add" @click="changeScaleY(+1)"/>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-sm">
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'Rotate : '}}
              <q-btn color="primary" dense round padding="none"
               icon="rotate_left" @click="changeRotate(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="rotate_right" @click="changeRotate(+1)"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { colors } from 'quasar';
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
      ratio: 16 / 9,
      layers: [],
      selected: '',
      primary: '',
      width: 500,
      height: 281.25,
      editor: null,
      dragToggle: false,
      info: null,
      circles: [{
        cx: 0, cy: 0, hover: false, cur: 'nw',
      },
      {
        cx: 0.5, cy: 0, hover: false, cur: 'n',
      },
      {
        cx: 1, cy: 0, hover: false, cur: 'ne',
      },
      {
        cx: 1, cy: 0.5, hover: false, cur: 'e',
      },
      {
        cx: 1, cy: 1, hover: false, cur: 'se',
      },
      {
        cx: 0.5, cy: 1, hover: false, cur: 's',
      },
      {
        cx: 0, cy: 1, hover: false, cur: 'sw',
      },
      {
        cx: 0, cy: 0.5, hover: false, cur: 'w',
      }],
      rotater: false,
    };
  },
  created() {
    this.cardId = this.$route.params.cardId;
    console.log(`Card: ${this.cardId}`);

    this.layers = [{
      src: `home/ez${this.cardId}.jpg`, zIndex: 1, width: 90, height: 90, name: 'Photo', top: 0, left: 0, rotate: 0,
    },
    {
      src: 'logo/Easy_Invites.png', zIndex: 2, width: 50, height: 50, name: 'Card', top: 0, left: 0, rotate: 0,
    }];
    console.log(this.layers);
  },
  mounted() {
    this.primary = colors.getBrand('primary');
    canvas = document.getElementById('Canvas');
    ctx = canvas.getContext('2d');
    this.editor = document.getElementById('editor').getBoundingClientRect();
    if (this.editor.width) {
      this.width = this.editor.width;
      this.height = this.editor.height;
    } else {
      this.width = this.editor.right - this.editor.left;
      this.height = this.editor.bottom - this.editor.top;
    }
    console.log(this.width);
    console.log(this.height);
    console.log(ctx);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 600, 100);
    ctx.fillRect(10, 45, 200, 300);
    ctx.fillRect(0, 60, (canvas.clientWidth / 2), 30);
    ctx.fillRect((canvas.clientWidth / 2), 90, 200, 30);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect((canvas.clientWidth / 3), 0, 30, (canvas.clientHeight / 2));
    /* this.layers.forEach((layer) => {
      const img = document.getElementById(layer.name);
      console.log(img);
      ctx.drawImage(img, 0, 0, 600, 500);
    });
    /* axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
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
        this.eventType = Response.data.data;
      })
      .catch((e) => {
        Loading.hide();
        if (e.message === 'Request failed with status code 401') {
                this.$q.sessionStorage.remove('login-token');
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
    changeScaleX(offset) {
      if (this.selected === '') {
        this.selectWarn();
        return;
      }
      this.selected.width += offset;
    },
    changeScaleY(offset) {
      if (this.selected === '') {
        this.selectWarn();
        return;
      }
      this.selected.height += offset;
    },
    changeRotate(offset) {
      if (this.selected === '') {
        this.selectWarn();
        return;
      }
      this.selected.rotate += offset;
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
        this.selected.left += info.delta.x * (100.0 / this.width);
        this.selected.top += info.delta.y * (100.0 / this.height);
      }
    },
    scale({ ...info }, index) {
      this.dragToggle = false;
      console.log(`Scale: ${index} ${info}`);
      console.log(info);
      let ox = info.delta.x * (100.0 / this.width);
      let oy = info.delta.y * (100.0 / this.height);
      console.log(`${ox} ${oy}`);
      if (info.isFirst) {
        this.circles[index].hover = true;
      } else if (info.isFinal) {
        this.circles[index].hover = false;
      }
      if (info.evt.ctrlKey) {
        ox *= 1;
        if (index % 4 === 0) oy = ox;
        else oy = -ox;
      }
      switch (index) {
        case 0:
          this.selected.left += ox;
          this.selected.width -= ox;
          this.selected.top += oy;
          this.selected.height -= oy;
          break;
        case 2:
          this.selected.width += ox;
          this.selected.top += oy;
          this.selected.height -= oy;
          break;
        case 4:
          this.selected.width += ox;
          this.selected.height += oy;
          break;
        case 6:
          this.selected.left += ox;
          this.selected.width -= ox;
          this.selected.height += oy;
          break;
        case 1:
          this.selected.top += oy;
          this.selected.height -= oy;
          break;
        case 3:
          this.selected.width += ox;
          break;
        case 5:
          this.selected.height += oy;
          break;
        case 7:
          this.selected.left += ox;
          this.selected.width -= ox;
          break;
        default:
          break;
      }
    },
    rotate({ ...info }) {
      this.dragToggle = false;
      console.log(`Rotate: ${info}`);
      console.log(info, this.editor);
      // eslint-disable-next-line max-len
      const ox = (info.position.left - this.editor.left) * (100.0 / this.width) - this.selected.left - this.selected.width / 2;
      // eslint-disable-next-line max-len
      const oy = this.selected.top + this.selected.height / 2 - (info.position.top - this.editor.top) * (100.0 / this.height);
      let t = 90;
      if (ox !== 0) t = 180 * (Math.atan(oy / ox) / Math.PI);
      console.log(`${ox} ${oy} ${t}`);
      if (ox < 0) this.selected.rotate = -(90 + t);
      else this.selected.rotate = 90 - t;
      console.log(this.selected.rotate);
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
