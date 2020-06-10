<template>
  <q-header id="header" ref="header" v-scroll="scrollHandler"
   style="z-index:10;" :style="hStyle" :class="hClass">
    <q-toolbar>
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

      <a href="/" class="xs">
        <img src="../assets/logo/logo_final.png" width="40px" />
      </a>
      <a href="/" class="gt-xs lt-md">
        <img src="../assets/logo/logo_final.png" width="60px" />
      </a>
      <a href="/" class="md">
        <img src="../assets/logo/logo_final.png" width="75px" />
      </a>
      <a href="/" class="gt-md">
        <img src="../assets/logo/logo_final.png" width="75px" />
      </a>
      <q-toolbar-title class="logo_small xs" :style="lStyle">Eazy Invites</q-toolbar-title>
      <q-toolbar-title class="logo gt-xs" :style="lStyle" >Eazy Invites</q-toolbar-title>
      <!--q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="merienda-bold"
        inline-label
        dense
        v-model="tab"
      >
        <q-route-tab
          name="images"
          :label= "($q.screen.gt.md) ? 'Home' : ''"
          class="text-white"
          style="font-family: 'Montserrat', cursive;  font-color:#FFFFFF;  font-weight:bold; "
          icon="home"
          to="/#images"
          exact
        />
        <q-route-tab
          name="videos"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'About Us' : ''"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="people"
          to="/#videos"
          exact
        />
        <q-route-tab
          name="articles1"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'Browse Cards' : ''"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="style"
          to="/"
          exact
        />
        <q-tab
          name="reviews"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'Reviews' : ''"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="rate_review"
          @click="scrollTo('reviews')"
        />
        <q-route-tab
          name="prices"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'Prices' : ''"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="monetization_on"
          to="/"
          exact
        />
      </q-tabs-->
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="merienda-bold gt-xs"
        inline-label
        dense
        v-model="tab"
        v-for="Tab  in tabs" :key="Tab.name"
        id="home_tabs"
      >
        <q-tab
          :name="Tab.name"
          :label="($q.screen.gt.md) ? Tab.label : ''"
          :style="qtabStyle"
          :icon="Tab.icon"
          @click="goTo(Tab.path, Tab.name)"
        />
      </q-tabs>
      <q-btn-dropdown class="lt-sm" auto-close stretch flat label="">
        <q-list v-for="Tab  in tabs" :key="Tab.name">
          <q-item clickable @click="tab = Tab.name; goTo(Tab.path, Tab.name);">
            <q-item-section avatar>
              <q-icon :name="Tab.icon" />
            </q-item-section>
            <q-item-section >
              {{Tab.label}}
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <div class="q-pa-md">
        <q-btn-dropdown split push no-caps icon="person" :color="qbtnColor">
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemClick"
              to="/login"
              v-show="viewLogin()"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="person_outline"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login</q-item-label>
                <q-item-label caption>Login to send invites</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="onItemClick"
              to="/newUser"
              v-show="viewLogin()"
            >
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
            <q-item
              clickable
              v-close-popup
              @click="onLogoutClick"
              v-show="!viewLogin()"
            >
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
            <q-item
              clickable
              v-close-popup
              to="/createInvitation"
              v-show="!viewLogin()"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="create_new_folder"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>New Invitation</q-item-label>
                <q-item-label caption>Create a new Invitation</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/events"
              v-show="!viewLogin()"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="folder_shared"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>My Events</q-item-label>
                <q-item-label caption>Show my events</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/invites"
              v-show="!viewLogin()"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="folder_shared"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>My Invites</q-item-label>
                <q-item-label caption>Show my invites</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/addContacts"
              v-show="!viewLogin()"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="folder_shared"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>My Contacts</q-item-label>
                <q-item-label caption>Show my contacts</q-item-label>
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
import { scroll } from 'quasar';
import axios from 'axios';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'headerComponent',
  data() {
    return {
      tab: '',
      header: true,
      hEl: null,
      hStyle: 'background-color: rgba(0,0,0,0);',
      hideTabs: true,
      hClass: '',
      hScreenHeight: 200,
      lStyle: 'color:white',
      qbtnColor: '',
      qtabStyle: 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:white',
      tabs: [{
        name: 'images', label: 'Home', icon: 'home', path: '/',
      },
      {
        name: 'videos', label: 'About Us', icon: 'people', path: '/',
      },
      {
        name: 'articles', label: 'Browse Cards', icon: 'style', path: '/browsecards',
      },
      {
        name: 'reviews', label: 'Reviews', icon: 'rate_review', path: '/',
      },
      {
        name: 'prices', label: 'Prices', icon: 'monetization_on', path: '/',
      },
      ],
    };
  },
  mounted() {
    this.hEl = document.getElementById('header');
    this.hScreenHeight = this.$q.screen.height / 2;
    // window.alert(this.$router.currentRoute.path);
    if (this.$router.currentRoute.path !== '/') {
      this.hEl.className = this.hEl.className.replace('absolute-top', 'fixed-top');
      this.hStyle = 'background-color: rgba(255,255,255,1);';
      this.lStyle = 'color:#0072C6';
      this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:#0072C6 ';
      this.hClass = 'shadow-5 elevated bordered';
      // this.hEl.class = this.hEl.class.add('glossy');
      this.hideTabs = true;
      this.qbtnColor = 'primary';
      // window.alert(this.$router.currentRoute.path);
    }
    axios
      .get('http://ip-api.com/json')
      .then((Response) => {
        // window.alert(Response.data.country);
        if (Response.data.country) {
          this.hideTabs = true;
        }
        // this.eventType = Response.data.data;
      });
  },
  methods: {
    onItemClick() {
      return {};
    },
    viewLogin() {
      window.console.log(`login-token : ${this.$q.sessionStorage.getItem('login-token')}`);
      return (this.$q.sessionStorage.getItem('login-token') === null || this.$q.sessionStorage.getItem('login-token') === 'null');
    },
    onLogoutClick() {
      this.$q.sessionStorage.set('login-token', null);
      if (this.$route.path === '/') this.$router.go(0);
      else this.$router.push('/');
    },
    scrollTo(section) {
      if (section === null) return;
      const ele = document.getElementById(section);
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - this.hEl.clientHeight;
      const duration = 10;
      setScrollPosition(target, offset, duration);
    },
    goTo(path, section) {
      if (this.$route.path === path) this.scrollTo(section);
      else {
        this.$router.push(path)
          .then(() => {
            this.scrollTo(section);
          });
      }
    },
    scrollHandler(position) {
      // window.alert(this.$router.currentRoute.path);
      if (this.$router.currentRoute.path === '/') {
        if (position > this.hScreenHeight) {
          this.hEl.className = this.hEl.className.replace('absolute-top', 'fixed-top');
          this.hStyle = 'background-color: rgba(255,255,255,1);';
          this.lStyle = 'color:#0072C6';
          this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:#0072C6';
          this.hClass = 'shadow-5 elevated bordered';
          this.qbtnColor = 'primary';
        } else {
          this.hEl.className = this.hEl.className.replace('fixed-top', 'absolute-top');
          this.hStyle = 'background-color: rgba(0,0,0,0);';
          this.hClass = '';
          this.lStyle = 'color:white';
          this.qbtnColor = '';
          this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:white';
        }
      }
    },
  },
};
</script>
