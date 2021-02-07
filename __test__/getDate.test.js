import { getDate } from "../src/client/js/getDate";

test("Days until travel", () => {
  expect(getDate("02-14-2021")).toStrictEqual({
    timeToTravel: 8,
    travelISODate: {
      actualDayISO: "2020-02-15",
      nextDayISO: "2020-02-16",
    },
  });
});
