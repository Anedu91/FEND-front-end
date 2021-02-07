const creatingNextTrip = (trip) => {
  const { place, dataReceived, dateInformation } = trip;
  // Showing this component if an error appear
  if (Object.keys(dataReceived).length === 0) {
    loader(false);
    return `<div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">Sorry, something happens</span>
    </div>
    <div class="card-action">
      <p class="white-text">The place you entered doesnt exist in our data base</p>
      <a href="#" class="error__button">Submit another place</a>
    </div>
  </div>`;
    // if everything okay render the api information
  } else {
    // removing the loader component
    loader(false);
    return `<div class="trip__item card blue-grey darken-1">
    <article class="trip__article white-text">
      <h2 class="heading-2">My trip to: <span>${place}</span></h2>
      <h3 class="card-title">Departing: In <span>${dateInformation.timeToTravel}</span> days</h3>
      <h3 class="card-title">Forecast Prediction</h3>
      <div class="trip__forecast">
          <img src="https://www.weatherbit.io/static/img/icons/${dataReceived.forecast.icon.icon}.png" class="trip__forecast-img"/>
          <p>${dataReceived.forecast.temp}°C</p>
      </div>
      <button class="trip__button btn waves-effect waves-light red">Add to Favorite</button>
    </article>
    <figure class="trip__figure white-text">
      <img src=${dataReceived.picture.imgURL} alt="Pixa Bay picture" class="trip__image" />
      <figcaption>Pixa bay picture taken by: ${dataReceived.picture.user}</figcaption>
    </figure>
   </div>`;
  }
};
//loader component
const loader = (status) => {
  const $loader = document.querySelector(".preloader");

  status ? $loader.classList.remove("hide") : $loader.classList.add("hide");
};
// Adding trips to favorite container
const favoriteTrip = (trips) => {
  return trips
    .map((trip, index) => {
      const { place, dataReceived, dateInformation } = trip;
      return `<div class="favorite__item card" id=${index}>
    <div class="card-image">
      <img src=${dataReceived.picture.imgURL} class="favorite__image"/>
      <span class="card-title">${place}</span>
      <a class="btn-floating halfway-fab waves-effect waves-light red"
        ><i class="material-icons">delete</i></a
      >
    </div>
    <div class="card-content">
      <h3 class="card-title">Departing in <span>${dateInformation.timeToTravel}</span> days.</h3>
    </div>
  </div>`;
    })
    .join("");
};
export { creatingNextTrip, loader, favoriteTrip };
