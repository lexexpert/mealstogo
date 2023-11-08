import React, { useContext } from "react";
import { RestaurantType } from "../types/restaurant.type";
import { FavouritesContext } from "../services/favourites/favourites.context";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

type FavouriteProps = {
  restaurant: RestaurantType;
};

export const Favourite = ({ restaurant }: FavouriteProps) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find(
    (x) => x?.placeId === restaurant?.placeId
  );

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(restaurant)
          : removeFromFavourites(restaurant)
      }
    >
      <AntDesign
        size={24}
        name={isFavourite ? "heart" : "hearto"}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
