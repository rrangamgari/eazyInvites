<template>
<div id="editor" class="q-ma-md flex flex-center" style="position: relative;">
  <canvas id="canvas" width="100px" height="100px"
   style="position: absolute; width: 100%; height: 100%; z-index: -1;" />
  <div class="row justify-center items-start">
    <div class="q-mx-lg query msg-template" v-html="'ChatBot &nbsp;'" />
    <div class="q-mx-lg reply msg-template" v-html="'&nbsp; Customer'" />
  </div>
  <div v-for="(e,index) in g" :key="index" class="q-ma-md full-width">
    <div class="row justify-center items-start">
      <div v-for="(s) in e" :key="s" class="q-mx-lg q-mb-xs"
       style="width: 200px;" :id="`reply-${s}`">
        <div class="row justify-right">
          <div v-for="(reply,j) in r[s]" :key="j" class="full-width q-ma-xs">
            <div :class="`${s === chatbot.accept ? 'bg-green text-white float-left q-my-md' :
             (s === chatbot.reject ? 'bg-red text-white float-left q-my-md' : 'reply')}`"
             class="msg-template" v-html="reply" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center items-start">
      <div v-for="(s) in e" :key="s" class="q-mx-lg query msg-template" :id="`query-${s}`"
       style="width: 200px;">
       <div v-html="chatbot.states[s].query" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';
import loginDialog from './loginDialog.vue';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default {
  name: 'chatbotComponent',
  data() {
    return {
      chatbot: '',
      p: null,
      g: null,
      r: null,
      h: null,
      canvas: null,
      ctx: null,
      width: 500,
      height: 500,
    };
  },
  mounted() {
    this.loadChatBot();
  },
  methods: {
    login() {
      return this.$q.dialog({
        component: loginDialog,
        parent: this,

        noBackdropDismiss: true,
        noEscDismiss: true,
        noRouteDismiss: false,

        login: true,
      });
    },
    loadChatBot() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios.get('/api/userEvents/chatbot')
        .then((response) => {
          this.chatbot = response.data.data;
          this.createFlow();
          Loading.hide();
        })
        .catch((e) => {
          if (e.message === 'Request failed with status code 401') {
            this.$q.localStorage.remove('login-token');
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'You need to Login to view this Content',
              position: 'top',
            });
            Loading.hide();
            this.login()
              .onOk(() => this.loadChatBot()) // Restart fn // Check for Stack Overflow
              .onCancel(() => this.$router.replace('/'));
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: e.message,
              position: 'top',
            });
            Loading.hide();
          }
        });
    },
    createFlow() {
      const q = [0];
      const l = Array(this.chatbot.states.length);
      l[0] = 0;
      this.chatbot.states.forEach((state) => {
        state.query = state.query.replace(/\n/g, '<br>').replace(/ {2}/g, ' &nbsp;');
        state.query = state.query.replace(/{{([^}}]*)}}/g, '<span class="q-px-sm bg-deep-orange text-white rounded-borders">$1</span>');
      });
      console.log('B :', q, l);
      while (q.length > 0) {
        const i = q.shift();
        const state = this.chatbot.states[i];
        state.nextStates.forEach((j) => {
          if (l[j] === undefined || (j !== this.chatbot.menu && l[i] + 1 > l[j])) {
            l[j] = l[i] + 1;
            q.push(j);
          }
        });
      }
      l[this.chatbot.accept] = l[this.chatbot.order] + 1;
      l[this.chatbot.reject] = l[this.chatbot.order] + 1;
      console.log('A :', q, l);
      this.p = Array(l.length);
      this.g = Array(Math.max(...l) + 1);
      this.r = Array(l.length);
      for (let i = 0; i < this.g.length; i += 1) this.g[i] = [];
      for (let i = 0; i < this.r.length; i += 1) this.r[i] = [];
      console.log('B : ', this.g, this.p, this.r);
      this.chatbot.states.forEach((s, i) => {
        this.g[l[i]].push(i);
        this.p[i] = [l[i], this.g[l[i]].length - 1];
        if (s.optionsType === 1) {
          s.options.forEach((o, j) => {
            if (s.nextStates[j] !== this.chatbot.menu) this.r[s.nextStates[j]].push(o);
          });
        } else {
          let r = 'Number';
          if (s.options.length > 0) r += ` : [${s.options[0]}-${s.options[1]}]`;
          if (s.nextStates[0] !== this.chatbot.menu) this.r[s.nextStates[0]].push(r);
        }
        if (i === this.chatbot.accept) this.r[i].push('Accept');
        if (i === this.chatbot.reject) this.r[i].push('Reject');
      });
      console.log('A : ', this.g, this.p, this.r);
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      setTimeout(() => {
        this.initCanvas()
          .then(() => {
            Loading.hide();
            this.drawEdges();
          });
      }, 1000);
    },
    initCanvas() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      return new Promise((resolve) => {
        this.canvas = document.getElementById('canvas');
        console.log(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.ctx = this.canvas.getContext('2d');
        console.log(this.canvas, this.ctx);
        this.ctx.fillStyle = '#ff0000';
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.fillText('Check', 20, 20);
        resolve();
      });
    },
    drawEdges() {
      for (let i = 0; i < this.p.length; i += 1) {
        const s = this.chatbot.states[i];
        const a = this.calcXY(i);
        console.log(s, this.p[i], a.x, a.y);
        s.nextStates.forEach((j) => {
          const b = this.calcXY(j, true);
          console.log(i, j, b.x, b.y);
          this.drawEdge(i, j);
        });
        if (i === this.chatbot.order) {
          this.drawEdge(i, this.chatbot.accept);
          this.drawEdge(i, this.chatbot.reject);
        }
      }
    },
    drawEdge(i, j, al = 15) {
      if (j === this.chatbot.menu) return;
      const f = this.calcXY(i);
      const t = this.calcXY(j, true);
      const h = document.getElementById(`reply-${j}`).parentElement.clientHeight;
      console.log(f.x, f.y, t.x, t.y, h);
      this.ctx.moveTo(f.x, f.y);
      this.ctx.lineTo(t.x, t.y - h);
      const dx = 0;
      const dy = h;
      const angle = Math.atan2(dy, dx);
      this.ctx.lineTo(t.x, t.y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.lineTo(t.x - al * Math.cos(angle + Math.PI / 6),
        t.y - al * Math.sin(angle + Math.PI / 6));
      this.ctx.lineTo(t.x - al * Math.cos(angle - Math.PI / 6),
        t.y - al * Math.sin(angle - Math.PI / 6));
      this.ctx.lineTo(t.x, t.y);
      this.ctx.fill();
      console.log(`Edge : ${i} -> ${j}`);
    },
    calcXY(i, r = false) {
      const y = document.getElementById(`query-${i}`).offsetTop + (!r ? document.getElementById(`query-${i}`).clientHeight : 0);
      let x = this.canvas.width / 2;
      const n = this.g[this.p[i][0]].length;
      x = x - (n / 2) * 248 + 124;
      x += this.p[i][1] * 248;
      return { x, y };
    },
  },
};
</script>
<style scoped>
.msg-template{
  border-radius:7.5px;
  padding:5px;
  display:flex;
  color:#303030;
}
.query{
    float:left;
    background:#fff;
    border-top-left-radius: 0px;
}
.query:before{
    width: 0;
    height: 0;
    content:"";
    top:-5px;
    left:-12px;
    position:relative;
    border-style: solid;
    border-width: 0 12px 12px 0;
    border-color: transparent #fff transparent transparent;
}
.reply{
    float:right;
    background: #dcf8c6;
    border-top-right-radius: 0px;
}
.reply:after{
    width: 0;
    height: 0;
    content:"";
    top:-5px;
    left:12px;
    position:relative;
    border-style: solid;
    border-width: 12px 12px 0 0;
    border-color: #dcf8c6 transparent transparent transparent;
}
</style>
