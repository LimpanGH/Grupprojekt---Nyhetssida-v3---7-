// Linus ⬇ --------------------------------------------
// Importing variables and functions from filterByCategory.js
import {
  apiKey,
  storedData,
  selectApiOrLocalStorage,
  requestDataToFilter,
  renderContent,
  filterArticlesByCategory,
} from './filterByCategory';

// Run function:
selectApiOrLocalStorage();

let searchWordFromInputField = document.querySelector('#filterForm');
searchWordFromInputField.addEventListener('input', function () {
  filterArticlesByCategory();
  console.log('Filter input-field is taking input');
});




// Linus ⬆ ------------------------------------------------














// Carolinne ⬇ --------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {});

// Carolinne ⬆ ------------------------------------------------
