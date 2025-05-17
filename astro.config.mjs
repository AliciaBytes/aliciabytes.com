import { defineConfig } from 'astro/config';
import { remarkKroki } from 'remark-kroki';
import astroMetaTags from "astro-meta-tags";
import compress from 'astro-compress';
import expressiveCode from 'astro-expressive-code';
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import remarkHeaderId from 'remark-heading-id';
import sitemap from "@astrojs/sitemap";
import solidJs from '@astrojs/solid-js';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

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
    solidJs(),
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
      assetsInlineLimit: 0,
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        errorRecovery: true,
        targets: browserslistToTargets(browserslist('defaults'))
      }
    },
    logLevel: 'error',
    ssr: {
      noExternal: ['sanitize.css']
    },
  }
});
