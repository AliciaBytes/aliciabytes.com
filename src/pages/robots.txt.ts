export async function GET() {
  const response = await fetch(
    "https://github.com/ai-robots-txt/ai.robots.txt/releases/latest/download/robots.txt"
  );
  const response_text = await response.text();

  const robots_txt = `${response_text}

User-agent: *
Disallow:
Sitemap: https://www.aliciabytes.com/sitemap-index.xml`;

  return new Response(robots_txt);
}
