import React from "react";
import { StatusBar, SafeAreaView, View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard/RestaurantCard.component";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantsScreen = () => {
  const restaurant = {
    name: "Some Restaurant",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg",
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
        <FlatList
          data={[{ name: 1 }, { name: 2 }, { name: 3 }]}
          renderItem={() => <RestaurantCard restaurant={restaurant} />}
          keyExtractor={(item) => item.name.toString()}
        />
      </RestaurantListContainer>
    </SafeArea>
  );
};
