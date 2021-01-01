import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const WS = {
  connected: false,
  stompClient: null,
  nh: 0,
  handler: null,
  add() {
    this.nh += 1;
    if (this.nh === 1) this.handler();
  },
  connect(WS_API, Topic, handlerFn) {
    if (this.stompClient && this.stompClient.connected) return;
    const socket = new SockJS(WS_API);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, () => {
      this.connected = true;
      console.log('WebSocket Connected');
      this.handler = () => {
        handlerFn()
          .then(() => {
            this.nh -= 1;
            console.log('H', this.nh);
            if (this.nh > 0) setTimeout(this.handler, 30);
          });
      };
      this.stompClient.subscribe(Topic, (msg) => {
        this.add();
        console.log(msg, this.nh);
      });
    });
  },
  disconnect() {
    if (!this.connected) return;
    this.stompClient.disconnect();
    this.connected = false;
  },
};
export default ({ Vue }) => {
  Vue.prototype.$ws = WS;
};
