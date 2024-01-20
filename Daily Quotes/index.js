const api_url = 'https://api.quotable.io/random';
const quote = document.getElementById('quote');


getQuote(api_url);
async function getQuote(url){
    const response = await fetch(url);
    const data = await response.json();
    quote.innerText = data.content;
}

