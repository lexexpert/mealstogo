import React, { ReactNode, createContext, useState } from "react";
import { RestaurantType } from "../../types/restaurant.type";

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

  const removeFromFavourites = (restaurant: RestaurantType) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

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
