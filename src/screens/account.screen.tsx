import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Spacer } from "../components/Spacer.componet";
import { AccountBackground } from "../components/Account/AccountBackground.component";
import { AccountContainer } from "../components/Account/AccountContainer.component";
import { AccountCover } from "../components/Account/AccountCover.component";
import { Button } from "../components/Button.component";
import { AccountTitle } from "../components/Account/AccountTitle.component";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import { View } from "react-native";

const AnimationWrapper = styled(View)`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

interface AccountScreenProps {
  navigation: NavigationProp<any, any>;
}

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../assets/watermelon.json")}
        />
      </AnimationWrapper>
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
