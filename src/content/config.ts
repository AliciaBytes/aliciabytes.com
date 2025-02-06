import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const common_schema = z.object({
  title: z.string(),
  excerpt: z.string(),
  published: z.boolean().default(true),
  publishedDate: z.date(),
  lastUpdated: z.date().or(z.null()).optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  relatedContent: z
    .array(
      z.object({
        collection: z.string(),
        id: z.string(),
      })
    )
    .optional(),
  backlinks: z
    .array(
      z.object({
        collection: z.string(),
        id: z.string(),
      })
    )
    .optional(),
  aliases: z.array(z.string()).optional(),
});

const content = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/data/content",
  }),
  schema: common_schema,
});

export type CommonSchema = z.infer<typeof common_schema>;

export const collections = {
  content,
};
