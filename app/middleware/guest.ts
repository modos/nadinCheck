export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return;
  }

  const token = localStorage.getItem("jwt");
  if (token && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/");
  }
});
