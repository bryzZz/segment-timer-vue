/** @type {import('tailwindcss').Config} */
import { colors } from "./src/theme";

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: { colors },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const themesToInject = {
        ':root[data-theme="light"]': {
          "--t-p": "#181716",
          "--t-c": "#FFF",
          "--bg-p": "#f4f1f0",
          "--bg-s": "hsl(30, 4%, 9%, 5%)",
          "--b-p": "#181716",
          "--e": "#dc2626",
        },
        ':root[data-theme="dark"]': {
          "--t-p": "#e8e7e6",
          "--t-c": "#000",
          "--bg-p": "#100d0c",
          "--bg-s": "hsl(30, 4%, 91%, 5%)",
          "--b-p": "#e8e7e6",
          "--e": "#dc2626",
        },
      };

      addBase(themesToInject);
    }),
  ],
};
