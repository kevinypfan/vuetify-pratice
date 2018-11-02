<template>
  <v-app :dark="$store.state.UI.dark">
    <v-content>
      <SideDrawer :username="$store.getters.username"/>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <DialogLoading />
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
