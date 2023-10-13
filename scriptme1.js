const API_KEY = 'bc7cc0ec17224693b9b786f1e279fbbd'; 
const divNewsList = document.querySelector('#newsList')
const ulSavedList = document.querySelector('#saved-articles')
const inputsInput = document.querySelector('#sInput')
const button = document.querySelector('#sButton')
const savedArticles = JSON.parse(localStorage.getItem('savedArticle')) ;
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

function fetchHeadlines() {
    fetch(apiUrl)
    .then(resp => resp.json())
    .then(data => {
        displayNews(data.articles)
    })
    .catch(error => {
        console.error('An error occurred while fetching headlines:', error);
        alert('An error occurred while fetching headlines. Please try again later.');
    });
}
function displayNews(articles) {
    divNewsList.innerHTML = '';
    articles.forEach(article => {
        const articleDiv = document.createElement('div')
        articleDiv.classList.add('article') 
        articleDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'
        const title = document.createElement('h3');
        title.textContent = article.title; 
        const description = document.createElement('p');
        description.textContent = article.description;
        const link = document.createElement('a');
        link.textContent = 'Read more'; 
        link.href = article.url;
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
       
        saveButton.addEventListener('click', () => {
            const articleHTML = articleDiv.textContent;
            console.log('Garen1', articleHTML);
            localStorage.setItem('savedArticle',JSON.stringify(article));
            alert('Article saved to local storage!');

            const savedList = document.createElement('li');
            savedList.innerHTML = articleHTML;
            ulSavedList.appendChild(savedList);
        });
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(link);
        articleDiv.appendChild(saveButton);
        divNewsList.appendChild(articleDiv);
    });
}

button.addEventListener('click', () => {
    const searchTerm = inputsInput.value;
    if (searchTerm.trim() !== '') {
        searchNews(searchTerm);
    }else{
        alert ("Please enter something in the input field");
    }
});
async function searchNews(keyword) {
     const resp = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
     const data = await resp.json()
     displayNews(data.articles);  
}
fetchHeadlines();


