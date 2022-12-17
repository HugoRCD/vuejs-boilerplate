<template>
  <div class="error404">
    <div class="error404__content">
      <h1>404</h1>
      <h2>{{ $t("error404") }}</h2>
      <router-link to="/">{{ $t("home") }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "error404"
};
</script>

<style scoped lang="scss">
.error404 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .error404__content {
    text-align: center;
    h1 {
      font-size: 10rem;
      font-weight: 700;
      margin-bottom: 0;
    }
    h2 {
      font-size: 2rem;
      font-weight: 400;
      margin-top: 0;
    }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 1rem 2rem;
      border-radius: 5px;
      background-color: var(--accent);
      color: var(--btn-color);
      &:hover {
        background-color: var(--accent-hover);
      }
    }
  }
}
</style>