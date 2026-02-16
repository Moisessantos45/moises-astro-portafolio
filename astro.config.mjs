import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["portafolio.mmabitec.me", "173.212.222.80", "www.portafolio.mmabitec.me"],
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
});
