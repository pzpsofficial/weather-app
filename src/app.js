const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Bartosz Karpiel' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Bartosz Karpiel' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page',
    title: 'Help',
    name: 'Bartosz Karpiel',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ Error: 'You must provide an address' });
  }

  geoCode(req.query.address, (error, geoData = {}) => {
    if (error) {
      return res.send({ error: 'Something went wrong with an API call' });
    }

    const { latitude, longitude, location } = geoData;

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error: 'Something went wrong with an API call' });
      }

      res.send({
        data,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      Error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'There is not such a help page.',
    title: 'Help 404',
    name: 'Bartosz Karpiel',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found',
    title: 'Help 404',
    name: 'Bartosz Karpiel',
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
