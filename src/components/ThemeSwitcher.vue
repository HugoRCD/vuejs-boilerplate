<template>
  <div class="theme-switcher" @click="changeTheme">
    <i v-if="theme === 'light'" class="fa-sharp fa-solid fa-moon fa-lg"></i>
    <i v-else class="fa-sharp fa-solid fa-sun fa-lg"></i>
  </div>
</template>

<script>
export default {
  name: "theme-switcher",
  data() {
    return {
      theme: "dark"
    };
  },
  created() {
    this.theme = localStorage.getItem("theme") || "dark";
  },
  methods: {
    changeTheme() {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        this.theme = "light";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        this.theme = "dark";
      }
    }
  },
};
</script>

<style scoped lang="scss">
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>