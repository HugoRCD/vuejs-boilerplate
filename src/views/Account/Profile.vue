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
import getUserById from "@/graphql/queries/getUserById.gql";
import updateUser from "@/graphql/mutations/updateUser.gql";
import deleteUser from "@/graphql/mutations/deleteUser.gql";

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
    this.getUser();
  },
  methods: {
    updateUser() {
      this.$store.dispatch("loading", true);
      this.$swal.fire({
        title: this.$t("editTextConfirm"),
        html: `<input id="swal-input1" class="swal2-input" type="password" placeholder="${this.$t("password")}">`,
        icon: "warning",
        timer: false,
        position: "center",
        toast: false,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("yes"),
        cancelButtonText: this.$t("no"),
      }).then((result) => {
        if (result.value) {
          this.$apollo
            .mutate({
              mutation: updateUser,
              variables: {
                user: {
                  id: this.user.id,
                  username: this.user.username,
                  firstname: this.user.firstname,
                  lastname: this.user.lastname,
                  email: this.user.email,
                  phone: this.user.phone,
                  birthdate: this.user.birthdate,
                  password: document.getElementById("swal-input1").value,
                },
                id: this.$store.state.user.id,
              },
            })
            .then((res) => {
              this.$store.dispatch("loading", false);
              this.$swal.fire({
                title: this.$t("editSuccess"),
                icon: "success",
              });
            })
            .catch((err) => {
              this.$store.dispatch("loading", false);
              this.$swal.fire({
                title: this.$t("editError"),
                icon: "error",
              });
            });
        } else {
          this.$store.dispatch("loading", false);
        }
      });
    },
    getUser() {
      this.$apollo.query({
        query: getUserById,
        variables: {
          id: this.$store.state.user.id
        }
      }).then(({data}) => {
        const findUser = data.getUserById;
        this.user = {
          username: findUser.username,
          firstname: findUser.firstname,
          lastname: findUser.lastname,
          email: findUser.email,
          phone: findUser.phone,
          birthdate: findUser.birthdate,
          role: findUser.role
        };
      }).catch(error => {
        console.log(error);
      });
    },
    logout() {
      this.$swal({
        title: this.$t("logout"),
        text: this.$t("logoutMessage"),
        icon: "warning",
        position: "middle",
        toast: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("yes"),
        cancelButtonText: this.$t("no")
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch("logout");
          this.$router.push({name: "Login"});
          this.$swal({
            text: this.$t("logoutSuccess"),
            icon: "success",
          });
          this.menuOpen = false;
        }
      });
    },
    deleteUser() {
      this.$swal({
        title: this.$t("deleteAccount"),
        text: this.$t("deleteAccountText"),
        icon: "warning",
        position: "middle",
        toast: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("yes"),
        cancelButtonText: this.$t("no"),
        timer: false
      }).then(result => {
        if (result.value) {
          this.$apollo
            .mutate({
              mutation: deleteUser,
              variables: {
                id: this.user.id
              }
            })
            .then(({data}) => {
              this.$store.dispatch("logout");
              this.$router.push({name: "Home"});
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
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