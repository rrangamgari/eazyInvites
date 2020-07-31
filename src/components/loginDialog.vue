<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <q-dialog ref="dialog" @hide="onDialogHide" v-bind="$props">
    <q-card :style="`height: 80%; width: 400px; background-color: ${body[i]}`">
      <q-card-section :style="`height: 55px; padding: 0px; background-color: ${head[i]}`">
        <q-toolbar style="padding-right: 4px; height: 50px;">
          <q-tabs
            class="q-pa-xs"
            v-model="tab"
            active-color="white"
            indicator-color="white"
            narrow-indicator
          >
            <q-tab name="login" no-caps label="Login"/>
            <q-tab name="register" no-caps label="Register" />
          </q-tabs>
          <q-space/>
          <q-btn flat round dense icon="brightness_6" color="white" @click="() => {i = (i+1)%2}"/>
          <q-btn flat v-close-popup round dense color="white" icon="close" />
        </q-toolbar>
      </q-card-section>
      <q-tab-panels v-model="tab" animated class="bg-transparent" keep-alive
       :style="`height: calc(100% - 55px);`">
        <q-tab-panel name="login" style="padding-right: 0px;">
          <login-component :dark="!i" :username="$props.username" @login-success="onOk"/>
        </q-tab-panel>

        <q-tab-panel name="register" style="padding-right: 0px;">
          <register-component :dark="!i" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
  </transition>
</template>

<script>
import loginComponent from './login.vue';
import registerComponent from './newUserComponent.vue';

export default {
  name: 'loginDialogComponent',
  components: {
    loginComponent,
    registerComponent,
  },
  props: [
    'persistent',
    'noBackdropDismiss',
    'noEscDismiss',
    'noRouteDismiss',
    'transitionShow',
    'transitionHide',
    'login',
    'username',
  ],
  data() {
    return {
      tab: this.$props.login ? 'login' : 'register',
      i: 0,
      head: ['transparent', '#18d26e'],
      body: ['rgb(0,0,0,0.7)', 'white'],
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onOk() {
      this.$refs.dialog.hide();
      this.$emit('ok');
    },
  },
};
</script>
