<template>
  <div>
    <v-app id="app">
      <session></session>
    </v-app>
    
  </div>
</template>

<script>
import SessionVue from './views/Session/Session.vue';

export default {
    name: 'App',
  components: {
    "session": SessionVue
  },
  data: () => ({
    //
  }),
};
</script>
