<template>
  <div class="signup middle">
    <div class="container">
      <div class="signup-header center">
        <h1 class="title">{{ $t("signup") }}</h1>
        <p class="text">{{ $t("signupText") }}</p>
      </div>
      <div class="signup-form" v-if="!loading">
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
        <div class="form-group">
          <div class="form-item">
            <label class="label" for="password">{{ $t("phone") }}</label>
            <input class="input" type="tel" id="phone" placeholder="(+33) 1 23 45 67 89"
                   v-model="createUserInput.phone"/>
          </div>
          <div class="form-item">
            <label class="label" for="password">{{ $t("birthdate") }}</label>
            <input class="input" type="date" id="birthdate" placeholder="01/01/2000"
                   v-model="createUserInput.birthdate"/>
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
        <div class="form-item my-lg" @click="signup">
          <button class="btn-primary fullwidth">{{ $t("signup") }}</button>
        </div>
        <div class="signup-footer center">
          <p class="text">{{ $t("alreadyHaveAccount") }}
            <router-link :to="{name: 'Login'}">{{ $t("login") }}</router-link>
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
        phone: "",
        birthdate: "",
      },
      toast_success: {
        title: this.$t("accountCreatedSuccess"),
        icon: "success",
      },
      toast_error: {
        title: this.$t("accountCreatedError"),
        icon: "error",
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>