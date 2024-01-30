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
// const url = `https://newsapi.org/v2/everything?q=${searchKeyword}&language=${language}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`;





// Kommentera in första apiKey för att att rendera ut från objektet i localStorage.
// const apiKey = '';
// Kommentera in andra apiKey för att att göra en request och rendera ut färsk data.
// const apiKey = 'Skriv in din api-nyckel'

import axios from 'axios';

const storedData = localStorage.getItem('data');

if (apiKey) {
  requestDataToFilter(apiKey); // API key is provided, fetch data from the API
} else if (storedData) {
  const articles = JSON.parse(storedData); // No API key, but data found in localStorage, render it directly
  renderContent(articles);
} else {
  console.log('No API key and no data available in localStorage');
}

async function requestDataToFilter(apiKey) {
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

function renderContent(articles) {
  const container = document.getElementById('news-container');

  // Check if there are articles
  if (articles.length === 0) {
    container.innerHTML = 'No articles available';
    return;
  }

  // Iterate over the articles and create HTML elements
  articles.forEach((article) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    const h2 = document.createElement('h2');
    h2.textContent = article.title;

    const p = document.createElement('p');
    p.textContent = article.description;

    const img = document.createElement('img');
    img.src = article.urlToImage;

    articleDiv.appendChild(h2);
    articleDiv.appendChild(p);
    articleDiv.appendChild(img);

    container.appendChild(articleDiv);
  });
}


