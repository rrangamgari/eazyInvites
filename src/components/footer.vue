<template>
 <q-footer elevated>
        <q-toolbar class="glossy center" >
      <q-toolbar-title style="align:center;text-align: center;">
       <a href="https://www.instagram.com/" target="_blank"> <img src="../assets/instagram.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://skype.com" target="_blank"> <img src="../assets/skype.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://twitter.com" target="_blank"> <img src="../assets/twitter.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://www.pinterest.com/" target="_blank"> <img src="../assets/pinint.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://facebook.com" target="_blank"> <img src="../assets/facebook.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://linkedin.com" target="_blank"> <img src="../assets/linkedin.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://youtube.com" target="_blank"> <img src="../assets/youtube.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="https://web.whatsapp.com" target="_blank"> <img src="../assets/whatsapp.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
        <a href="#" @click="toolbar = true"> <img src="../assets/chat.png"
       class="q-icon" style="height:45px;width:45px"></a>
        &nbsp;
      </q-toolbar-title>
        </q-toolbar>
        <q-dialog v-model="toolbar" >
          <q-header class="bg-primary">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" />
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
      <q-card>
        <q-toolbar>
          <q-avatar style="height:90px;width:50px">
            <img src="../assets/logo/invite3.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Eazy Feedback </span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus
           sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam,
            ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
      </q-footer>
</template>

<script>
export default {
  name: 'footerComponent',
  data() {
    return {
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
    };
  },
};
</script>
