import React, { createContext, useContext, useEffect, useState } from "react";
import {
  restaturantsRequest,
  restaurantsTransform,
} from "./restaurants.service";
import { LocationContext } from "../location/location.context";

type RestaurantContextType = {
  restaurants: any[];
  isLoading: boolean;
  error: string;
};

export const RestaurantsContext = createContext<RestaurantContextType>({
  restaurants: [],
  isLoading: false,
  error: "",
});

export const RestaurantContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { location } = useContext(LocationContext);

  const fetchRestaurants = async (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      restaturantsRequest(loc)
        .then(restaurantsTransform)
        .then((results) => {
          setRestaurants(results);
        });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    const locationString = `${location.lat},${location.lng}`;
    fetchRestaurants(locationString);
  }, [location]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
