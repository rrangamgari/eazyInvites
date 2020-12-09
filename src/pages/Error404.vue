<template>
  <div class="fixed-center text-center">
    <header-component></header-component>
    <footer-component></footer-component>
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Sorry, nothing here...<strong>(404)</strong>
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script >
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

export default {
  name: 'Error404',
  components: {
    headerComponent,
    footerComponent,
  },
};
</script>
