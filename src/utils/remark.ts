import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { remarkKroki } from 'remark-kroki';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkHeaderId from 'remark-heading-id';

import sanitizeHtml from 'sanitize-html';

import frappe from '/utils/shiki-themes/frappe.json';
import latte from '/utils/shiki-themes/latte.json';
import macchiato from '/utils/shiki-themes/macchiato.json';
import mocha from '/utils/shiki-themes/mocha.json';

function getOptions(theme?: null | "frappe" | "latte" | "macchiato" | "mocha") {
    let rehypePrettyCodeOptions: { grid: boolean, theme: any | null } = {
        grid: false,
        theme: null,
    }

    switch (theme) {
        case undefined:
            rehypePrettyCodeOptions.theme = {
                frappe,
                latte,
                macchiato,
                mocha,
            }
            break;
        case null:
            break;
        case "frappe":
            rehypePrettyCodeOptions.theme = {
                frappe,
            }
            break;
        case "latte":
            rehypePrettyCodeOptions.theme = {
                latte,
            }
            break;
        case "macchiato":
            rehypePrettyCodeOptions.theme = {
                macchiato,
            }
            break;
        case "mocha":
            rehypePrettyCodeOptions.theme = {
                mocha,
            }
            break;
    }

    return rehypePrettyCodeOptions
}

export default async function render_markdown(content: string, theme?: null | "frappe" | "latte" | "macchiato" | "mocha") {
    const rehypePrettyCodeOptions = getOptions(theme);
    const result = String(await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkHeaderId, {
            defaults: true
        })
        .use(remarkKroki, {
            server: "https://kroki.io/",
            output: "inline-svg",
        })
        .use(remarkRehype)
        .use(rehypePrettyCode, rehypePrettyCodeOptions)
        .use(rehypeStringify)
        .process(content))

    if (theme === null) {
        return sanitizeHtml(result);
    } else {
        return result;
    }
}
