const fs = require('fs');
const path = require('path');

const express = require('express');
const { get } = require('express/lib/response');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));  // midware, move scripts and styles folder to the public folder
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/restaurants', function (req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
    });
});

app.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    res.render('restaurant-detail', { rid: restaurantId })
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});

app.get('/recommend', function (req, res) {
    res.render('recommend');
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

app.get('/index', function (req, res) {
    res.render('index');
});



app.listen(3000);