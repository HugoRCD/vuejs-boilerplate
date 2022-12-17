<template>
  <div class="login middle">
    <div class="container">
      <div class="login-header center">
        <h1 class="title">{{ $t("login") }}</h1>
        <p class="text">{{ $t("loginText") }}</p>
      </div>
      <div class="login-form" v-if="!loading">
        <div class="form-item">
          <label class="label" for="email">{{ $t("email") }}</label>
          <input class="input" type="email" id="email" placeholder="contact@gmail.com" v-model="user.email"/>
        </div>
        <div class="form-item">
          <label class="label" for="password">{{ $t("password") }}</label>
          <input class="input" type="password" id="password" placeholder="123soleil" v-model="user.password"/>
        </div>
        <div class="form-item my-lg">
          <button class="btn-primary fullwidth" @click.prevent="login()">{{ $t("login") }}</button>
        </div>
        <div class="login-footer">
          <p class="text">{{ $t("noAccount") }}
            <router-link :to="{name: 'Signup'}">{{ $t("signup") }}</router-link>
          </p>
        </div>
      </div>
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
        email: null,
        password: null
      },
      toast_success: {
        title: this.$t("loginSuccess"),
        icon: "success",
      },
      toast_error: {
        title: this.$t("loginError"),
        icon: "error",
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
</style>