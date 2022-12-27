<script setup>
import { setLocale, allLocales } from "../plugins/i18n";
</script>

<template>
  <select
    class="bg-transparent text-primary border-none focus:outline-none"
    v-model="$i18n.locale"
    :value="$i18n.locale"
    @change="setLocale($event.target.value)"
  >
    <option v-for="locale in allLocales" :key="locale" :value="locale">
      {{ locale.toUpperCase() }}
    </option>
  </select>
</template>

<style scoped lang="scss"></style>
