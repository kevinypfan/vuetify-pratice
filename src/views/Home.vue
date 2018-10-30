<template>
<div class="home">
  <Toolbar :barItem="barItem"/>
  <SideDrawer />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
  <CardList />
</div>
 
</template>

<script>
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import SideDrawer from '@/components/SideDrawer/SideDrawer.vue';
import CardList from '@/components/Home/CardList.vue';
export default {
  components: { Toolbar, SideDrawer, CardList },
  data() {
    return {
      barItem: { title: 'Home' }
    };
  }
};
</script>
