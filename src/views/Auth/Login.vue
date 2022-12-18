<template>
  <div class="login middle">
    <div class="container">
      <div class="login-header center">
        <h1 class="title">{{ $t("login") }}</h1>
        <p class="text">{{ $t("loginText") }}</p>
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
import Loader from "@/components/Loader.vue";

export default {
  name: "Login",
  components: {Loader},
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
    }
  }
};
</script>

<style scoped lang="scss">
</style>