export const collectionFilter = (entry) =>
  !entry.id.startsWith("_") && entry?.data?.published;
