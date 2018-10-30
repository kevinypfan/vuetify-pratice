<template>
  <v-app :dark="$store.state.dark">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>
