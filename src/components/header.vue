<template>
  <q-header id="header" ref="header" v-scroll="scrollHandler"
   :style="hStyle" :class="hClass">
    <q-toolbar style="padding-right: 0px;">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <a href="/" v-if="$q.screen.xs">
        <img src="statics/WE_Invites_logo.png" width="50px" />
      </a>
      <a href="/" v-else-if="$q.screen.sm">
        <img src="statics/WE_Invites_logo.png" width="60px" />
      </a>
      <a href="/" v-else-if="$q.screen.md">
        <img src="statics/WE_Invites_logo.png" width="75px" />
      </a>
      <a href="/" v-else>
        <img src="statics/WE_Invites_logo.png" width="75px" />
      </a>
      <q-toolbar-title class="logo" shrink :style="lStyle"
       style="padding-right: 0px;">
       <a href="/"  style="text-decoration: none;">
         <span :class="weClass">WE</span>&nbsp; <span class="text-primary">Promotes</span>
       </a>
      </q-toolbar-title>
      <q-space/>
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
          :label= "($q.screen.gt.md) ? 'Home' : undefined"
          class="text-white"
          style="font-family: 'Montserrat', cursive;  font-color:#FFFFFF;  font-weight:bold; "
          icon="home"
          to="/#images"
          exact
        />
        <q-route-tab
          name="videos"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'About Us' : undefined"
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
          :label= "($q.screen.gt.md) ? 'Browse Cards' : undefined"
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
          :label= "($q.screen.gt.md) ? 'Reviews' : undefined"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="rate_review"
          @click="scrollTo('reviews')"
        />
        <q-route-tab
          name="prices"
          class="text-white"
          :label= "($q.screen.gt.md) ? 'Prices' : undefined"
          style="font-family: 'Montserrat', cursive;
  font-color:#FFFFFF;
  font-weight:bold; "
          icon="monetization_on"
          to="/"
          exact
        />
      </q-tabs-->
      <!--q-tabs
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
          :label="($q.screen.gt.md) ? Tab.label : undefined"
          :style="qtabStyle"
          :icon="Tab.icon"
          @click="goTo(Tab.path, Tab.name)"
        />
      </q-tabs>
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
                <q-item-label caption>New to We Invites</q-item-label>
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
                <q-item-label caption>Logout from We Invites</q-item-label>
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
      </div-->
      <!-- <q-btn flat round dense icon="whatshot" /> -->

      <div v-if="viewLogin()" class="row items-center q-pl-sm">

      </div>

      <q-tabs
        v-else-if="$q.screen.width >= 600"
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="merienda-bold gt-xs q-pa-xs"
        inline-label
        dense stretch
        align="right"
        :breakpoint="0"
        id="home_tabs"
        right-icon="none"
        content-class="q-tabs__arrow--faded"
      >
        <q-route-tab
          name="New Promotion"
          :style="qtabStyle"
          to="/createPromotion"
          content-class="q-pa-none"
        >
          <q-icon name="img:statics/icons/new_promo2.png" size="xl"/>
          <div v-if="($q.screen.width > 965)" class="q-pl-sm q-tab__label">New Promotion</div>
        </q-route-tab>
        <q-route-tab
          name="My Promotions"
          :style="qtabStyle"
          to="/promotions"
        >
          <q-icon name="img:statics/icons/my_promo1.png" size="md"/>
          <div v-if="($q.screen.width > 965)" class="q-pl-sm q-tab__label">My Promotions</div>
        </q-route-tab>
        <q-route-tab
          name="Orders"
          :label="($q.screen.width > 965) ? 'Orders' : undefined"
          :style="qtabStyle"
          icon="fastfood"
          to="/currentOrders"
        >
        </q-route-tab>
        <q-route-tab
          name="MyMenu"
          :label="($q.screen.width > 965) ? 'My Menu' : undefined"
          :style="qtabStyle"
          icon="menu_book"
          to="/myMenu"
        >
        </q-route-tab>
        <q-route-tab
          name="My Customers"
          :label="($q.screen.width > 965) ? 'My Contacts' : undefined"
          :style="qtabStyle"
          icon="contacts"
          to="/addContacts"
        />
        <q-tab
          name="logout"
          :label="($q.screen.width > 965) ? 'Logout' : undefined"
          :style="qtabStyle"
          icon="person_add"
          @click="onLogoutClick"
        />
            <!--q-item
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
                <q-item-label caption>New to We Invites</q-item-label>
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
                  icon=""
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
                <q-item-label caption>Logout from We Invites</q-item-label>
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
        </q-btn-dropdown-->
      </q-tabs>
      <q-btn-dropdown v-else icon="person" dropdown-icon=""
       auto-close dense flat color="black">
          <q-list>
            <q-item
              clickable
              v-close-popup
              to="/createPromotion"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="record_voice_over"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>New Promotion</q-item-label>
                <q-item-label caption>Create new Promotion</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/promotions"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="today"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>My Promotions</q-item-label>
                <q-item-label caption>Show my Promotions</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/currentOrders"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="fastfood"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Orders</q-item-label>
                <q-item-label caption>Show my Orders</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/addContacts"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="contacts"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>My Contacts</q-item-label>
                <q-item-label caption>Show my Contacts</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              to="/myProfile"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="person"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>My Profile</q-item-label>
                <q-item-label caption>Show my profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="onLogoutClick"
            >
              <q-item-section avatar style="min-width: 0px;">
                <q-icon name="person_add"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
                <q-item-label caption>Logout from We Promotes</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
      </q-btn-dropdown>

    </q-toolbar>
  </q-header>
