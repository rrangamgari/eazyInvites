<template>
  <div class="bg-grey-2 q-pa-md">
    <section id="pricing" class="pricing section-bg">
      <div class="container">
        <div class="section-header" >
          <h3 style="font-size: 32px;">Pricing</h3>
          <p>Our Pricing plan is pretty simple pay as you go...</p>
        </div>

        <div class="row">

          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="box">
              <h3>Free Plan</h3>
              <h4><sup>&#8377;</sup>0<span> / Invitation</span></h4>
              <ul>
                <li>Email Invitation is always free</li>
                <li>Track your invitations </li>
                <li>* We will not share your emails</li>
                <li class="na"></li>
                <li class="na"></li>
                <div class="btn-wrap">
                  <a href="#" class="btn-buy" @click="openDialog">Get Started</a>
                </div>
              </ul>
            </div>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="box featured">
              <h3>Premium Plan</h3>
              <h4><span> Starts from </span><sup>&#8377;</sup>699<span> / Invitation</span></h4>
              <ul>
                <li>Premium Package includes emails and Whatsapp invitations</li>
                <li>Upto 100 Email Invitations</li>
                <li>Upto 100 Whatsapp Invitations</li>
                <li></li>
                <div class="btn-wrap">
                  <a href="#" class="btn-buy" @click="openDialog">Get Started</a>
                </div>
              </ul>
            </div>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="box">
              <h3>Super Premium Plan</h3>
              <h1 style="margin-top: 30px; margin-bottom: -10px;">
                <sup>&#8377;</sup>
                <abbr>{{Number(Math.round(standard *699)/100).toFixed(0)}}</abbr>
                <span>&nbsp;  / Actual Price</span>
              </h1>hello
              <h4 style="margin-top: 0px; margin-bottom: 0px;"><sup>&#8377;</sup>
                <abbr v-if="standard <= 500">{{Math.round((standard *.0699)*0.90)*100+99}} </abbr>
                <abbr v-if="standard > 500 && standard <= 1000">
                  {{Math.round((standard *.0699)*0.85)*100+99}} </abbr>
                <abbr v-if="standard > 1000 && standard <= 2000">
                  {{Math.round((standard *.0699)*0.80)*100+99}} </abbr>
                <abbr v-if="standard > 2000">
                  {{Math.round((standard *.0699)*0.70)*100+99}} </abbr>

                <span>/ Discount Price</span></h4>
              <ul>
                <li>Custom Calculation</li>
                <li><q-badge color="secondary">
                  {{ standard }} Invitations
                </q-badge>
                  <q-slider v-model="standard" :min="200" :max="5000"
                            :step="100"
                            label/></li>
              <div class="btn-wrap">
                <a href="#" class="btn-buy" @click="openDialog">Get Started</a>
              </div>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Pricing Section -->
  </div>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
import loginDialog from './loginDialog';

export default {
  // name: 'ComponentName',
  data() {
    return {
      standard: 200,
    };
  },
  methods: {
    openDialog() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: loginDialog,
        parent: this,
      }).onOk(() => {
        this.$router.push('/events');
      });
      Loading.hide();
    },
  },
};
</script>
