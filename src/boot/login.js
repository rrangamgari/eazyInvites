import loginDialog from '../components/loginDialog.vue';

export default ({ Vue }) => {
  Vue.prototype.$login = (onOk, onCancel) => {
    Vue.prototype.$q.dialog({
      component: loginDialog,
      parent: this,

      noBackdropDismiss: true,
      noEscDismiss: true,
      noRouteDismiss: false,

      login: true,
    })
      .onOk(onOk || (() => {}))
      .onCancel(onCancel || (() => {}));
  };
};
