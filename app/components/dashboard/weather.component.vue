<template>
  <v-container fluid>
    <v-card elevation="4" class="ma-4">
      <v-card-title class="text-h5">
        <v-icon left>mdi-city</v-icon>
        Cities in Iran ({{ totalCities }} entries)
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="cities"
          :items-per-page="20"
          :search="search"
          class="elevation-1"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>All Cities Data</v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search cities..."
                single-line
                hide-details
                clearable
              />
            </v-toolbar>
          </template>

          <template #[`item.population`]="{ item }">
            {{ formatNumber(item.population) }}
          </template>
          <template #[`item.population_proper`]="{ item }">
            {{ formatNumber(item.population_proper) }}
          </template>
          <template #[`item.capital`]="{ item }">
            <v-chip
              :color="
                item.capital === 'primary'
                  ? 'red'
                  : item.capital === 'admin'
                    ? 'blue'
                    : item.capital === 'minor'
                      ? 'green'
                      : 'grey'
              "
              small
              dark
            >
              {{ item.capital || "—" }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface City {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
}

const cities = ref<City[]>([]);
const totalCities = ref(0);
const search = ref("");

const headers = [
  { title: "City", key: "city", align: "start" },
  { title: "Admin Name", key: "admin_name" },
  { title: "Capital Status", key: "capital" },
  { title: "Population (metro)", key: "population" },
  { title: "Population (proper)", key: "population_proper" },
  { title: "Latitude", key: "lat" },
  { title: "Longitude", key: "lng" },
];

onMounted(async () => {
  try {
    const data = await $fetch<City[]>("/api/cities");
    cities.value = data;
    totalCities.value = data.length;
  } catch (err) {
    console.error("Failed to load cities:", err);
  }
});

const formatNumber = (num: string) => {
  if (!num || num === "") return "—";
  return Number(num).toLocaleString();
};
</script>
