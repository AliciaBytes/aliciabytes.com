import { getCollection } from 'astro:content';

import render_markdown from '@src/utils/remark';
import sanitizeHtml from 'sanitize-html';

export async function GET(context: { site: string }) {
    let pages = await getCollection("page");

    pages.sort((a, b) => {
        const a_comparator = (a.data.lastUpdated || a.data.published).getTime();
        const b_comparator = (b.data.lastUpdated || b.data.published).getTime();

        return a_comparator - b_comparator;
    });

    const content = await Promise.all(pages.map(async (page) => ({
        link: `${context.site}${page.slug}`,
        slug: page.slug,
        title: page.data.title,
        description: page.data.excerpt,
        tags: page.data.tags,
        relatedPages: page.data.relatedPages,
        published: page.data.published,
        lastUpdated: page.data.lastUpdated,
        content: {
            unstyled: sanitizeHtml(await render_markdown(page.body, null)),
            frappe: await render_markdown(page.body, "frappe"),
            latte: await render_markdown(page?.body, "latte"),
            macchiato: await render_markdown(page?.body, "macchiato"),
            mocha: await render_markdown(page?.body, "mocha"),
        }
    })))

    return Response.json(JSON.stringify(content))
}
