<template>
  <div class="auth">
    <div class="auth-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import Logo from "@/components/Logo.vue";

export default {
  name: "Auth",
  components: {Logo, ThemeSwitcher, LanguageSelector}
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .logo-section {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        margin-right: 1rem;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--font-color);
      }
    }

    .nav-button {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>