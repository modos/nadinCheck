<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 pa-sm-12" elevation="16" rounded="xl">
          <!-- Logo / Title -->
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              Welcome Back
            </h1>
            <p class="text-medium-emphasis">
              Sign in to your account to continue
            </p>
          </div>

          <!-- Login Form -->
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <v-text-field
              v-model="username"
              label="Username"
              prepend-inner-icon="mdi-account"
              :rules="usernameRules"
              variant="outlined"
              autocomplete="username"
              class="mb-4"
              autofocus
              clearable
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              variant="outlined"
              autocomplete="current-password"
              class="mb-6"
              clearable
            />

            <!-- Server Error Alert -->
            <v-alert
              v-if="errorMessage"
              type="error"
              density="compact"
              variant="tonal"
              class="mb-6"
              closable
              @click:close="errorMessage = ''"
            >
              {{ errorMessage }}
            </v-alert>

            <!-- Submit Button -->
            <v-btn
              type="submit"
              color="primary"
              size="x-large"
              block
              :disabled="!valid"
              :loading="loading"
              class="mb-4 text-capitalize"
            >
              Sign In
            </v-btn>

            <!-- Optional: Extra links -->
            <div class="text-center">
              <router-link
                to="/auth/register"
                class="text-primary text-decoration-none"
              >
                Don't have an account? Sign up
              </router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const valid = ref(false);
const loading = ref(false);
const errorMessage = ref("");

const username = ref("");
const password = ref("");

const usernameRules = [
  (v: string) => !!v || "Username is required",
  (v: string) => v.length >= 3 || "Username must be at least 3 characters",
];

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 6 || "Password must be at least 6 characters",
];

// Login Submission
const onSubmit = async () => {
  if (!valid.value) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        username: username.value.trim(),
        password: password.value,
      },
    });

    if (response.success && response.token) {
      // Store JWT token
      localStorage.setItem("jwt", response.token);

      // Optional: You could also decode and store user info
      // const payload = JSON.parse(atob(response.token.split('.')[1]))
      // useUserStore().setUser({ id: payload.id, username: payload.username })

      // Redirect to home or dashboard
      await router.push("/");
      // or: await navigateTo('/dashboard')
    }
  } catch (error) {
    if (error.status === 400) {
      errorMessage.value = "Please provide both username and password";
    } else if (error.status === 401) {
      errorMessage.value = "Invalid username or password";
    } else {
      errorMessage.value = "Login failed. Please try again later.";
    }
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
