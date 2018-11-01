<template>
  <div class="detail">
    <Toolbar :barItem="barItem"/>
    <SideDrawer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      barItem: { title: "Detail" }
    };
  }
};
</script>
