<template>
    <div class="auth">
        <Auth />
    </div>
</template>
<script>
import Auth from "@/components/Auth/Auth.vue";
export default {
  data() {
    return {
      barItem: { title: "Auth" }
    };
  },
  components: {
    Auth
  }
};
</script>
