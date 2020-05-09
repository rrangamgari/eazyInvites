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
      <div class="logo_labels gt-xs">
        Fast Invite | Browse Cards | About Us
      </div>
      <div class="q-pa-md">
        <q-btn-dropdown split push glossy no-caps icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick" to="/login">
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

            <q-item clickable v-close-popup @click="onItemClick">
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
  },
};
</script>
