<template>
  <div class="" style="">
    <q-responsive :ratio="1600/700" style="">
    <q-carousel
      arrows
      animated
      v-model="slide"
      infinite
      :autoplay="10000"
      transition-prev="fade"
      transition-next="fade"
     :fullscreen.sync="fullscreen"
    >
    <q-carousel-slide name="first" img-src="../assets/home/ez4.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Pooja Invitations</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">
            Devine celebrations with friends and dear ones ...</div>
        </div>
      </q-carousel-slide>
       <q-carousel-slide name="second" img-src="../assets/home/ez14.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Wedding Invitations</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">Once is Lifetime</div>
        </div>
      </q-carousel-slide>
    <q-carousel-slide name="third" img-src="~assets/home/ez1.jpg" >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Engagement </div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">How can we miss our loved ones...</div>
        </div>
      </q-carousel-slide>
     <!-- <q-carousel-slide name="fourth" img-src="../assets/home/ez18.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Lifetime events</div>
          <div class="text-subtitle1 merienda">Engagement, Wedding, Receptions etc</div>
        </div>
      </q-carousel-slide>-->
       <q-carousel-slide name="first1" img-src="~assets/home/ez22.jpg" >
        <div class="absolute-right custom-caption">
          <div class="text-h2 Dancing">Festivals</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">Christmas Party</div>
        </div>
      </q-carousel-slide>
      <!--<q-carousel-slide name="second1" img-src="../assets/home/ez15.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Celebrations</div>
          <div class="text-subtitle1 merienda">New Baby Born...</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third1" img-src="../assets/home/ez16.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Bachelor Parties</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">Weekend Parties with friends</div>
        </div>
      </q-carousel-slide>-->
      <q-carousel-slide name="fourth1" img-src="../assets/home/ez9.jpg">
        <div class="absolute-bottom-left custom-caption vertical-middle gt-xs">
          <div class="text-h2 Dancing">Mehendi Function</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda" style="word-wrap">
            Mehndi is derived from the Sanskrit word mendhikā.
            <br>The use of mehndi and turmeric is described in the earliest
             Hindu Vedic ritual books.
            </div>
        </div>
        <div class="absolute-bottom-right custom-caption xs">
          <div class="text-h4" style="font-size:18px">Mehendi Function</div>
          <div class="text-subtitle1 merienda" style="font-size:12px">
            Mehndi is derived from the Sanskrit word mendhikā.
            The use of mehndi and turmeric is described in the earliest
             Hindu Vedic ritual books.
            </div>
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
    </q-responsive>
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
