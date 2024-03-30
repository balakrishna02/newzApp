
const URL = "https://newsapi.org/v2/everything?q=";

const key = "b27855fe7f974d538b91aa9e974b9196";

window.addEventListener("load", () => fetchNews("india"));

function reload (){
    window.location.reload();
}


const fetchNews = async (query) => {

    let BASE_URL = `${URL}${query}&apiKey=${key}`;
    let response = await fetch(BASE_URL);
    let data = await response.json();
    // console.log(data.articles)
    blind(data.articles);
}

function blind(articles){

    const cardContainer = document.getElementById("cards-container");
    const newCardTemplate = document.getElementById("template");

    cardContainer.innerHTML = "";

    articles.forEach( (article) => {
        if(!article.urlToImage) return;
        const cardClone = newCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article){

    const newsImg = cardClone.getElementById("news-img");
    const newsTitle = cardClone.getElementById("news-title");
    const newsSource = cardClone.getElementById("news-source");
    const newsDesc = cardClone.getElementById("news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "asia/Jakarta"});
    
    newsSource.innerHTML = date;

    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url);
    })
}

let currOption = null;

function onNavItemClick(id) {
    fetchNews(id);
    currOption?.classList.remove("active");
    currOption = document.getElementById(id);
    currOption.classList.add("active");
}


let searchText = document.getElementById("news-input");
let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", ()=> {
    const topic = searchText.value;
    if(!topic) return;
    fetchNews(topic);
    if(currOption){
        currOption.classList.remove("active");
        currOption = null;
    }
    
})

searchText.addEventListener("change", ()=> {
    const topic = searchText.value;
    if(!topic) return;
    fetchNews(topic);
    if(currOption){
        currOption.classList.remove("active");
        currOption = null;
    }
    
});

