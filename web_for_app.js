const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    // destruc. property
    const { cityDetails, weather } = data;

    //  console.log(data);
    // const cityDetails=data.cityDetails;
    // const weather=data.weather;

    // Template Update
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            </div>`
        ;



    // Update the night/day & Icon Images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    // tenary operators
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';







    /*let timeSrc= null;
    if(weather.IsDayTime){
        timeSrc= 'img/day.svg';
    }else{
        timeSrc='img/night.svg';
    }*/
    time.setAttribute('src', timeSrc);


    // remove d-none if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};





const getWeatherInfo = async (city, countryCode) => {
    //    console.log(city);
    const cityDetails = await getCity(city, countryCode);
    if (!cityDetails) {

        return
    }
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather,
    };

}

cityForm.addEventListener('submit', async e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    const countryCode = selectElement.value
    const countryName = selectElement.options[selectElement.selectedIndex].text;


    const data = await getWeatherInfo(city, countryCode);

    if (!data) {
        alert(`${city}, ${countryName} information not found`)
        return;
    }

    updateUI(data);
    cityForm.reset()

// localStorage set
    localStorage.setItem('city', city )





});
if(localStorage.getItem('city')){
   cityDetails(localStorage.getItem('city'))
    .then(data=>updateUI(data))
    .catch(err=> console.log(err))

    
}

