<template>
  <div>What People think about us....
    <template>
  <div class="q-pa-md">

    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <div class="col-4" v-for="n in 5" :key="`none-${n}`">
        <div class="my-content" style="padding:20px">
      <q-rating
        v-model="ratingModel"
        size="3.5em"
        color="grey"
        :color-selected="ratingColors"
        icon="star_border"
        icon-selected="star"
      />
<br>
      <b style="font-size:20px">Ravinder Rangamgari </b><p style="font-size:13px">
Excellent idea of sending e-invites with whatsapp. Wide range pre designed cards.
 Used this recently for My son's 12 birthday party.
 Invitees loved it , it has gps feature for identifying the location with ease...
<br>
 the best part is it send reminders to the guests a day before...
<br>
<br>
Thank you for this awesome product!
</p>
      </div>
      </div>
    </div>

  </div>
</template>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      ratingModel: 5,
      ratingColors: ['yellow-3', 'yellow-6', 'yellow', 'yellow-9', 'yellow-10'],
    };
  },
};
</script>
