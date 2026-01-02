<template>
  <v-card elevation="4" class="pa-6">
    <v-card-title class="text-h5">
      <v-icon left>mdi-format-list-checkbox</v-icon>
      My Tasks
    </v-card-title>
    <v-card-text>
      <p class="text-body-1">Your to-do list will appear here.</p>
      <v-list>
        <v-list-item>
          <v-list-item-title>Finish Nuxt dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Deploy app</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
