import type { CollectionEntry, DataEntryMap } from "astro:content";

export const collectionFilter = (
  entry: CollectionEntry<"monthly notes" | "notes" | "pages">
): boolean => !entry.id.startsWith("_") && entry?.data?.published;
