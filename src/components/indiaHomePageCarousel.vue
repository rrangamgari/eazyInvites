<template>
  <div id="intro">
    <q-responsive :ratio="4/3" style="height: calc(100vh - 1px);">
    <q-carousel
      arrows
      animated
      v-model="slide"
      infinite
      :autoplay="5000"
      transition-prev="fade"
      transition-next="fade"
      keep-alive
      id="intro"
    >
    <q-carousel-slide name="first" img-src="../assets/home/WP4.jpg">
      <Snowf
        :amount="30"
        :size="8"
        :speed="1.25"
        :wind="1"
        :opacity="1"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="blue"
      />
        <div class="overlay"/>
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left:10%; max-width: ${$q.screen.width};`
         : 'width: 570px;'">
          <h2>Breakfast Promotions</h2>
          <p><b>We</b>&nbsp;<b class="text-primary">Promotes</b>
            is a technology platform helping businesses
            worldwide expand their reach, delight customers, and boost their bottom line.
            <br><br>Partner with us today.</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a>
          <br>
        </div>
      </q-carousel-slide>
       <q-carousel-slide name="second" img-src="../assets/home/WP1.jpg">
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
        <div class="overlay"/>
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Dinner Promotions</h2>
          <p><b>We</b>&nbsp;<b class="text-primary">Promotes</b>
            is a technology platform helping businesses
            worldwide expand their reach, delight customers, and boost their bottom line.
            <br><br>Partner with us today.</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
        </div>
        <!-- <a href="#" class="btn-get-started " style="position: absolute; bottom: 0%;"
          @click="openDialog">Started</a> -->
      </q-carousel-slide>
    <q-carousel-slide name="third" img-src="~assets/home/WP2.jpg" >
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
        <div class="overlay"/>
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Take Away Promotions</h2>
          <p><b>We</b>&nbsp;<b class="text-primary">Promotes</b>
            is a technology platform helping businesses
            worldwide expand their reach, delight customers, and boost their bottom line.
            <br><br>Partner with us today.</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
        </div>
      </q-carousel-slide>
     <!-- <q-carousel-slide name="fourth" img-src="../assets/home/WP18.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Lifetime events</div>
          <div class="text-subtitle1 merienda">Engagement, Wedding, Receptions etc</div>
        </div>
      </q-carousel-slide>-->
       <q-carousel-slide name="first1" img-src="~assets/home/WP3.jpg" >
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
         <div class="overlay"/>
         <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
           <h2>New Restaurant Opening</h2>
           <p><b>We</b>&nbsp;<b class="text-primary">Promotes</b>
             is a technology platform helping businesses
             worldwide expand their reach, delight customers, and boost their bottom line.
             <br><br>Partner with us today.</p>
           <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
         </div>
      </q-carousel-slide>
      <!--<q-carousel-slide name="second1" img-src="../assets/home/WP15.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Celebrations</div>
          <div class="text-subtitle1 merienda">New Baby Born...</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third1" img-src="../assets/home/WP16.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 Dancing">Bachelor Parties</div>
          <div class="text-h4">&nbsp;</div>
          <div class="text-subtitle1 merienda">Weekend Parties with friends</div>
        </div>
      </q-carousel-slide>-->
      <q-carousel-slide name="fourth1" img-src="../assets/home/WP5.jpg">
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
        <div class="overlay"/>
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Lunch Promotions</h2>
          <p><b>We</b>&nbsp;<b class="text-primary">Promotes</b>
            is a technology platform helping businesses
            worldwide expand their reach, delight customers, and boost their bottom line.
            <br><br>Partner with us today.</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
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
import { Loading, QSpinnerBars } from 'quasar';
import loginDialog from './loginDialog.vue';

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

        transitionShow: 'bounceInLeft',
        transitionHide: 'bounceInLeft',
        animationDuration: '2s',
      }).onOk(() => {
        console.log('OK');
        this.$router.push('/promotions');
        console.log('OK2');
      }).onCancel(() => {
        console.log('Cancel');
      }).onDismiss(() => {
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
