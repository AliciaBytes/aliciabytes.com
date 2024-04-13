export async function GET({ params, request }) {
  const response = await fetch("https://www-cdn.aliciabytes.com/file/aliciabytes-com/rss/pretty-feed.xsl");
  return new Response(await response.text(), {
    status: 200,
    headers: {
      "Content-Type": "text/xml"
    }
  });
}
