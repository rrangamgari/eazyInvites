<template>
  <q-header id="header" ref="header" v-scroll="scrollHandler"
   :style="hStyle" :class="hClass">
    <q-toolbar>
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

      <q-btn-dropdown auto-close dropdown-icon="menu"
       dense flat :color="qmenuColor">
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
      <q-toolbar-title class="logo" :style="lStyle" >WE Invites</q-toolbar-title>
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
          :label="($q.screen.gt.md) ? Tab.label : ''"
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
      </div-->
      <!-- <q-btn flat round dense icon="whatshot" /> -->

      <div v-if="viewLogin()" class="row items-center q-pl-sm">
      <q-form
        id="login"
        @submit="onLogin"
        @reset="() => {}"
        class="row"
      >
      <q-input
        v-if="$q.screen.width >= 777"
        dark
        outlined dense
        class="q-pt-sm q-pr-sm"
        style="width: 180px"
        type="text"
        v-model="name"
        label="Phone"
        lazy-rules
        mask="(###) ### - ####"
        unmasked-value
        fill-mask="#"
        :rules="[ val=> val !== null && val !== '' && val.length === 10 || 'Please enter  Phone']"
      />

      <q-input
        v-if="$q.screen.width >= 777"
        dark
        stack-label
        outlined dense
        class="q-pt-sm q-pr-sm"
        style="width: 180px"
        type="password"
        v-model="age"
        label="Password"
        lazy-rules
        :rules="[ val=> val !== null && val !== '' || 'Please enter Password']"
      />

      <div class="row" style="max-width: 90px; padding: 9px 0px;">
        <q-btn class="col-12" label="Login" type="submit" dense
         :color="`${qbtnColor || 'white'}`"
         :text-color="`${qbtnColor === '' ? 'black' : 'white'}`"/>
        <div @click="openDialog()" class="q-pt-xs" :class="`text-${qbtnColor}`"
         style="font-size: 10px; text-decoration: underline; cursor: default;">New User?</div>
      </div>
      </q-form>
      </div>
      <div v-else>
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="merienda-bold gt-xs"
        inline-label
        dense shrink
        v-model="tab"
        id="home_tabs"
      >
        <q-route-tab
          name="New Invitation"
          :label="($q.screen.gt.sm) ? 'New Invitation' : ''"
          :style="qtabStyle"
          icon="create_new_folder"
          to="/createInvitation"
          content-class="padding: 0px 8px;"
        />
        <q-route-tab
          name="My Events"
          :label="($q.screen.gt.sm) ? 'My Events' : ''"
          :style="qtabStyle"
          icon="folder_shared"
          to="/events"
        />
        <q-route-tab
          name="My Invites"
          :label="($q.screen.gt.sm) ? 'My Invites' : ''"
          :style="qtabStyle"
          icon="folder_shared"
          to="/invites"
        />
        <q-route-tab
          name="My Contacts"
          :label="($q.screen.gt.sm) ? 'My Contacts' : ''"
          :style="qtabStyle"
          icon="group"
          to="/addContacts"
        />
        <q-tab
          name="logout"
          :label="($q.screen.gt.sm) ? 'Logout' : ''"
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
                  icon=""
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
        </q-btn-dropdown-->
      </q-tabs>
      <q-btn-dropdown icon="person" dropdown-icon=""
       auto-close dense flat :color="qbtnColor" class="lt-sm">
          <q-list>
            <q-item
              clickable
              v-close-popup
              to="/createInvitation"
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
            >
              <q-item-section avatar>
                <q-avatar
                  icon="group"
                  color="secondary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>My Contacts</q-item-label>
                <q-item-label caption>Show my contacts</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="onLogoutClick"
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
          </q-list>
      </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { Loading, QSpinnerBars, scroll } from 'quasar';
import axios from 'axios';
import loginDialog from './loginDialog.vue';

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
      qmenuColor: '',
      qbtnColor: '',
      qtabStyle: 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:white',
      tabs: [{
        name: 'images', label: 'Home', icon: 'home', path: '/',
      },
      {
        name: 'videos', label: 'About Us', icon: 'people', path: '/',
      },
      {
        name: null, label: 'Browse Cards', icon: 'style', path: '/browsecards',
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
      this.hStyle = 'background-color: rgba(0,0,0,1);';
      this.lStyle = 'color:white';
      this.qtabStyle = 'font-family: \'Montserrat\', sans-serif;  font-color:white;  font-weight:bold; color:white; font-size: 13px; ';
      this.hClass = 'shadow-5 elevated bordered';
      // this.hEl.class = this.hEl.class.add('glossy');
      this.hideTabs = true;
      this.qbtnColor = 'primary';
      this.qmenuColor = 'white';
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
      return (this.$q.sessionStorage.getItem('login-token') === null);
    },
    onLogoutClick() {
      this.$q.sessionStorage.remove('login-token');
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
    scrollHandler(position) {
      // window.alert(this.$router.currentRoute.path);
      if (this.$route.path === '/') {
        if (position > this.hScreenHeight) {
          this.hEl.className = this.hEl.className.replace('absolute-top', 'fixed-top');
          this.hStyle = 'background-color: rgba(0,0,0,.7);';
          this.lStyle = 'color:#FFFFF';
          this.qtabStyle = 'font-family: \'Montserrat\', cursive;  font-color:#FFFFFF;  font-weight:bolder; color:white';
          this.hClass = 'elevated bordered';
          this.qbtnColor = 'primary';
          this.qmenuColor = 'white';
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
    openDialog(login) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'primary',
        thickness: '3',
      });
      this.$q.dialog({
        component: loginDialog,
        persistent: true,
        parent: this,
        login,
      }).onOk(() => {
        this.$router.push('/events');
      }).onCancel(() => {
      });
      Loading.hide();
    },
    onLogin() {
      if (this.$q.screen.width < 777) {
        this.openDialog(true);
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
          // JSON responses are automatically parsed.
          this.posts = response.data;
          /* this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: this.posts.token,
            position: 'center',
          }); */
          this.$q.sessionStorage.set('login-token', this.posts.token);
          axios.defaults.headers.Authorization = `Bearer ${this.$q.sessionStorage.getItem(
            'login-token',
          )}`;
          Loading.hide();
          this.goTo('/events', null);
        })
        .catch((e) => {
        //  this.errors.push(e);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.message,
            position: 'top',
          });
          Loading.hide();
        });
    },
  },
};
</script>
