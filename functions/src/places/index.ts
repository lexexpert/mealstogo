import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { addMockImage, mocks } from "./mock/index";
import { defineSecret } from "firebase-functions/params";
import { Client, Place } from "@googlemaps/google-maps-services-js";
import { PlacesType } from "./places.type";
const googleMapsClient = new Client({});
const placesApiKey = defineSecret("GOOGLE_PLACES_API_KEY");

const addGoogleImage = (restaurant: Place): Partial<PlacesType> => {
  const photoRef = restaurant.photos?.[0]?.photo_reference;
  if (!photoRef) {
    return {
      ...restaurant,
      formattedPhotos: [
        "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
      ],
    };
  }

  return {
    ...restaurant,
    formattedPhotos: [
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${placesApiKey.value()}`,
    ],
  };
};

export const placesRequest = onRequest(
  async (request, response): Promise<void> => {
    try {
      const { location = "", mock } = request.query || {};
      if (mock === "true") {
        const placeMock = mocks[String(location).toLowerCase()];
        if (placeMock) {
          placeMock.results = placeMock.results.map(addMockImage);
        }
        response.json(placeMock);
        return;
      }

      googleMapsClient
        .placesNearby({
          params: {
            location: String(location),
            radius: 1500, // meters
            type: "restaurant",
            key: placesApiKey.value(),
          },
          timeout: 3000, // milliseconds
        })
        .then((res) => {
          res.data.results = res.data.results.map(addGoogleImage);
          return response.json(res.data);
        })
        .catch((error) => {
          console.error(error);
          return response.status(400).send(error.response?.data?.error_message);
        });
    } catch (error) {
      logger.error(error);
      response.json([]);
    }
  }
);
