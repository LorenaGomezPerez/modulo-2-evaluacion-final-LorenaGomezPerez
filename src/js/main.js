'use strict';

//1_enviamos petición al servidor, a una API(fetch)

//2_ then es la promesa que nos devuelve el servidor, y recibe entre los paréntesis un función (response)

//3_después esa respuesta la tenemos que transformar a formato json para que podamos acceder a cada uno de los datos (response.json)

//4_Una vez transformada la respuesta, ahora la recogemos

//constante para luego poder pintarla

//1_obtener los datos de una API (fetch)
//2_Los metemos en una función
//3_ejecutamos la función

//4_guardamos la información en un array (así podemos utilizarla más tarde en diferentes momentos)

// constantes globales

const cocktailFinder = document.querySelector('.js-cocktailFinder');
const searchButton = document.querySelector('.js-searchButton');
const drinksList = document.querySelector('.js-cocktailList');
const favDrinksList = document.querySelector('.js-favCocktailsList');

let cocktailList = [];
let userFavCocktails = [];

function getApiCocktail(){
  const inputFinder = cocktailFinder.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFinder}`)
    .then(response => response.json())
    .then(data => {
      cocktailList = data.drinks;
      paintCocktail();
    });
}

//función cócteles favoritos

function favCocktails(){

  //listener cuando la usuaria de click al cocktail elegido
  const liDrink = document.querySelectorAll('.js-liDrink');
  for (const cocktail of liDrink){
    cocktail.addEventListener('click', handleClickSelectedDrink);
  }
}

// función para que pinte la información obtenida

function paintCocktail() {
  let htmlDrink = '';
  for (const drink of cocktailList) {

    const brokenImage = `https://via.placeholder.com/210x295/ffffff/666666/?text=image`;

    htmlDrink += `<li class="cocktail-list js-liDrink" id=${drink.idDrink}>`;
    htmlDrink += `<h2>${drink.strDrink}</h2>`;
    //condicional por si alguno de los cócteles que devuelve el API no tiene imagen
    if(drink.strDrinkThumb === ''){
      htmlDrink += `<img src="${brokenImage}"`;
    } else {
      htmlDrink += `<img src="${drink.strDrinkThumb}" width="200"/>`;
    }
    htmlDrink += `</li>`;
  }
  drinksList.innerHTML = htmlDrink;
  favCocktails();
}

//Función manejadora

function handleClickButton(event) {
  event.preventDefault();
  getApiCocktail();
}

//evento

searchButton.addEventListener('click', handleClickButton);


//listado de favoritos

//array con el listado de favoritos elegidos



// función manejadora click en la bebida seleccionada


function handleClickSelectedDrink(event){
  const idCocktail = event.currentTarget.id; //id que identifica a cada cóctel

  //buscar con find si la bebida seleccionada está en el listado completo

  const drinkFound = cocktailList.find(select=>{
    return select.idDrink === idCocktail;
  });

  //busca la posición en el listado de favoritos

  const drinkIndex = userFavCocktails.findIndex(select=>{
    return select.idDrink === idCocktail;
  });

  // si no lo encuentra,me lo añade

  if(drinkIndex === -1){
    userFavCocktails.push(drinkFound);
  }
  paintCocktail();
  paintFavDrinks();
  drinkInLocalStorage();
}

//funcion para que pinte en la lista de favoritos


function paintFavDrinks() {
  let htmlDrink = '';
  for (const drink of userFavCocktails) {

    //cambio las clases de los cocktail si son favoritos

    let classDrink = '';
    const drinkIndex = userFavCocktails.findIndex(select=>{
      return select.idDrink === drink.idDrink;
    });

    if(drinkIndex !== -1){
      classDrink = 'class-drink';
    } else{
      classDrink = '';
    }
    htmlDrink += `<li class="cocktail-list js-liDrink ${classDrink}" id=${drink.idDrink}>`;
    htmlDrink += `<h2>${drink.strDrink}</h2>`;
    htmlDrink += `<img src="${drink.strDrinkThumb}" width="200"/>`;
    htmlDrink += `</li>`;
  }
  favDrinksList.innerHTML = htmlDrink;
}

// almacenar el listado de favoritos en el LocalStorage

function drinkFromLocalStorage() {
  const localStorageDrink = localStorage.getItem('fav');
  if(localStorageDrink !== null){
    const arrayFav = JSON.parse(localStorageDrink);
    userFavCocktails = arrayFav;
    paintFavDrinks();
  }
}


function drinkInLocalStorage() {
  const stringifyFav = JSON.stringify(userFavCocktails);
  localStorage.setItem('fav', stringifyFav);
}

drinkFromLocalStorage();