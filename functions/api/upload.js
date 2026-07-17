export async function onRequestPost(context) {
  try {
    const request = context.request;

    // Recibir los datos enviados desde el formulario
    const formData = await request.formData();

    const cliente = formData.get("cliente");
    const evento = formData.get("evento");
    const imagen = formData.get("imagen");
    const video = formData.get("video");

    // Verificar que todos los datos llegaron
    if (!cliente || !evento || !imagen || !video) {
      return new Response(
        JSON.stringify({
          ok: false,
          mensaje: "Faltan datos. Debes completar cliente, evento, imagen y video."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Respuesta temporal para confirmar que la API recibe
    // correctamente todos los datos del proyecto
    return new Response(
      JSON.stringify({
        ok: true,
        mensaje: "Proyecto recibido correctamente",
        proyecto: {
          cliente: cliente,
          evento: evento,
          imagen: imagen.name,
          video: video.name
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        mensaje: "Error al procesar el proyecto",
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}