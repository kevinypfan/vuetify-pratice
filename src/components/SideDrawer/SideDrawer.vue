<template>
  <v-layout
    wrap
  >
    <v-navigation-drawer
      v-model="$store.state.UI.drawer"
      absolute
      temporary
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="click"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile @click="userLogout">
          <v-list-tile-action>
            <v-icon>input</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard", link: "/" },
        { title: "About", icon: "question_answer", link: "/about" },
        { title: "Detail", icon: "details", link: "/detail" }
      ]
    };
  },
  methods: {
    click() {
      setTimeout(() => {
        this.$store.commit("setDrawer");
      }, 200);
    },
    userLogout() {
      this.$store
        .dispatch("userLogout")
        .then(res => {
          if (res.message === "logout success!") {
            this.$store.commit("setDrawer");
            this.$router.replace("/auth");
          }
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>