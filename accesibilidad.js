
let lectorActivo = false;

function mostrarSubtitulos(texto){

    const subtitulos = document.getElementById("subtitulos");

    subtitulos.innerText = texto;
    subtitulos.style.display = "block";

    clearTimeout(window.subtituloTimer);

    window.subtituloTimer = setTimeout(() => {
        subtitulos.style.display = "none";
    }, 4000);
}

function leer(texto){

    if(!lectorActivo) return;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 1;

    speechSynthesis.speak(voz);

    mostrarSubtitulos(texto);
}

function activarLector(){

    lectorActivo = !lectorActivo;

    if(lectorActivo){

        leer("Lector activado. Pase el mouse sobre los elementos.");

    }else{

        speechSynthesis.cancel();
        mostrarSubtitulos("Lector desactivado");
    }
}

function activarContraste(){

    document.body.classList.toggle("modo-contraste");

    mostrarSubtitulos("Modo contraste activado");
}

let tamañoTexto = 100;

function aumentarTexto(){

    tamañoTexto += 10;

    document.body.style.fontSize = tamañoTexto + "%";

    mostrarSubtitulos("Texto aumentado");
}

function activarComandosVoz(){

    if(!('webkitSpeechRecognition' in window)){

        alert("Tu navegador no soporta reconocimiento de voz");

        return;
    }

    const reconocimiento = new webkitSpeechRecognition();

    reconocimiento.lang = "es-ES";

    reconocimiento.start();

    mostrarSubtitulos("Escuchando comandos...");

    reconocimiento.onresult = function(event){

        const comando =
            event.results[0][0].transcript.toLowerCase();

        mostrarSubtitulos("Comando: " + comando);

        if(comando.includes("inicio")){

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

            leer("Yendo al inicio");
        }

        if(comando.includes("contacto")){

            const contacto = document.getElementById("contacto");

            if(contacto){

                contacto.scrollIntoView({
                    behavior:"smooth"
                });
            }

            leer("Abriendo contacto");
        }

        if(comando.includes("leer página")){

            leer(document.body.innerText);
        }
    };
}

window.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        "h1,h2,h3,p,a,button,input,textarea,label,img"
    );

    elementos.forEach(el => {

        el.setAttribute("tabindex","0");

        function obtenerTexto(){

            if(el.tagName === "IMG"){

                return el.alt || "Imagen";
            }

            if(el.tagName === "INPUT"){

                return el.placeholder || "Campo de texto";
            }

            return el.innerText || el.value || "";
        }

        el.addEventListener("mouseenter", () => {

            leer(obtenerTexto());
        });

        el.addEventListener("focus", () => {

            leer(obtenerTexto());
        });
    });
});
