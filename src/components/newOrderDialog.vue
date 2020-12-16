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
            <q-tab name="login" no-caps label="Select Custom Messages"/>
          </q-tabs>
          <q-space/>
          <q-btn flat round dense icon="brightness_6" @click="() => {i = (i + 1) % 2}"/>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card clickable v-ripple>
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
                Ravinder Rangamgari (302-220-6686) has Ordered Item with Quantity.
                Please Accept or Reject the request.
              </div>
              <div>
                <q-select v-model="model" :options="options" label="Standard" />
              </div>
              <div>
                <q-btn label="Accept" type="button" color="primary" class="q-mr-sm"/>
                <q-btn label="Reject" type="button" color="negative" class="q-mr-sm"/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>

export default {
  components: {
  },
  props: [
    'login',
  ],
  data() {
    return {
      invite: 'Dear {{Guest Name}}, We invite you for a undefined party.\n If you are interested to attend please reply "yes" and we will notify him.\n Best Regards {{Inviter}}',
      invite1: 'Dear {{Guest Name}}, We invite you to be with us as we celebrate our new life together….\n Best Regards {{Inviter}}',
      invite2: 'Dear {{Guest Name}}, We Invite you to celebrate the marriage of our children ..\n Guddu and Baddu \n.\n Best Regards {{Inviter}}',
      invite3: 'Dear {{Guest Name}}, We invite you for a undefined party.\n If you are interested to attend please reply "yes" and we will notify him.\n Best Regards {{Inviter}}',
      invite4: 'Dear {{Guest Name}}, We invite you for a undefined party.\n If you are interested to attend please reply "yes" and we will notify him.\n Best Regards {{Inviter}}',
      tab: this.$props.login ? 'login' : 'register',
      i: 0,
      head: ['primary', 'primary'],
      body: ['white', 'white'],
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
      ],
    };
  },
  methods: {
    onCardClick(eventdetailsid) {
      this.eventmessage = `"test"${eventdetailsid}`;
      this.$emit('ok', eventdetailsid);
      this.$emit('hide');
    },
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
