<template>
  <router-link :to="{ name: 'Home' }">
    <div class="logo-section">
      <img src="../assets/media/logo.png" alt="logo">
      <h1>Vue Template</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style scoped lang="scss">
.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  h1 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--font-color);
  }
}
</style>