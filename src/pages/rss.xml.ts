import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

import mocha from '/utils/shiki-themes/mocha.json';

import sanitizeHtml from 'sanitize-html';

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
            content: sanitizeHtml(await render_post_content(page.body))
        })))
    })
}

async function render_post_content(content: string) {
    return String(
        await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypePrettyCode, {
                grid: false,
                theme: {
                    mocha: mocha,
                }
            })
            .use(rehypeStringify)
            .process(content)
    )
}
