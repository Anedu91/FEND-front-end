import { postData } from "./fetchingData";
import { getDate } from "./getDate";
import { loader } from "./userInterfaces";

/*Submiting the form */
const handleSubmit = async (event) => {
  event.preventDefault();
  const place = document.querySelector("#place").value;
  const date = document.querySelector("#date").value;
  event.currentTarget.reset();
  event.currentTarget.classList.add("hide");
  loader(true);

  const dateInformation = getDate(date);
  const dataReceived = await postData("http://localhost:8000/location", {
    place,
    dateInformation,
  });
  return { dataReceived, place, date, dateInformation };
};

export { handleSubmit };
