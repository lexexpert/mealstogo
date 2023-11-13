import { mockImages, mocks } from "../../../functions/src/places/mock";
import camelize from "camelize-ts";

export const restaturantsRequest = (location: string) => {
  return fetch(
    `${process.env.REACT_APP_FIREBASE_FUNCTION_PLACES}?location=${location}`
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
