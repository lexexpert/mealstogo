import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SearchMap } from "../components/SearchMap.component";
import { RestaurantsContext } from "../services/restaurants/restaurants.context";
import { LocationContext } from "../services/location/location.context";

export const MapScreen = () => {
  const { restaurants = [] } = useContext(RestaurantsContext);
  const { location } = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northEastLat = viewport.northeast.lat;
    const southWestLat = viewport.southwest.lat;
    const latDelta = northEastLat - southWestLat;
    setLatDelta(latDelta);
  }, [location, viewport]);

  return (
    <>
      <SearchMap />
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            />
          );
        })}
      </MapView>
    </>
  );
};
