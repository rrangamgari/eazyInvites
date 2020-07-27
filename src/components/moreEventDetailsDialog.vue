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
            <q-tab name="login" no-caps label="Select More Options"/>
          </q-tabs>
          <q-space/>
          <q-btn flat round dense icon="brightness_6" @click="() => {i = (i + 1) % 2}"/>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
             >
          <q-card clickable v-ripple @click="onCardClick(invite)">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
                {{invite}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card clickable v-ripple @click="onCardClick(invite1)">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-grey-7" style="font-size: 16px;">
                {{invite1}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card clickable v-ripple @click="onCardClick(invite2)">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
                {{invite2}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card clickable v-ripple @click="onCardClick(invite3)">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-grey-7" style="font-size: 16px;">
                {{invite3}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card clickable v-ripple @click="onCardClick(invite4)">
            <q-card-section class="q-pa-xs">
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
                {{invite4}}
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
