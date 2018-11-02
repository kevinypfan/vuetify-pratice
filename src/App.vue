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
  data: () => ({
    toolbarConfig: {}
  }),
  created() {
    if (!Array.prototype.last) {
      Array.prototype.last = function() {
        return this[this.length - 1];
      };
    }
  },
  methods: {
    jsUcfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  watch: {
    $route(to, from) {
      let config = { title: this.jsUcfirst(to.name) };
      const pathArray = to.fullPath.split("/");
      console.log(pathArray);
      if (pathArray.length == 2 && pathArray[1] === "") {
        config.back = null;
      } else if (pathArray.length == 2 && pathArray[1] !== "") {
        config.back = "/";
      } else if (pathArray.length > 2) {
        config.back = pathArray.slice(0, pathArray.length - 1).join("/");
      } else {
        config.back = null;
      }
      this.toolbarConfig = {
        ...this.toolbarConfig,
        ...config
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
