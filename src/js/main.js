'use strict';

// constantes globales

const cocktailFinder = document.querySelector('.js-cocktailFinder');
const searchButton = document.querySelector('.js-searchButton');
const drinksList = document.querySelector('.js-cocktailList');
const favDrinksList = document.querySelector('.js-favCocktailsList');

// arrays vacíos

let cocktailList = [];
let userFavCocktails = [];

// petición a la API para que me devuelva los datos

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
    htmlDrink += `<h2 class="name-cocktail">${drink.strDrink}</h2>`;
    //condicional por si alguno de los cócteles que devuelve el API no tiene imagen
    if(drink.strDrinkThumb === ''){
      htmlDrink += `<img src="${brokenImage}"`;
    } else {
      htmlDrink += `<img class="image-cocktail" src= "${drink.strDrinkThumb}"/>`;
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
    htmlDrink += `<h2 class="name-cocktail">${drink.strDrink}</h2>`;
    htmlDrink += `<img class="image-cocktail" src="${drink.strDrinkThumb}"/>`;
    htmlDrink += `</li>`;
  }
  favDrinksList.innerHTML = htmlDrink;
}

//evento que escucha cuando la usuaria hace click en el botón de buscar

searchButton.addEventListener('click', handleClickButton);


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
