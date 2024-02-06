import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import compress from 'astro-compress';

import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import { remarkKroki } from 'remark-kroki';
import remarkHeaderId from 'remark-heading-id';
import astroMetaTags from "astro-meta-tags";

import rehypePrettyCode from 'rehype-pretty-code';
import frappe from '/utils/shiki-themes/frappe.json';
import latte from '/utils/shiki-themes/latte.json';
import macchiato from '/utils/shiki-themes/macchiato.json';
import mocha from '/utils/shiki-themes/mocha.json';

// https://astro.build/config
export default defineConfig({
  site: "https://www.aliciabytes.com",
  image: {
    remotePatterns: [
      {
        protocol: 'https'
      }]
  },
  integrations: [
    compress({
      CSS: false,
      HTML: {
        "collapseWhitespace": true,
        "collapseInlineTagWhitespace": true,
        "preserveLineBreaks": true,
        "conservativeCollapse": true,
        "decodeEntities": true,
        "minifyCSS": true,
        "minifyJS": true,
        "removeComments": true,
        "removeScriptTypeAttributes": true,
        "removeStyleLinkTypeAttributes": true,
        "sortAttributes": true,
        "sortClassName": true,
        "useShortDoctype": true
      },
      Image: false,
      JavaScript: false,
      SVG: false,
    }),
    mdx(),
    robotsTxt({
      host: "www.aliciabytes.com",
      policy: [
        {
          userAgent: 'CCBot',
          disallow: '/'
        },
        {
          userAgent: 'GPTBot',
          disallow: '/'
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/'
        },
        {
          userAgent: 'FacebookBot',
          disallow: '/'
        },
        {
          userAgent: 'Omgilibot',
          disallow: '/'
        },
        {
          userAgent: '*',
          allow: '/'
        }],
    }),
    sitemap({
      changefreq: 'weekly',
    }),
    pagefind(),
    astroMetaTags()
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkHeaderId,
        {
          defaults: true
        }
      ],
      [
        remarkKroki, {
          server: "https://kroki.io/",
          output: "inline-svg",
        }
      ],
    ],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            frappe: frappe,
            latte: latte,
            macchiato: macchiato,
            mocha: mocha
          }
        }
      ],
    ],
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
