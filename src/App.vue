<template>
  <CommandConsole />
  <router-view />
  <EnvChecker />
</template>

<script>
import EnvChecker from "@/components/EnvChecker.vue";
import CommandConsole from "@/components/commandConsole.vue";

export default {
  name: "App",
  components: { CommandConsole, EnvChecker },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.$store.dispatch(
        "insertAccessToken",
        localStorage.getItem("accessToken"),
      );
    }
    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme"),
      );
    }
  },
};
</script>

<style lang="scss"></style>
