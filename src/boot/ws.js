import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const WS = {
  connected: false,
  stompClient: null,
  connect(WS_API, Topic, msgHandler) {
    if (this.stompClient && this.stompClient.connected) return;
    const socket = new SockJS(WS_API);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, () => {
      this.connected = true;
      console.log('WebSocket Connected');
      this.stompClient.subscribe(Topic, msgHandler);
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
