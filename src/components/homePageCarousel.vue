<template>
  <div style="position: relative;">
    <q-responsive :ratio="4/3" style="height: calc(100vh - 1px);">
    <q-carousel
      arrows
      animated
      v-model="slide"
      infinite
      :autoplay="10000"
      transition-prev="fade"
      transition-next="fade"
    >
    <q-carousel-slide name="first" img-src="../assets/home/ez4.jpg">
      <Snowf
        class="overlay"
        :amount="30"
        :size="8"
        :speed="1.25"
        :wind="0"
        :opacity="1"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="false"
        color="blue"
      />
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Pooja Invitations</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">
            Devine celebrations with friends and dear ones ...</div>
        </div>
      </q-carousel-slide>
       <q-carousel-slide name="second" img-src="../assets/home/ez14.jpg">
      <Snowf
        class="overlay"
        :amount="30"
        :size="8"
        :speed="1.25"
        :wind="0"
        :opacity="1"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="false"
        color="#FFFF00"
      />
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Wedding Invitations</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">The honour of your presence is requested
            at the marriage of
            <br>Allison Amber Maven
            <br>and
            <br>Barron Michael Anderson</div>
        </div>
      </q-carousel-slide>
    <q-carousel-slide name="third" img-src="~assets/home/ez36.jpg" >
      <Snowf
        class="overlay"
        :amount="30"
        :size="8"
        :speed="1.25"
        :wind="0"
        :opacity="1"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="false"
        color="blue"
      />
        <div class="absolute-bottom-left custom-caption">
          <div class="text-h2 Dancing">Engagement </div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda" style="word-wrap">Finally,
            I have someone who took my hand, opened my
            mind and touched my heart.<br> Just got engaged to my happily ever after.</div>
        </div>
      </q-carousel-slide>
     <!-- <q-carousel-slide name="fourth" img-src="../assets/home/ez18.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Lifetime events</div>
          <div class="text-subtitle1 merienda">Engagement, Wedding, Receptions etc</div>
        </div>
      </q-carousel-slide>-->
       <q-carousel-slide name="first1" img-src="~assets/home/ez15.jpg" >
         <Snowf
           class="overlay"
           :amount="30"
           :size="8"
           :speed="1.25"
           :wind="0"
           :opacity="1"
           :swing="1"
           :image="null"
           :zIndex="null"
           :resize="false"
           color="#FFFF00"
         />
         <div class="absolute-bottom-right custom-caption">
           <div class="text-h2 Dancing">New Baby Born</div>
           <div class="text-h4">&nbsp;</div>
           <div class="text-subtitle1 merienda" style="word-wrap">
             “Children bring us a piece of heaven on earth.” – Roland Leonhardt</div>
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
        <Snowf
          class="overlay"
          :amount="30"
          :size="8"
          :speed="1.25"
          :wind="0"
          :opacity="1"
          :swing="1"
          :image="null"
          :zIndex="null"
          :resize="false"
          color="blue"
        />
        <div class="absolute-bottom-left custom-caption vertical-middle gt-xs">
          <div class="text-h2 Dancing">Mehendi Function</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda" style="word-wrap">
            Mehndi is derived from the Sanskrit word mendhikā.
            <br>The use of mehndi and turmeric is described in the earliest
             Hindu Vedic ritual books.
            </div>
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          style="z-index:3;"
        >
        </q-carousel-control>
      </template>
    </q-carousel>
    </q-responsive>
  </div>
</template>

<script>
import Snowf from 'vue-snowf';

export default {
  components: {
    Snowf,
  },
  data() {
    return {
      slide: 'first',
      fullscreen: false,
      image: '../assets/logo/user.png',
    };
  },
};
</script>
