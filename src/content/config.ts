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
    tags: z.array(z.string()),
    categories: z.array(z.string()).optional(),
    relatedPages: z.array(reference('pages')),
    backlinks: z.array(reference('pages')),
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
    tags: z.array(z.string()),
    categories: z.array(z.string()).optional(),
    relatedPages: z.array(reference('notes')),
    backlinks: z.array(reference('notes')),
  })
});

export const collections = {
  pages,
  notes,
};
