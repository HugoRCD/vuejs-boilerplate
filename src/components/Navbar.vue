<template>
  <Disclosure
    as="nav"
    class="bg-secondary fixed top-0 w-full z-10"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="../assets/media/logo.png"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="../assets/media/logo.png"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :to="{ name: item.name }"
                :key="item.name"
                class="text-base hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                :class="[
                  item.name === $route.name
                    ? 'bg-gray-900 text-inverted'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="absolute gap-4 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <ThemeSwitcher />
          <LanguageSelector />
          <ProfilTool v-if="isLogged" />
          <div v-else class="hidden tablet:block">
            <router-link
              :to="{ name: 'Login' }"
              class="text-base hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
            <router-link
              :to="{ name: 'Signup' }"
              class="text-inverted bg-accent hover:bg-accent-hover px-3 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
          v-for="item in navigation"
          :to="{ name: item.name }"
          :key="item.name"
          :class="[
            item.name === $route.name
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div
        class="py-5 border-t border-gray-700 items-center center"
        v-if="!isLogged"
      >
        <router-link
          :to="{ name: 'Login' }"
          class="text-base hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'Signup' }"
          class="text-inverted bg-accent hover:bg-accent-hover px-3 py-2 rounded-md text-sm font-medium"
        >
          Signup
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import ProfilTool from "@/components/ProfilTool.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
  name: "Navbar",
  components: {
    LanguageSelector,
    ProfilTool,
    ThemeSwitcher,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Bars3Icon,
    XMarkIcon,
  },
  data() {
    return {
      navigation: [{ name: "Home" }, { name: "About" }, { name: "Contact" }],
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped lang="scss"></style>
