import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import rehypePrettyCode from 'rehype-pretty-code';
import frappe from '/utils/shiki-themes/frappe.json';
import latte from '/utils/shiki-themes/latte.json';
import macchiato from '/utils/shiki-themes/macchiato.json';
import mocha from '/utils/shiki-themes/mocha.json';

// https://astro.build/config
export default defineConfig({
  site: "https://aliciabytes.com",
  integrations: [
    mdx(),
    robotsTxt({
      host: "aliciabytes.com",
      policy: [{
        userAgent: 'GPTBot',
        disallow: '/'
      }, {
        userAgent: '*',
        allow: '/'
      }],
    }),
    sitemap({
      changefreq: 'weekly',
    })],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, {
      theme: {
        frappe: frappe,
        latte: latte,
        macchiato: macchiato,
        mocha: mocha
      }
    }]],
    syntaxHighlight: false
  },
  vite: {
    build: {
      assetsInlineLimit: -1
    },
    ssr: {
      noExternal: ['sanitize.css']
    }
  }
});
