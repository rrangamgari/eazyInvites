<template>
  <q-page>
    <div class="q-pa-lg row warp justify-left">
      <div class="col-9 q-pa-xs" style="display: block;">
        <div style="position: relative; width: 100%; display: block;"
         :style="`padding-bottom: ${ratio * 100}%`">
        <canvas id="Canvas" v-if="isDone" :width="`${width}px`" :height="`${height}px`"
         style="position: absolute; z-index: -2; display: none;" />
        <q-card id="editor" ref="editor" square style="position:absolute; width: 100%; height: 100%;
         overflow: hidden;">
        <div v-for="(layer, index) in layers" :key="index" style="display: block">
          <div v-if="layer.hide" style="position: absolute; max-width: none;
           max-height:none; display:block;" :style="`width:${layer.width}%; height:${layer.height}%;
           top: ${layer.top}%; left: ${layer.left}%; transform: rotate(${layer.rotate}deg);
           background-image: url(${layer.img}); background-size: 100% 100%;`"/>
          <img v-else-if="layer.type === 'img'" style="position: absolute; max-width: none;
           max-height:none; display:block;" :style="`width:${layer.width}%; height:${layer.height}%;
           top: ${layer.top}%; left: ${layer.left}%; transform: rotate(${layer.rotate}deg);`"
           :src="layer.img"/>
          <div v-else style="position: absolute; max-width: none; max-height: none; display: block;"
           :style="`top:${layer.top}%; left:${layer.left}%; transform: rotate(${layer.rotate}deg);
            width: ${layer.width}%; height: ${layer.height}%;`">
            <div :style="`${transformMatrix(layer.transform)}; transform-origin: 0% 0%;`"
             style="width: max-content; outline: 0px; display: inline-block; min-width: 10px;"
             v-html="layer.text" contenteditable  @blur="(e) => layerTextChange(e, layer)"
             @input="(e) => layerTextResize(e, layer)"
             @load="e=>layerTextResize(e, layer)"/>
          </div>
        </div>
        </q-card>
        <svg id="svg" width="100%" height="100%" v-touch-pan.prevent.mouse="drag"
         style="position: absolute; overflow: visible;" v-if="selected !== ''">
         <g :style="`transform: rotate(${selected.rotate}deg);
           transform-origin: ${transformOrigin(selected)};`">
          <rect :x="`${selected.left}%`" :y="`${selected.top}%`"
           :width="`${selected.width}%`" :height="`${selected.height}%`"
           :stroke="primary" stroke-width="2" fill="transparent"/>
          <circle v-for="(c,i) in circles" :key="i" :cx="`${selected.left + selected.width*c.cx}%`"
           :cy="`${selected.top + selected.height*c.cy}%`" r="5px" :fill="primary"
           v-touch-pan.prevent.mouse="({evt, ...info}) => { scale({evt, ...info}, i) }"
           @mouseover="c.hover = true" @mouseleave="c.hover = false"
           :style="`${c.hover ? `cursor: ${c.cur}-resize;` : ''}`"/>
          <circle :cx="`${selected.left + selected.width*0.5}%`"
           :cy="`${selected.top - 7}%`" r="5px" :fill="primary"
           @mouseover="rotater = true" @mouseleave="rotater = false"
           class="rotate-cursor"
           v-touch-pan.prevent.mouse="rotate"/>
          <line :x1="`${selected.left + selected.width*0.5}%`" :y1="`${selected.top - 7}%`"
           :x2="`${selected.left + selected.width*0.5}%`" :y2="`${selected.top}%`"
           stroke-width="2" :stroke="primary"/>
         </g>
        </svg>
        </div>
      </div>
      <div class="col-3 q-pa-xs">
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-file :label="layers[0] ? layers[0].name : 'Photo'" outlined
             v-model="file" @input="uploadFile">
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-sm">
          <div class="text-center text-primary q-pb-sm">Layers</div>
          <q-list>
            <div v-for="(layer, index) in layers" :key="index">
            <q-item class="q-px-xs" clickable v-ripple dense v-if="!layer.hide"
             @click="selectLayer(layer)" :focused="selected === layer" :tabindex="index">
              <q-item-section avatar style="padding-right: 0px; min-width: 40px;">
                <q-avatar square text-color="black">
                <img v-if="layer.type === 'img'" class="q-pa-xs"
                 style="object-fit: contain; object-position: top;" :src="layer.img">
                <div v-else style="font-family: Times New Roman;">T</div>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary" :lines="1" header>{{layer.name}}</q-item-label>
              </q-item-section>
            </q-item>
            </div>
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
            <div class="text-center text-primary">Rotate</div>
            <div class="q-pa-sm q-gutter-sm text-primary">
              {{'A : '}}
              <q-btn color="primary" dense round padding="none"
               icon="rotate_left" @click="changeRotate(-1)"/>
              <q-btn color="primary" dense round padding="none"
               icon="rotate_right" @click="changeRotate(+1)"/>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-actions class="q-py-sm row justify-center items-center">
            <div class="col-xs-12 col-sm-12 col-md-6 col-6">
              <q-btn color="primary" flat icon="clear" label="Cancel" class="full-width q-ma-xs"
               @click="$router.push('/browseCards')"/>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-6">
              <q-btn color="primary" icon="done" label="Done"  class="full-width q-ma-xs"
               @click="done"/>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Loading, QSpinnerBars, colors } from 'quasar';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

let canvas = null;
let ctx = null;
let editor = null;

export default {
  name: 'statusComponent',
  data() {
    return {
      cardId: '',
      file: null,
      ratio: 9 / 16,
      card: null,
      layers: [],
      selected: '',
      primary: '',
      width: 500,
      height: 281.25,
      dragToggle: false,
      info: null,
      circles: [{
        cx: 0, cy: 0, hover: false, cur: 'nw', x: -180, y: -180,
      },
      {
        cx: 0.5, cy: 0, hover: false, cur: 'n', x: -180, y: -180,
      },
      {
        cx: 1, cy: 0, hover: false, cur: 'ne', x: 0, y: -180,
      },
      {
        cx: 1, cy: 0.5, hover: false, cur: 'e', x: 0, y: 0,
      },
      {
        cx: 1, cy: 1, hover: false, cur: 'se', x: 0, y: 0,
      },
      {
        cx: 0.5, cy: 1, hover: false, cur: 's', x: 0, y: 0,
      },
      {
        cx: 0, cy: 1, hover: false, cur: 'sw', x: -180, y: 0,
      },
      {
        cx: 0, cy: 0.5, hover: false, cur: 'w', x: -180, y: 0,
      }],
      rotater: false,
      isDone: true,
      sw2h: 1,
    };
  },
  created() {
    this.cardId = this.$route.params.cardId;
    console.log(`Card: ${this.cardId}`);

    // this.layers = [{
    //   type: 'img', img: `home/ez${this.cardId}.jpg`, width: 90, height: 90,
    //   name: 'Photo', top: 0, left: 0, rotate: 0,
    // },
    // {
    //   type: 'img', img: 'logo/Easy_Invites.png', width: 50, height: 50,
    //   name: 'Card', top: 0, left: 0, rotate: 0,
    // },
    // {
    //   type: 'txt', text: 'Event Title', width: 50, height: 50,
    //   name: 'Title', top: 0, left: 0, rotate: 0,
    // }];
  },
  mounted() {
    this.primary = colors.getBrand('primary');

    canvas = document.getElementById('Canvas');
    ctx = canvas.getContext('2d');
    console.log(ctx);

    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token') || ''}`;

    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'primary',
      thickness: '3',
    });

    axios.get(`/api/cards/${this.cardId}`)
      .then((response) => {
        this.card = response.data.data;
        if (this.card == null) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Card Not Found',
            position: 'top',
          });
          this.$router.replace('/browseCards');
        }
        console.log(this.card);

        this.ratio = this.card.height / this.card.width;
        editor = document.getElementById('editor').getBoundingClientRect();
        if (editor.width) {
          this.width = editor.width - 8;
          this.height = this.width * this.ratio;
        } else {
          this.width = editor.right - editor.left - 8;
          this.height = this.width * this.ratio;
        }
        console.log(this.width);
        console.log(this.height);

        const xf = 100 / this.card.width;
        const yf = 100 / this.card.height;

        this.sw2h = this.$q.screen.width / this.height;

        this.layers = this.card.layers;
        this.card.layers.forEach((layer) => {
          layer.left *= xf;
          layer.top *= yf;
          layer.width *= xf;
          layer.height *= yf;
          if (layer.name.toLowerCase().indexOf('card') !== -1 && layer.img !== '') layer.hide = true;
          if (layer.type === 'txt') {
            this.layerToHtml(layer);
            console.log(layer.text);
          }
        });
        console.log(this.layers);
        Loading.hide();
      })
      .catch((e) => {
        Loading.hide();
        if (e.message === 'Request failed with status code 401') {
          this.$q.localStorage.remove('login-token');
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
    transformOrigin(layer) {
      return `${layer.left + layer.width * 0.5}% ${layer.top + layer.height * 0.5}%`;
    },
    transformMatrix(mat) {
      return `transform: matrix(${mat[0][0]}, ${mat[0][1]}, ${mat[1][0]}, ${mat[1][1]}, ${mat[2][0]}, ${mat[2][1]})`;
    },
    uploadFile(val) {
      console.log(val);
      const reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onload = () => {
        console.log(reader.result);
        this.layers[0].img = reader.result;
      };
      reader.onerror = (e) => {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top',
        });
      };
    },
    layerToHtml(layer) {
      let i = 0;
      let html = '';
      let text = '';
      let size = 10;

      layer.styles.forEach((style, index) => {
        text = layer.text.slice(i, i + style.len).replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        size = ((style.size / this.card.height) * (100 / this.sw2h)).toFixed(2);
        const l = text.length + 7;
        text = `<span style="font-family:${style.font}; font-size:${size}vw; line-height:${size}vw;`
         + ` color:${style.color}; font-weight:${style.b ? 'bold' : 'normal'};`
         + ` font-style:${style.i ? 'italic' : 'normal'};">${text}</span>`;
        if (index === 0) layer.default = `${text.slice(0, -l)}</span>`;
        html += text;
        i += style.len;
      });

      layer.text = html;
    },
    layerTextChange(evt, layer) {
      layer.text = evt.target.innerHTML;
      layer.name = evt.target.innerText;
    },
    layerTextResize(evt, layer) {
      const rect = evt.target.getBoundingClientRect();
      console.log(evt.target.innerHTML, rect);
      layer.width = (rect.width / this.width) * 100 + 0.2;
      layer.height = (rect.height / this.height) * 100 + 0.2;
      if (evt.target.innerHTML.trim() === '' || evt.target.innerHTML.trim() === '<br>') {
        evt.target.innerHTML = '';
        console.log(1, layer);
      } else if (evt.target.innerHTML.trim().startsWith('<font')) {
        evt.target.innerHTML = `${layer.default.slice(0, -7)}${evt.target.innerText}</span>`;
        console.log(2, layer);
        this.moveCursorToEnd(evt.target);
      } else if (!evt.target.innerHTML.trim().startsWith('<span')) {
        evt.target.innerHTML = `${layer.default.slice(0, -7)}${evt.target.innerHTML}</span>`;
        console.log(3, layer);
        this.moveCursorToEnd(evt.target);
      }
    },
    moveCursorToEnd(el) {
      el.focus();
      if (typeof window.getSelection !== 'undefined'
              && typeof document.createRange !== 'undefined') {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange !== 'undefined') {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    },
    layerTextToImg(layer) {
      console.log(layer);
      const words = layer.name.replace(/&nbsp;/g, ' ').replace(/<br>/g, '\n').split(/\s+/);
      const styles = layer.text.split('</span>');
      console.log(layer.name, words, styles);
      let wi = 0;
      const X = layer.left;
      const Y = layer.top;
      const w = layer.width;
      let h = layer.height;
      let x = 0;
      let y = 0;
      const sx = layer.transform[0][0];
      console.log(X, Y, w, h);

      ctx.alpha = 0;
      ctx.resetTransform();
      // ctx.fillStyle = '#F00000';
      // ctx.fillRect(X, Y, w, h);
      ctx.textBaseline = 'top';
      ctx.translate(X + w / 2, Y + h / 2);
      ctx.rotate(layer.rotate * (Math.PI / 180));
      ctx.translate(-w / 2, -h / 2);
      ctx.transform(layer.transform[0][0], layer.transform[0][1], layer.transform[1][0],
        layer.transform[1][1], layer.transform[2][0], layer.transform[2][1]);

      styles.forEach((style) => {
        if (style.trim() === '') return;

        const text = style.substr(style.indexOf('>') + 1).trim().replace(/&nbsp;/g, ' ').replace(/<br>/g, '\n')
          .replace(/&#8203;/g, '');
        const str = style.substring(style.indexOf('"') + 1, style.lastIndexOf('"') - 1).split(/[ \n]*;[ \n]*/);
        const so = {};

        str.forEach((ov) => {
          if (ov.trim() === '') return;

          const entry = ov.split(/:(.+)/);
          so[entry[0].trim()] = entry[1].trim();
        });

        so['font-size'] = ((Number(so['font-size'].slice(0, -3)) * (this.sw2h / 100)) * this.card.height);
        const lh = so['font-size'];
        console.log(text, so);

        ctx.font = `${so['font-style']} ${so['font-weight']} ${so['font-size']}px ${so['font-family']}`;
        ctx.fillStyle = `${so.color}`;

        for (let i = 0; i < text.length; i += 1) {
          if (text[i] === '\n') {
            y += lh;
            x = 0;
          } else if (text[i] === ' ') {
            ctx.fillText(' ', x, y);
            x += ctx.measureText(' ').width;
          } else {
            if ((x + ctx.measureText(words[wi]).width) * sx > w) {
              y += lh;
              x = 0;
            }
            ctx.fillText(words[wi], x, y);
            x += ctx.measureText(words[wi]).width;
            i += words[wi].length - 1;
            wi += 1;
          }
        }

        h = y + lh;
      });
    },
    done() {
      this.isDone = false;
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      ctx.canvas.width = this.card.width;
      ctx.canvas.height = this.card.height;

      const card = JSON.parse(JSON.stringify(this.card));
      card.layers.forEach((layer) => {
        layer.left = Math.round(layer.left * (card.width / 100));
        layer.top = Math.round(layer.top * (card.height / 100));
        layer.width = Math.round(layer.width * (card.width / 100));
        layer.height = Math.round(layer.height * (card.height / 100));
        delete layer.hide;
        if (layer.type === 'txt') {
          this.layerTextToImg(layer);
          layer = null;
        }
      });
      card.layers = card.layers.splice(0, 2);
      const layer = {
        name: 'Text',
        type: 'img',
        left: 0,
        top: 0,
        width: this.card.width,
        height: this.card.height,
        rotate: 0.0,
        img: canvas.toDataURL(),
      };

      card.layers.push(layer);
      console.log(card);

      Loading.hide();

      this.createInvitation(card);
    },
    createInvitation(card) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token') || ''}`;

      axios.post(`/api/cards/${this.cardId}`, card)
        .then((response) => {
          const params = response.data.data;
          params.file = new File([], params.name, { type: 'image/jpg' });
          delete params.name;
          console.log(params);
          Loading.hide();
          this.$router.push({ name: 'createEvent', params });
        })
        .catch((e) => {
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
      if (this.selected === layer) {
        this.selected = '';
      } else {
        this.selected = layer;
      }
    },
    select(layer) {
      const img = document.getElementById(`Img_${layer}`);
      console.log(img.clientHeight);
      console.log(img.clientWidth);
      console.log(this.$refs[`Img_${layer}`]);
    },
    deselect(layer) {
      console.log(layer);
      if (layer === null || layer === '') return;
      const img = document.getElementById(`Img_${layer}`);
      console.log(img.clientHeight);
      console.log(img.clientWidth);
      console.log(this.$refs[`Img_${layer}`]);
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
      this.selected.rotate = (this.selected.rotate + offset + 360) % 360;
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
        this.selected.left += info.delta.x * (100.0 / editor.width);
        this.selected.top += info.delta.y * (100.0 / editor.height);
      }
    },
    scale({ ...info }, index) {
      this.dragToggle = false;
      console.log(`Scale: ${index}`, info);
      // eslint-disable-next-line max-len
      let ox = (Math.cos((this.selected.rotate + this.circles[index].x) * (Math.PI / 180)) * info.delta.x
        + Math.sin((this.selected.rotate + this.circles[index].x) * (Math.PI / 180)) * info.delta.y)
        * (100.0 / this.width);
      // eslint-disable-next-line max-len
      let oy = (Math.cos((this.selected.rotate + this.circles[index].y) * (Math.PI / 180)) * info.delta.y
        - Math.sin((this.selected.rotate + this.circles[index].y) * (Math.PI / 180)) * info.delta.x)
        * (100.0 / editor.height);
      console.log(`${ox} ${oy}`);
      if (info.isFirst) {
        this.circles[index].hover = true;
      } else if (info.isFinal) {
        this.circles[index].hover = false;
      }
      if (info.evt.ctrlKey) {
        ox *= 1;
        oy = (ox / this.selected.width) * this.selected.height;
      }
      if (index === 1 || index === 5) ox = 0;
      if (index === 3 || index === 7) oy = 0;
      if (this.selected.width + 2 * ox <= 0) {
        this.selected.width = 0.1;
      } else if (this.selected.height + 2 * oy <= 0) {
        this.selected.height = 0.1;
      } else {
        this.selected.left -= ox;
        this.selected.width += 2 * ox;
        this.selected.top -= oy;
        this.selected.height += 2 * oy;
        /* switch (index) {
          case 0:
            this.selected.left -= ox;
            this.selected.width += ox;
            this.selected.top -= oy;
            this.selected.height += oy;
            break;
          case 2:
            this.selected.width += ox;
            this.selected.top -= oy;
            this.selected.height += oy;
            break;
          case 4:
            this.selected.width += ox;
            this.selected.height += oy;
            break;
          case 6:
            this.selected.left -= ox;
            this.selected.width += ox;
            this.selected.height += oy;
            break;
          case 1:
            this.selected.top -= oy;
            this.selected.height += oy;
            break;
          case 3:
            this.selected.width += ox;
            break;
          case 5:
            this.selected.height += oy;
            break;
          case 7:
            this.selected.left -= ox;
            this.selected.width += ox;
            break;
          default:
            break;
        } */
      }
    },
    rotate({ ...info }) {
      this.dragToggle = false;
      console.log(`Rotate: ${info}`);
      console.log(info, editor);
      // eslint-disable-next-line max-len
      const ox = (info.position.left - editor.left) * (100.0 / editor.width) - this.selected.left - this.selected.width / 2;
      // eslint-disable-next-line max-len
      const oy = this.selected.top + this.selected.height / 2 - (info.position.top - editor.top) * (100.0 / editor.height);
      let t = 90;
      t = 180 * (Math.atan(oy / ox) / Math.PI);
      console.log(`${ox} ${oy} ${t}`);
      if (ox < 0) this.selected.rotate = 360 - (90 + t);
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
