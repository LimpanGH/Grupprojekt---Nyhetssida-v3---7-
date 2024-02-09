// Linus ⬇ --------------------------------------------
// Importing variables and functions from filterByCategory.js
import {
  apiKey,
  storedData,
  selectApiOrLocalStorage,
  requestDataToFilter,
  renderContent,
  getUserSearchInput,
} from './filterByCategory';

import { setFavoriteLocalStorage, renderFavorites } from './favorite';

// Run function:
selectApiOrLocalStorage();

let searchForm = document.querySelector('form[role="search"]');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let searchKeyword = getUserSearchInput();
  requestDataToFilter(searchKeyword);
});

// Linus ⬆ ------------------------------------------------

// Carolinne ⬇ --------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {});
const articlesContainer = document.getElementById('articlesContainer');
articlesContainer.addEventListener('click', setFavoriteLocalStorage);

const favorites = document.querySelector('#favorites');
favorites.addEventListener('click', renderFavorites);
// Carolinne ⬆ ------------------------------------------------


// Leila   ⬇ --------------------------------------------
//importin from function from favorite.js
import{ updateLoginDisplay} from './favorite';
updateLoginDisplay();

//Leila    ⬆ ------------------------------------------------
