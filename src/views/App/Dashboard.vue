<template>
  <div class="dashboard middle full-height">
    <h1 class="title">{{ $t("hello") }} {{ username }}</h1>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      username: null,
    };
  },
  created() {
    this.username = this.$store.getters.user.username;
  },
};
</script>

<style scoped lang="scss"></style>
