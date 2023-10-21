import { z, defineCollection, reference } from 'astro:content';

const page = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        published: z.date(),
        lastUpdated: z.date().optional(),
        tags: z.array(z.string()),
        relatedPages: z.array(reference('page')),
        backlinks: z.array(reference('page')),
    })
});

export const collections = {
    page,
};
