import { defineConfig } from "@inkline/config";

export default defineConfig({
  theme: {
    default: {
      typography: {
        fontFamily: {
          primary: {
            base: "'Fira Sans Condensed', 'Roboto Condensed', monospace",
          },
        },
      },
      color: {
        primary: "#5441ff",
        secondary: "#f75600",
        success: "#48bb04",
        danger: "#e32934",
        info: "#171f71",
        light: "#dae1f1",
      },
      elements: {
        body: {
          background: "#dae1f1",
        },
        navbar: {
          light: {
            background: "white",
          },
        },
        button: {
          light: { background: "var(--color-primary)", color: "white" },
        },
      },
    },
  },
});
