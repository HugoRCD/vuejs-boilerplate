<template>
  <div class="navbar fullwidth">
    <Logo />
    <div class="nav-container">
      <div class="nav-link">
        <router-link
          v-for="link in nav"
          :key="link.link"
          :to="{ name: link.name }"
        >
          {{ $t(link.name.toLowerCase()) }}
        </router-link>
      </div>
      <div class="nav-button" v-if="!isLogged">
        <router-link :to="{ name: 'Login' }">
          <button class="btn-secondary">{{ $t("login") }}</button>
        </router-link>
        <router-link :to="{ name: 'Signup' }">
          <button class="btn-primary">{{ $t("signup") }}</button>
        </router-link>
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
      <div class="nav-button" v-else>
        <ProfilTool />
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
      <div v-if="!showMenu" class="burger-menu" @click="toggleMenu">
        <i class="fa-sharp fa-solid fa-bars fa-xl"></i>
      </div>
      <div v-else class="burger-menu" @click="toggleMenu">
        <i class="fa-sharp fa-solid fa-times fa-xl"></i>
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="showMenu"></div>
  <div class="dropdown-menu" v-if="showMenu" v-click-outside="hide">
    <div class="dropdown-link flex-column">
      <router-link
        v-for="link in nav"
        :key="link.path"
        :to="link.path"
        @click="hide"
      >
        {{ $t(link.name.toLowerCase()) }}
      </router-link>
    </div>
    <div class="dropdown-button flex-row justify-center mb-lg" v-if="!isLogged">
      <router-link :to="{ name: 'Login' }">
        <button class="btn-secondary" @click="hide">{{ $t("login") }}</button>
      </router-link>
      <router-link :to="{ name: 'Signup' }">
        <button class="btn-primary" @click="hide">{{ $t("signup") }}</button>
      </router-link>
    </div>
    <div class="dropdown-button flex-row justify-center mb-lg" v-else>
      <i class="fas fa-user-circle fa-xl"></i>
    </div>
    <div class="dropdown-button flex-row justify-center mb-lg">
      <ThemeSwitcher />
      <LanguageSelector />
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSelector from "@/components/LanguageSelector.vue";
import ProfilTool from "@/components/ProfilTool";
import Logo from "@/components/Logo.vue";

export default {
  name: "Navbar",
  components: {
    Logo,
    ThemeSwitcher,
    LanguageSelector,
    ProfilTool,
  },
  data() {
    return {
      showMenu: false,
      nav: [],
      navLinks: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "About",
          path: "/about",
        },
        {
          name: "Contact",
          path: "/contact",
        },
      ],
      navLinksLogged: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "About",
          path: "/about",
        },
        {
          name: "Contact",
          path: "/contact",
        },
        {
          name: "Dashboard",
          path: "/dashboard",
        },
      ],
    };
  },
  created() {
    this.nav = this.navLinks;
  },
  computed: {
    isLogged() {
      if (this.$store.getters.isLoggedIn) this.nav = this.navLinksLogged;
      else this.nav = this.navLinks;
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hide() {
      this.showMenu = false;
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--bg-secondary);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .nav-container {
    display: flex;
    align-items: center;

    .nav-link {
      display: flex;
      align-items: center;
      margin-right: 2rem;

      a {
        font-size: 1rem;
        font-weight: 500;
        color: var(--font-color);
        margin-right: 1rem;

        &:hover {
          color: var(--font-color-secondary);
        }
      }
    }

    .nav-button {
      display: flex;
      align-items: center;
      gap: 1rem;

      i {
        cursor: pointer;
      }
    }

    .burger-menu {
      display: none;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    .nav-container {
      .nav-link {
        display: none;
      }

      .nav-button {
        display: none;
      }

      .burger-menu {
        display: flex;
        align-items: center;
      }
    }
  }
}

.dropdown-menu {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  background-color: var(--bg-secondary);
  z-index: 1000;

  .dropdown-link {
    padding: 1rem 0;

    a {
      font-size: 1rem;
      font-weight: 500;
      color: var(--font-color);
      margin-bottom: 1rem;

      &:hover {
        color: var(--font-color-secondary);
      }
    }
  }
}
</style>
