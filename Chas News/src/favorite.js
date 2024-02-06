import axios from "axios";
import { renderContent } from "./filterByCategory";

//localStorage.clear();


const storedData = JSON.parse(localStorage.getItem('data')); // when I get from local storage it is usually a string, but I wat it
//to be an array, json.parse makes it an array. 
const articlesContainer = document.getElementById('articlesContainer');
const favorites = document.querySelector('#favorites');




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

        }
    }

});

export function isArticleFavorite (articleTitle) {
    let favoritesArticles = JSON.parse(localStorage.getItem('favorites')) || []; 
    
    return favoritesArticles.some(article => article.title === articleTitle);
    
}


// Click on Favorite button

favorites.addEventListener('click', () => {
    let favoritesArticles = JSON.parse(localStorage.getItem('favorites')) || []; 
    const container = document.getElementById('news-container');
    const articlesContainer = document.querySelector('#articlesContainer');
    const sourceArticle = document.querySelector(".sourceArticle");


    articlesContainer.innerHTML = '';

    // Check if there are articles -----------
    if (favoritesArticles.length === 0) {
        container.innerHTML = 'No articles available';
        return;
    }
    
    console.log(favoritesArticles.length);
    // Iterate over the favorites articles and create HTML elements
    favoritesArticles.forEach((article) => {
        
        
        const newArticle = sourceArticle.cloneNode(true);
        newArticle.classList.remove('d-none');
        
    
        //needs category code for the category Name and the href to be displayed on top of the article as a button
        const categoryAnchorTag = newArticle.querySelector('.categoryAnchorTag');
        const categoryName = 'Favorite';
        const categoryNameH6 = newArticle.querySelector('.categoryName');
        categoryNameH6.textContent = categoryName;
        categoryAnchorTag.href = '#';
    
    

        const starIcon = newArticle.querySelector('.starIcon');
        starIcon.classList.add('fa-solid');
    
        
    
        //article's content
        const contentDiv = newArticle.querySelector('.contentDiv');
        const imgTag = contentDiv.querySelector("img");
    
        const newsTitle = contentDiv.querySelector('.newsTitle');
        newsTitle.textContent = article.title;
        const articleDescription = contentDiv.querySelector('.articleDescription')
        articleDescription.textContent = article.description;
    
        imgTag.src = article.urlToImage;
        
        
    
        articlesContainer.appendChild(newArticle);
        
    });
    
});