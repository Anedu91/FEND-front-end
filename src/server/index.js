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

/* Routes */
const getGeoName = async (req, res) => {
  const API_KEY = process.env.GEONAMES_KEY;
  const URL = `http://api.geonames.org/searchJSON?q=${location}&username=${API_KEY}&maxRows=1`;
};

const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server Running");
  console.log(`Running on localhost ${port}`);
}
