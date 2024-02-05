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

// Variables ----------------------------------------------------------------

// let searchKeyword = 'bitcoin';
// let language = 'sv';
// let from = '2024-01-24';
// let to = '2024-01-24';
// let sortBy = 'popularity';

// Url with variables ---------------------------------------------------------
//const url = `https://newsapi.org/v2/everything?q=${searchKeyword}&language=${language}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`;





// Kommentera in första apiKey för att att rendera ut från objektet i localStorage.
export const apiKey = 'ca4dba689f8c457181c123c32552da4b';
// Kommentera in andra apiKey för att att göra en request och rendera ut färsk data.
//export const apiKey = 'ca4dba689f8c457181c123c32552da4b'


import axios from 'axios';

export const storedData = localStorage.getItem('data');


// -----------------------------------------------------

export function selectApiOrLocalStorage () {
if (apiKey) {
  requestDataToFilter(apiKey); // API key is provided, fetch data from the API
} else if (storedData) {
  const articles = JSON.parse(storedData); // No API key, but data found in localStorage, render it directly
  renderContent(articles);
} else {
  console.log('No API key and no data available in localStorage');
}
}

// -----------------------------------------------------


// -----------------------------------------------------
export async function requestDataToFilter(apiKey) {
  const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-25&sortBy=popularity&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data.articles;
    console.log(data);
    renderContent(data);
    window.localStorage.setItem('data', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// -----------------------------------------------------


// -----------------------------------------------------
export function renderContent(articles) {
  const container = document.getElementById('news-container');

  // Check if there are articles
  if (articles.length === 0) {
    container.innerHTML = 'No articles available';
    return;
  }

  // Iterate over the articles and create HTML elements
  articles.forEach((article) => {
    const articlesContainer = document.querySelector('#articlesContainer');
    const sourceArticle = document.querySelector(".sourceArticle");
    const newArticle = sourceArticle.cloneNode(true);



    //needs category code for the category Name and the href to be displayed on top of the article as a button
    const categoryAnchorTag = newArticle.querySelector('.categoryAnchorTag');
    const categoryName = 'World';
    const categoryNameH6 = newArticle.querySelector('.categoryName');
    categoryNameH6.textContent = categoryName;
    categoryAnchorTag.href = '#';

    
    //article's content
    const contentDiv = newArticle.querySelector('.contentDiv');
    const imgTag = contentDiv.querySelector("img");

    const newsTitle = contentDiv.querySelector('.newsTitle');
    newsTitle.textContent = article.title;
    const articleDescription = contentDiv.querySelector('.articleDescription')
    articleDescription.textContent = article.description;

    imgTag.src = article.urlToImage;
    articlesContainer.appendChild(newArticle);

  
    // const articleDiv = document.createElement('div');
    // articleDiv.classList.add('article');

    // const h2 = document.createElement('h2');
    // h2.textContent = article.title;

    // const p = document.createElement('p');
    // p.textContent = article.description;

    // const img = document.createElement('img');
    // img.src = article.urlToImage;

    // articleDiv.appendChild(h2);
    // articleDiv.appendChild(p);
    // articleDiv.appendChild(img);

    // container.appendChild(articleDiv);
  });
}
// -----------------------------------------------------



