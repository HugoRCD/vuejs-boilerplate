<template>
  <div class="profile container flex-column">
    <div class="profile-main-section flex-column">
      <div class="profile-header flex-column">
        <i class="fas fa-user-circle fa-5x"></i>
        <input
          class="custom-input title center"
          type="text"
          v-model="user.username"
        />
      </div>
      <div class="profile-tools flex-row pointer">
        <i class="fas fa-edit fa-md" @click="updateUser"></i>
        <i class="fas fa-sign-out-alt fa-md" @click="logout"></i>
        <i class="fas fa-trash-alt fa-md" @click="deleteUser"></i>
      </div>
    </div>
    <div class="profile-content" v-if="!isLoading">
      <div class="profile-content-item flex-row">
        <p>{{ $t("firstname") }}:</p>
        <input class="custom-input" type="text" v-model="user.firstname" />
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("lastname") }}:</p>
        <input class="custom-input" type="text" v-model="user.lastname" />
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("email") }}:</p>
        <input class="custom-input" type="text" v-model="user.email" />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { updateUser } from "@/api/user/updateUser";
import Loader from "@/components/Loader.vue";

export default {
  name: "Profile",
  components: { Loader },
  data() {
    return {
      user: {},
      password: "",
      editMode: false,
    };
  },
  created() {
    this.user = this.getCurrentUser();
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    async updateUser() {
      this.user = await updateUser(this.user.id, this.user);
    },
    async getCurrentUser() {
      this.$store.dispatch("loading", true);
      this.$http
        .get("/user")
        .then((response) => {
          this.user = response.data;
        })
        .then(() => {
          this.$store.dispatch("insertUser", this.user);
          this.$store.dispatch("loading", false);
          this.editMode = false;
        })
        .catch((error) => {
          this.$store.dispatch("loading", false);
          console.log(error);
        });
    },
    async logout() {
      this.$store.dispatch("loading", true);
      this.$http
        .post("/auth/logout", {}, { withCredentials: true })
        .then(() => {
          this.$store.dispatch("loading", false);
          this.$store.dispatch("logout");
          this.$router.push({ name: "AppLogin" });
        })
        .catch((error) => {
          this.$store.dispatch("loading", false);
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.profile {
  justify-content: center;
  gap: 3rem;
  color: var(--font-color);
}

.custom-input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
  padding: 0;
}
</style>
