import { useContext, useState } from "react";
import { SafeArea } from "../components/SafeArea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { Avatar, List } from "react-native-paper";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import styled from "styled-components/native";
import { Spacer } from "../components/Spacer.componet";
import { Text } from "../components/Text.component";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../types/user.type";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors?.bg?.primary};
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

interface SettingsScreenProps {
  navigation: NavigationProp<any, any>;
}

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const getProfilePicture = async (user: Partial<UserType>) => {
    const photoUri = await AsyncStorage.getItem(`${user?.uid}-photo`);
    if (photoUri) {
      setProfilePicture(photoUri);
    }
  };

  useFocusEffect(() => {
    getProfilePicture(user);
  });

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {profilePicture ? (
            <Avatar.Image size={180} source={{ uri: profilePicture }} />
          ) : (
            <Avatar.Icon
              size={180}
              icon="human"
              style={{ backgroundColor: "#2182BD" }}
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user?.email}</Text>
        </Spacer>
      </AvatarContainer>
      <Spacer position="top" size="large" />
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
          style={{ padding: 16 }}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="logout" />}
          onPress={onLogout}
          style={{ padding: 16 }}
        />
      </List.Section>
    </SafeArea>
  );
};
