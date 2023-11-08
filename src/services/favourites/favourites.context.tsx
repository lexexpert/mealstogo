import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RestaurantType } from "../../types/restaurant.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

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
  const { user } = useContext(AuthenticationContext);

  const addToFavourites = (restaurant: RestaurantType) => {
    setFavourites([...favourites, restaurant]);
  };

  const saveFavourites = async (favourites: RestaurantType[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(favourites);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e: any) {
      console.log("Error saving to favorites", e.toString());
    }
  };

  const loadFavourites = async (uid: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      return jsonValue != null ? setFavourites(JSON.parse(jsonValue)) : null;
    } catch (e: any) {
      console.log("Error getting favorites", e.toString());
    }
  };

  const removeFromFavourites = (restaurant: RestaurantType) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid || "");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid || "");
    }
  }, [favourites, user]);

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
