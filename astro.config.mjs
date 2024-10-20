import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import compress from 'astro-compress';

import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import { remarkKroki } from 'remark-kroki';
import remarkHeaderId from 'remark-heading-id';
import astroMetaTags from "astro-meta-tags";

import expressiveCode from 'astro-expressive-code';

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
    expressiveCode(
      {
        themeCssSelector: (theme, context) => `[data-selected-theme="${theme.name}"]`,
        themes: [
          "catppuccin-frappe",
          "catppuccin-latte",
          "catppuccin-macchiato",
          "catppuccin-mocha"
        ],
        useStyleReset: false,
        useThemedSelectionColors: true,
        styleOverrides: {
          borderColor: ({ theme }) => theme.colors['titleBar.activeBackground'],
        }
      }
    ),
    mdx(),
    robotsTxt({
      policy: [
        {
          userAgent: 'Amazonbot',
          disallow: '/'
        },
        {
          userAgent: 'anthropic-ai',
          disallow: '/'
        },
        {
          userAgent: 'Applebot',
          disallow: '/'
        },
        {
          userAgent: 'Bytespider',
          disallow: '/'
        },
        {
          userAgent: 'CCBot',
          disallow: '/'
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/'
        },
        {
          userAgent: 'cohere-ai',
          disallow: '/'
        },
        {
          userAgent: 'FacebookBot',
          disallow: '/'
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/'
        },
        {
          userAgent: 'GPTBot',
          disallow: '/'
        },
        {
          userAgent: 'omgili',
          disallow: '/'
        },
        {
          userAgent: 'Omgilibot',
          disallow: '/'
        },
        {
          userAgent: 'PerplexityBot',
          disallow: '/'
        },
        {
          userAgent: 'YouBot',
          disallow: '/'
        },
        {
          userAgent: '*',
          allow: '/'
        }],
    }),
    sitemap(),
    pagefind(),
    astroMetaTags(),
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
