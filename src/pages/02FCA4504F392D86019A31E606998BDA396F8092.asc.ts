export async function GET({ params, request }) {
  const response = await fetch("https://keys.openpgp.org/vks/v1/by-fingerprint/02FCA4504F392D86019A31E606998BDA396F8092");
  return new Response(await response.text());
}
