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
        <v-list-item @click="logout">
          <v-list-item-title class="text-error">Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const logout = () => {
  localStorage.removeItem("jwt");
  navigateTo("/login");
};
</script>
