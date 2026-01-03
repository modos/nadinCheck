<template>
  <v-card elevation="4" class="pa-6">
    <v-card-title class="text-h5">
      <v-icon left>mdi-cog</v-icon>
      Settings
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-title>Profile Settings</v-list-item-title>
          <v-list-item-subtitle
            >Update your name and avatar</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Notifications</v-list-item-title>
          <v-list-item-subtitle
            >Manage push and email alerts</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Theme</v-list-item-title>
          <v-list-item-subtitle
            >Select your preferred theme</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item>
          <v-btn-toggle
            v-model="currentTheme"
            mandatory
            divided
            color="primary"
            class="mx-4"
          >
            <v-btn
              v-for="themeName in themeNames"
              :key="themeName"
              :value="themeName"
            >
              {{ capitalize(themeName) }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title class="text-error">Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const themeNames = [
  "light",
  "dark",
  "forest",
  "ocean",
  "sunset",
  "midnight",
  "retro",
];

const currentTheme = ref(theme.global.name.value);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

watch(
  () => theme.global.name.value,
  (newVal: string) => {
    currentTheme.value = newVal;
  },
);

watch(currentTheme, (newTheme: string) => {
  theme.global.name.value = newTheme;
});

const logout = () => {
  localStorage.removeItem("jwt");
  navigateTo("/auth/login");
};
</script>
