import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { SettingsScreen } from "../screens/settings.screen";
import { FavouritesScreen } from "../screens/favourites.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen name="Settings " component={SettingsScreen} />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
    </SettingsStack.Navigator>
  );
};
