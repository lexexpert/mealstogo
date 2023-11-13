import { onRequest } from "firebase-functions/v2/https";
import { locations as locationsMock } from "./geocode.mock";

export const geoCodeRequest = onRequest((request, response) => {
  const { city = "" } = request.query;
  const locationMock = locationsMock[String(city).toLowerCase()];
  response.json(locationMock);
});
