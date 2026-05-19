import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE, LOCALES } from "./src/lib/i18n";

const sitemapLocales = Object.fromEntries(LOCALES.map((l) => [l, l]));

export default defineConfig({
  site: "https://ruoshin.wang",
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: sitemapLocales,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
