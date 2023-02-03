/* Variables para conseguir acceso al DOM, las siguientes variables se usaran para cambiarle los estilos a algunas etiquetas e iniciar la ejecucion del cierre del modal: */
// acceso para el boton de comenzar del modal de inicio.
let button = document.querySelector('.button');
// acceso para esconder el fondo del modal de inicio.
let background = document.querySelector('.background');
// acceso a la imagen del modal de inicio.
let popup = document.querySelector('.pop-up');
// acceso al body para posteriormente añadirle una clase y que adopte unos estilos. 
let body = document.querySelector('body');

/* audios que sonaran a partir de ciertas acciones que ocurren en el programa: */
let audiointro = document.querySelector('#audio-intro');
let correcta = document.querySelector('#correcta');
let incorrecta = document.querySelector('#incorrecta');
let pair1 = document.querySelector('#pair1');
let pair2 = document.querySelector('#pair2');
let pair3 = document.querySelector('#pair3');
let pair4 = document.querySelector('#pair4');
let pair5 = document.querySelector('#pair5');
let pair6 = document.querySelector('#pair6');
let pair7 = document.querySelector('#pair7');
let pair8 = document.querySelector('#pair8');

/* contador, usado para determinar cuando termino el juego, ademas de reiniciar su valor cuando se reinicia el juego: */
var ending = 0;

/* Espera de Evento para ocultar el modal de inicio, o modal intro: */
button.addEventListener('click',() => {
    // oculta estas etiquetas del DOM.
    button.classList.add('hidden');
    popup.classList.add('hidden');
    background.classList.add('hidden');
    // elimina la clase .body del cuerpo del html.
    body.classList.remove('body');
    // inicio del audio de intro post presionar el boton comenzar. 
    audiointro.play();
  })

/* funcion que guarda un array (arreglo) que almacena la imagen de las cartas: */
const backimages = () => {
    images = [
        '<img src="./img/parejas-001.png">',
        '<img src="./img/parejas-002.png">',
        '<img src="./img/parejas-003.png">',
        '<img src="./img/parejas-004.png">',
        '<img src="./img/parejas-005.png">',
        '<img src="./img/parejas-006.png">',
        '<img src="./img/parejas-007.png">',
        '<img src="./img/parejas-008.png">'
    ]
}

/* funcion para generar el juego, poner de forma aleatoria las cartas o reiniciar el juego si es necesaria: */
const gamegenerate = () => {
    // llamado a la funcion que almacena un arreglo con las imagenes.
    backimages();
    // acceso a la etique con la id game, para ingresar en el las cartas del juego.
    let game = document.querySelector('#game');
    // creacion un array vacio que posteriormente contendra todas las cartas en parejas.
    var cards = [];
    // bucle que ingresa las cartas en el array card.
    for (let i = 0; i < 16; i++) {
        // ingreso de la cartas.
        cards.push(`
        <div class="card-area" onclick="selectcard(${i})">
          <div class="card" id="card${i}">
            <div class="rear face" id="rear${i}">${images[0]}</div>
            <div class="top face"><img src="./img/tarjeta_cubierta.png" alt=""></div>
          </div>
        </div>`);
        // cada 2 cartas ingresadas se elimina la primera del arreglo images
        if (i % 2 == 1) {
            images.splice(0, 1);
        }

    }
    // mezcla las cartas a partir de un math random.
    cards.sort(() => Math.random() - 0.5);
    // ingresa todas las cartas en la etiqueta con id game.
    game.innerHTML = cards.join(" ");
}
// llamado a la funcion para generar el juego por primera vez.
gamegenerate();

// array with the selected cards
let selections = [];

// select card game
const selectcard = (i) => {
    let card = document.querySelector('#card'+i)
    if (card.style.transform != "rotateY(180deg)") {
        card.style.transform = "rotateY(180deg)";
        selections.push(i);
    }
    if (selections.length == 2) {
        deselectcard(selections);
        selections = [];
    }
}

// deselec card game
const deselectcard = (selections) => {
    setTimeout(() => {
        let rear0 = document.querySelector('#rear'+selections[0]);
        let rear1 = document.querySelector('#rear'+selections[1]);
        if (rear0.innerHTML != rear1.innerHTML) {
            let card0 = document.querySelector('#card'+selections[0]);
            let card1 = document.querySelector('#card'+selections[1]);
            card0.style.transform = "rotateY(0deg)";
            card1.style.transform = "rotateY(0deg)";
            incorrecta.play();
        } else {
            correcta.play();
            let comprobar = rear0.innerHTML;
            console.log(comprobar);
            if (comprobar == '<img src="./img/parejas-001.png">') {
                ending += 1;
                pair1.play();
                personNum(1);
            } else if (comprobar == '<img src="./img/parejas-002.png">') {
                ending += 1;
                pair2.play();
                personNum(2);
            } else if (comprobar == '<img src="./img/parejas-003.png">') {
                ending += 1;
                pair3.play();
                personNum(3);
            } else if (comprobar == '<img src="./img/parejas-004.png">') {
                ending += 1;
                pair4.play();
                personNum(4);
            } else if (comprobar == '<img src="./img/parejas-005.png">') {
                ending += 1;
                pair5.play();
                personNum(5);
            } else if (comprobar == '<img src="./img/parejas-006.png">') {
                ending += 1;
                pair6.play();
                personNum(6);
            } else if (comprobar == '<img src="./img/parejas-007.png">') {
                ending += 1;
                pair7.play();
                personNum(7);
            } else if (comprobar == '<img src="./img/parejas-008.png">') {
                ending += 1;
                pair8.play();
                personNum(8);
            }
        }
    }, 1000);
}



