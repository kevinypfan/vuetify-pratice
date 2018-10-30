<template>
  <div class="detail">
    <Toolbar :barItem="barItem"/>
    <SideDrawer />
  </div>
</template>
<script>
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import SideDrawer from '@/components/SideDrawer/SideDrawer.vue';
export default {
  components: { Toolbar, SideDrawer },
  data() {
    return {
      barItem: { title: 'Detail' }
    };
  }
};
</script>
