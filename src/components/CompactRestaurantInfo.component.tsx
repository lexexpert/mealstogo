import React from "react";
import { RestaurantType } from "../types/restaurant.type";
import styled from "styled-components/native";
import { Text } from "./Text.component";
import WebView from "react-native-webview";
import { Platform } from "react-native";

const CompactImage = styled.Image`
  border-radius: ${(props) => props.theme.space[1]};
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: ${(props) => props.theme.space[2]};
  max-width: 120px;
  align-items: center;
`;

const CompactWebView = styled(WebView)`
  border-radius: ${(props) => props.theme.space[1]};
  width: 120px;
  height: 100px;
  overflow: hidden;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({
  restaurant,
  isMap = false,
}: {
  restaurant: RestaurantType;
  isMap?: boolean;
}) => {
  const Image = isAndroid && isMap ? CompactWebView : CompactImage;
  return (
    <Item>
      <Image source={{ uri: restaurant.formattedPhotos?.[0] || "" }} />
      <Text variant="caption">{restaurant.name}</Text>
    </Item>
  );
};

export default CompactRestaurantInfo;
