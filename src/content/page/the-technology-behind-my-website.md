---
title: Behind the scenes of my website
excerpt: The goals behind my website and what I use to build it.
slug: behind-the-scenes-of-my-website
published: 2023-08-13
lastUpdated: 2024-02-06
tags: []
relatedPages: []
backlinks: []
---

First off, don't expect this to be a well thought out amazing piece of work. I'm not a web developer, UI or design person, I prefer to stay on the code side on the back end. My website is quirky and imperfect and missing features because of other more important projects. But it's my little space on the internet. And that's important. With the internet becoming more and more polluted with ads, walled in communities that lock up information, AI plagiarizing and stealing content, etc. I felt that I need my own place more now.

I had a few goals in mind when creating my website:

- The final website should be small, mostly static and efficient on the client.
- Keep the writing experience simple and easy through the use of mostly Markdown and some sprinkles of MDX. That should also allow easy portability to different technologies or cross posting to other platforms.
- Don't get locked into a walled garden and stick to open source solutions instead.
- Use modern tools and technologies to keep my life simple.

Some of the main tools and technologies I use to achieve this are:

- [astro](https://astro.build/) as a web framework to assemble the code and content into static pages.
- [Catppuccin Theme](https://github.com/catppuccin/catppuccin) so I don't have to think about color schemes and making things pretty. It comes with 4 different nice looking flavors. I have done my own color scheme for my website before, but I'm not a fan of doing that work.
- [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) & [Shiki](https://github.com/shikijs/shiki) for nice looking static code highlighting that fits the rest of the website.
- The amazing [Kroki](https://kroki.io/) through [remark-kroki](https://github.com/nice-move/remark-kroki) for diagrams and visualizations.
- The amazing [Rainbow Caticorn](https://openclipart.org/detail/222469/rainbow-caticorn) is a public domain SVG from Openclipart that I use for favicon and other graphics content.
- [pagefind](https://pagefind.app/) for the search functionality.

You can find the source code for my website over at https://github.com/AliciaBytes/aliciabytes.com.

---

<span style="color: var(--color-red);">**Important note**: This website only supports browsers that are in common use at the moment. A good guideline is the default settings for browsers by [browserslist](https://github.com/browserslist/browserslist). **It will not support old "retro" browsers like Firefox 2.0.0.14, no matter how often my stupidly cute girlfriend pesters me. Sorry, I love you a lot, but that's a pain!**</span>

> <span style="color: var(--color-sapphire);">At least I didn't ask for Internet Explorer 5 support.</span>
> <footer>- <cite>My lovely girlfriend 💗</cite></footer>
