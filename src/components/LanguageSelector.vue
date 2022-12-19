<template>
  <div class="language-selector" @click="changeLocale">
    <div v-if="$i18n.locale === 'en'"><span>EN</span></div>
    <div v-else><span>FR</span></div>
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      theme: "dark",
      toast: {
        toast: true,
        icon: "success",
        title: this.$t("languageChanged"),
        timer: 1500,
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
      },
    };
  },
  methods: {
    changeLocale() {
      if (this.$i18n.locale === "fr") {
        this.$i18n.locale = "en";
        this.$swal(this.toast);
      } else {
        this.$i18n.locale = "fr";
        this.$swal(this.toast);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.language-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  div {
    border-radius: 0.25rem;
    color: var(--font-color);
    font-weight: 600;
    font-size: 0.75rem;
  }
}
</style>
