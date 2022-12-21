<template>
  <Navbar />
  <div class="main-router">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <EnvChecker />
</template>

<script>
import EnvChecker from "@/components/EnvChecker.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar, EnvChecker },
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
