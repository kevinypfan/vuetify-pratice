<template>
<div class="home">
  <CourseList :courses="courses"/>
  <FloatButton v-if="isAuthAndAdmin"/>
  <DialogForm @onSubmitForm="submitFormHandler"/>
  <DialogLoading />
</div>
 
</template>

<script>
import CourseList from "@/components/Course/CourseList.vue";
import FloatButton from "@/components/Course/FloatButton.vue";
import DialogForm from "@/components/Course/DialogForm.vue";
import COURSES from "@/graphql/Courses.gql";
import NewCourse from "@/graphql/NewCourse.gql";
import CourseAddedData from "@/graphql/CourseAddedData.gql";
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
          this.$store.commit("setDialog", false);
        }, 1500);
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.log(error);
      }
    }
  },
  computed: {
    isAuthAndAdmin() {
      return (
        this.$store.state.user.user !== undefined &&
        this.$store.state.user.user !== null &&
        this.$store.state.user.user.scope === "ADMIN"
      );
    }
  }
};
</script>
