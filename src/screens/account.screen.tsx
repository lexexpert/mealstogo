import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Spacer } from "../components/Spacer.componet";
import { AccountBackground } from "../components/Account/AccountBackground.component";
import { AccountContainer } from "../components/Account/AccountContainer.component";
import { AccountCover } from "../components/Account/AccountCover.component";
import { Button } from "../components/Button.component";
import { AccountTitle } from "../components/Account/AccountTitle.component";

interface AccountScreenProps {
  navigation: NavigationProp<any, any>;
}

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AccountTitle>Meals To Go</AccountTitle>
      <AccountContainer>
        <Button
          icon="lock-open-outline"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <Spacer size="large" />
        <Button icon="email" onPress={() => navigation.navigate("Register")}>
          Register
        </Button>
      </AccountContainer>
    </AccountBackground>
  );
};
