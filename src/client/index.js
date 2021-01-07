import MaterialDataTimePicker from "material-datetime-picker";
// import "material-datetime-picker/dist/material-datetime-picker.css";
import "./scss/main.scss";

const form = document.querySelector("#form");
const pickerContainer = document.querySelector(".data-picker");

const picker = new MaterialDataTimePicker();
pickerContainer.addEventListener("click", () => picker.open());

const handleSubmit = (e) => {
  e.preventDefault();
  const place = document.querySelector("#place");
  console.log(place.value);
};

form.addEventListener("submit", handleSubmit);
