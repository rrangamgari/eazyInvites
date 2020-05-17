<template>
  <q-header reveal :reveal-offset="1">
    <q-toolbar class="glossy">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

      <a href="/" class="xs">
        <img src="../assets/logo/mail-send-animation.gif" width="50px" />
      </a>
      <a href="/" class="gt-xs">
        <img src="../assets/logo/mail-send-animation.gif" width="100px" />
      </a>

      <q-toolbar-title class="logo_small xs">Eazy Invites</q-toolbar-title>
<q-toolbar-title class="logo gt-xs">Eazy Invites</q-toolbar-title>
<div class="xs">
        <q-btn
          color="primary"
          glossy
          push
          type="a"
          href="https://wa.me/13022206686?text=Hi EazyInvites, I love to start using this..."
          target="_blank"
        >
          <div class="row items-center no-wrap">
            <img left src="../assets/whatsapp.png" style="height:25px;width:25px"/>
            </div>
        </q-btn>
      </div>
      <div class="logo_labels gt-xs">
        <q-btn
          color="primary"
          glossy
          push
          type="a"
          href="https://wa.me/13022206686?text=Hi"
          target="_blank"
        >
          <div class="row items-center no-wrap">
            <img left src="../assets/whatsapp.png" style="height:45px;width:45px"/>
            <div class="text-center">
              Whatsapp<br>Invite
            </div>
          </div>
        </q-btn>
      </div>
      <q-tabs no-caps active-color="primary" indicator-color="transparent"
       class="merienda-bold" v-model="tab">
          <q-tab name="images" label="Home" style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; " icon="home"/>
          <q-tab name="videos" label="About Us" style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; " icon="people"/>
          <q-tab name="articles1" label="Browse Cards" style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "/>
  <q-tab name="reviews" label="Reviews" style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; " icon="rate_review"/>
  <q-tab name="prices" label="Prices" style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; " icon="monetization_on"/>
        </q-tabs>
      <div class="q-pa-md">
        <q-btn-dropdown split push glossy no-caps icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick" to="/login" v-show="viewLogin()">
              <q-item-section avatar>
                <q-avatar
                  icon="person_outline"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section >
                <q-item-label>Login</q-item-label>
                <q-item-label caption>Login to send invites</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick" to="/newUser" v-show="viewLogin()">
              <q-item-section avatar>
                <q-avatar
                  icon="person_add"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Register</q-item-label>
                <q-item-label caption>New to Easy Invites</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onLogoutClick" v-show="!viewLogin()">
              <q-item-section avatar>
                <q-avatar
                  icon="person_add"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
                <q-item-label caption>Logout from Easy Invites</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <!-- <q-btn flat round dense icon="whatshot" /> -->
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'headerComponent',
  data() {
    return {};
  },
  methods: {
    onItemClick() {
      return {};
    },
    viewLogin() {
      window.console.log(this.$q.sessionStorage.getItem(
        'login-token',
      ));
      if (this.$q.sessionStorage.getItem(
        'login-token',
      ) === 'null') return true;
      return false;
    },
    onLogoutClick() {
      this.$q.sessionStorage.set('login-token', null);
      this.$router.push('/');
      return {};
    },
  },
};
</script>
