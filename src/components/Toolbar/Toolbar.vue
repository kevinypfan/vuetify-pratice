<template>
  <v-toolbar>
    
    <v-toolbar-side-icon
      v-if="!back"
      icon
      @click.stop="drawerControl"
    ></v-toolbar-side-icon>

    <v-btn icon class="hidden-xs-only" v-if="back">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{ barItem.title }}</v-toolbar-title>

    <v-spacer></v-spacer>

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
                  :value="this.$store.state.dark"
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
export default {
  props: ['barItem', 'back'],
  methods: {
    darkControl() {
      this.$store.commit('setDark');
    },
    drawerControl() {
      this.$store.commit('setDrawer');
    }
  }
};
</script>
