import axios from 'axios';

 let apiUrl;

 async function fetchNews(fromDate, toDate, authorSearch) {
  const apiKey = '79a8a58ff85d47c7b1a75cc2b7e294ca';
  let keyWord = "war";

  // Lägg till författarsökning om det finns en inmatning
  if (authorSearch) {
    keyWord = `author:${authorSearch}`;
  }

  apiUrl = `https://newsapi.org/v2/everything?q=${keyWord}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const articleListElement = document.getElementById('articleList');
    
    // Rensa tidigare artiklar
    articleListElement.innerHTML = '';

    response.data.articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      
      const imgElement = document.createElement('img');
      imgElement.src = article.urlToImage;
      imgElement.alt = 'Article Image';

      const authorElement = document.createElement('p');
      authorElement.textContent = `Author: ${article.author}`;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ${article.description}`;

      const titleElement = document.createElement('h2');
      titleElement.textContent = article.title;

      const urlElement = document.createElement('a');
      urlElement.href = article.url;
      urlElement.textContent = 'Read more';

      const publishedAtElement = document.createElement('p');
      publishedAtElement.textContent = `Published at: ${article.publishedAt}`;

      articleElement.appendChild(imgElement);
      articleElement.appendChild(authorElement);
      articleElement.appendChild(descriptionElement);
      articleElement.appendChild(titleElement);
      articleElement.appendChild(urlElement);
      articleElement.appendChild(publishedAtElement);

      articleListElement.appendChild(articleElement);
    });
  } catch (error) {
    console.error('Fel vid hämtning av nyheter:', error);
  }
}

function updateNews() {
  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;
  const authorSearch = document.getElementById('authorSearch').value;

  fetchNews(fromDate, toDate, authorSearch);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('updateButton').addEventListener('click', updateNews);
  fetchNews('2024-01-31', '2024-02-1');
});
