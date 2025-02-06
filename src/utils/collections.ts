import type { CollectionEntry, DataEntryMap } from "astro:content";

export const collectionFilter = (entry: CollectionEntry<"content">): boolean =>
  !entry.id.startsWith("_") && entry?.data?.published;
