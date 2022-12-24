<template>
  <div class="settings">
    <div>{{ $t("settings") }} of {{ user.username }}</div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    role() {
      if (this.user.role === 1) {
        return "admin";
      } else if (this.user.role === 0) {
        return "user";
      } else {
        return "user";
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
