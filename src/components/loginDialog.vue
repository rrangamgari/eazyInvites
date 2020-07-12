<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-layout container :style="`height: 80%; background-color: ${body[i]}`">
      <q-header :class="`${head[i]}`">
        <q-toolbar>
          <q-tabs
            v-model="tab"
            dense
            active-color="white"
            indicator-color="white"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" no-caps label="Login"/>
            <q-tab name="register" no-caps label="Register" />
          </q-tabs>
          <q-space/>
          <q-btn flat round dense icon="brightness_6" @click="() => {i = (i + 1) % 2}"/>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
      <q-tab-panels v-model="tab" animated class="bg-transparent" keep-alive>
        <q-tab-panel name="login">
          <login-component :dark="!i" @login-success="onOk"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <register-component :dark="!i" />
        </q-tab-panel>
      </q-tab-panels>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import loginComponent from './login.vue';
import registerComponent from './newUserComponent.vue';

export default {
  components: {
    loginComponent,
    registerComponent,
  },
  props: [
    'login',
  ],
  data() {
    return {
      tab: this.$props.login ? 'login' : 'register',
      i: 0,
      head: ['transparent', 'primary'],
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
      this.$emit('ok');
    },
  },
};
</script>
