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
const page = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        published: z.date(),
        lastUpdated: z.date().optional(),
        tags: z.array(z.string()),
        categories: z.array(z.string()).optional(),
        relatedPages: z.array(reference('page')),
        backlinks: z.array(reference('page')),
    })
});

export const collections = {
    page,
};
