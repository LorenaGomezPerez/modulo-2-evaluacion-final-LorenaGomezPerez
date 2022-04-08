'use strict';

//1_enviamos petición al servidor, a una API(fetch)

//2_ then es la promesa que nos devuelve el servidor, y recibe entre los paréntesis un función (response)
 
//3_después esa respuesta la tenemos que transformar a formato json para que podamos acceder a cada uno de los datos (response.json)

//4_Una vez transformada la respuesta, ahora la recogemos 

fetch ('http://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita').then((response)=> response.json()
).then((info)=> {
    info = coctailData;
    paintHtml();
});




// //.Una función que me pinte en el src la ruta de la imagen elegida.
// // message porque es donde está la información que necesitamos

// //después ejecutamos esa función cuando then nos haya dado la respuesta, si la llamo antes no me va a pintar nada porque no le ha llegado la información

Function paintHtml(){
    const img = document.querySelector('.');
    img.src = info.message;
}



