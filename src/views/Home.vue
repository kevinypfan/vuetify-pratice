<template>
<div class="home">
  <Toolbar :barItem="barItem"/>
  <SideDrawer />
  <CourseList />
</div>
 
</template>

<script>
import CourseList from "@/components/Course/CourseList.vue";
export default {
  components: { CourseList },
  data() {
    return {
      barItem: { title: "Home" }
    };
  }
};
</script>
