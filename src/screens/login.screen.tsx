import { useContext, useState } from "react";
import { AccountBackground } from "../components/Account/AccountBackground.component";
import { AccountCover } from "../components/Account/AccountCover.component";
import { AccountContainer } from "../components/Account/AccountContainer.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Spacer } from "../components/Spacer.componet";
import { Button } from "../components/Button.component";
import { Text } from "../components/Text.component";
import { NavigationProp } from "@react-navigation/native";
import { AccountTitle } from "../components/Account/AccountTitle.component";
import { ErrorContainer } from "../components/Account/ErrorContainer.component";
import { colors } from "../theme/colors";

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <AccountTitle>Meals To Go</AccountTitle>
      <AccountContainer>
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Spacer size="large" />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
        />
        <Spacer size="large" />
        {!!error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        {isLoading ? (
          <ActivityIndicator animating color={colors.brand.primary} />
        ) : (
          <Button
            icon="lock-open-outline"
            onPress={() => onLogin(email, password)}
          >
            Login
          </Button>
        )}
      </AccountContainer>

      <Spacer size="large">
        <Button icon="arrow-left" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </Spacer>
    </AccountBackground>
  );
};
