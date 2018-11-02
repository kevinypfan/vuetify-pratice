<template>
<div class="home">
  <Toolbar :barItem="barItem"/>
  <CourseList :courses="courses"/>
  <FloatButton />
  <DialogForm @onSubmitForm="submitFormHandler" :data="tempData"/>
  <DialogLoading />
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
      courses: null,
      formDataTemp: null
    };
  },
  apollo: {
    courses: {
      query: COURSES
    }
  },
  methods: {
    submitFormHandler(payload) {
      this.$store.commit("setLoading", true);
      this.formDataTemp = payload;
      setTimeout(() => {
        this.$store.commit("setLoading", false);
        this.$store.commit("setDialog", false);
      }, 3000);
    }
  },
  computed: {
    tempData() {
      if (this.formDataTemp) {
        return this.formDataTemp;
      }
      return false;
    }
  }
};
</script>
