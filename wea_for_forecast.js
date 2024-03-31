const key = 'meCA1h54VcnOQdoJDADGAvP8Frg3qeot';


// get weather info
const getWeather = async (id) => {
    const baseURL = 'http://dataservice.accuweather.com';

    const query = `?apikey=${key}`;
    const currentconditionsApiUrl = `${baseURL}/currentconditions/v1/${id}${query}`
    const response = await fetch(currentconditionsApiUrl);
    const weather = await response.json();
    // console.log(weather);

    return weather[0]


};




// get city informaation
const baseURL = 'http://dataservice.accuweather.com';


const getCity = async (city, countryCode) => {
    const query = `?apikey=${key}&q=${city}`;
    const locationsApiUrl = `${baseURL}/locations/v1/cities/search${query}`
    const response = await fetch(locationsApiUrl);
    const cities = await response.json();


    const foundCity = cities.find((city) => {
        if (city.Country.ID.toLowerCase() === countryCode.toLowerCase()) {
            return city
        }
    })

    return foundCity


};

//  getCity('lagos nigeria');
// getWeather('4607');

