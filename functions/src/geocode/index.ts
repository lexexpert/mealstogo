import { onRequest } from "firebase-functions/v2/https";
import { locations as locationsMock } from "./geocode.mock";
import { Client } from "@googlemaps/google-maps-services-js";
const googleMapsClient = new Client({});
import { defineSecret } from "firebase-functions/params";
import { GeoCodeType } from "./geocode.type";

const geocodingApiKey = defineSecret("GOOGLE_GEOCODING_API_KEY");

export const geoCodeRequest = onRequest(
  async (request, response): Promise<void> => {
    const { city = "", mock } = request.query;
    if (mock === "true") {
      const locationMock = locationsMock[String(city).toLowerCase()];
      response.json(locationMock);
      return;
    }

    googleMapsClient
      .geocode({
        params: {
          address: String(city),
          key: geocodingApiKey.value(),
        },
        timeout: 3000, // milliseconds
      })
      .then((res) => response.json(res.data as Partial<GeoCodeType>))
      .catch((error) => {
        console.error(error);
        response.status(400).send(error.response?.data?.error_message);
      });
  }
);
