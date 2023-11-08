import { useContext } from "react";
import { Button } from "../components/Button.component";
import { SafeArea } from "../components/SafeArea.component";
import { Text } from "../components/Text.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { Spacer } from "../components/Spacer.componet";
import styled from "styled-components/native";
import { View } from "react-native";

const SettingsContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

export const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <SettingsContainer>
        <Spacer size="large">
          <Text style={{ textAlign: "center" }}>Settings</Text>
        </Spacer>
        <Spacer size="large">
          <Button icon="logout" onPress={onLogout}>
            Logout
          </Button>
        </Spacer>
      </SettingsContainer>
    </SafeArea>
  );
};
