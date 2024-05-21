export async function GET({ params, request }) {
  const response = await fetch("https://cloud.umami.is/script.js");
  return new Response(await response.text(), {
    status: 200,
    headers: {
      "Content-Type": "application/javascript"
    }
  });
}
