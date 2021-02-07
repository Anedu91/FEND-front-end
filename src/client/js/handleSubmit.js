import { postData } from "./fetchingData";
import { getDate } from "./getDate";
import { loader } from "./userInterfaces";

/*Submiting the form */
const handleSubmit = async (event) => {
  event.preventDefault();
  const place = document.querySelector("#place").value;
  const date = document.querySelector("#date").value;
  //reseting the form
  event.currentTarget.reset();
  // hiding the form
  event.currentTarget.classList.add("hide");
  // showing loader component
  loader(true);

  const dateInformation = getDate(date);
  // sending a post request and waiting for the APIs response
  const dataReceived = await postData("http://localhost:8000/location", {
    place,
    dateInformation,
  });
  return { dataReceived, place, date, dateInformation };
};

export { handleSubmit };
