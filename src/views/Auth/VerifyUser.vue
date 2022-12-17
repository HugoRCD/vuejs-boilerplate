<template>
  <div class="verify middle">
    <div class="container">
      <div class="verify-header center my-lg">
        <h1 class="title">{{ $t("verifyEmail") }}</h1>
        <p class="text">{{ $t("verifyEmailText") }}</p>
      </div>
      <div class="verify-form" v-if="!isLoading">
        <div class="form-item">
          <label class="label" for="verify">{{ $t("verify") }}</label>
          <input class="input mt-sm" type="text" id="verify" placeholder="1262143172" v-model="code"/>
        </div>
        <div class="form-item center" @click="verify">
          <button class="btn-primary fullwidth">{{ $t("verify") }}</button>
        </div>
        <div class="verify-footer center">
          <p class="text">{{ $t("verifyEmailNotReceived") }}</p>
          <button class="btn-secondary mt-md" @click="getVerificationCode">{{ $t("resendCode") }}</button>
        </div>
      </div>
      <Loader :isText="false" v-else/>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "VerifyUser",
  components: {Loader},
  data() {
    return {
      code: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>