// modal final details

// Función para para el audio

function stopper() {
    correcta.pause();
    incorrecta.pause();
    pair1.pause();
    pair2.pause();
    pair3.pause();
    pair4.pause();
    pair5.pause();
    pair6.pause();
    pair7.pause();
    pair8.pause();
}

// Función para cerrar la ventana modal

function cerrarModal() {
    document.querySelector('.content-modal').classList.add('fade-in-up');
    setTimeout(() => {
        document.getElementById("contenedor").style.display = "none";
    }, 1000);
    if (ending == 8) {
        ending = 0;
        final.play();
        abrirModalFinal();
    }
}

// Función para abrir la ventana modal, siendo la variable texto el mensaje que irá a la derecha

function abrirModal(texto) {
    if (ending == 8) {
        document.getElementById('btn-cerrar').setAttribute('value', "Finalizar")
    }
    audiointro.pause();
    document.querySelector('.content-modal').classList.remove('fade-in-up');
    document.getElementById("modal_texto").textContent = texto;
    document.getElementById("contenedor").style.display = "flex";
}

// Función para revelar un personaje, siendo x el nombre entre comillas

function caida(x) {
    let personaje = document.getElementById(`${x}`)
    personaje.classList.add("showItem")
}

// Función para borrar un personaje, siendo x el nombre entre comillas

function erase(x) {
    let personaje = document.getElementById(`${x}`)
    personaje.style.display = "none";
}

// Función cuando se gana

function win() {
    document.getElementById("modal_titulo").textContent = "Armaste tu pesebre";
    document.getElementById("modal_texto").textContent = "Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad."

}

/* La función persona realiza una comparación mediante el parametro e identifica cual personaje es, una vez hallado abre una ventana modal con el mensaje propio de dicho personaje (parametro de abrirModal().), ejecuta la animacion de caida (caida().), hace que dicho elemento se oculte (erase(). ) y remueve la animación anterior para evitar errores fututros*/

function personNum(x) {
    switch (x) {
        case 1:
            abrirModal("La primera celebración navideña en la que se montó un pesebre para la conmemoración del nacimiento de Jesús, fue en la nochebuena del año 1223, realizada por San Francisco de Asís.");
            caida("maria");
            setTimeout(() => {
                erase("maria");
                document.getElementById("maria").classList.remove("showItem");
            }, 5000);
            break;
        case 2:
            abrirModal("En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias,  la figura del Niño Jesús se coloca después de la llegada de la Navidad.");
            caida("jose");
            setTimeout(() => {
                erase("jose");
                document.getElementById("jose").classList.remove("showItem");
            }, 5000);
            break;
        case 3:
            abrirModal("El villancico es un género de canción cuya letra hace referencia a la Navidad.")
            caida("jesus");
            setTimeout(() => {
                erase("jesus");
                document.getElementById("jesus").classList.remove("showItem");
            }, 5000);
            break;
        case 4:
            abrirModal("El villancico es un género de canción cuya letra hace referencia a la Navidad.");
            caida("melchor");
            setTimeout(() => {
                erase("melchor");
                document.getElementById("melchor").classList.remove("showItem");
            }, 5000);
            break;
        case 5:
            abrirModal("La palabra Tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.");
            caida("gaspar");
            setTimeout(() => {
                erase("gaspar");
                document.getElementById("gaspar").classList.remove("showItem");
            }, 5000);
            break;
        case 6:
            abrirModal("A la nanita nana es un villancico compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.");
            caida("baltazar");
            setTimeout(() => {
                erase("baltazar");
                document.getElementById("baltazar").classList.remove("showItem");
            }, 5000);
            break;
        case 7:
            abrirModal("A las novenas se les llama “Las Posadas” y  son fiestas populares en México, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.")
            caida("pastor");
            setTimeout(() => {
                erase("pastor");
                document.getElementById("pastor").classList.remove("showItem");
            }, 5000);
            break;
        case 8:
            abrirModal("En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.");
            caida("mula-buey");
            setTimeout(() => {
                erase("mula-buey");
                document.getElementById("mula-buey").classList.remove("showItem");
            }, 5000);
            break;   
        default:
            console.log("Error en el switch de person");
            break;
    }
}

// Función para ejecutar la ventana final

function abrirModalFinal() {
    document.getElementById("final-contenedor").style.display = "flex";
}

// Función para cerrar la ventana modal final

function cerrarModalFinal() {
    document.getElementById('container-final').classList.add('fade-in-up');
    setTimeout(() => {
        document.getElementById("final-contenedor").style.display = "none";
        document.getElementById('container-final').classList.remove('fade-in-up');
        silueta();
    }, 1000);
    document.getElementById('btn-cerrar').setAttribute('value', "Continuar");
}

// Función para agregarle la silueta a los personajes

function silueta() {
    document.getElementById("maria").style.display = "block";
    document.getElementById("jose").style.display = "block";
    document.getElementById("jesus").style.display = "block";
    document.getElementById("melchor").style.display = "block";
    document.getElementById("gaspar").style.display = "block";
    document.getElementById("baltazar").style.display = "block";
    document.getElementById("pastor").style.display = "block";
    document.getElementById("mula-buey").style.display = "block";
}

// Función para refrescar la pantalla y dirigirla al punto origen

function refrescar() {
    location.reload();
    location.reload();
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
