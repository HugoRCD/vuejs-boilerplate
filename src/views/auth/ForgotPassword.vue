<template>
  <div class="verify middle">
    <div class="container">
      <div class="verify-header center my-lg">
        <h1 class="title">{{ $t("forgot") }}</h1>
        <p class="text">{{ $t("forgotText") }}</p>
      </div>
      <form
        class="verify-form"
        v-if="!isLoading"
        @submit.prevent="sendForgotPassword"
      >
        <div class="form-item">
          <label class="label" for="email">{{ $t("email") }}</label>
          <input
            class="input mt-sm"
            type="email"
            id="email"
            placeholder="demo@contact.com"
            v-model="email"
            required
          />
        </div>
        <div class="form-item center">
          <button class="btn-primary fullwidth" type="submit">
            {{ $t("send") }}
          </button>
        </div>
      </form>
      <Loader :isText="false" v-else />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "ForgotPassword",
  components: { Loader },
  data() {
    return {
      email: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    sendForgotPassword() {
      this.$store.dispatch("loading", true);
      this.$http
        .post("/reset-password", { email: this.email })
        .then(() => {
          this.$store.dispatch("loading", false);
        })
        .catch(() => {
          this.$store.dispatch("loading", false);
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
