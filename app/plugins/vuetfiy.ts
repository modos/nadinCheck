import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "dark",
      themes: {
        forest: {
          dark: false,
          colors: {
            background: "#F1F8E9",
            surface: "#FFFFFF",
            primary: "#4CAF50",
            secondary: "#8BC34A",
            accent: "#CDDC39",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
          },
        },

        ocean: {
          dark: false,
          colors: {
            background: "#E3F2FD",
            surface: "#FFFFFF",
            primary: "#2196F3",
            secondary: "#03DAC6",
            accent: "#00BCD4",
            error: "#F44336",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FF9800",
          },
        },

        sunset: {
          dark: false,
          colors: {
            background: "#FFF3E0",
            surface: "#FFFFFF",
            primary: "#FF5722", // Deep Orange
            secondary: "#FF9800", // Orange
            accent: "#FFC107", // Amber
            error: "#D32F2F",
            info: "#1976D2",
            success: "#388E3C",
            warning: "#F57C00",
          },
        },

        midnight: {
          dark: true,
          colors: {
            background: "#121212",
            surface: "#1E1E1E",
            primary: "#BB86FC", // Purple
            secondary: "#03DAC6", // Cyan
            accent: "#CF6679", // Pink (for errors in dark)
            error: "#CF6679",
            info: "#03DAC6",
            success: "#03DAC6",
            warning: "#FFB74D",
          },
        },

        retro: {
          dark: false,
          colors: {
            background: "#FFFDE7",
            surface: "#FFFFFF",
            primary: "#E91E63", // Pink
            secondary: "#9C27B0", // Purple
            accent: "#673AB7",
            error: "#F44336",
            info: "#00BCD4",
            success: "#8BC34A",
            warning: "#FF9800",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
