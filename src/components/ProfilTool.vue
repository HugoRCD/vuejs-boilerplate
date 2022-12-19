<template>
  <div class="profil-tool" @click="toggleProfil">
    <i class="fas fa-user-circle fa-xl"></i>
    <h1>{{ user.username }}</h1>
    <i v-if="menuOpen" class="fas fa-chevron-down fa-xs"></i>
    <i v-else class="fas fa-chevron-up fa-xs"></i>
  </div>

  <div class="profil-section" v-if="menuOpen" v-click-outside="hide">
    <div class="dropdown-profil">
      <div class="dropdown-profil-container">
        <router-link
          class="dropdown-profil-item"
          v-for="link in navLinks"
          :key="link.path"
          :to="{ name: link.name }"
          @click="hide"
        >
          {{ $t(link.name.toLowerCase()) }}
        </router-link>
        <div class="separator"></div>
        <TextSupport />
        <div class="separator"></div>
        <div class="dropdown-profil-item logout" @click="logout()">
          {{ $t("logout") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextSupport from "@/components/TextSupport.vue";

export default {
  name: "ProfilTool",
  components: { TextSupport },
  data() {
    return {
      menuOpen: false,
      navLinks: [
        {
          name: "Profile",
          path: "/profile",
        },
        {
          name: "Dashboard",
          path: "/dashboard",
        },
        {
          name: "Settings",
          path: "/settings",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    role() {
      if (this.user.role === 1) {
        return "admin";
      } else if (this.user.role === 0) {
        return "user";
      } else {
        return "user";
      }
    },
  },
  methods: {
    hide() {
      this.menuOpen = false;
    },
    toggleProfil() {
      this.menuOpen = !this.menuOpen;
    },
    async logout() {
      this.$store.dispatch("loading", true);
      this.$http
        .post("/auth/logout", {}, { withCredentials: true })
        .then(() => {
          this.$store.dispatch("loading", false);
          this.$store.dispatch("logout");
          this.$router.push({ name: "Login" });
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
.profil-tool {
  position: relative;
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.7rem;
  background-color: var(--bg-tertiary);
  color: var(--font-color);
  transition: all 0.3s ease-in-out;
  border-radius: 1.5rem;
  padding: 0.3rem;

  h1 {
    font-size: 1rem;
    margin: 0;
  }

  &:hover {
    background-color: var(--bg-primary);
  }
}

.profil-section {
  user-select: none;
  position: absolute;
  color: var(--font-color);
  background-color: var(--bg-secondary);
  font-size: var(--font-sm);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
  top: 110%;
  right: 8%;

  .dropdown-profil {
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;

    .dropdown-profil-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .dropdown-profil-item {
        width: 100%;
        display: flex;
        padding: 0.5rem;
        cursor: pointer;

        &:hover {
          background-color: var(--bg-primary);
        }
      }

      .dropdown-profil-item.logout {
        &:hover {
          background-color: #990c0c;
        }
      }

      .separator {
        width: 100%;
        height: 1px;
        background-color: var(--bg-tertiary);
        margin: 0.5rem 0;
      }
    }
  }
}
</style>
