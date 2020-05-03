<template>
  <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
      infinite
      autoplay
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide name="first" img-src="../assets/home/Chritmas_card.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Festivals</div>
          <div class="text-subtitle1">Christmas Party</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../assets/home/Birthday_sliders.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Celebrations</div>
          <div class="text-subtitle1">Birthday Party</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="../assets/home/party_card.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Custom Parties</div>
          <div class="text-subtitle1">Weekend Parties with friends</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="fourth" img-src="../assets/home/Engagement_card.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Lifetime events</div>
          <div class="text-subtitle1">Engagement, Wedding, Receptions etc</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 'first',
      fullscreen: false,
    };
  },
};
</script>
