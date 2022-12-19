<template>
  <div class="account">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Account",
  components: { Navbar },
};
</script>

<style scoped lang="scss"></style>
