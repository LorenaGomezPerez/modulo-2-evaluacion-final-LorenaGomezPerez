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
const drinksList = document.querySelector('.js-cocktailList');

let cocktailList = [];


function getApiCocktail(){
  const inputFinder = cocktailFinder.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFinder}`)
    .then(response => response.json())
    .then(data => {
      cocktailList = data.drinks;
    });
}

// función para que pinte la información obtenida

function paintCocktail() {
  let htmlDrink = '';
  for (const drink of cocktailList) {
    htmlDrink += `<li>`;
    htmlDrink += `<h2>${drink.strDrink}</h2>`;
    htmlDrink += `<img src="${drink.strDrinkThumb}" width="200"/>`;
    htmlDrink += `</li>`;
  }
  drinksList.innerHTML = htmlDrink;
}


//Función manejadora

function handleClickButton(event) {
  event.preventDefault();
  getApiCocktail();
  paintCocktail();
}

//evento

searchButton.addEventListener('click', handleClickButton);