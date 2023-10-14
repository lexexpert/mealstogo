import camelize from "camelize-ts";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm: string) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm];
    if (!locationMock) reject("not found");
    resolve(locationMock);
  });
};

export const locationTransform = (result: unknown) => {
  if (!result) return {} as any;
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse?.results?.[0];
  const { lat, lng } = geometry?.location;

  return { lat, lng };
};
