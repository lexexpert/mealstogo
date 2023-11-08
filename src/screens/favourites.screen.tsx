import { useContext } from "react";
import { SafeArea } from "../components/SafeArea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { NavigationProp } from "@react-navigation/native";
import styled from "styled-components/native";
import { Spacer } from "../components/Spacer.componet";
import { Text } from "../components/Text.component";
import { FavouritesContext } from "../services/favourites/favourites.context";
import { RestaurantList } from "../components/RestaurantList.component";

const NoFavouritesContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

interface FavouritesScreenProps {
  navigation: NavigationProp<any, any>;
}

export const FavouritesScreen = ({ navigation }: FavouritesScreenProps) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const { favourites } = useContext(FavouritesContext);
  return (
    <SafeArea>
      {favourites.length ? (
        <RestaurantList restaurants={favourites} navigation={navigation} />
      ) : (
        <NoFavouritesContainer>
          <Text>No favourites yet</Text>
        </NoFavouritesContainer>
      )}
    </SafeArea>
  );
};
