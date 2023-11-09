import { Camera, CameraType } from "expo-camera";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Text } from "../components/Text.component";
import { Touchable, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { NavigationProp } from "@react-navigation/native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

interface CameraScreenProps {
  navigation: NavigationProp<any, any>;
}

export const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const cameraRef = useRef(null);
  const [type] = useState(CameraType.front);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      AsyncStorage.setItem(`${user?.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera type={type} ref={cameraRef}>
      <TouchableOpacity onPress={snap}>
        <InnerSnap />
      </TouchableOpacity>
    </ProfileCamera>
  );
};
