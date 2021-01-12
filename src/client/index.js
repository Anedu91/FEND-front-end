import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./scss/main.scss";

const form = document.querySelector("#form");
const pickerContainer = document.querySelector(".data-picker");

const picker = document.querySelector(".datepicker");
const instances = M.Datepicker.init(picker);

const handleSubmit = (e) => {
  e.preventDefault();
  const place = document.querySelector("#place");
  console.log(place.value);
};

form.addEventListener("submit", handleSubmit);
