const dotenv = require("dotenv");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
dotenv.config();

/* DEPENDENCIES */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

/* Static site */
app.use(express.static("dist"));

/* API functions */
const getWeatherBit = async (geoData, dateInformation) => {
  const { timeToTravel, travelISODate } = dateInformation;
  const API_KEY = process.env.WHEATERBIT_KEY;
  const lat = geoData.geonames[0].lat;
  const lng = geoData.geonames[0].lng;
  let URL = "";
  const URL1 = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${API_KEY}`;
  const URL2 = `https://api.weatherbit.io/v2.0/history/hourly?lat=${lat}&lon=${lng}&start_date=${travelISODate.actualDayISO}&end_date=${travelISODate.nextDayISO}&key=${API_KEY}`;
  timeToTravel > 7 ? (URL = URL2) : (URL = URL1);

  return await fetch(URL).then((response) => response.json());
};
const getGeoName = async (location) => {
  const API_KEY = process.env.GEONAMES_KEY;
  const URL = `http://api.geonames.org/searchJSON?q=${location}&username=${API_KEY}&maxRows=1`;

  return await fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
const getPixaBay = async (location) => {
  const API_KEY = process.env.PIXABAY_KEY;
  const query = location.replace(/\s/g, "+");
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`;
  return await fetch(URL).then((response) => response.json());
};
/* Routes */
const callingAPIs = async (req, res) => {
  const location = req.body.place;
  const dateInformation = req.body.dateInformation;
  const finalData = {};
  await getGeoName(location)
    .then((geoNameData) => {
      if (geoNameData.totalResultsCount === 0) {
        throw new Error(
          "Sorry the place you entered doesnt exist in our data base"
        );
      }
      finalData.countryName = geoNameData.geonames[0].countryName;
      getWeatherBit(geoNameData, dateInformation).then((weatherData) => {
        const temp = weatherData.data[0].temp;
        const maxTemp = weatherData.data[0].max_temp;
        const icon = weatherData.data[0].weather;
        finalData.forecast = { temp, maxTemp, icon };

        getPixaBay(location).then((pixaBayData) => {
          if (pixaBayData.totalHits === 0) {
            getPixaBay(geoNameData.geonames[0].countryName).then(
              (pixaBayData) => {
                const imgURL = pixaBayData.hits[0].webformatURL;
                const user = pixaBayData.hits[0].user;
                finalData.picture = { imgURL, user };
                res.send(finalData);
              }
            );
          } else {
            const imgURL = pixaBayData.hits[0].webformatURL;
            const user = pixaBayData.hits[0].user;
            finalData.picture = { imgURL, user };
            res.send(finalData);
          }
        });
      });
    })
    .catch((error) => {
      console.log(res.status);
      res.send(error);
      console.log("error", error);
    });
};
app.post("/location", callingAPIs);

const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server Running");
  console.log(`Running on localhost ${port}`);
}

module.exports = {
  getGeoName,
};
