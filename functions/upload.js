export async function onRequestPost(context) {
  return new Response(
    JSON.stringify({
      ok: true,
      mensaje: "API WebAR funcionando correctamente"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}