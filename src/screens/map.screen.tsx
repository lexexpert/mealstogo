import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { SearchMap } from "../components/SearchMap.component";
import { RestaurantsContext } from "../services/restaurants/restaurants.context";
import { LocationContext } from "../services/location/location.context";
import { MapCallout } from "../components/MapCallout.component";
import { NavigationProp } from "@react-navigation/native";

interface MapScreenProps {
  navigation: NavigationProp<any, any>;
}

export const MapScreen = ({ navigation }: MapScreenProps) => {
  const { restaurants = [] } = useContext(RestaurantsContext);
  const { location } = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location || {};

  useEffect(() => {
    const northEastLat = viewport?.northeast?.lat || 0;
    const southWestLat = viewport?.southwest?.lat || 0;
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
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetails", { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </>
  );
};
