<template>
<q-dialog ref="dialog" @hide="onDialogHide" v-bind="$props">
    <q-layout container :style="`height: 60%; background-color: ${body[i]} `">
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
            <q-tab name="login" no-caps label="Customer is waiting for order confirmation"/>
          </q-tabs>
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
              <div>
                <q-select v-model="model" :options="options" label="Order Status" />
              </div>
              <div>
                <q-select v-model="waitingmodel" :options="waitingoptions"
                          label="Order Waiting Time" />
              </div>
              <div>
                <q-input
                  v-model="eventmessage"
                  autogrow
                  label="Custom Message"
                  name="eventmessage"
                  style="height:100px;"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 q-px-md q-py-sm">
          <q-btn label="Confirm Order" type="button" color="primary"
                 class="q-mr-sm" @click="onSubmit"/>
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
      model: 'Ordered',
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
    onSubmit() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
        'login-token',
      )}`;
      console.log(this.orderData);
      this.orderData.status = this.model;
      axios.put('/api/orders/newOrder', this.orderData)
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
  },
  created() {
    axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
      'login-token',
    )}`;
    axios
      .get('/api/orders/orderstatus')
      .then((response) => {
        console.log(response.data.data);
        for (let i = 0; i < response.data.data.length; i += 1) {
          console.log(response.data.data[i]);
          if (response.data.data[i].label === 'Confirm' || response.data.data[i].label === 'Reject') {
            this.options = this.options.concat(response.data.data[i]);
          }
        }
      });
  },
};
</script>
