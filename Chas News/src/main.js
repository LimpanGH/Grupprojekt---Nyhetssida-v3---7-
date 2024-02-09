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

// Run function:
selectApiOrLocalStorage();

let searchForm = document.querySelector('form[role="search"]');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let searchKeyword = getUserSearchInput()
  requestDataToFilter(searchKeyword)
});

// Linus ⬆ ------------------------------------------------

// Carolinne ⬇ --------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {});

// Carolinne ⬆ ------------------------------------------------
