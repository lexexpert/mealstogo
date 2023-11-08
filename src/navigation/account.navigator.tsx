import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../screens/account.screen";
import { LoginScreen } from "../screens/login.screen";
import { RegisterScreen } from "../screens/register.screen";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="Login" component={LoginScreen} />
      <AccountStack.Screen name="Register" component={RegisterScreen} />
    </AccountStack.Navigator>
  );
};
