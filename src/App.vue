<template>
  <Navbar/>
  <div class="main-router">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <EnvChecker/>
</template>

<script>
import EnvChecker from "@/components/EnvChecker.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {Navbar, EnvChecker},
  created() {
    if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken") && localStorage.getItem("user")) {
      this.$store.dispatch("login", {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        user: JSON.parse(localStorage.getItem("user"))
      });
    }
  }
};
</script>

<style lang="scss">
.main-router {
  margin-top: 3rem;
}
</style>
