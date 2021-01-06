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

const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server Running");
  console.log(`Running on localhost ${port}`);
}
