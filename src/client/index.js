import "./scss/main.scss";
import { handleSubmit } from "./js/handleSubmit";
import { creatingNextTrip, loader, favoriteTrip } from "./js/userInterfaces";

const state = {
  trips: [],
};
const render = (root, cb, state) => {
  root.innerHTML = cb(state);
};

const $form = document.querySelector("#form");
const $picker = document.querySelector(".datepicker");
const instances = M.Datepicker.init($picker, {
  maxDate: new Date("01-01-2022"),
  minDate: new Date(),
});
const $tripContainer = document.querySelector("#trip");
const $favoriteContainer = document.querySelector("#favorite");

$form.addEventListener("submit", async (event) => {
  const tripData = await handleSubmit(event);
  render($tripContainer, creatingNextTrip, tripData);
  state.actualTrip = tripData;
  console.log(tripData);
});
const setupClickHandlers = () => {
  document.addEventListener("click", (event) => {
    const { target } = event;
    if (target.matches(".trip__button")) {
      state.trips.push(state.actualTrip);
      $tripContainer.innerHTML = "";
      render($favoriteContainer, favoriteTrip, state.trips);
    }
    if (target.matches(".add-form")) {
      $form.classList.remove("hide");
    }
    if (target.matches(".material-icons")) {
      const tripToRemove = target.closest(".favorite__item").id;
      state.trips.splice(tripToRemove, 1);
      render($favoriteContainer, favoriteTrip, state.trips);
    }
    if (target.matches(".error__button")) {
      $tripContainer.innerHTML = "";
      $form.classList.remove("hide");
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  setupClickHandlers();
});
