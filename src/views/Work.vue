<template>
    <div class="work">
        <WorkList  :homeworks="homeworks" />
        <FloatButton v-if="$store.getters.isAuthAndAdmin" @onNewBtn="newBtnHandler"/>
        <DialogWorkForm v-model="dialog" @onSubmitForm="newWorkSubmithandler"/>
    </div>
</template>

<script>
import WorkList from "@/components/Work/WorkList.vue";
import DialogWorkForm from "@/components/Work/DialogWorkForm.vue";
import NewHomework from "@/graphql/NewHomework.gql";
import HomeworkByCourse from "@/graphql/HomeworkByCourse.gql";
import HomeworkAddedData from "@/graphql/HomeworkAddedData.gql";

export default {
  data: () => ({
    dialog: false,
    homeworks: null
  }),
  components: { WorkList, DialogWorkForm },
  methods: {
    newBtnHandler() {
      this.dialog = true;
    },
    newWorkSubmithandler(data) {
      this.$store.commit("setLoading", true);
      console.log(data);
      this.$apollo
        .mutate({
          mutation: NewHomework,
          variables: {
            data
          }
        })
        .then(result => {
          console.log(result);
          setTimeout(() => {
            this.$store.commit("setLoading", false);
            this.dialog = false;
          }, 1500);
        })
        .catch(err => {
          this.$store.commit("setLoading", false);
          console.log(err);
        });
    }
  },
  created() {
    const apolloData = this.$apollo
      .query({
        query: HomeworkByCourse,
        variables: {
          course: this.$route.params.course
        },
        subscribeToMore: {
          document: HomeworkAddedData,
          updateQuery: (previousResult, { subscriptionData }) => {
            // If we added the tag already don't do anything
            // This can be caused by the `updateQuery` of our addTag mutation
            console.log("previousResult: ", previousResult);
            console.log("subscriptionData: ", subscriptionData);
            if (
              previousResult.homeworkByCourse.find(
                homework =>
                  homework.id === subscriptionData.data.homeworkAddedData.id
              )
            ) {
              return previousResult;
            }

            return {
              homeworkByCourse: [
                ...previousResult.homeworkByCourse,
                // Add the new tag
                subscriptionData.data.homeworkAddedData
              ]
            };
          }
        }
      })
      .then(({ data }) => {
        this.homeworks = data.homeworkByCourse;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
