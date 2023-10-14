import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { RestaurantsScreen } from "./src/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";

const Tab = createBottomTabNavigator();

const TAB_ICON: Record<string, any> = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({
  route,
}: {
  route: RouteProp<Record<string, object | undefined>, string>;
}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <RestaurantContextProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
              <Tab.Screen name="Map" component={RestaurantsScreen} />
              <Tab.Screen name="Settings" component={RestaurantsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantContextProvider>
      </LocationContextProvider>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
}
