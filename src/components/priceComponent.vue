<template>
  <div id="prices"  class="bg-grey-2">
    <div>&nbsp;</div>
    <div class="q-pa-md">
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg flex flex-center" >
        <div class="col-xs-12 col-sm-6 col-md-4" >
          <q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Premium Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
            >
            <p class="actual_price">
              $9.99<br /><span class="small_font">Base Package</span>
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
               <q-btn label="Select Plan" type="button" color="secondary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center price_header">
              <p class="price_header_text">Custom Plan</p>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center"
            >
            <p class="actual_price text-red" >
              <span style="text-decoration: line-through;">
                ${{Number(Math.round(standard *9.99)/100).toFixed(2)}}</span>
              <span class="small_font">    Actual Price    </span>
            </p>
            </q-card-section>
            <q-card-section class="flex flex-center"
            >
             <p class="actual_price text-green-5">
              ${{Math.round((standard *.09)*.9)+.99}}
              <span class="small_font">Discount Price</span>
            </p>
             </q-card-section>
            <q-card-section class="flex flex-center"
            >
              <ul class="price-list text-subtitle1 merienda">
              <li>upto 5000 Invitations</li>
              <li>
                <q-badge color="secondary">
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
               <!--<a href="#" class="btn btn-large btn-green btn-green-margin"
              >Select Plan</a>-->
              <q-btn label="Select Plan" type="button" color="secondary" rounded=""/>
          </div>
            </q-card-section>
          </q-card>
          </div>


        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-card>
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
        </div>
      </div>
    </div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      standard: 200,
    };
  },
};
</script>
