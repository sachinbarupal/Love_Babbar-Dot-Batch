const API_KEY = "f9a82ff8cea6aee3337c7bd71c44ee47";

const wrapper = document.querySelector('.wrapper');

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector('.weather-container');

const grantAccessContainer = document.querySelector('.grant-location-container');
const searchForm = document.querySelector('[data-searchForm]');
const grantAccessBtn = document.querySelector('[data-grantAccess]');

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

        getFromSessionStorage();
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

function getFromSessionStorage(){
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
        const data = await  response.json();

        loadingContainer.classList.remove('container-active');
        userInfoContainer.classList.add('container-active');
        
        renderWeatherInfo(data);
    }
    catch(e){
        loadingContainer.classList.remove('container-active');
        alert('API Call Failed' + e);
        //Baad me
    }
}

function renderWeatherInfo(weatherInfo){
    console.log(weatherInfo);
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");

    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const weatherDesc = document.querySelector("[data-weatherDesc]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloud = document.querySelector("[data-cloud]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/h80/${weatherInfo?.sys?.country.toLowerCase()}.png`
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
    temp.innerText = parseInt(weatherInfo?.main?.temp) - 273.15;
    windspeed.innerHTML = weatherInfo?.wind?.speed;
    humidity.innerHTML = weatherInfo?.main?.humidity;
    cloud.innerHTML = weatherInfo?.clouds?.all;
}

grantAccessBtn.addEventListener('click', getLocation);

function getLocation(){
    if(navigator.geolocation){
        grantAccessContainer.classList.remove('container-active');
    loadingContainer.classList.add('container-active');
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert('machine does not support geoLocation')
    }
}

function showPosition(position){
    const userCordinates = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    }
    
    sessionStorage.setItem("user-coordinates",  JSON.stringify(userCordinates));
    fetchUserWeatherInfo(userCordinates);
}

userTab.addEventListener('click', () => {
    console.log('clicked usertab');
    switchTab(userTab);
});
searchTab.addEventListener('click', () => {
    console.log('clicked searchtab');
    switchTab(searchTab);
});