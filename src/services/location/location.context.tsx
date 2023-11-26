import React, { createContext, useEffect, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({} as any);

export const LocationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<{
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("San Francisco");

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setLocation(result);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ isLoading, error, location, onSearch, keyword }}
    >
      {children}
    </LocationContext.Provider>
  );
};
