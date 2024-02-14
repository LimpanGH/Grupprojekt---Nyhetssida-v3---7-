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
import{ updateLoginDisplay } from './favorite.js';
updateLoginDisplay();





//Leila    ⬆ ------------------------------------------------
        
//Yaser 

///////////////////////////
//SORTERING EFTER SENAST///
///////////////////////////

export function sortArticlesByPublishedDate(articles) {
  return articles.sort(function(a, b) {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
}

export function updateInterfaceForPublishedDate(sortedArticles) {
  renderContent(sortedArticles);
}

export async function handleSearchForPublishedDate() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByPublishedDate(articles);
    updateInterfaceForPublishedDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
}

document.getElementById("senast").addEventListener("click", async function() {
  await handleSearchForPublishedDate();
});


/////////////////////////////////
////////SORTERING EFTER ÄLDSTA///
////////////////////////////////

let eventlyssnare = () => {
document.getElementById("senast").addEventListener("click", async function() {
  await handleSearchForPublishedDate();
});
}

export function sortArticlesByOldestDate(articles) {
  return articles.sort(function(a, b) {
    return new Date(a.publishedAt) - new Date(b.publishedAt);
  });
}

export function updateInterfaceForOldestDate(sortedArticles) {
  renderContent(sortedArticles);
}

export async function handleSearchForOldestDate() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByOldestDate(articles);
    updateInterfaceForOldestDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
}


document.getElementById("äldsta").addEventListener("click", async function() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByOldestDate(articles);
    updateInterfaceForOldestDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
});
