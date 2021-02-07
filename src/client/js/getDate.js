const getLastYear = (actualDay) => {
  // The next day but from the last year (for prediction)
  const nextDayLastYear = new Date(
    actualDay.getTime() + 1000 * 60 * 60 * 24 - 1000 * 60 * 60 * 24 * 365
  );
  //Actual day but from the last year (for prediction)
  const actualDayLastYear = new Date(
    actualDay.getTime() - 1000 * 60 * 60 * 24 * 365
  );
  // Saving dates in iso format but just mm-dd-yyyy
  const nextDayISO = nextDayLastYear.toISOString().substring(0, 10);
  const actualDayISO = actualDayLastYear.toISOString().substring(0, 10);
  return { nextDayISO, actualDayISO };
};

const getDate = (eventDay) => {
  const today = new Date();
  const travelDate = new Date(eventDay);
  const travelISODate = getLastYear(travelDate);
  const DAYS = 1000 * 60 * 60 * 24;
  // Days until travel
  const timeToTravel = Math.ceil(
    (travelDate.getTime() - today.getTime()) / DAYS
  );

  return { timeToTravel, travelISODate };
};
export { getDate, getLastYear };