</template>

<script>
import { Loading, QSpinnerBars, scroll } from 'quasar';
import axios from 'axios';
import loginDialog from './loginDialog.vue';
// import oauth2ClientsComponent from './oauth2Clients.vue';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'headerComponent',
  components: {
    // oauth2ClientsComponent,
  },
  data() {
    return {
      tab: '',
      header: true,
      hEl: null,
      hStyle: 'background-color: rgba(255,255,255,0);',
      hideTabs: true,
      hClass: '',
      hScreenHeight: 200,
      lStyle: 'color:white',
      weClass: 'text-white',
      qmenuColor: '',
      qbtnColor: '',
      qtabStyle: 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:black',
      tabs: [{
        name: 'images', label: 'Home', icon: 'home', path: '/',
      },
      {
        name: 'videos', label: 'About Us', icon: 'people', path: '/',
      },
      {
        name: 'portfolio', label: 'Browse Cards', icon: 'style', path: '/',
      },
      {
        name: 'reviews', label: 'Reviews', icon: 'rate_review', path: '/',
      },
      {
        name: 'prices', label: 'Prices', icon: 'monetization_on', path: '/',
      },
      ],
      name: '',
      age: '',
    };
  },
  mounted() {
    this.hEl = document.getElementById('header');
    this.hScreenHeight = this.$q.screen.height / 2;
    // window.alert(this.$router.currentRoute.path);
    if (this.$router.currentRoute.path !== '/') {
      this.hEl.className = this.hEl.className.replace('absolute-top', 'fixed-top');
      this.hStyle = 'background-color: rgba(255,255,255 ,.9);';
      this.lStyle = 'color:black';
      this.weClass = 'text-black';
      this.qtabStyle = 'font-family: \'Montserrat\', sans-serif;  font-color:black;  font-weight:bold; color:black; font-size: 13px; ';
      this.hClass = 'shadow-5 elevated bordered';
      // this.hEl.class = this.hEl.class.add('glossy');
      this.hideTabs = true;
      this.qbtnColor = 'primary';
      this.qmenuColor = 'black';
      // window.alert(this.$router.currentRoute.path);
    }
  },
  methods: {
    onItemClick() {
      return {};
    },
    viewLogin() {
      window.console.log(`login-token : ${this.$q.localStorage.getItem('login-token')}`);
      return (this.$q.localStorage.getItem('login-token') === null);
    },
    onLogoutClick() {
      this.$q.localStorage.remove('login-token');
      if (this.$route.path === '/') this.$router.go(0);
      else this.$router.push('/');
    },
    scrollTo(section) {
      const duration = 50;
      if (section === null) section = 'header';
      const ele = document.getElementById(section);
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - this.hEl.clientHeight;
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
    goHome() {
      if (this.$route.path === '/') this.$router.go(0);
      else this.$router.push('/');
    },
    scrollHandler(position) {
      // window.alert(this.$router.currentRoute.path);
      if (this.$route.path === '/') {
        if (position > this.hScreenHeight) {
          this.hEl.className = this.hEl.className.replace('absolute-top', 'fixed-top');
          this.hStyle = 'background-color: rgba(255,255,255,.7);';
          this.lStyle = 'color:#FFFFF';
          this.weClass = 'text-black';
          this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:white';
          this.hClass = 'elevated bordered';
          this.qbtnColor = 'primary';
          this.qmenuColor = 'white';

          document.getElementById('ei_tab').style.visibility = 'visible';
        } else {
          this.hEl.className = this.hEl.className.replace('fixed-top', 'absolute-top');
          this.hStyle = 'background-color: rgba(255,255,255,0);';
          this.hClass = '';
          this.lStyle = 'color:white';
          this.weClass = 'text-white';
          this.qbtnColor = '';
          this.qmenuColor = 'white';
          this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#000000;  font-weight:bolder; color:white';
          document.getElementById('ei_tab').style.visibility = 'hidden';
        }
      }
    },
    openDialog(login, username = '') {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: loginDialog,
        parent: this,
        login,
        username,
      }).onOk(() => {
        this.$router.push('/currentOrders');
      }).onCancel(() => {
      });
      Loading.hide();
    },
    onLogin() {
      if (this.$q.screen.width < 850) {
        this.openDialog(true);
        return;
      }
      if (this.name === null || this.name === '') return;
      if (this.name.length !== 10 || this.age === null || this.age === '') {
        this.openDialog(true, this.name);
        return;
      }
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });

      axios.post('/api/authenticate', {
        username: this.name,
        password: this.age,
      })
        .then((response) => {
          this.posts = response.data;
          this.$q.localStorage.set('login-token', this.posts.token);
          axios.defaults.headers.Authorization = `Bearer ${this.$q.localStorage.getItem(
            'login-token',
          )}`;
          Loading.hide();
          this.$nextTick(() => {
            this.$router.push('/currentOrders');
          });
        })
        .catch((e) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'black',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          Loading.hide();
          this.openDialog(true, this.name);
        });
    },
  },
};
</script>

<style lang="sass">
  .q-tabs__arrow
    display: none;
</style>
