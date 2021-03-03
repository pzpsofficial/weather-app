const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=604338445b9e9b2cf799a62dfb28d123&query=${lat},${lng}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Error occured', undefined);
      return;
    }

    if (response.body.error) {
      callback('Error occured', undefined);
      return;
    }

    const { weather_descriptions, temperature } = response.body.current;

    callback(
      undefined,
      `${weather_descriptions[0]}. It is currently ${temperature} degress out.`
    );
  });
};

module.exports = forecast;
