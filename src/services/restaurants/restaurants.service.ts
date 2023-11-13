import { mockImages, mocks } from "../../../functions/src/places/mock";
import camelize from "camelize-ts";

export const restaturantsRequest = (location: string) => {
  return fetch(
    `http://127.0.0.1:5001/mealstogo-5730a/us-central1/placesNearby?location=${location}`
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }: { results: any[] }) => {
  const mappedResults = results?.map((restaurant) => {
    restaurant.photos = restaurant.photos?.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...restaurant,
      address: restaurant?.vicinity || "Unknown Address",
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
