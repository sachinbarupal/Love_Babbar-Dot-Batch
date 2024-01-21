const API_KEY = "f9a82ff8cea6aee3337c7bd71c44ee47";

const wrapper = document.querySelector('.wrapper');

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector('.weather-container');

const grantAccessContainer = document.querySelector('.grant-location-container');
const searchForm = document.querySelector('[data-searchForm]');

const loadingContainer = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-info-container');

let currentTab = userTab;

setTab(userTab);

function switchTab(tab){
    if(tab == currentTab) return;
    
    currentTab.classList.remove('current-tab');
    currentTab = tab;
    currentTab.classList.add('current-tab');
    
    setTab(tab);
}

function setTab(tab){
    if(tab == userTab){

        searchForm.classList.remove('container-active');

        getLocation();
        // grantAccessContainer.classList.add("container-active");
        // loadingContainer.classList.add('container-active');
        // userInfoContainer.classList.add('container-active');

    }
    else{
        searchForm.classList.add('container-active');
    
        grantAccessContainer.classList.remove("container-active");
        loadingContainer.classList.remove('container-active');
        userInfoContainer.classList.remove('container-active');
    }
} 

function getLocation(){
    const localCordinates = sessionStorage.getItem("user-coordinates");
    if(!localCordinates){
        grantAccessContainer.classList.add('container-active');
    }else{
        const loc = JSON.parse(localCordinates);
        fetchUserWeatherInfo(loc);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat , long} = coordinates; 

    grantAccessContainer.classList.remove('container-active');
    loadingContainer.classList.add('container-active'); 

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
        const data = response.json();

        loadingContainer.classList.remove('container-active');
        userInfoContainer.classList.add('container-active');
        
        renderWeatherInfo(data);
    }
    catch(e){
        loadingContainer.classList.remove('container-active');
        alert('API Call Failed');
        //Baad me
    }
}

renderWeatherInfo(data){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[countryIcon]");

    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const weatherDesc = document.querySelector("[data-weatherDesc]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloud = document.querySelector("[data-cloud]");

    
}



userTab.addEventListener('click', () => {
    console.log('clicked usertab');
    switchTab(userTab);
});
searchTab.addEventListener('click', () => {
    console.log('clicked searchtab');
    switchTab(searchTab);
});