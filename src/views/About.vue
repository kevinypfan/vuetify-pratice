<template>
  <div class="about">
    <Toolbar :barItem="barItem"/>
    <SideDrawer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      barItem: { title: "About" }
    };
  }
};
</script>
