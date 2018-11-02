<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="loading"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    loading: {
      get() {
        return this.$store.state.UI.loading;
      },
      set(value) {
        this.$store.commit("setLoading", value);
      }
    }
  }
};
</script>