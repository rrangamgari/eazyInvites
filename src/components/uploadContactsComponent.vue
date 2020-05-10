<template>
  <q-dialog v-model="uploadContactsLayout">
      <q-layout container class="bg-white" style="max-height:500px;">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Upload Contacts</q-toolbar-title>

            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

      </q-layout>
    </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {};
  },
};
</script>
