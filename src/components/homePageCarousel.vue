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
    <q-carousel-slide name="first" img-src="../assets/home/ez_us_8.jpg">
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
          <h2>Christmas Celebrations</h2>
          <p>
            WE Invites is Here to open that closed Digital Door...
            <br>
            <br>Yes its the most trendiest & coolest way to make your invite Eazy & Digital..</p>
          <a href="#" class="btn-get-started" @click="openDialog">Get Started</a>
          <br>
        </div>
      </q-carousel-slide>
       <q-carousel-slide name="second" img-src="../assets/home/ez_us_5.jpg">
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
    <q-carousel-slide name="third" img-src="~assets/home/review1.jpg" >
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
       <q-carousel-slide name="first1" img-src="~assets/home/ez_us_2.jpg" >
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
           <h2>My First Birthday</h2>
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
      <q-carousel-slide name="fourth1" img-src="../assets/home/ez_us_3.jpg">
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
          <h2>New Year Party</h2>
          <p> Out With the Old
            <br>In With the New
            <br>If You’re Ready For {{new Date().getFullYear()+1}}
            <br>This Party is For You
            <br>BYO booze and an appetizer to share</p>
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
      this.$login(() => this.$router.push('/events'));
    },
  },
};
</script>
