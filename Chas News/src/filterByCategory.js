// API documentaion --*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*
/**
 * 
  sortBy
  The order to sort the articles in. 
  Possible options: 
    relevancy, 
    popularity, 
    publishedAt.
  relevancy = articles more closely related to q come first.
  popularity = articles from popular sources and publishers come first.
  publishedAt = newest articles come first.
  Default: publishedAt
 */

/**
 * A date and optional time for the oldest article allowed.
 * This should be in ISO 8601 format (e.g. 2024-01-26 or 2024-01-26T11:24:26
 */

// Language The 2-letter ISO-639-1 code of the language you want to get headlines for,
// possible options: ar de en es fr he it nl no pt ru sv ud zh,
// default: all languages returned.

// Code --*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*

// Example endpoints: -------------------------------------------------------
// const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-25&sortBy=popularity&apiKey=${apiKey}`;
// URl för sökord: //const urlSearchForBitcoin = `https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${apiKey}`;


// Kommentera in första apiKey för att att rendera ut från objektet i localStorage.
// export const apiKey = '';
// Kommentera in andra apiKey för att att göra en request och rendera ut färsk data.
export const apiKey = 'ca4dba689f8c457181c123c32552da4b';

import axios from 'axios';

export const storedData = localStorage.getItem('data');

// -----------------------------------------------------

export function selectApiOrLocalStorage() {
  if (apiKey) {
    requestDataToFilter(); // API key is provided, fetch data from the API
  } else if (storedData) {
    const articles = JSON.parse(storedData); // No API key, but data found in localStorage, render it directly
    renderContent(articles);
  } else {
    console.log('No API key and no data available in localStorage');
  }
}

// -----------------------------------------------------

export async function requestDataToFilter(searchKeyword = 'coding') {
  // let searchKeyword = 'economy';
  let language = 'en';
  let from = '2024-01-17';
  let to = '2024-02-01';
  let sortBy = 'popularity';
  const url = `https://newsapi.org/v2/everything?q=${searchKeyword}&language=${language}&from=${from}&to=${to}&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data.articles;
    console.log(data);
    renderContent(data, searchKeyword);
    window.localStorage.setItem('data', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// -----------------------------------------------------
export function renderContent(articles,searchKeyword) {
  const container = document.getElementById('news-container');
  // Check if there are articles -----------
  if (articles.length === 0) {
    container.innerHTML = 'No articles available';
    return;
  }

  // Iterate over the articles and create HTML elements -----------
  const html = articles
    .map(
      (article) => `
  <article
    class="border-start border-danger border-5 sourceArticle mb-4 text-start"
  >
    <div class="category center p-0">
      <button class="btn pt-0 pb-2 px-0 w-100">
        <a
          href=""
          class="categoryAnchorTag btn rounded-0 bg-white d-flex justify-content-between w-100 align-content-center"
        >
          <h6 class="categoryName m-0 p-0 align-self-center">
Sökord: ${searchKeyword}
          </h6>
          <i class="fa-solid fa-arrow-right m-0"></i>
        </a>
      </button>
    </div>
    <div class="contentDiv bg-white">
      <img
        class="w-100"
        src="${article.urlToImage}"
        alt=""
      />
      <div class="text ps-2 pb-2">
        <!-- <h5 class="pt-3 text-primary">Sports</h5> -->
        <div
          class="d-flex pb-2 pt-1 align-content-center justify-content-between gap-2"
        >
          <h3 class="newsTitle m-0 p-0">${article.title}</h3>
          <button class="favorite m-0 p-0 pe-3 bg-white border-0">
            <i
              class="starIcon fa-regular fa-star align-self-center text-primary"
            ></i>
          </button>
        </div>
        <p class="articleDescription pb-2 pe-2 m-0">
        ${article.urlToImage}
        </p>
        <a class="text-danger" href="">Mer...</a>
      </div>
    </div>
  </article>
  `
    )
    .join('');

  const articlesContainer = document.querySelector('#articlesContainer');
  articlesContainer.innerHTML = html;
}

// Get value from search-input --------------
export let getUserSearchInput = () => {
  let searchInput = document.querySelector('#search-input');
  console.log(searchInput.value);
  const searchKeyword = searchInput.value;
  console.log(searchKeyword); // Log the value to verify
  return searchKeyword;
};
