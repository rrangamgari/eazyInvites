<template>
<q-dialog ref="dialog" @hide="onDialogHide" v-bind="$props">
    <q-layout container :style="`height: 60%; background-color: ${body[i]} `">
      <q-header :class="`${head[i]}`">
        <q-toolbar>
          Customer is waiting for order confirmation
          <q-space/>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card v-ripple>
            <q-card-section class="q-py-xs">
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
                {{message}}
              </div>
              <div class="text-center text-weight-medium text-primary" style="font-size: 16px;">
              Please Accept or Reject the request.
            </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm"
        >
          <q-card v-ripple>
            <q-card-section class="q-py-xs">
              <div>
                <q-select v-model="waitingmodel" :options="waitingoptions"
                          label="Order Waiting Time" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm">
          <q-btn label="Confirm Order" type="button" color="primary"
                 class="q-mr-sm" @click="onSubmit(true)"/>
          <q-btn label="Reject Order" type="button" color="negative"
                 class="q-mr-sm" @click="prompt"/>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
import axios from 'axios';

export default {
  components: {
  },
  props: [
    'persistent',
    'noBackdropDismiss',
    'noEscDismiss',
    'noRouteDismiss',
    'transitionShow',
    'transitionHide',
    'message',
    'orderData',
    'parent',
  ],
  data() {
    return {
      i: 0,
      head: ['primary', 'primary'],
      body: ['white', 'white'],
      options: [],
      waitingoptions: [20, 25, 30, 35, 40, 45, 50, 60, 90, 120],
      waitingmodel: 20,
      eventmessage: null,
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
    onSubmit(param, customText) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      this.orderData.comments = customText;
      this.orderData.waitingtime = this.waitingmodel;
      axios.put(`/api/orders/newOrder/${param}`, this.orderData)
        .then((response) => {
          console.log(response.data);
          this.onDialogHide();
          this.$emit('ok');
          Loading.hide();
        })
        .catch((e) => {
          //  this.errors.push(e);
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
    prompt() {
      this.$q.dialog({
        title: 'Reject Order',
        message: 'Please provide the reason',
        prompt: {
          model: '',
          type: 'text', // optional
        },
        ok: {
          push: true,
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        console.log('>>>> OK, received', data);
        this.onSubmit(false, data);
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
    },
  },
  created() {
    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
      'login-token',
    )}`;
  },
};
</script>
