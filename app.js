document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#video");
    const target = document.querySelector("#target");

    video.load();

    target.addEventListener("targetFound", () => {

        console.log("TARGET ENCONTRADO");

        video.currentTime = 0;

        const p = video.play();

        if (p !== undefined) {
            p.then(() => {
                console.log("VIDEO REPRODUCIÉNDOSE");
            }).catch(err => {
                console.error("ERROR VIDEO:", err);
            });
        }

    });

    target.addEventListener("targetLost", () => {

        console.log("TARGET PERDIDO");

        video.pause();

    });

});