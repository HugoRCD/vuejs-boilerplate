<template>
  <div class="login middle">
    <div class="container">
      <div class="login-header center">
        <h1 class="title">{{ $t("login") }}</h1>
        <p class="text">{{ $t("loginText") }}</p>
      </div>
      <div class="google-login middle my-md">
        <GoogleLogin :callback="googleLogin" />
      </div>
      <form class="login-form" v-if="!loading" @submit.prevent="login">
        <div class="form-item">
          <label class="label" for="login">{{ $t("login") }}</label>
          <input
            class="input"
            type="text"
            id="login"
            placeholder="contact@gmail.com"
            v-model="user.login"
            required
          />
        </div>
        <div class="form-item">
          <label class="label" for="password">{{ $t("password") }}</label>
          <input
            class="input"
            type="password"
            id="password"
            placeholder="123soleil"
            v-model="user.password"
            required
          />
          <router-link
            :to="{ name: 'ForgotPassword' }"
            class="forgot-password"
            >{{ $t("forgotPassword") }}</router-link
          >
        </div>
        <div class="form-item my-lg">
          <button class="btn-primary fullwidth" type="submit">
            {{ $t("login") }}
          </button>
        </div>
        <div class="login-footer center">
          <p class="text">
            {{ $t("noAccount") }}
            <router-link :to="{ name: 'Register' }">
              {{ $t("signup") }}
            </router-link>
          </p>
        </div>
      </form>
      <Loader :isText="false" v-else />
    </div>
  </div>
</template>

<script>
import { GoogleLogin } from "vue3-google-login";
import Loader from "@/components/Loader.vue";
import { login } from "@/api/auth/login";
import { googleLogin } from "@/api/auth/google-login";

export default {
  name: "Login",
  components: { Loader, GoogleLogin },
  data() {
    return {
      user: {
        login: null,
        password: null,
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    login() {
      login(this.user);
    },
    async googleLogin(response) {
      await googleLogin(response);
    },
  },
};
</script>

<style scoped lang="scss"></style>
