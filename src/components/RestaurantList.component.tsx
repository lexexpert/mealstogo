import { FlatList, TouchableOpacity, View } from "react-native";
import { RestaurantCard } from "./RestaurantCard/RestaurantCard.component";
import { RestaurantType } from "../types/restaurant.type";
import { NavigationProp } from "@react-navigation/native";
import styled from "styled-components/native";

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]}
    0;
`;

interface RestaurantListProps {
  restaurants: RestaurantType[];
  navigation: NavigationProp<any, any>;
}
export const RestaurantList = ({
  restaurants,
  navigation,
}: RestaurantListProps) => {
  return (
    <RestaurantListContainer>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetails", {
                restaurant: item,
              })
            }
          >
            <RestaurantCard restaurant={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </RestaurantListContainer>
  );
};
