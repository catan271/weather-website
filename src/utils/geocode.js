const request = require('request')
const weatherForecast = require('./weather')

const geocode = (location1, callback) => {
    const urlStringify = (s) => {
        return s.replace(/ /g, '%20')
    }

    const urlMapBox = (s) => {
        return 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + s + '.json?access_token=pk.eyJ1IjoiY2F0YW4yNzEiLCJhIjoiY2tyZ2J5MG9oNjVoZzJwbWY4MnV6Y3JmaCJ9.CmBiXIk7eYEaQVaHWbDCCg&limit=1'
    }

    let res = {}

    request({url: urlMapBox(urlStringify(location1)), json: true}, (error, response) => {
        if (error) callback({error})
        else if (!response.body.features || !response.body.features.length) callback({error: 'There is no matching location!'})
        else {
            weatherForecast(response.body.features[0].center[1], response.body.features[0].center[0], {location: response.body.features[0].place_name}, callback)     
        }
    })

    return res
}
module.exports = geocode