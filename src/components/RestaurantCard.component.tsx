import React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useFonts as useOswald, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { SvgXml } from "react-native-svg";
import star from "../../assets/star";

const RestaurantCardStyled = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.heading};
`;

const Address = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

type RestaurantCardProps = {
  restaurant: {
    name: string;
    icon: string;
    photos: string[];
    address: string;
    isOpenNow: boolean;
    rating: number;
    isClosedTemporarily: boolean;
  };
};

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [oswaldFontLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoFontLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!oswaldFontLoaded || !latoFontLoaded) {
    return null;
  }

  const ratingArray = Array.from(new Array(Math.floor(restaurant.rating)));

  const {
    name = "",
    icon = "",
    photos = [],
    address = "",
    isOpenNow = true,
    rating = 0,
    isClosedTemporarily = true,
  } = restaurant || {};
  return (
    <RestaurantCardStyled mode="elevated">
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Card.Content>
        <Title>{name}</Title>
        <Rating>
          {ratingArray.map(() => (
            <SvgXml xml={star} width={20} height={20} />
          ))}
        </Rating>
        <Address>{address}</Address>
      </Card.Content>
    </RestaurantCardStyled>
  );
};
