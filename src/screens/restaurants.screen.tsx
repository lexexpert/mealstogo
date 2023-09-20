import React from "react";
import { StatusBar, SafeAreaView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard.component";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: 16px;
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: 16px;
`;

export const RestaurantsScreen = () => {
  const restaurant = {
    name: "Some Restaurant",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: [
      "https://images.squarespace-cdn.com/content/v1/58192407b8a79b7beff7e669/1670104585943-XEJ1ILCRZ4ZQDA0AWP4K/IMG_4925.JPG",
    ],
    address: "100 some random street",
    isOpenNow: true,
    rating: 4,
    isClosedTemporarily: true,
  };
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar value="" placeholder="Search" />
      </SearchContainer>
      <RestaurantListContainer>
        <RestaurantCard restaurant={restaurant} />
      </RestaurantListContainer>
    </SafeArea>
  );
};
