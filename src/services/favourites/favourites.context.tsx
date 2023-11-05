import React, { ReactNode, createContext, useEffect, useState } from "react";
import { RestaurantType } from "../../types/restaurant.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavouritesContextType = {
  favourites: RestaurantType[];
  addToFavourites: (restaurant: RestaurantType) => void;
  removeFromFavourites: (restaurant: RestaurantType) => void;
};
export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  addToFavourites: (restaurant: RestaurantType) => {},
  removeFromFavourites: (restaurant: RestaurantType) => {},
});

export const FavouritesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favourites, setFavourites] = useState<RestaurantType[]>([]);

  const addToFavourites = (restaurant: RestaurantType) => {
    setFavourites([...favourites, restaurant]);
  };

  const saveFavourites = async (favourites: RestaurantType[]) => {
    try {
      const jsonValue = JSON.stringify(favourites);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.log("Error saving to favorites", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favourites");
      return jsonValue != null ? setFavourites(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("Error getting favorites", e);
    }
  };

  const removeFromFavourites = (restaurant: RestaurantType) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
