import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  output: "static",
  adapter: vercel(),
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: "client", access: "public" }),
      SUPABASE_ANON_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      URL_CV: envField.string({ context: "client", access: "public" }),
    },
  },
});
