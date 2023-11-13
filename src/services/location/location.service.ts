import camelize from "camelize-ts";

export const locationRequest = (searchTerm: string) => {
  return fetch(
    `http://127.0.0.1:5001/mealstogo-5730a/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result: unknown) => {
  if (!result) return {} as any;
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse?.results?.[0];
  const { lat, lng } = geometry?.location;

  return { lat, lng, viewport: geometry?.viewport };
};
