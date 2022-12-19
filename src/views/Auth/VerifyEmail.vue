<template>
  <div class="verify middle">
    <div class="container">
      <div class="verify-header center my-lg">
        <h1 class="title">{{ $t("verifyEmail") }}</h1>
        <p class="text">{{ $t("verifyEmailText") }}</p>
      </div>
      <form class="verify-form" v-if="!isLoading" @submit.prevent="verifyEmail">
        <div class="form-item">
          <label class="label" for="verify">{{ $t("verify") }}</label>
          <input
            class="input mt-sm"
            type="text"
            id="verify"
            placeholder="1262143172"
            v-model="code"
            required
          />
        </div>
        <div class="form-item center" type="submit">
          <button class="btn-primary fullwidth">{{ $t("verify") }}</button>
        </div>
      </form>
      <Loader :isText="false" v-else />
      <div class="verify-footer center">
        <p class="text">{{ $t("verifyEmailNotReceived") }}</p>
        <button class="btn-secondary mt-md" @click="sendNewVerification">
          {{ $t("resendCode") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "VerifyEmail",
  components: { Loader },
  data() {
    return {
      code: "",
    };
  },
  created() {
    this.code = this.$route.params.code;
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    verifyEmail() {
      this.$store.dispatch("loading", true);
      this.$http
        .post("/user/verify/" + this.code)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch("loading", false);
            this.$router.push({ name: "Profile" });
          } else {
            this.$store.dispatch("loading", false);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.dispatch("loading", false);
        });
      this.$store.dispatch("loading", false);
    },
    sendNewVerification() {
      this.$store.dispatch("loading", true);
      this.$http
        .post("/user/verify")
        .then((response) => {
          console.log(response);
          this.$store.dispatch("loading", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.dispatch("loading", false);
        });
      this.$store.dispatch("loading", false);
    },
  },
};
</script>

<style scoped lang="scss"></style>
