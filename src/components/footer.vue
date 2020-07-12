<template>
  <q-footer >
    <q-toolbar class="shadow-5 elevated bordered center bg-white text-blue-7"
               style="color:#0170bc">
      <q-toolbar-title style="align:center;text-align: center;">
        <div>
          <footer id="footer">
            <div class="footer-top">
              <div class="container">
                <div class="row">

                  <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 footer-info">
                    <h3>WE Invites</h3>
                    <p>We Invites is an application which can be used
                      for both email and Whatsapp invitations.</p>
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i class="ion-ios-arrow-right"></i> <a href="#">Home</a></li>
                      <li><i class="ion-ios-arrow-right"></i> <a href="#">About us</a></li>
                      <li><i class="ion-ios-arrow-right"></i> <a href="#">Services</a></li>
                      <li><i class="ion-ios-arrow-right"></i>
                        <a href="/#/termsconditions">Terms of service</a></li>
                      <li><i class="ion-ios-arrow-right"></i>
                        <a href="/#/termsconditions">Privacy policy</a></li>
                    </ul>
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 footer-contact">
                    <h4>Contact Us</h4>
                    <p>
                      55 Marble House Dr <br>
                      BEAR, DE 19701<br>
                      United States <br>
                      <strong>Phone:</strong> +1 302 220 6686<br>
                      <strong>Email:</strong> info@weinvites.com<br>
                    </p>

                    <div class="social-links">
                      <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                      <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                      <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
                      <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
                      <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div class="container">
              <div class="copyright">
                &copy; Copyright <strong>WE Invites</strong>. All Rights Reserved
              </div>
              <div class="credits">
                <!--
                  All the links in the footer should remain intact.
                  You can delete the links only if you purchased the pro version.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=BizPage
                -->
                Designed by <a href="https://WeInvites.com/">WE Invites</a>
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
  mounted() {
    if (this.$q.sessionStorage.getItem('login-token') === null) {
      if (this.$route.path !== '/newUser') {
        this.$router.push('/login');
      }
    }
  },
};
</script>
