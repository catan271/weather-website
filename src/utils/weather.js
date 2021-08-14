const request = require('request')

const weatherForecast = (latitude, longitude, location, callback) => {
    const urlWeatherStack = (lat, long) => {
        return 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=03792b33aeaad53f23994e467d48fd8e&units=metric'
    }

    let res

    request({url: urlWeatherStack(latitude, longitude), json: true}, (error, response) => {
        if (error) {
            callback({error: 'Unable to connect to weather service!'})
        } else if (response.body.message) {
            callback({error: 'Unable to find location!'})
        } else {
            callback(Object.assign(location, {weather: response.body.weather[0].main + '. It is currently ' + response.body.main.temp + ' degree out. It feels like ' + response.body.main.feels_like + ' degree out.'}))
        }
    })

    return res
}

module.exports = weatherForecast;