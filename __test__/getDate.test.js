import { getLastYear } from "../src/client/js/getDate";

test("Days until travel", () => {
  expect(getLastYear(new Date("02-14-2021"))).toStrictEqual({
    actualDayISO: "2020-02-15",
    nextDayISO: "2020-02-16",
  });
});
