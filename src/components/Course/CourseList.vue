<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line subheader>
          <v-subheader inset>Course</v-subheader>
            <v-divider></v-divider>

          <v-list-tile
            v-for="course in courses"
            :key="course.id"
            avatar
            @click="click"
          >
            <v-list-tile-avatar>
              <v-icon class="amber white--text">call_to_action</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ course.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ course.class + " 選課人數: " + course.selectNumber }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action v-if=" course.subject === 'COMPULSORY'">
              <v-btn icon>
                <v-icon color="amber lighten-1">stars</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ["courses"],
  methods: {
    click() {
      console.log("here");
    }
  }
};
</script>
