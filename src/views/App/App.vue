<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style scoped></style>
