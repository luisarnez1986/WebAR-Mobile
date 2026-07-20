document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#video");
    const target = document.querySelector("#target");

    if (!video || !target) {
        console.error("No se encontró el video o el target.");
        return;
    }

    video.loop = false;
    video.muted = false;
    video.playsInline = true;
    video.preload = "auto";

    video.load();

    target.addEventListener("targetFound", async () => {

        console.log("TARGET ENCONTRADO");

        try {
            video.pause();
            video.currentTime = 0;

            await video.play();

            console.log("VIDEO REPRODUCIÉNDOSE");

        } catch (err) {

            console.error("ERROR AL REPRODUCIR:", err);

        }

    });

    target.addEventListener("targetLost", () => {

        console.log("TARGET PERDIDO");

        video.pause();
        video.currentTime = 0;

    });

});