<template>
<div class="home">
  <Toolbar :barItem="barItem"/>
  <CourseList :courses="courses"/>
  <FloatButton />
  <DialogForm />
</div>
 
</template>

<script>
import CourseList from "@/components/Course/CourseList.vue";
import FloatButton from "@/components/Course/FloatButton.vue";
import DialogForm from "@/components/Course/DialogForm.vue";
import COURSES from "@/graphql/Courses.gql";
export default {
  components: { CourseList, FloatButton, DialogForm },
  data() {
    return {
      barItem: { title: "Home" },
      courses: null
    };
  },
  apollo: {
    courses: {
      query: COURSES
    }
  }
};
</script>
