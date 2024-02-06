import axios from "axios";
import { renderContent } from "./filterByCategory";

//localStorage.clear();


const storedData = JSON.parse(localStorage.getItem('data')); // when I get from local storage it is usually a string, but I wat it
//to be an array, json.parse makes it an array. 
const articlesContainer = document.getElementById('articlesContainer');


articlesContainer.addEventListener('click', function (event) {
    const button = event.target.closest('.favorite');
    const contentDiv = event.target.closest('.contentDiv')

    let favoritesArticles = JSON.parse(localStorage.getItem('favorites')) || []; 


    if (button) {
        let starIcon = button.querySelector('.starIcon');

        if (starIcon && starIcon.classList.contains('fa-solid')) {
            starIcon.classList.remove('fa-solid');

            

            const title = contentDiv.querySelector('.newsTitle').textContent;
            const articleToRemove = storedData.filter(article => article.title === title);
            console.log('artigo a ser excluido:', articleToRemove);
            
            favoritesArticles = favoritesArticles.filter(article => article.title !== title);

            localStorage.setItem('favorites', JSON.stringify(favoritesArticles));

            console.log('exclude favorite article' , favoritesArticles);
            
        } else if (starIcon) {
            starIcon.classList.add('fa-solid');
            
            

            const title = contentDiv.querySelector('.newsTitle').textContent;
            const favoriteArticle = storedData.find(article => article.title === title);
            
            if (favoritesArticles.some(article => article.title === title)) {
                console.log('It is favorite');
            } else {
                favoritesArticles.push(favoriteArticle)

            }
            localStorage.setItem('favorites', JSON.stringify(favoritesArticles));
            console.log('include favorite article' , favoritesArticles);

        const newObj = {
          title,
          description,
          urlToImage,
        };

        }
    }

});

export function isArticleFavorite (articleTitle) {
    let favoritesArticles = JSON.parse(localStorage.getItem('favorites')) || []; 
    
    return favoritesArticles.some(article => article.title === articleTitle);
    
}


