<template>
  <div class="profile container flex-row">
    <div class="profile-main-section flex-column">
      <div class="profile-header flex-column">
        <i class="fas fa-user-circle fa-5x"></i>
        <input class="custom-input title center" type="text" v-model="user.username">
      </div>
      <div class="profile-tools flex-row pointer">
        <i class="fas fa-edit fa-md" @click="updateUser"></i>
        <i class="fas fa-sign-out-alt fa-md" @click="logout"></i>
        <i class="fas fa-trash-alt fa-md" @click="deleteUser"></i>
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-content-item flex-row">
        <p>{{ $t("firstname") }}:</p>
        <input class="custom-input" type="text" v-model="user.firstname">
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("lastname") }}:</p>
        <input class="custom-input" type="text" v-model="user.lastname">
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("email") }}:</p>
        <input class="custom-input" type="text" v-model="user.email">
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("phone") }}:</p>
        <input class="custom-input" type="text" v-model="user.phone">
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("birthdate") }}:</p>
        <input class="custom-input" type="date" v-model="user.birthdate">
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("role") }}:</p>
        <p>{{ $t(role) }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Profile",
  data() {
    return {
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        birthdate: "",
        role: null,
      },
      password: "",
      editMode: false,
    };
  },
  computed: {
    role() {
      if (this.user.role === 1) {
        return "admin";
      } else if (this.user.role === 0) {
        return "user";
      } else {
        return "user";
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.profile {
  justify-content: center;
  gap: 2rem;
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