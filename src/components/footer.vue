<template>
  <q-footer style="z-index: 10;">
    <q-toolbar class="shadow-5 elevated bordered center bg-white text-blue-7"
               style="color:#0170bc; padding: 0px;">
      <q-toolbar-title style="align:center;text-align: center;">
        <div>
          <footer id="footer">
            <div class="container">
              <div class="copyright">
                &copy; Copyright <strong>WE Promotes</strong>. All Rights Reserved
              </div>
              <div class="credits">
                <!--
                  All the links in the footer should remain intact.
                  You can delete the links only if you purchased the pro version.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=BizPage
                -->
                Designed by <a href="https://www.weinvites.com/">WE Invites</a>
              </div>
            </div>
          </footer><!-- #footer -->

        </div>
      </q-toolbar-title>
    </q-toolbar>


  </q-footer>
</template>

<script>

export default {
  name: 'footerComponent',
  components: {
  },
  data() {
    return {
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      moreContent: true,
      drawer: false,
      drawerR: false,
      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,'
        + 'ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
    };
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    },
  },
};
</script>
