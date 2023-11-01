import { getCollection, getEntry } from 'astro:content';

import render_markdown from '@src/utils/remark';

export async function getStaticPaths() {
    const page = await getCollection("page");
    return page.map((entry: any) => ({
        params: { page: entry.slug },
    }));
}

export async function GET(context: { params: any, site: string }) {
    let page = await getEntry("page", context.params.page);

    if (page == undefined) {
        return new Response(
            null,
            {
                status: 404,
                statusText: "Not found"
            }
        )
    }

    const data = {
        link: `${context.site}${page.slug}`,
        slug: page.slug,
        title: page.data.title,
        description: page.data.excerpt,
        tags: page.data.tags,
        relatedPages: page.data.relatedPages,
        published: page.data.published,
        lastUpdated: page.data.lastUpdated,
        content: {
            unstyled: await render_markdown(page.body, null),
            frappe: await render_markdown(page.body, "frappe"),
            latte: await render_markdown(page?.body, "latte"),
            macchiato: await render_markdown(page?.body, "macchiato"),
            mocha: await render_markdown(page?.body, "mocha"),
        }
    }

    return Response.json(JSON.stringify(data))
}
