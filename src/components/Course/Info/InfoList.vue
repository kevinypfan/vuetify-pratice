<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center>
      <v-flex
        xs12
        sm6
        md4
      >
        <v-card v-if="courseInfo">
          <v-card-title><h4>科目名稱: {{ courseInfo.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>授課老師: </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.teacher.firstname + courseInfo.teacher.lastname }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>上課地點: </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.room }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>開課課號: </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.courseCode }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>科目代號: </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.subjectCode }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>學分數: </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.credit }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>校區:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.campus }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>必/選修:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.subject === "COMPULSORY" ? "必修" : "選修"}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>選課人數:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ courseInfo.selectNumber}}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CourseById from "@/graphql/CourseById.gql";
export default {
  data: () => ({
    courseInfo: null
  }),
  created() {
    this.$apollo
      .query({
        query: CourseById,
        variables: {
          course: this.$route.params.id
        }
      })
      .then(({ data }) => {
        this.courseInfo = data.courseById;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
