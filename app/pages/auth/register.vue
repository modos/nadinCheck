<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 pa-sm-12" elevation="16" rounded="xl">
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              Create Account
            </h1>
            <p class="text-medium-emphasis">
              Join us today — it's quick and easy
            </p>
          </div>

          <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <v-text-field
              v-model="name"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              :rules="nameRules"
              variant="outlined"
              class="mb-4"
              clearable
              autofocus
            />

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              :rules="emailRules"
              variant="outlined"
              class="mb-4"
              clearable
            />

            <v-text-field
              v-model="username"
              label="Username"
              prepend-inner-icon="mdi-account-circle"
              :rules="usernameRules"
              variant="outlined"
              class="mb-4"
              clearable
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              variant="outlined"
              class="mb-4"
              clearable
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              prepend-inner-icon="mdi-lock-check"
              :rules="confirmPasswordRules"
              variant="outlined"
              class="mb-6"
              clearable
            />

            <v-alert
              v-if="message"
              :type="messageType"
              density="compact"
              variant="tonal"
              class="mb-6"
              closable
              @click:close="message = ''"
            >
              {{ message }}
            </v-alert>

            <v-btn
              type="submit"
              color="primary"
              size="x-large"
              block
              :disabled="!valid"
              :loading="loading"
              class="mb-4 text-capitalize"
            >
              Sign Up
            </v-btn>

            <div class="text-center">
              <NuxtLink
                to="/auth/login"
                class="text-primary text-decoration-none"
              >
                Already have an account? Sign in
              </NuxtLink>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const valid = ref(false);
const loading = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("error");

const name = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const nameRules = [(v: string) => !!v || "Full name is required"];

const emailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const usernameRules = [
  (v: string) => !!v || "Username is required",
  (v: string) => v.length >= 3 || "Username must be at least 3 characters",
];

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 8 || "Password must be at least 8 characters",
  (v: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) ||
    "Password must contain uppercase, lowercase, and number",
];

const confirmPasswordRules = [
  (v: string) => !!v || "Please confirm your password",
  (v: string) => v === password.value || "Passwords do not match",
];

const onSubmit = async () => {
  if (!valid.value) return;

  loading.value = true;
  message.value = "";

  try {
    const response = await $fetch("/api/register", {
      method: "POST",
      body: {
        name: name.value.trim(),
        email: email.value.trim().toLowerCase(),
        username: username.value.trim(),
        password: password.value,
      },
    });

    if (response.success) {
      message.value = "Account created successfully! Redirecting to login...";
      messageType.value = "success";

      setTimeout(() => {
        navigateTo("/auth/login");
      }, 2000);
    }
  } catch (error) {
    if (error.status === 400) {
      message.value = "Please fill in all required fields.";
    } else if (error.status === 409) {
      message.value =
        error.data?.statusMessage || "This username or email is already taken.";
    } else {
      message.value = "Registration failed. Please try again later.";
    }
    messageType.value = "error";
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
