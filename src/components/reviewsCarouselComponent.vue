<template>
  <div class="q-pa-md" >
<q-parallax :height="600" :speed="0.5">
      <template v-slot:media>
        <img src="../assets/home/bg.jpg">
      </template>
<q-carousel-slide name="style" class="column no-wrap flex-center"
      >
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          <h1 class="text-white">Docks</h1>
         Excellent idea of sending e-invites with whatsapp.
         Wide range pre designed cards. Used this recently for
          My son's 12 birthday party. Invitees loved it ,
           it has gps feature for identifying the location with ease...
the best part is it send reminders to the guests a day before...
        </div>
      </q-carousel-slide>
    </q-parallax>
    <q-carousel
      v-model="slide"
         animated
      navigation
      infinite
      autoplay
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      class="bg-transperent text-white rounded-borders"
    img-src="../assets/home/bg.jpg"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center"
      >
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
         Excellent idea of sending e-invites with whatsapp.
         Wide range pre designed cards. Used this recently for
          My son's 12 birthday party. Invitees loved it ,
           it has gps feature for identifying the location with ease...
the best part is it send reminders to the guests a day before...
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center"
      >
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center"
      >
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center"
      >
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>

  </div>
</template>

<script>
export default {
  data() {
    return {
      padding: true,
      vertical: false,
      arrows: true,
      navigation: true,

      navPos: 'bottom',
      navigationPositions: [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom (default)' },
        { value: 'left', label: 'left' },
      ],

      slide: 'style',
      lorem: 'Lorem ipsum doloraesentium libero ab nemo.',
    };
  },

};
</script>
