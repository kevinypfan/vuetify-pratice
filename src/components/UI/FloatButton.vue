<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
    >
    <v-btn
        fab
        dark
        small
        color="indigo"
        @click="$emit('onNewBtn')"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="$emit('onEditBtn')"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="$emit('onDelBtn')"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    fab: false
  })
};
</script>
<style lang="scss" scoped>
#create .v-speed-dial {
  position: fixed;
}
#create .v-btn--floating {
  position: relative;
}
</style>
