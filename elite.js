function irInicio() {
    location.href = location.href;
}

async function cargarPersonajes(temporada) {
    document.getElementById("inicio").style.display= "none";
    const container = document.getElementById("personajesTemporada");
    container.innerHTML = "";

    try {
        const respuesta = await fetch("DATOS/personajes.json");
        const personajes = await respuesta.json();

        const filtrarPersonajes = personajes.filter(c => c.season.includes(parseInt(temporada)));

        filtrarPersonajes.forEach(personaje => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${personaje.image}" alt="${personaje.name}">
                <h3>${personaje.name}</h3>
                <p>Actor: ${personaje.actor}</p>
                <button onclick="abrirVideo('${personaje.video}')" ${!personaje.video ? "disabled" : ""}>
                    Ver Video
                </button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar los personajes:", error);
    }    
}

function abrirVideo(videoUrl) {
    if (!videoUrl) return;
        
        const video = document.getElementById("contenedorVideo");
        const botonCerrarVideo = document.getElementById("botonCerrarVideo");

        const embedUrl = videoUrl.replace("watch?v=", "embed/");
        video.innerHTML = `<iframe width="860" height="615" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
        
        video.appendChild(botonCerrarVideo);

        botonCerrarVideo.style.display ="block";
}

function cerrarVideo(){
    const video = document.getElementById("contenedorVideo");
    const botonCerrarVideo = document.getElementById("botonCerrarVideo");
    
    video.querySelector("iframe")?.remove();
    botonCerrarVideo.style.display = "none";
}

// Asigna eventos a los botones de temporada
document.querySelectorAll(".botonTemporada").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".botonTemporada").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const temporada = button.getAttribute("datos-temporada");
        cargarPersonajes(temporada);
    });
});