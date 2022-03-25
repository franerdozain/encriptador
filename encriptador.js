/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minúsculas
No se permite acentuación de palabras   
*/

var txtIntroducido = document.querySelector('#inputMensaje');
var btnEncriptar = document.querySelector('#botonEncriptar');
var txtEncriptado = document.querySelector('#outputMensaje');
var btnDesencriptar = document.querySelector('.btn-desencriptar');
var btnCopiar = document.querySelector('.btn-copiar');
var onSound = document.querySelector('#onSonido');
var offSound = document.querySelector('#offSonido');
var music = new Audio("botón.mp3");
var permitirSound = true;
var whatsappLink = document.querySelector('#whatsapp');
var titular = document.querySelector('.titulo');
var url = new URL(location.href);
var parametro = url.searchParams.get("mje");

if(parametro) {
    txtIntroducido.value = atob(parametro);
};

txtIntroducido.focus();

function verificar(texto){
    var analizar = /^[a-z ]+$/g;
    textoAnalizado = txtIntroducido.value;
    if (textoAnalizado.match(analizar)){
    }else{
        alert("Utilice solamente letras minúsculas, sin tildes ni caracteres especiales");
        txtIntroducido.value ="";
        txtIntroducido.focus();
    }
}

function sonar(){ 
    music.currentTime = 0;
    music.play();
    music.loop = false;
}

function silenciar(){
    permitirSound = false;
}

btnEncriptar.addEventListener('click',function(event){
    event.preventDefault();
    verificar();
    var analizar = /^[a-z ]+$/g;
    textoAnalizado = txtIntroducido.value;
    if(textoAnalizado.match(analizar) && permitirSound){sonar()};
    var texto = txtIntroducido.value;
    var textoEncriptado = texto.replace(/e/g, 'enter').replace(/i/g, 'imes').replace(/a/g, 'ai').replace(/o/g,'ober').replace(/u/g, 'ufat');
    txtEncriptado.value = textoEncriptado;
    txtIntroducido.value = "";
    var encodedTxt = btoa(txtEncriptado.value);
    whatsappLink.setAttribute("href", `whatsapp://send?text=Este es tu mensaje secreto: ${txtEncriptado.value}. Descubrí acá qué dice: https://desencriptador.netlify.app/?mje=${encodedTxt}`);
});

btnDesencriptar.addEventListener('click',function(event){
        event.preventDefault();
        if(permitirSound){sonar()};
        var txtDesencriptado;
        if(txtEncriptado.value) {
            txtDesencriptado = txtEncriptado.value
        }else{
            txtDesencriptado = txtIntroducido.value
        }
        var textoDesencriptado = txtDesencriptado.replace(/ai/g, 'a').replace(/enter/g, 'e').replace(/imes/g, 'i').replace(/ober/g,'o').replace(/ufat/g, 'u');
        txtIntroducido.value = textoDesencriptado;
        txtEncriptado.value = "";
});

btnCopiar.addEventListener('click',function(event){
    event.preventDefault();
    if(permitirSound){sonar()};
    navigator.clipboard.writeText(txtEncriptado.value);
    txtEncriptado.value = "";
    txtIntroducido.focus();
});

offSound.addEventListener('click',function(event){
    event.preventDefault();
    permitirSound = true;
    offSound.style.visibility = "hidden";
    onSound.style.visibility = "visible";
});

onSound.addEventListener('click',function(event){
    event.preventDefault();
    silenciar();
    onSound.style.visibility = "hidden";
    offSound.style.visibility = "visible";
});

