<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";
import { onMounted, watch } from "vue";

const theme = useTheme();

const validThemes = [
  "light",
  "dark",
  "forest",
  "ocean",
  "sunset",
  "midnight",
  "retro",
];

onMounted(() => {
  const savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme && validThemes.includes(savedTheme)) {
    theme.global.name.value = savedTheme;
  } else {
    theme.global.name.value = "light";
    localStorage.setItem("selectedTheme", "light");
  }
});

watch(
  () => theme.global.name.value,
  (newTheme) => {
    localStorage.setItem("selectedTheme", newTheme);
  },
);
</script>
