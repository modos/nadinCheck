<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-6">
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold text-primary mb-2">
            Welcome back!
          </h1>
          <p class="text-h6 text-medium-emphasis">
            {{ currentDate }}
          </p>
        </div>

        <component :is="currentComponent" />
      </v-container>
    </v-main>

    <v-bottom-navigation
      v-model="activeTab"
      grow
      color="primary"
      class="elevation-12"
    >
      <v-btn value="todo" @click="activeTab = 'todo'">
        <v-icon>mdi-format-list-checkbox</v-icon>
        <span>To Do</span>
      </v-btn>

      <v-btn value="weather" @click="activeTab = 'weather'">
        <v-icon>mdi-weather-partly-cloudy</v-icon>
        <span>Weather</span>
      </v-btn>

      <v-btn value="settings" @click="activeTab = 'settings'">
        <v-icon>mdi-cog</v-icon>
        <span>Settings</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from "vue";
import TodoComponent from "~/components/dashboard/todo.component.vue";
import WeatherComponent from "~/components/dashboard/weather.component.vue";
import SettingsComponent from "~/components/dashboard/settings.component.vue";

const activeTab = ref("todo");

const components = {
  todo: markRaw(TodoComponent),
  weather: markRaw(WeatherComponent),
  settings: markRaw(SettingsComponent),
};

const currentComponent = computed(
  () => components[activeTab.value] || TodoComponent,
);

const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

definePageMeta({
  middleware: ["guest"],
});
</script>
