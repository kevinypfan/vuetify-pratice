<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line subheader>
          <v-subheader inset>Course</v-subheader>

          <v-list-tile
            v-for="item in items2"
            :key="item.title"
            avatar
            @click="click"
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">call_to_action</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
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
  data() {
    return {
      items2: [
        {
          iconClass: "blue white--text",
          title: "Vacation itinerary",
          subtitle: "Jan 20, 2014"
        },
        {
          iconClass: "amber white--text",
          title: "Kitchen remodel",
          subtitle: "Jan 10, 2014"
        }
      ]
    };
  },
  methods: {
    click() {
      console.log("here");
    }
  }
};
</script>
