const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cors = require('cors')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3002

//Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.use(cors())


//Render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Catan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Catan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Catan',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(req.query.address, (data) => {
            res.send(data)
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Catan',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Catan',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})