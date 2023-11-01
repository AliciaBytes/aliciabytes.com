import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import render_markdown from '@src/utils/remark';

export async function GET(context: { site: string }) {
    let pages = await getCollection("page");

    pages.sort((a, b) => {
        const a_comparator = (a.data.lastUpdated || a.data.published).getTime();
        const b_comparator = (b.data.lastUpdated || b.data.published).getTime();

        return a_comparator - b_comparator;
    });

    return rss({
        title: "AliciaBytes",
        description: "My journey through life. I write about working in tech, as well as my personal life.",
        site: context.site,
        stylesheet: '/rss/pretty-feed-v3.xsl',
        items: await Promise.all(pages.map(async (page) => ({
            link: `/${page.slug}/`,
            title: page.data.title,
            pubDate: page.data.lastUpdated || page.data.published,
            description: page.data.excerpt,
            content: await render_markdown(page.body, "mocha"),
        })))
    })
}
