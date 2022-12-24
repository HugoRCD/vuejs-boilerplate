<template>
  <CommandConsole />
  <Navbar />
  <router-view class="mt-10" />
  <EnvChecker />
</template>

<script>
import EnvChecker from "@/components/EnvChecker.vue";
import CommandConsole from "@/components/commandConsole.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar, CommandConsole, EnvChecker },
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
