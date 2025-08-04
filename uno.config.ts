import { defineConfig, presetAttributify, presetWind3 } from "unocss";

export default defineConfig({
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  presets: [presetWind3(), presetAttributify()],
});
