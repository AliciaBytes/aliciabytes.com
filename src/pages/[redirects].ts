import type { APIContext } from "astro";
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  return [{ params: { redirects: "_redirects" } }]
}

export async function GET(context: APIContext) {

  const pages = [
    ...await getCollection("pages"),
    ...await getCollection("notes")
  ];

  return new Response(pages.
    filter(page => page.data.aliases?.length).
    flatMap(page => page.data.aliases?.
      map(alias => ({ source: `${alias}`, destination: `/${page.data.prefix}${page.slug}` }))).
    map(redirect => `${redirect?.source} ${redirect?.destination} 301`).
    join("\n"));
}
