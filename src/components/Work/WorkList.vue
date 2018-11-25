<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line v-if="homeworks">
          <template v-for="(item, index) in displayHomeworks">
            <v-list-tile
              :key="item.id"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.description }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                    繳交時間: {{timeFormat(item.start) + " -> " + timeFormat(item.end) }}
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="error"
                >
                  close
                </v-icon>

                <v-icon
                  v-else
                  color="green darken-2"
                >
                  done
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < homeworks.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  props: ["homeworks"],
  data() {
    return {
      selected: [2]
    };
  },
  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);
      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        this.selected.push(index);
      }
    },
    timeFormat(stamp) {
      return moment(new Date(stamp)).format("YYYY-MM-DD");
    }
  },
  computed: {
    displayHomeworks() {
      if (this.homeworks.length == 0) {
        let next = new Date();
        next.setDate(next.getDate() + 1);
        return [
          {
            id: "nowork",
            title: "目前還沒有作業唷！",
            description: "趁機會好好玩吧，作業就要來囉～",
            start: new Date().toISOString().substr(0, 10),
            end: new Date(next).toISOString().substr(0, 10)
          }
        ];
      }
      return this.homeworks;
    }
  }
};
</script>