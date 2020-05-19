<template>
  <div class="q-pa-md">
    <div class="row justify-center q-gutter-sm">
      <q-intersection
        transition="scale"
        class="example-item"
      >
        <q-card class="q-ma-sm">
          <img src="https://images.squarespace-cdn.com/content/53b599ebe4b08a2784696956/1437412431722-XLEMQKOYX9B1WRSJCJM4/?format=1000w&content-type=image%2Fjpeg">

          <q-card-section>
            <div class="text-h6">Founder </div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </q-intersection>
      <q-intersection
        transition="scale"
        class="example-item"
      >
        <q-card class="q-ma-sm">
          <img src="https://c.pxhere.com/photos/f3/2b/businessman_man_portrait_male_costume_business_office_office_style-718633.jpg!d">

          <q-card-section>
            <div class="text-h6">CEO </div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </q-intersection>
       <q-intersection
        transition="scale"
        class="example-item"
      >
        <q-card class="q-ma-sm">
          <img src="https://images.squarespace-cdn.com/content/53b599ebe4b08a2784696956/1468195717998-EL7ZGLOVNMOYJT0A1L74/CEO-portrait-corporate-headshot-02.jpg?format=1000w&content-type=image%2Fjpeg">

          <q-card-section>
            <div class="text-h6">CTO </div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.example-item
  height: 700px
  width: 390px
</style>
<script>
export default {
  // name: 'ComponentName',
  data() {
    return {};
  },
};
</script>
