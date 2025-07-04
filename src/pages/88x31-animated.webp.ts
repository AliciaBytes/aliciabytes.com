export async function GET({ params, request }) {
  const response = await fetch(
    "https://www-cdn.aliciabytes.com/file/aliciabytes-com/pages/88x31/88x31-animated.webp",
  );
  return new Response(await response.arrayBuffer(), {
    headers: { "Content-Type": "image/webp" },
  });
}
