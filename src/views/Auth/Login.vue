<template>
  <div class="login middle">
    <div class="container">
      <div class="login-header center">
        <h1 class="title">{{ $t("login") }}</h1>
        <p class="text">{{ $t("loginText") }}</p>
      </div>
      <div class="google-login my-md">
        <GoogleLogin :callback="googleLogin" prompt />
      </div>
      <form class="login-form" v-if="!loading" @submit.prevent="login">
        <div class="form-item">
          <label class="label" for="login">{{ $t("login") }}</label>
          <input class="input" type="text" id="login" placeholder="contact@gmail.com" v-model="user.login"/>
        </div>
        <div class="form-item">
          <label class="label" for="password">{{ $t("password") }}</label>
          <input class="input" type="password" id="password" placeholder="123soleil" v-model="user.password"/>
          <router-link :to="{name: 'ForgotPassword'}" class="forgot-password">{{ $t("forgotPassword") }}</router-link>
        </div>
        <div class="form-item my-lg">
          <button class="btn-primary fullwidth" type="submit">{{ $t("login") }}</button>
        </div>
        <div class="login-footer">
          <p class="text">{{ $t("noAccount") }}
            <router-link :to="{name: 'Signup'}">{{ $t("signup") }}</router-link>
          </p>
        </div>
      </form>
      <Loader :isText="false" v-else/>
    </div>
  </div>
</template>

<script>
import { GoogleLogin } from "vue3-google-login";
import Loader from "@/components/Loader.vue";

export default {
  name: "Login",
  components: {Loader, GoogleLogin},
  data() {
    return {
      user: {
        login: null,
        password: null
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("loading", true);
      this.$http.post("/auth/login", this.user, {withCredentials: true})
        .then((response) => {
          this.$http.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
          this.$store.dispatch("login", response.data);
          this.$store.dispatch("loading", false);
          this.$router.push({name: "Profile"});
        })
        .catch(() => {
          this.$store.dispatch("loading", false);
        });
    },
    async googleLogin(response) {
      const token = response.credential;
      this.$http.post("/auth/google", {token}, {withCredentials: true})
        .then((response) => {
          this.$http.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
          this.$store.dispatch("login", response.data);
          this.$router.push({name: "Profile"});
        })
        .catch(() => {
          this.$store.dispatch("loading", false);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.google-login {
  display: flex;
  justify-content: center;
  .btn-google {
    background-color: #4285f4;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    .fa-google {
      margin-right: 0.5rem;
    }
  }
}
</style>