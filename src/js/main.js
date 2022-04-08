'use strict';

//1_enviamos petición al servidor, a una API(fetch)

//2_ then es la promesa que nos devuelve el servidor, y recibe entre los paréntesis un función (response)
 
//3_después esa respuesta la tenemos que transformar a formato json para que podamos acceder a cada uno de los datos (response.json)

//4_Una vez transformada la respuesta, ahora la recogemos 

// fetch ('http://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita').then((response)=> response.json()
// ).then((info)=> {
//     info = coctailData;
//     paintHtml();
// });


//constante para luego poder pintarla



//1_obtener los datos de una API (fetch)
//2_Los metemos en una función
//3_ejecutamos la función

//4_guardamos la información en un array (así podemos utilizarla más tarde en diferentes momentos)

// constantes globales 

const cocktailFinder = document.querySelector('.js-cocktailFinder');
const searchButton = document.querySelector('.js-searchButton');
const cocktailList = document.querySelector('.js-cocktailList');

let cocktailList = [];


function getApiCocktail(){

  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
      cocktailList = data.drinks;
    });
}

getApiCocktail();

// función para que pinte la información obtenida

function paintCocktail(){
  let dataCocktail = '';
  for(const drink of cocktailList){
    drink += `<li>`;
    drink += `<h2>${drink.strDrink}</h2>`;
    drink += `<img ${strDrinkThumb}/>`;
    drink += `</li>`;

}
  cocktailList.innerHTML = dataCocktail;

}

paintCocktail();



    






// //.Una función que me pinte en el src la ruta de la imagen elegida.
// // message porque es donde está la información que necesitamos

// //después ejecutamos esa función cuando then nos haya dado la respuesta, si la llamo antes no me va a pintar nada porque no le ha llegado la información

// Function paintCoc(){
//     const img = document.querySelector('.');
//     img.src = info.message;
// }



