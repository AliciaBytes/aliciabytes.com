import { z, defineCollection, reference } from 'astro:content';

/* Template for copying into new blogs:
---
title:
excerpt:
slug:
published:
tags: []
relatedPages: []
backlinks: []
aliases: []
---
*/
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    prefix: z.string().default(""),
    published: z.date(),
    lastUpdated: z.date().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    relatedPages: z.array(z.object({
      collection: z.string(),
      id: z.string(),
    })).optional(),
    backlinks: z.array(z.object({
      collection: z.string(),
      id: z.string(),
    })).optional(),
    aliases: z.array(z.string()).optional(),
  })
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    prefix: z.string().default("notes/"),
    published: z.date(),
    lastUpdated: z.date().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    relatedPages: z.array(z.object({
      collection: z.string(),
      id: z.string(),
    })).optional(),
    backlinks: z.array(z.object({
      collection: z.string(),
      id: z.string(),
    })).optional(),
    aliases: z.array(z.string()).optional(),
  })
});

export const collections = {
  pages,
  notes,
};
