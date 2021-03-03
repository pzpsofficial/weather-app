const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlldHlwb3d5aW5mb3JtYXR5ayIsImEiOiJja2sybHF6Y2wxMmRrMnZxc3RlNGVsanVrIn0.-ftT0ERQ8rOqZ8NU6lOpjg&limit=1`;

  request({ url: url, json: true }, (error, data) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
      return;
    }

    if (data.body.features.length === 0) {
      callback('Unable to get data. Try another search', undefined);
      return;
    }

    callback(undefined, {
      latitude: data.body.features[0].center[1],
      longitude: data.body.features[0].center[0],
      location: data.body.features[0].place_name,
    });
  });
};

module.exports = geoCode;
