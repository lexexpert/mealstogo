import { Place } from "@googlemaps/google-maps-services-js";

export type PlacesType = Partial<Place> & {
  formattedPhotos: string[];
};
