<template>
<div class="row">
  <div class="q-pa-md" style="width: 20%;">
    <q-card ref="panel" class="bg" style="position: sticky;" :style="`top: ${pad}px;`">
      <q-card-actions class="row justify-center">
        <div class="q-ma-sm query msg-template shadow-2" v-html="'ChatBot Query'" />
        <div class="q-pa-xs full-width row justify-center">
          <q-btn class="q-ma-xs" icon="add" color="primary" round dense
           @click="addQuery()" />
          <q-btn class="q-ma-xs" icon="edit" color="primary" round dense
           @click="queryOp(2)" />
          <q-btn class="q-ma-xs" icon="delete" color="primary" round dense
           @click="queryOp(3)" />
        </div>
      </q-card-actions>
      <q-separator />
      <q-card-actions class="row justify-center">
        <div class="q-ma-sm reply msg-template shadow-2" v-html="'Customer Reply'" />
        <div class="q-pa-xs full-width row justify-center">
          <q-btn class="q-ma-xs" icon="add" color="primary" round dense
           @click="replyOp(1)" />
          <q-btn class="q-ma-xs" icon="edit" color="primary" round dense
           @click="replyOp(2)" />
          <q-btn class="q-ma-xs" icon="delete" color="primary" round dense
           @click="replyOp(3)" />
        </div>
      </q-card-actions>
      <q-separator />
      <q-card-actions class="row justify-center">
        <q-btn class="q-ma-xs" icon="autorenew" color="primary" label="Reset"
          @click="loadChatBot()" />
        <q-btn class="q-ma-xs" icon="done" color="primary" label="Save"
          @click="saveChatBot()" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md flex flex-left" style="width: 80%;">
    <div id="editor" class="scroll-x" style="border-radius: 5px;">
      <div id="chatbot" class="bg scroll-item" style="position: relative;">
        <div v-for="(e,index) in g" :key="index" class="q-pa-md full-width scroll-item">
          <div class="row justify-center items-start">
            <div v-for="(s) in e" :key="s" class="q-mx-lg q-mb-xs"
             style="width: 200px; z-index: 1;" :ref="`reply-${s}`">
                <div v-for="(reply,j) in r[s]" :key="j"
                 class="q-ma-xs msg-template shadow-2" style="clear: right;"
                 :class="{ 'bg-green-6 text-white' : (s === chatbot.accept),
                  'bg-red-6 text-white' : (s === chatbot.reject),
                  'float-right reply' : (s !== chatbot.accept && s !== chatbot.reject),
                  'selectable': !(s === chatbot.accept || s === chatbot.reject ) && rs }"
                 :style="`${(s === chatbot.accept || s === chatbot.reject ) ? 'margin: 24px 68px;'
                  : ''}`" @click="selectReply(reply.s, reply.o)"
                 v-html="reply.r" />
            </div>
          </div>
          <div class="row justify-center items-start">
            <div v-for="(s) in e" :key="s" class="q-mx-lg query msg-template shadow-2"
             :ref="`query-${s}`" style="width: 200px;"
             :class="{ 'selectable': qs && sq !== s }" @click="selectQuery(s)">
              <div v-html="chatbot.states[s].query" />
            </div>
          </div>
        </div>
        <svg id="chatbot-actions" width="100%" height="100%"
         style="position: absolute; top: 0; left: 0; z-index: 0;" @click="clear">
          <g v-for="(a, i) in actions" :key="i">
            <path :d="`M${a.tx} ${a.ty} L${a.tx-5} ${a.ty-10} L${a.tx+5} ${a.ty-10}`"
             :fill="actionColor[a.a]" />
            <polyline :points="`${a.fx},${a.fy} ${a.mx},${a.my} ${a.tx},${a.ty-3}`"
             :stroke="actionColor[a.a]" style="stroke-width: 3; fill: transparent;" />
          </g>
        </svg>
      </div>
    </div>
  </div>
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
  name: 'chatbotComponent',
  data() {
    return {
      chatbot: '',
      p: null,
      g: null,
      r: null,
      actions: [],
      actionColor: ['#3c92ed', '#4caf50', '#f44336'],
      qs: false,
      rs: false,
      sq: null,
      ss: null,
      oq: 0, // 0 -> No Operation   1 -> Add Query   2 -> Edit Query   3 -> Delete Query
      or: 0, // 0 -> No Operation   1 -> Add Reply   2 -> Edit Reply   3 -> Delete Reply
      pad: 88,
    };
  },
  created() {
    this.loadChatBot();
  },
  methods: {
    handler() {
      this.pad = document.getElementsByClassName('q-header')[0].clientHeight + 16;
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
          this.createFlow()
            .then(() => {
              Loading.hide();
              this.handler();
            });
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
            this.$login(this.loadChatBot, () => this.$router.push('/'));
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
    saveChatBot() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.chatbot.states.forEach((state) => {
        state.query = state.query.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ')
          .replace(/<span class="q-px-xs bg-deep-orange text-white rounded-borders">(.*?)<\/span>/g, '{{$1}}');
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem('login-token')}`;
      axios.put('/api/userEvents/chatbot', this.chatbot)
        .then((response) => {
          if (response.data.data) {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: response.data.message,
              position: 'top',
            });
            this.createFlow()
              .then(Loading.hide());
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: response.data.message,
              position: 'top',
            });
            this.createFlow()
              .then(Loading.hide());
          }
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
            this.$login(this.saveChatBot, () => this.$router.push('/'));
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
      return new Promise((resolve) => {
        this.createStates();
        this.$nextTick()
          .then(this.createActions);
        resolve();
      });
    },
    createStates() {
      const q = [];
      const l = Array(this.chatbot.states.length).fill(undefined);
      this.chatbot.states.forEach((state) => {
        state.query = state.query.replace(/\n/g, '<br>').replace(/ {2}/g, ' &nbsp;'); // .replace(/\s+(?=[^{}]*}})/g, '-')
        state.query = state.query.replace(/{{(.*?)}}/g, '<span class="q-px-xs bg-deep-orange text-white rounded-borders">$1</span>');
      });
      console.log('B :', q, l);
      l.forEach((le, li) => {
        if (le !== undefined) return;
        q.push(li);
        l[li] = 0;
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
      });
      l[this.chatbot.accept] = l[this.chatbot.order] + 1;
      l[this.chatbot.reject] = l[this.chatbot.order] + 1;
      console.log('A :', q, l);
      this.g = Array(Math.max(...l) + 1);
      this.p = Array(l.length);
      this.r = Array(l.length);
      for (let i = 0; i < this.g.length; i += 1) this.g[i] = [];
      for (let i = 0; i < this.r.length; i += 1) this.r[i] = [];
      console.log('B : ', this.g, this.p, this.r);
      this.chatbot.states.forEach((s, i) => {
        this.g[l[i]].push(i);
        this.p[i] = [l[i], this.g[l[i]].length - 1];
        if (s.optionsType === 1) {
          s.options.forEach((o, j) => {
            if (s.nextStates[j] !== this.chatbot.menu) {
              this.r[s.nextStates[j]].push({ s: i, o: j, r: o });
            }
          });
        } else {
          let r = 'Number';
          if (s.options.length === 2) r += ` : [${s.options[0]}-${s.options[1]}]`;
          else if (s.options.length === 1) r += ` : [1-${s.options[0]}]`;
          if (s.nextStates[0] !== this.chatbot.menu) {
            this.r[s.nextStates[0]].push({ s: i, o: 0, r });
          }
        }
        if (i === this.chatbot.accept) this.r[i].push({ r: 'Accept' });
        if (i === this.chatbot.reject) this.r[i].push({ r: 'Reject' });
      });
      console.log('A : ', this.g, this.p, this.r);
    },
    createActions() {
      this.actions = [];
      for (let i = 0; i < this.p.length; i += 1) {
        const s = this.chatbot.states[i];
        const actions = [];
        console.log(s, this.p[i]);
        s.nextStates.forEach((j) => {
          if (j === this.chatbot.menu) return;
          actions.push(this.createAction(i, j));
        });
        if (i === this.chatbot.order) {
          actions.push(this.createAction(i, this.chatbot.accept, 1));
          actions.push(this.createAction(i, this.chatbot.reject, 2));
        }
        this.actions = this.actions.concat(actions);
      }
      console.log(this.actions);
      console.log('Created Actions ...');
    },
    createAction(i, j, a = 0) {
      const qi = this.$refs[`query-${i}`][0];
      const qj = this.$refs[`query-${j}`][0];
      const rj = this.$refs[`reply-${j}`][0];
      const action = {
        i,
        j,
        a,
        fx: qi.offsetLeft + qi.clientWidth / 2,
        fy: qi.offsetTop + qi.clientHeight,
        tx: qj.offsetLeft + qj.clientWidth / 2,
        ty: qj.offsetTop,
        mx: qj.offsetLeft + qj.clientWidth / 2,
        my: rj.offsetTop,
      };
      console.log(action, this.$refs[`query-${i}`], qi.offsetLeft, (qi.clientWidth / 2));
      return action;
    },
    selectQuery(s) {
      if (!this.qs) return;
      if (this.or === 1) {
        if (this.sq === null) {
          this.sq = s;
          return;
        }
        if (this.sq !== s) {
          this.ss = s;
          this.qs = false;
          this.addReply(this.sq, this.ss);
        }
      }
      this.sq = s;
      this.qs = false;
      switch (this.oq) {
        case 2: {
          this.editQuery(s);
          break;
        }
        case 3: {
          this.deleteQuery(s);
          break;
        }
        default: this.clear();
      }
    },
    queryOp(o) {
      this.clear();
      this.qs = true;
      this.oq = o;
    },
    addQuery() {
      this.clear();
      this.$q.dialog({
        title: 'Add Query',
        prompt: {
          model: '',
          type: 'textarea',
        },
        cancel: true,
        ok: true,
      })
        .onOk((query) => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          console.log('Ok', query);
          this.chatbot.states.push({
            query, optionsType: 1, options: [], nextStates: [],
          });
          this.createFlow()
            .then(Loading.hide());
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    editQuery(s) {
      let q = this.chatbot.states[s].query.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      q = q.replace(/<span class="q-px-xs bg-deep-orange text-white rounded-borders">(.*?)<\/span>/g, '{{$1}}');
      this.$q.dialog({
        title: 'Edit Query',
        prompt: {
          model: q,
          type: 'textarea',
        },
        cancel: true,
        ok: true,
      })
        .onOk((query) => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          console.log('Ok', query);
          this.chatbot.states[s].query = query;
          this.createFlow()
            .then(Loading.hide());
          this.clear();
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    deleteQuery(s) {
      let q = this.chatbot.states[s].query.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      q = q.replace(/<span class="q-px-xs bg-deep-orange text-white rounded-borders">(.*?)<\/span>/g, '{{$1}}');
      this.$q.dialog({
        title: 'Delete Query',
        message: `Are you sure you want to delete this query: "${q}" ?`,
        cancel: true,
        ok: true,
      })
        .onOk(() => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          this.chatbot.states.splice(s, 1); // deletes state s from chatbot states
          this.chatbot.states.forEach((state) => {
            if (state.optionsType === 1) {
              state.options = state.options.filter((o, i) => state.nextStates[i] !== s);
              state.nextStates = state.nextStates.filter((ns) => ns !== s)
                .map((ns) => (ns > s ? ns - 1 : ns));
            } else if (state.nextStates[0] === s) {
              state.optionsType = 1;
              state.options = [];
              state.nextStates = [];
            }
          });
          this.createFlow()
            .then(Loading.hide());
          this.clear();
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    selectReply(s, o) {
      if (!this.rs) return;
      this.sr = { s, o };
      this.rs = false;
      switch (this.or) {
        case 2: {
          this.editReply(s, o);
          break;
        }
        case 3: {
          this.deleteReply(s, o);
          break;
        }
        default: this.clear();
      }
    },
    replyOp(o) {
      this.clear();
      if (o === 1) {
        this.qs = true;
        this.or = o;
      } else {
        this.rs = true;
        this.or = o;
      }
    },
    addReply(q, s) {
      let q1 = this.chatbot.states[q].query.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      q1 = q1.replace(/<span class="q-px-xs bg-deep-orange text-white rounded-borders">(.*?)<\/span>/g, '{{$1}}');
      let q2 = this.chatbot.states[s].query.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      q2 = q2.replace(/<span class="q-px-xs bg-deep-orange text-white rounded-borders">(.*?)<\/span>/g, '{{$1}}');
      this.clear();
      this.$q.dialog({
        title: 'Add Reply',
        message: `Type in the Reply R which makes an action from Query1 : "${q1}" to Query2 : "${q2}" on receiving R (Enter "l-h" for a Range and leave empty for any Number)`,
        prompt: {
          model: '',
          type: 'text',
        },
        cancel: true,
        ok: true,
      })
        .onOk((reply) => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          console.log('R', reply);
          const state = this.chatbot.states[q];
          if (reply.match(/\d+-\d+/g)) {
            state.optionsType = 2;
            state.nextStates = [s];
            state.options = reply.split('-');
            state.options[0] = Number(state.options[0]);
            state.options[1] = Number(state.options[1]);
          } else if (reply === '') {
            state.optionsType = 2;
            state.nextStates = [s];
            state.options = [];
          } else {
            if (state.optionsType === 2) {
              state.optionsType = 1;
              state.options = [];
              state.nextStates = [];
            }
            state.options.push(reply);
            state.nextStates.push(s);
          }
          this.createFlow()
            .then(Loading.hide());
          console.log(state);
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    editReply(s, o) {
      const state = this.chatbot.states[s];
      let r = state.options[o];
      let m = '';
      if (state.optionsType === 2) {
        m = 'Enter "l-h" for a Range and leave empty for any Number';
        if (state.options.length === 2) r = `${state.options[0]}-${state.options[1]}`;
        else if (state.options.length === 1) r = `1-${state.options[0]}`;
        else r = '';
      }
      this.$q.dialog({
        title: 'Edit Reply',
        message: m,
        prompt: {
          model: r,
          type: 'text',
        },
        cancel: true,
        ok: true,
      })
        .onOk((reply) => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          console.log('Ok', reply);
          if (state.optionsType === 2) {
            if (reply === '') state.options = [];
            else if (reply.match(/\d+-\d+/g)) {
              state.options = reply.split('-');
              state.options[0] = Number(state.options[0]);
              state.options[1] = Number(state.options[1]);
            }
          } else this.chatbot.states[s].options[o] = reply;
          this.createFlow()
            .then(Loading.hide());
          this.clear();
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    deleteReply(s, o) {
      const state = this.chatbot.states[s];
      let r = state.options[o];
      if (state.optionsType === 2) {
        if (state.options.length === 2) r = `Number: ${state.options[0]}-${state.options[1]}`;
        else if (state.options.length === 1) r = `Number: 1-${state.options[0]}`;
        else r = 'Number';
      }
      this.$q.dialog({
        title: 'Delete Reply',
        message: `Are you sure you want to delete this reply: "${r}" ?`,
        cancel: true,
        ok: true,
      })
        .onOk(() => {
          Loading.show({
            spinner: QSpinnerBars,
            spinnerColor: 'primary',
            thickness: '3',
          });
          if (state.optionsType === 2) {
            state.optionsType = 1;
            state.options = [];
            state.nextStates = [];
          } else {
            this.chatbot.states[s].options.splice(o, 1); // deletes reply o from state s
            this.chatbot.states[s].nextStates.splice(o, 1);
          }
          console.log(this.chatbot);
          this.createFlow()
            .then(Loading.hide());
          this.clear();
        })
        .onCancel(this.clear)
        .onDismiss(this.clear);
    },
    clear() {
      this.qs = false;
      this.rs = false;
      this.sq = null;
      this.ss = null;
      this.sr = null;
      this.oq = 0;
      this.or = 0;
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #eeeeee50;
}
.scroll-x {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
}
.scroll-item {
  flex: 0 0 auto;
}
.msg-template{
  border-radius: 7.5px;
  padding: 5px 10px;
  display: flex;
  color: #303030;
}
.query{
  float: left;
  background:#fff;
  border-top-left-radius: 0px;
  position: relative;
  z-index: 1;
}
.query:after{
  width: 0;
  height: 0;
  content: "";
  top: 0px;
  left: -8px;
  position: absolute;
  border-style: solid;
  border-width: 0 10px 10px 0;
  border-color: transparent #fff transparent transparent;
}
.reply{
  float: right;
  background: #dcf8c6;
  border-top-right-radius: 0px;
  position: relative;
  z-index: 1;
}
.reply:after{
  width: 0;
  height: 0;
  content:"";
  top: 0px;
  right: -8px;
  position: absolute;
  border-style: solid;
  border-width: 10px 10px 0 0;
  border-color: #dcf8c6 transparent transparent transparent;
}
.selectable {
  cursor: pointer;
  animation: pulse 1.5s infinite;
}
</style>
