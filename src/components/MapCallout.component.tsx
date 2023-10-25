import React from "react";
import { View } from "react-native";
import { RestaurantType } from "../types/restaurant.type";
import CompactRestaurantInfo from "./CompactRestaurantInfo.component";

export const MapCallout = ({ restaurant }: { restaurant: RestaurantType }) => {
  return (
    <View>
      <CompactRestaurantInfo restaurant={restaurant} />
    </View>
  );
};
