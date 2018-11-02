<template>
  <v-toolbar>
    
    <v-toolbar-side-icon
      v-if="!barConfig.back"
      icon
      @click.stop="drawerControl"
    ></v-toolbar-side-icon>

    <v-btn icon ripple v-if="barConfig.back" color="currentColor" :to="barConfig.back">
      <v-icon>arrow_back_ios</v-icon>
    </v-btn>
    <v-toolbar-title>{{ barConfig.title }}</v-toolbar-title>

    <v-spacer></v-spacer>

     <v-menu offset-y :close-on-content-click="false">
        <v-btn
          slot="activator"
          icon
        >
          <v-badge
            overlap
            color="orange"
          >
            <v-icon
              v-if="items.length > 0"
              slot="badge"
              dark
              small
            >notifications</v-icon>
            <v-icon large>notifications_active</v-icon>
          </v-badge>
        </v-btn>

        <v-list two-line>
          <template v-for="(item, index) in processNotify">
            <v-list-tile
              :key="index"
              avatar
              @click="console.log('notify')"
            >
              <v-list-tile-avatar>
                <v-icon class="amber white--text">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.message }}</v-list-tile-title>
                <v-list-tile-sub-title><span class='text--primary'>通知時間: </span>{{timeFormat(item.timestamp)}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-content-click="false">
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Dark Mode</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-switch
                  :value="this.$store.state.UI.dark"
                  @change="darkControl"
                ></v-switch>              
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
import moment from "moment";
import CourseAddedNotify from "@/graphql/CourseAddedNotify.gql";
export default {
  props: ["barConfig"],
  data() {
    return {
      items: []
    };
  },
  apollo: {
    $subscribe: {
      courseAddedNotify: {
        query: CourseAddedNotify,
        result({ data }) {
          const temp = [...this.items].concat(data.courseAddedNotify);
          this.items = temp;
        }
      }
    }
  },
  methods: {
    darkControl() {
      this.$store.commit("setDark");
    },
    drawerControl() {
      this.$store.commit("setDrawer");
    },
    timeFormat(stamp) {
      return moment(new Date(stamp)).format("HH:mm:ss");
    }
  },
  computed: {
    processNotify() {
      if (this.items.length == 0) {
        return [
          {
            icon: "close",
            message: "目前沒有通知!",
            timestamp: Date.now()
          }
        ];
      }
      return this.items;
    }
  }
};
</script>
