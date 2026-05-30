import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwindcss(), vue()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  server: {
    port: 3000,
    host: true,
    sourcemapIgnoreList: () => true,
  },

  css: {
    devSourcemap: false,
  },

  headers: {
    "/*": [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000",
      },
    ],
  },

  env: {
    schema: {
      API_URL: envField.string({ context: "client", access: "public" }),
      // SUPABASE_URL: envField.string({ context: "client", access: "public" }),
      // SUPABASE_ANON_KEY: envField.string({
      //   context: "client",
      //   access: "public",
      // }),
      URL_CV: envField.string({ context: "client", access: "public" }),
    },
  },

  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {},
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
