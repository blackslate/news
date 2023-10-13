
import { changeColor } from "./styleme.js";

const API_KEY = 'bc7cc0ec17224693b9b786f1e279fbbd'; 
const divNewsList = document.querySelector('#newsList')
const ulSavedList = document.querySelector('#saved-articles')
const inputsInput = document.querySelector('#sInput')
const button = document.querySelector('#sButton')
//  const artLocalData = JSON.parse(localStorage.getItem('savedArticle'));
 

 
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

function fetchHeadlines() {
    fetch(apiUrl)
    .then(resp => resp.json())
    .then(data => {
         console.log('Fetched data:', data)
        displayNews(data.articles)
        changeColor();

    })
    .catch(error => {
        console.error('An error occurred while fetching headlines:', error);
        // Display a friendly message to the user
        alert('An error occurred while fetching headlines. Please try again later.');
    });
}
function displayNews(articles) {
     divNewsList.innerHTML = ''; 
     articles.forEach(article => {
        const articleDiv = document.createElement('div')
        articleDiv.classList.add('article') ;
        const title = document.createElement('h3');
        title.textContent = article.title; // adding articles to the h3
        const description = document.createElement('p');
        description.textContent = article.description;
        const link = document.createElement('a');
        link.textContent = 'Read more'; 
        link.href = article.url;
        link.target = '_blank';
        const imageElement = document.createElement('img');
        imageElement.src = article.urlToImage; // Replace with the actual image path
        imageElement.alt = 'Image Description'; // Replace with a description for the image
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('saveButton');
        // Add a click event listener to the save button
        saveButton.addEventListener('click', () => {
            // Get the article's HTML content
            const articleHTML = articleDiv.textContent;
            console.log('Garen1', articleHTML);
            
            // Store the article in local storage
            localStorage.setItem('savedArticle',JSON.stringify(article));

            // Provide feedback to the user (optional)
            alert('Article saved to local storage!');
            const savedArticle = JSON.parse(localStorage.getItem('savedArticle')) ;
            console.log('********************', savedArticle);
            
            const savedList = document.createElement('li');
            savedList.classList.add('liSaved')

            const savedListItem = document.createElement('li');
            savedListItem.classList.add('liSaved');

             savedList.innerHTML =  articleDiv.innerHTML //`<h3>${article.title}</h3><img src = '${article.urlToImage}'/>` ;
             ulSavedList.appendChild(savedList);


        });
       

        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(link);
        articleDiv.appendChild(saveButton);
        articleDiv.appendChild(imageElement);
        divNewsList.appendChild(articleDiv);
 
        
    
    
    
    });
   
}


// Event listener for the search button
button.addEventListener('click', () => {
    const searchTerm = inputsInput.value;
    if (searchTerm.trim() !== '') {
        searchNews(searchTerm);
    }else{
        alert ("Please enter something in the input field");
    }
    console.log( '*****', searchTerm);
    
});

// Function to search for news articles using keywords
async function searchNews(keyword) {
     const resp = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
     const data = await resp.json()
     displayNews(data.articles);
       
}
fetchHeadlines();


