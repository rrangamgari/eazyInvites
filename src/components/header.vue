<template>
  <q-header elevated>
        <q-toolbar class="glossy">
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>

           <q-toolbar-title>Eazy Invites</q-toolbar-title>

      <q-space />

      <div class="q-pa-md">
    <q-btn-dropdown
      split
            push
      glossy
      no-caps
      icon="whatshot"
            @click="onMainClick"
    >
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick" to="/login">
          <q-item-section avatar>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="info" color="amber" />
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="img:https://www.w3schools.com/bootstrap/img_avatar3.png" color="secondary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Register</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="info" color="amber" />
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
};
</script>
