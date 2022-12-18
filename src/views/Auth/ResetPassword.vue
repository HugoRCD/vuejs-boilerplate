<template>
  <div class="verify middle">
    <div class="container">
      <div class="verify-header center my-lg">
        <h1 class="title">{{ $t("resetPassword") }}</h1>
        <p class="text">{{ $t("resetPasswordText") }}</p>
      </div>
      <form class="verify-form" v-if="!isLoading" @submit.prevent="resetPassword">
        <div class="form-item">
          <label class="label" for="password">{{ $t("password") }}</label>
          <input class="input mt-sm" type="password" id="password" placeholder="123soleil" v-model="password"/>
        </div>
        <div class="form-item">
          <label class="label" for="passwordConfirmation">{{ $t("passwordConfirmation") }}</label>
          <input class="input mt-sm" type="password" id="passwordConfirmation" placeholder="123soleil" v-model="passwordConfirmation"/>
        </div>
        <div class="form-item center">
          <button class="btn-primary fullwidth" type="submit">{{ $t("send") }}</button>
        </div>
      </form>
      <Loader :isText="false" v-else/>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "ResetPassword",
  components: {Loader},
  data() {
    return {
      password: "",
      passwordConfirmation: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    resetPassword() {
      this.$store.dispatch("loading", true);
      this.$http.post("/reset-password/" + this.$route.params.token, {
        password: this.password,
      })
        .then(() => {
          this.$store.dispatch("loading", false);
          this.$router.push({name: "Login"});
        })
        .catch(() => {
          this.$store.dispatch("loading", false);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>