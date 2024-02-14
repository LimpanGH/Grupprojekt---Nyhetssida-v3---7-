//import axios from 'axios';
import { renderContent,articlesContainer  } from './filterByCategory.js';


const favorites = document.querySelector('#favorites');


export function setFavoriteLocalStorage(event) {
  const storedData = JSON.parse(localStorage.getItem('data'));
  const button = event.target.closest('.favorite');
  const contentDiv = event.target.closest('.contentDiv');
  let favoritesArticles = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

  if (button) {
    let starIcon = button.querySelector('.starIcon');

    // is favorite
    if (starIcon && starIcon.classList.contains('fa-solid')) {
      console.log('add favorite');
      starIcon.classList.remove('fa-solid');
      const title = contentDiv.querySelector('.newsTitle').textContent;

      favoritesArticles = favoritesArticles.filter(
        (article) => article.title !== title
      );

      localStorage.setItem('favorites', JSON.stringify(favoritesArticles));
      console.log('exclude favorite article', favoritesArticles);
      renderFavorites();

      // is not favorite
    } else {
      // console.log('remove favorite');
      starIcon.classList.add('fa-solid');

      const title = contentDiv.querySelector('.newsTitle').textContent;
      const favoriteArticle = storedData.find(
        (article) => article.title === title
      );

      favoritesArticles.push(favoriteArticle);
      localStorage.setItem('favorites', JSON.stringify(favoritesArticles));
      console.log('include favorite article', favoritesArticles);
    }
  }
}

export function isArticleFavorite(articleTitle) {
  let favoritesArticles = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

  return favoritesArticles.some((article) => article.title === articleTitle);
}

// Click on Favorite button
export const renderFavorites = () => {
  let favoritesArticles = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];
  const articleTemplate = document.getElementById('article-template');

  articlesContainer.innerHTML = '';

  // Check if there are articles -----------
  if (favoritesArticles.length === 0) {
    articlesContainer.innerHTML = 'No articles available';
    return;
  }
  console.log(favoritesArticles.length);
  // Iterate over the favorites articles and create HTML elements
  const fragment = document.createDocumentFragment();
  favoritesArticles.forEach((article) => {
    const newArticle = articleTemplate.content.cloneNode(true);

    const categoryAnchorTag = newArticle.querySelector('.categoryAnchorTag');
    const categoryName = 'Favorite';
    const categoryNameH6 = newArticle.querySelector('.categoryName');
    categoryNameH6.textContent = categoryName;
    categoryAnchorTag.href = '#';

    const starIcon = newArticle.querySelector('.starIcon');
    starIcon.classList.add('fa-solid');

    //article's content
    const contentDiv = newArticle.querySelector('.contentDiv');
    const imgTag = contentDiv.querySelector('img');

    const newsTitle = contentDiv.querySelector('.newsTitle');
    newsTitle.textContent = article.title;
    const articleDescription = contentDiv.querySelector('.articleDescription');
    articleDescription.textContent = article.description;

    imgTag.src = article.urlToImage;

    fragment.appendChild(newArticle);
  });
  articlesContainer.appendChild(fragment);
};




// ------------------------------------------
// Redirect from login page to Chas News page
       // Function to update the login/logout display
       export function updateLoginDisplay() {
        const userDisplay = document.getElementById('userDisplay');
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')); 
       
        if (loggedInUser) {
          // User is logged in, display user information
          userDisplay.innerHTML = `
          <div style="background-color: #f0f0f0; padding: 10px; border-radius: 10px;">
            <div id="welcomeMessage" style="cursor: pointer;">
              Welcome,  ${loggedInUser.displayName}! ▼
            </div>
            <div id="titleList" style="display: flex; flex-direction: column; background-color: #fff; border: 1px solid #ccc; position: absolute; z-index: 1;">
              <p style="margin:1rem;font-style: bold; font-weight: 600; cursor: pointer;"> <i class="fa-regular fa-star "style="padding-right:2rem; "  ></i>Sparade artiklar</p> 
              <p style="margin: 1rem;font-style: bold; font-weight: 600; cursor: pointer;"><i class="fa-regular fa-clock" style="padding-right:2rem;"></i>Läs historik</p>
              <hr>
              <p style="margin:1rem;font-style: bold;font-weight: 600; cursor: pointer;"> <i class="fa-regular fa-bell" style="padding-right:2rem;"></i>Push noticer</p>
              <hr>
              <button id="logoutBtn" style="margin-bottom:0.8rem; margin-right:2rem; background-color:#DE667B; color: #fff; border: none; width:150px;padding-left:6px; border-radius: 5px;"> <i class="fa-solid fa-arrow-right-from-bracket" style="padding-right:2rem;"></i>Logout</button>
              
            </div>
           
          </div>`
            document.getElementById('welcomeMessage').addEventListener('click', function() {
            var titleList = document.getElementById('titleList');
            titleList.style.display = (titleList.style.display === 'block') ? 'none' : 'block';
          });

          // Add click event listener for logout
          document.getElementById('logoutBtn').addEventListener('click', () => {
            // Clear session storage on logout
            sessionStorage.removeItem('loggedInUser');
            // Reload the page after logout
            location.reload();
          });
        } else {
          // User is not logged in, display login button
          userDisplay.innerHTML = ' <button class="btn btn-success me-md-2 mb-2" type="button" id="loginBtn" ><a class="w-100" style="color: white;"href="src/sign up.html"  >Logga in</a></button>';

          // Add click event listener for login
          document.getElementById('loginBtn').addEventListener('click', () => {
            // Redirect to the login page
            window.location.href = 'login.html';
          });
        }
      }

      // Check login status on page load
      updateLoginDisplay();