import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getCollection, render } from "astro:content";
import { transform, walk } from "ultrahtml";
import { getContainerRenderer as mdxRenderer } from "@astrojs/mdx";
import { getContainerRenderer as solidRenderer } from "@astrojs/solid-js";
import { loadRenderers } from "astro:container";
import { collectionFilter } from "@src/utils/collections";

export async function GET(context: APIContext) {
  let baseUrl = context.site?.href || "https://www.aliciabytes.com";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  const pages = [
    ...(await getCollection("pages", collectionFilter)),
    ...(await getCollection("notes", collectionFilter)),
    ...(await getCollection("monthly notes", collectionFilter)),
  ];

  pages.sort((a, b) => {
    const a_comparator = (
      a?.data?.lastUpdated || a.data.publishedDate
    ).getTime();
    const b_comparator = (
      b?.data?.lastUpdated || b.data.publishedDate
    ).getTime();

    return b_comparator - a_comparator;
  });

  const renderers = await loadRenderers([mdxRenderer(), solidRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const feedItems: RSSFeedItem[] = [];

  for (const page of pages) {
    const { Content } = await render(page);
    feedItems.push({
      link: `/${page.data.prefix}${page.id}/`,
      title: page.data.title,
      pubDate: page.data.lastUpdated || page.data.publishedDate,
      description: page.data.excerpt,
      content: await make_urls_absolute(
        await container.renderToString(Content),
        baseUrl
      ),
    });
  }

  return rss({
    title: "AliciaBytes",
    description:
      "My journey through life. I write about working in tech, as well as my personal life.",
    site: baseUrl,
    stylesheet: "/rss/pretty-feed.xsl",
    items: feedItems,
  });
}

async function make_urls_absolute(rawContent: string, baseUrl: string) {
  const content = await transform(rawContent, [
    async (node) => {
      await walk(node, (node) => {
        if (node.name === "a" && node.attributes.href?.startsWith("/")) {
          node.attributes.href = baseUrl + node.attributes.href;
        }
        if (node.name === "img" && node.attributes.src?.startsWith("/")) {
          node.attributes.src = baseUrl + node.attributes.src;
        }
        if (node.name === "source" && node.attributes.srcset?.startsWith("/")) {
          node.attributes.srcset = baseUrl + node.attributes.srcset;
        }
      });
      return node;
    },
  ]);

  return content;
}
