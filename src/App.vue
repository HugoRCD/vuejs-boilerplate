<template>
  <CommandConsole />
  <Navbar />
  <router-view />
  <EnvChecker />
</template>

<script>
import EnvChecker from "@/components/EnvChecker.vue";
import Navbar from "@/components/Navbar.vue";
import CommandConsole from "@/components/commandConsole.vue";

export default {
  name: "App",
  components: { CommandConsole, Navbar, EnvChecker },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.$store.dispatch(
        "insertAccessToken",
        localStorage.getItem("accessToken"),
      );
    }
  },
};
</script>

<style lang="scss"></style>
