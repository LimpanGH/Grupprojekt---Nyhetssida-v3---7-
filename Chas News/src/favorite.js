import axios from 'axios';

const favoritesArticles = [];

// Favorite it is not done

document.addEventListener('DOMContentLoaded', function () {
  const articlesContainer = document.getElementById('articlesContainer');

  articlesContainer.addEventListener('click', function (event) {
    const button = event.target.closest('.favorite');
    const contentDiv = event.target.closest('.contentDiv');

    if (button) {
      let starIcon = button.querySelector('.starIcon');

      if (starIcon && starIcon.classList.contains('fa-solid')) {
        starIcon.classList.remove('fa-solid');
      } else if (starIcon) {
        starIcon.classList.add('fa-solid');

        const title = contentDiv.querySelector('.newsTitle').textContent;
        const description = contentDiv.querySelector(
          '.articleDescription'
        ).textContent;
        const urlToImage = contentDiv.querySelector('img').src;

        const newObj = {
          title,
          description,
          urlToImage,
        };

        console.log(newObj);
      }
    }
  });
});
