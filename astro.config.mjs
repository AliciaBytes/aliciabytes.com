import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import rehypePrettyCode from 'rehype-pretty-code';

import frappe from '/utils/shiki-themes/frappe.json';
import latte from '/utils/shiki-themes/latte.json';
import macchiato from '/utils/shiki-themes/macchiato.json';
import mocha from '/utils/shiki-themes/mocha.json';

// https://astro.build/config
export default defineConfig({
  site: "https://aliciabytes.com",
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: {
          frappe: frappe,
          latte: latte,
          macchiato: macchiato,
          mocha: mocha,
        }
      }]
    ],
    syntaxHighlight: false,
  },
  vite: {
    build: {
      assetsInlineLimit: -1
    },
    ssr: {
      noExternal: [
        'sanitize.css'
      ]
    }
  }
});
