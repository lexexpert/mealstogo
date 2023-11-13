import camelize from "camelize-ts";

export const locationRequest = (searchTerm: string) => {
  return fetch(
    `${process.env.REACT_APP_FIREBASE_FUNCTION_GEOCODE}?city=${searchTerm}`
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
