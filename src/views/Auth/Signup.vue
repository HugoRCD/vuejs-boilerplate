<template>
  <div class="signup middle">
    <div class="container">
      <div class="signup-header center">
        <h1 class="title">{{ $t("signup") }}</h1>
        <p class="text">{{ $t("signupText") }}</p>
      </div>
      <form class="signup-form" v-if="!loading" @submit.prevent="signup">
        <div class="form-item">
          <label class="label" for="username">{{ $t("username") }}</label>
          <input class="input" type="text" id="username" placeholder="toto123" v-model="createUserInput.username"/>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label class="label" for="firstname">{{ $t("firstname") }}</label>
            <input class="input" type="text" id="firstname" placeholder="John" v-model="createUserInput.firstname"/>
          </div>
          <div class="form-item">
            <label class="label" for="lastname">{{ $t("lastname") }}</label>
            <input class="input" type="text" id="lastname" placeholder="Doe" v-model="createUserInput.lastname"/>
          </div>
        </div>
        <div class="form-item">
          <label class="label" for="email">{{ $t("email") }}</label>
          <input class="input" type="email" id="email" placeholder="contact@gmail.com" v-model="createUserInput.email"/>
        </div>
        <div class="form-item">
          <label class="label" for="password">{{ $t("password") }}</label>
          <input class="input" type="password" id="password" placeholder="123soleil"
                 v-model="createUserInput.password"/>
        </div>
        <div class="form-item my-lg">
          <button class="btn-primary fullwidth" type="submit">{{ $t("signup") }}</button>
        </div>
        <div class="signup-footer center">
          <p class="text">{{ $t("alreadyHaveAccount") }}
            <router-link :to="{name: 'Login'}">{{ $t("login") }}</router-link>
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
  name: "Signup",
  components: {Loader},
  data() {
    return {
      createUserInput: {
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    signup() {
      this.$store.dispatch("loading", true);
      this.$http.post("/auth/register", this.createUserInput)
        .then((response) => {
          console.log(response);
          this.$store.dispatch("loading", false);
          this.$router.push({name: "Login"});
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

<style scoped lang="scss">
</style>