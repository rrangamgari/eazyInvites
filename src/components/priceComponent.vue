<template>
  <div class="bg-grey-2 q-pa-md">
    <div class="row justify-center q-gutter-lg flex flex-center">
      <!--<q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Free Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
                            style="min-width: 300px">
            <p class="actual_price text-green-5">
              Free <br /><span class="small_font">Free Package includes emails</span>
            </p>
             </q-card-section>
            <q-card-section class="flex flex-center"
            >
              <ul class="price-list">
              <li>upto 100 Invitations</li>
            </ul>
            </q-card-section>
            <q-card-section class="flex flex-center"
            >
            <div>
               <q-btn label="Select Plan" type="button" color="primary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>
        <q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Custom Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
            style="width: 300px">
            <p class="actual_price text-red" >
              <span style="text-decoration: line-through;">
                ${{Number(Math.round(standard *9.99)/100).toFixed(2)}}</span>
              <span class="small_font">    Actual Price    </span>
            </p>
             <p class="actual_price text-green-5">
              ${{Math.round((standard *.09)*.9)+.99}}
              <span class="small_font">Discount Price</span>
            </p>
            <p class="actual_price">
              <span class="small_font">Base Package includes emails and Whatsapp <br>
              if user doesn't have Whatsapp then SMS</span>
            </p>
              <ul class="price-list text-subtitle1 merienda">
              <li>upto 5000 Invitations</li>
              <li>
                <q-badge color="primary">
      {{ standard }} Invitations
    </q-badge>
                <q-slider v-model="standard" :min="200" :max="5000"
                :step="100"
      label/></li>
            </ul>
            </q-card-section>
            <q-card-section class="flex flex-center"
            >
            <div>
               &lt;!&ndash;<a href="#" class="btn btn-large btn-green btn-green-margin"
              >Select Plan</a>&ndash;&gt;
              <q-btn label="Select Plan" type="button" color="primary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>
      <q-card>
        <q-card-section class="text-center price_header">
          <p class="price_header_text">Base Plan</p>
        </q-card-section>
        <q-separator />
        <q-card-section class="flex flex-center"
                        style="width: 300px">
          <p class="actual_price">
            $9.99<br /><span class="small_font">Base Package includes emails and Whatsapp <br>
              if user doesn't have Whatsapp then SMS</span>
          </p>
        </q-card-section>
        <q-card-section class="flex flex-center"
        >
          <ul class="price-list">
            <li>upto 100 Invitations</li>
          </ul>
        </q-card-section>
        <q-card-section class="flex flex-center"
        >
          <div>
            <q-btn label="Select Plan" type="button" color="primary" rounded=""/>
          </div>
        </q-card-section>
      </q-card>-->
       <!-- <q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Premium Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
            >
            <p class="actual_price">
              $599.oo<br /><span class="small_font">Co-orporate Package</span>
            </p>
             </q-card-section>
            <q-card-section class="flex flex-center"
            >
              <ul class="price-list">
              <li>unlimited Invitations</li>
            </ul>
            </q-card-section>
            <q-card-section class="flex flex-center"
            >
            <div>
              <q-btn label="Select Plan" type="button" color="secondary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>
<q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Free Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
            >
            <p class="actual_price text-green-5">
              Free* <br /><span class="small_font">Free Package for NGO</span>
            </p>
             </q-card-section>
            <q-card-section class="flex flex-center"
            >
              <ul class="price-list">
              <li>upto 100 Invitations</li>
            </ul>
            </q-card-section>
            <q-card-section class="flex flex-center"
            >
            <div>
               <q-btn label="Contact Us" type="button" color="secondary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>-->
    </div>
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
              <h4><sup>$</sup>0<span> / Invitation</span></h4>
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
              <h4><span> Starts from </span><sup>$</sup>9.99<span> / Invitation</span></h4>
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
              <h1>
                <sup>$</sup>
                <abbr>{{Number(Math.round(standard *9.99)/100).toFixed(2)}}</abbr>
                <span>&nbsp;  / Actual Price</span></h1>
              <h4><sup>$</sup>
                <abbr>{{Math.round((standard *.09)*.9)+.99}} </abbr>
                <span>/ Discount Price</span></h4>
              <ul>
                <li>Custom Calculation</li>
                <li><q-badge color="primary">
                  {{ standard }} Invitations
                </q-badge>
                  <q-slider v-model="standard" :min="200" :max="5000"
                            :step="100"
                            label/></li>
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy" @click="openDialog">Get Started</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Pricing Section -->
  </div>
</template>

<script>
import { Loading, QSpinnerBars } from 'quasar';
import newUserComponent from './newUserComponent';

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
        component: newUserComponent,
        persistent: true,
        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something',
        // ...more.props...
      }).onOk(() => {
        // eslint-disable-next-line no-console
        console.log('OK');
      }).onCancel(() => {
        // eslint-disable-next-line no-console
        console.log('Cancel');
      }).onDismiss(() => {
        // eslint-disable-next-line no-console
        console.log('Called on OK or Cancel');
      });
      Loading.hide();
    },
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
  },
};
</script>
