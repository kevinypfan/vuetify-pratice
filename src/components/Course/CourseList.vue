<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line subheader>
          <v-list-tile
            v-for="course in courses"
            :key="course.id"
            avatar
            :to="`/system/${course.id}`"
          >
            <v-list-tile-avatar>
              <v-icon class="white--text" :class="course.subject === 'COMPULSORY' ?'red': 'amber'">call_to_action</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ course.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ course.class + " 選課人數: " + course.selectNumber }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple :to="`/info/${course.id}`">
                <v-icon color="grey lighten-1">info</v-icon>
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
  props: ["courses"]
};
</script>
