import { getCollection, getEntry } from 'astro:content';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

import sanitizeHtml from 'sanitize-html';

import frappe from '/utils/shiki-themes/frappe.json';
import latte from '/utils/shiki-themes/latte.json';
import macchiato from '/utils/shiki-themes/macchiato.json';
import mocha from '/utils/shiki-themes/mocha.json';

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
            unstyled: sanitizeHtml(await render_post_content(page.body, undefined)),
            frappe: await render_post_content(page.body, { frappe }),
            latte: await render_post_content(page?.body, { latte }),
            macchiato: await render_post_content(page?.body, { macchiato }),
            mocha: await render_post_content(page?.body, { mocha }),
        }
    }

    return Response.json(JSON.stringify(data))
}

async function render_post_content(content: string | undefined, theme: any) {

    return String(
        await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypePrettyCode, {
                grid: false,
                theme: theme
            })
            .use(rehypeStringify)
            .process(content)
    )
}
