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

const common_schema = z.object({
    title: z.string(),
    excerpt: z.string(),
    published: z.date(),
  lastUpdated: z.date().or(z.null()).optional(),
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

const pages = defineCollection({
  schema: common_schema.extend({
    prefix: z.string().default(''),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: common_schema.extend({
    prefix: z.string().default('notes/'),
  }),
});

const monthly_notes = defineCollection({
  schema: common_schema.extend({
    prefix: z.string().default('monthly notes/'),
  }),
})

export const collections = {
  pages,
  notes,
  "monthly notes": monthly_notes,
};
