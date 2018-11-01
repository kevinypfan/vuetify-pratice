<template>
  <v-app :dark="$store.state.UI.dark">
    <v-content>
      <SideDrawer :username="$store.getters.username"/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import SideDrawer from "./components/SideDrawer/SideDrawer.vue";

export default {
  name: "App",
  components: { SideDrawer },
  created() {
    if (!Array.prototype.last) {
      Array.prototype.last = function() {
        return this[this.length - 1];
      };
    }
  }
};
</script>
