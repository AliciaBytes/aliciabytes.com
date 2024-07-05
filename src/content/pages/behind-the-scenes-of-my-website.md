---
title: Behind the scenes of my website
excerpt: The goals and principles behind my website. What I want this place to be, what to expect, and what I use to build it.
slug: behind-the-scenes-of-my-website
published: 2023-08-13
lastUpdated: 2024-05-19
tags: []
---

First off, don't expect this to be a well thought out amazing piece of work. I'm not a frontend developer, UI or design person, I prefer to stay on the code side on the back end. My website is quirky and imperfect and missing features because of other more important projects. But it's my little space on the internet. And that's important. With the internet becoming more and more polluted with ads, walled in communities that lock up information, AI plagiarizing and stealing content, etc. I felt that I need my own place even more now.

## Goals and principles for my website

This is not a strict list as I don't want to get to formal with my website. Just a loose list of goals and principles I'd love to keep up with my website.

### A personal space

I want to have a personal space that's mine. Where I can just be authentically myself. The weird, quirky, queer, nerdy, etc. Person that I am. Where I can share whatever I want. A normal person with all my flaws and quirks. Not some kind of PR piece or highly polished image for social media behind a wall of filters.[^1]

### Small and efficient

The final website should be small, mostly static and efficient on the client. I'm not a fan of all the big webapps downloading a ton of JS, taking forever to load and all the extra failure points. We should also keep sustainability in mind. And although I could certainly still do better, I'm trying to make an effort and keep it all small and efficient.

### Keeping things simple

I don't want a complicated set-up. I want a simple writing set-up with Markdown (maybe some sprinkles of MDX). No CMS, just static files. And keep it all portable so that I can switch to different platforms whenever I want. Just the basics.

Although I probably will over-engineer it anyways, because it's a fun side project and those are the places where (unlike work) you can actually just fuck around and play around with how to implement things. So I'm sure I'll have a fun week every now and then implementing something way overengineered for this website.

### Open space

I want it to be the opposite of all the walled gardens popping up with the ever encroaching enshittification of the internet. I want it to be open and accessible for people. With a guarantee that I can keep it running this way and am not on a timer until whatever platform I'm using decides to lock stuff down.

On the other hand I'm explicitly closing it off from Bots and AI as I see them as parasites feasting on human content and destroying a lot of creative areas. Making the internet worse for everyone.

### Modern tooling

I want to use modern tools and technologies to keep my life simple. It should have a nice and modern development workflow and be fun to work with. I don't want to fight battles with legacy technologies. This also means that I might be playing around with new web technologies as they come out though. But I'm gonna try to keep it supported across all sensible browsers.

But as this is a side project that I'm purposely cutting some corners too and not always doing cross platform tests on all possible browsers I can't 100% guarantee it. If something breaks, please leave an issue over on https://github.com/AliciaBytes/aliciabytes.com.

There are some limits regarding support though, [as my girlfriend found out](#girlfriend-support-notice)!

### Digital Garden

I would also love it to transform into a [Digital Garden](https://maggieappleton.com/garden-history). A place I tend to and cultivate information and thoughts. Something that grows and gets nurtured. With all the pathways that will naturally emerge through the content.

But I'm not gonna focus on this as I feel like this might lead to my perfectionism keeping me from posting again.

### Accessible, Inclusive and Safe

I want my website to be accessible to as many people as possible. So I try my best to make the everything accessible to all kinds of ways we interact with the internet and not put up barriers. It's also explicitly a space to be queer and weird and inclusive in this regard (but not limited to that). It's meant as a comfy space for people to read.

## Tools and technologies I use to achieve those website goals

- [astro](https://astro.build/) as a web framework to assemble the code and content into static pages.
- [Catppuccin Theme](https://github.com/catppuccin/catppuccin) so I don't have to think about color schemes and making things pretty. It comes with 4 different nice looking flavors. I have done my own color scheme for my website before, but I'm not a fan of doing that work.
- [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) & [Shiki](https://github.com/shikijs/shiki) for nice looking static code highlighting that fits the rest of the website.
- The amazing [Kroki](https://kroki.io/) through [remark-kroki](https://github.com/nice-move/remark-kroki) for diagrams and visualizations.
- The amazing [Rainbow Caticorn](https://openclipart.org/detail/222469/rainbow-caticorn) is a public domain SVG from Openclipart that I use for favicon and other graphics content.
- [pagefind](https://pagefind.app/) for the search functionality.

You can find the source code for my website over at https://github.com/AliciaBytes/aliciabytes.com.

---

<span id="girlfriend-support-notice" style="color: var(--color-red);">**Important note**: This website only supports browsers that are in common use at the moment. A good guideline is the default settings for browsers by [browserslist](https://github.com/browserslist/browserslist). **It will not support old "retro" browsers like Firefox 2.0.0.14, no matter how often my stupidly cute girlfriend pesters me. Sorry, I love you a lot, but that's a pain!**</span>

> <span style="color: var(--color-sapphire);">At least I didn't ask for Internet Explorer 5 support.</span>
> <footer>- <cite>My lovely girlfriend 💗</cite></footer>

[^1]: I actually still struggle a lot with sharing stuff mostly unedited. I have to get better at writing, a lot of the time I'm just not feeling good about how things are worded yet and use tools to help out. So that's why it might not sound completely natural at times.
