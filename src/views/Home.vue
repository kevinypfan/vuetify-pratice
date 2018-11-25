<template>
<div class="home">
  <CourseList :courses="courses"/>
  <FloatButton v-if="$store.getters.isAuthAndAdmin" @onNewBtn="newCourseHandler"/>
  <DialogFormNew v-model="dialog" @onSubmitForm="submitFormHandler"/>
  <DialogLoading />
</div>
 
</template>

<script>
import CourseList from "@/components/Course/CourseList.vue";
import DialogFormNew from "@/components/Course/DialogFormNew.vue";
import COURSES from "@/graphql/Courses.gql";
import NewCourse from "@/graphql/NewCourse.gql";
import CourseAddedData from "@/graphql/CourseAddedData.gql";
export default {
  components: { CourseList, DialogFormNew },
  data() {
    return {
      barItem: { title: "Home" },
      courses: null,
      formNew: false,
      dialog: false
    };
  },
  apollo: {
    courses: {
      query: COURSES,
      subscribeToMore: {
        document: CourseAddedData,
        updateQuery: (previousResult, { subscriptionData }) => {
          // If we added the tag already don't do anything
          // This can be caused by the `updateQuery` of our addTag mutation
          if (
            previousResult.courses.find(
              course => course.id === subscriptionData.data.courseAddedData.id
            )
          ) {
            return previousResult;
          }

          return {
            courses: [
              ...previousResult.courses,
              // Add the new tag
              subscriptionData.data.courseAddedData
            ]
          };
        }
      }
    }
  },
  methods: {
    async submitFormHandler(payload) {
      this.$store.commit("setLoading", true);
      try {
        const { data } = await this.$apollo.mutate({
          mutation: NewCourse,
          variables: { data: payload }
        });
        await setTimeout(() => {
          this.$store.commit("setLoading", false);
          this.dialog = false;
        }, 1500);
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.log(error);
      }
    },
    newCourseHandler(value) {
      this.formNew = value;
      this.dialog = true;
    }
  }
};
</script>
