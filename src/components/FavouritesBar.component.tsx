import React from "react";
import { RestaurantType } from "../types/restaurant.type";
import { ScrollView, View, TouchableOpacity } from "react-native";
import CompactRestaurantInfo from "./CompactRestaurantInfo.component";
import { Spacer } from "./Spacer.componet";
import { Text } from "./Text.component";

type FavouritesBarProps = {
  favourites: RestaurantType[];
  onNavigate: (route: string, payload: { restaurant: RestaurantType }) => void;
};

export const FavouritesBar = ({
  favourites,
  onNavigate,
}: FavouritesBarProps) => {
  if (!favourites.length) {
    return null;
  }

  return (
    <Spacer position="left" size="large">
      <Spacer position="top" size="small">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites?.map((restaurant) => {
          const key = restaurant.name.split(" ").join("");
          return (
            <View key={key} style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => onNavigate("RestaurantDetails", { restaurant })}
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </Spacer>
  );
};
