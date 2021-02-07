import "./scss/main.scss";
import { handleSubmit } from "./js/handleSubmit";
import { creatingNextTrip, loader, favoriteTrip } from "./js/userInterfaces";
/* Storing data in my app */
const state = {
  trips: [],
};
/* Rendering function */
const render = (root, cb, state) => {
  root.innerHTML = cb(state);
};
/* DOM Selectors */
const $form = document.querySelector("#form");
const $picker = document.querySelector(".datepicker");
const instances = M.Datepicker.init($picker, {
  maxDate: new Date("01-01-2022"),
  minDate: new Date(),
});
const $tripContainer = document.querySelector("#trip");
const $favoriteContainer = document.querySelector("#favorite");

/* Listen to the form submition */
$form.addEventListener("submit", async (event) => {
  /* Waiting for the APIs data */
  const tripData = await handleSubmit(event);
  /* Rendering the data in the DOM */
  render($tripContainer, creatingNextTrip, tripData);
  /* Saving the data in my state */
  state.actualTrip = tripData;
});
/* Handleing clicks events */
const setupClickHandlers = () => {
  document.addEventListener("click", (event) => {
    const { target } = event;
    // Adding a trip into my favorite list
    if (target.matches(".trip__button")) {
      state.trips.push(state.actualTrip);
      // Cleaning the trip card
      $tripContainer.innerHTML = "";
      // Rendering my trip in the favorite container
      render($favoriteContainer, favoriteTrip, state.trips);
    }
    // Showing the form from the navbar
    if (target.matches(".add-form")) {
      $form.classList.remove("hide");
    }
    //Removing a trip from favorite container
    if (target.matches(".material-icons")) {
      const tripToRemove = target.closest(".favorite__item").id;
      state.trips.splice(tripToRemove, 1);
      render($favoriteContainer, favoriteTrip, state.trips);
    }
    // Showing the form from error screen
    if (target.matches(".error__button")) {
      $tripContainer.innerHTML = "";
      $form.classList.remove("hide");
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  setupClickHandlers();
});
