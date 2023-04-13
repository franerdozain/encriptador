const txtIntroducido = document.querySelector('#inputMensaje');
const btnEncriptar = document.querySelector('#botonEncriptar');
const txtEncriptado = document.querySelector('#outputMensaje');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnCopiar = document.querySelector('.btn-copiar');
const onSound = document.querySelector('#onSonido');
const offSound = document.querySelector('#offSonido');
const music = new Audio("botón.mp3");
let permitirSound = true;
const whatsappLink = document.querySelector('#whatsapp');
const url = new URL(location.href);
const parametro = url.searchParams.get("mje");
const analizar = /^[a-z ]+$/gi;

if(parametro) {
    txtIntroducido.value = atob(parametro);
};

txtIntroducido.focus();

function verificar(texto){
    textoAnalizado = txtIntroducido.value;
    if (textoAnalizado.match(analizar)){
    }else{
        alert("Letters only, no special characters");
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
    textoAnalizado = txtIntroducido.value;
    if(textoAnalizado.match(analizar) && permitirSound){sonar()};
    let texto = txtIntroducido.value;
    let textoEncriptado = texto.replace(/e/gi, 'enter').replace(/i/gi, 'imes').replace(/a/gi, 'ai').replace(/o/gi,'ober').replace(/u/gi, 'ufat');
    txtEncriptado.value = textoEncriptado;
    txtIntroducido.value = "";
    let encodedTxt = btoa(txtEncriptado.value);
    whatsappLink.setAttribute("href", `whatsapp://send?text=This is your secret message: ${txtEncriptado.value}. Find out what it says here: https://desencriptador.netlify.app/?mje=${encodedTxt}`);
});

btnDesencriptar.addEventListener('click',function(event){
        event.preventDefault();
        if(permitirSound){sonar()};
        let txtDesencriptado;
        if(txtEncriptado.value) {
            txtDesencriptado = txtEncriptado.value
        }else{
            txtDesencriptado = txtIntroducido.value
        }
        let textoDesencriptado = txtDesencriptado.replace(/ai/g, 'a').replace(/enter/g, 'e').replace(/imes/g, 'i').replace(/ober/g,'o').replace(/ufat/g, 'u');
        txtIntroducido.value = textoDesencriptado;
        txtEncriptado.value = "";
});

btnCopiar.addEventListener('mousedown',function(event){
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

