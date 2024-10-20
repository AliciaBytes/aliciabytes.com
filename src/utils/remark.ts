import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { remarkKroki } from 'remark-kroki';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkHeaderId from 'remark-heading-id';

import sanitizeHtml from 'sanitize-html';

export default async function render_markdown(content: string) {
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
    .use(rehypeStringify)
    .process(content))

  return sanitizeHtml(result);
}
