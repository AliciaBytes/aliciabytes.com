import { glob } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";

const common_schema = z.object({
  title: z.string(),
  excerpt: z.string(),
  published: z.boolean().default(true),
  publishedDate: z.date(),
  lastUpdated: z.date().or(z.null()).optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  relatedPages: z
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

const pages = defineCollection({
  loader: glob({
    pattern: ["*.md", "*.mdx"],
    base: "./src/content/pages",
  }),
  schema: common_schema.extend({
    prefix: z.string().default(""),
  }),
});

const notes = defineCollection({
  loader: glob({
    pattern: ["*.md", "*.mdx"],
    base: "./src/content/notes",
  }),
  schema: common_schema.extend({
    prefix: z.string().default("notes/"),
  }),
});

const monthly_notes = defineCollection({
  loader: glob({
    pattern: ["*.md", "*.mdx"],
    base: "./src/content/monthly notes",
  }),
  schema: common_schema.extend({
    prefix: z.string().default("monthly-notes/"),
  }),
});

export type CommonSchema = z.infer<typeof common_schema>;

export const collections = {
  pages,
  notes,
  "monthly notes": monthly_notes,
};
