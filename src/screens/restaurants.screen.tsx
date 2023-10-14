import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard/RestaurantCard.component";
import styled from "styled-components/native";
import { SafeArea } from "../components/SafeArea.component";
import { RestaurantsContext } from "../services/restaurants/restaurants.context";
import { Search } from "../components/Search.component";

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const theme = useTheme();

  return (
    <SafeArea>
      <Search />
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={theme.colors.primary} />
        </LoadingContainer>
      ) : (
        <RestaurantListContainer>
          <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
            keyExtractor={(item) => item.name.toString()}
          />
        </RestaurantListContainer>
      )}
    </SafeArea>
  );
};
