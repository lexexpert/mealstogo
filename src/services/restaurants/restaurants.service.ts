import camelize from "camelize-ts";

export const restaturantsRequest = (location: string) => {
  return fetch(
    `${process.env.REACT_APP_FIREBASE_FUNCTION_PLACES}?location=${location}`
  )
    .then((res) => {
      return res?.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const restaurantsTransform = ({ results = [] }: { results: any[] }) => {
  const mappedResults = results?.map((restaurant) => ({
    ...restaurant,
    address: restaurant?.vicinity || "Unknown Address",
    isOpenNow: restaurant.opening_hours && restaurant.opening_hours?.open_now,
    isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
  }));

  return camelize(mappedResults);
};
