export async function onRequestPost(context) {
  try {
    // Verificar que el bucket R2 esté conectado
    if (!context.env.BUCKET) {
      throw new Error("El bucket R2 BUCKET no está configurado");
    }

    // Leer los datos enviados desde el formulario
    const formData = await context.request.formData();

    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const imagen = formData.get("imagen");
    const video = formData.get("video");

    // Validar los datos
    if (!nombre) {
      throw new Error("Falta el nombre del proyecto");
    }

    if (!imagen || typeof imagen === "string") {
      throw new Error("Falta el archivo de imagen");
    }

    if (!video || typeof video === "string") {
      throw new Error("Falta el archivo de video");
    }

    // Crear un identificador único para el proyecto
    const projectId =
      Date.now().toString() +
      "-" +
      Math.random().toString(36).substring(2, 8);

    // Limpiar nombres de archivos
    const imageName = imagen.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const videoName = video.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Crear las rutas dentro del bucket R2
    const imageKey =
      "proyectos/" +
      projectId +
      "/imagen/" +
      imageName;

    const videoKey =
      "proyectos/" +
      projectId +
      "/video/" +
      videoName;

    // Guardar la imagen en R2
    await context.env.BUCKET.put(
      imageKey,
      await imagen.arrayBuffer(),
      {
        httpMetadata: {
          contentType: imagen.type || "application/octet-stream"
        }
      }
    );

    // Guardar el video en R2
    await context.env.BUCKET.put(
      videoKey,
      await video.arrayBuffer(),
      {
        httpMetadata: {
          contentType: video.type || "application/octet-stream"
        }
      }
    );

    // Crear archivo JSON con los datos del proyecto
    const projectData = {
      id: projectId,
      nombre: nombre,
      descripcion: descripcion || "",
      imagen: imageKey,
      video: videoKey,
      creado: new Date().toISOString()
    };

    await context.env.BUCKET.put(
      "proyectos/" + projectId + "/proyecto.json",
      JSON.stringify(projectData, null, 2),
      {
        httpMetadata: {
          contentType: "application/json"
        }
      }
    );

    // Respuesta correcta
    return new Response(
      JSON.stringify({
        ok: true,
        mensaje: "Proyecto creado y archivos guardados correctamente en R2",
        proyecto: projectData
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error("Error en upload:", error);

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