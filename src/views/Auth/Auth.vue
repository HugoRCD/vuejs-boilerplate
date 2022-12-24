<template>
  <div class="auth">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
