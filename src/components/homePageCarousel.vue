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
    <q-carousel-slide name="first" img-src="../assets/home/ez4.jpg">
      <Snowf
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
         :style="($q.screen.width < 730) ? `left:10%; max-width: ${$q.screen.width};`
         : 'width: 570px;'">
          <h2>Pooja Invitations</h2>
          <p>
            WE Invites is Here to open that closed Digital Door...
            <br>
            <br>Yes its the most trendiest & coolest way to make your invite Eazy & Digital..</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a>
          <br>
        </div>
      </q-carousel-slide>
       <q-carousel-slide name="second" img-src="../assets/home/ez14-min.jpg">
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
         <div class="overlay"/>
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Wedding Invitations</h2>
          <p>Down on your knees you should be<br>
            For only your Forever beloved...<br>
            <br>
            Than why you should stress for hours to send that perfect invite<br>
            <br>
            Come share your personalized Digital Eazy-Invites...<br>
            <br>
            Its Personalized<br>
            Its Fast &<br>
            Its the users perfect Delight!!!</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
        </div>
        <!-- <a href="#" class="btn-get-started " style="position: absolute; bottom: 0%;"
          @click="openDialog">Started</a> -->
      </q-carousel-slide>
    <q-carousel-slide name="third" img-src="~assets/home/ez36-min.jpg" >
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
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Engagement Invitations</h2>
          <p>Finally,
            I have someone who took my hand, opened my
            mind and touched my heart.<br> Just got engaged to my happily ever after</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
        </div>
      </q-carousel-slide>
     <!-- <q-carousel-slide name="fourth" img-src="../assets/home/ez18.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">Lifetime events</div>
          <div class="text-subtitle1 merienda">Engagement, Wedding, Receptions etc</div>
        </div>
      </q-carousel-slide>-->
       <q-carousel-slide name="first1" img-src="~assets/home/ez15-min.jpg" >
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
         <div class="overlay"/>
         <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
           <h2>New Baby Born</h2>
           <p>
             Twinkle twinkle<br>
             We had a new born Star<br>
             But I wonder how to invite you all are?!? <br>
             <br>
             Now we have Eazy Invite option<br>
             Its d online invite 1 stop solution<br>
           </p>
           <a href="#" class="btn-get-started" @click="openDialog">Get Started</a><br>
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
      <q-carousel-slide name="fourth1" img-src="../assets/home/ez9-min.jpg">
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
        <div class="absolute custom-caption" style="bottom: 15%; right: 10%;"
         :style="($q.screen.width < 730) ? `left: 10%;`:'width: 570px;'">
          <h2>Mehendi Function</h2>
          <p> Mehndi is derived from the Sanskrit word mendhikā.
            <br>The use of mehndi and turmeric is described in the earliest
            Hindu Vedic ritual books.</p>
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
        this.$router.push('/events');
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
