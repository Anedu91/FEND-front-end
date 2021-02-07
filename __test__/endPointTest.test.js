import { getGeoName } from "../src/server/index";

it("testing getGeoName", async () => {
  const response = await getGeoName("Margarita");
  expect(response.totalResultsCount).toBe(1230);
});
