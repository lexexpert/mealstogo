import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { SvgXml } from "react-native-svg";
import starIcon from "../../assets/star";
import openIcon from "../../assets/open";
import { Image } from "react-native";
import { Spacer } from "./Spacer.componet";
import { Text } from "./Text.component";

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

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
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

  const {
    name = "",
    icon = "",
    photos = [],
    address = "",
    isOpenNow = true,
    rating = 0,
    isClosedTemporarily = true,
  } = restaurant || {};

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCardStyled mode="elevated">
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Card.Content>
        <Spacer position="top" size="large">
          <Text variant="label">{name}</Text>
        </Spacer>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SvgXml key={index} xml={starIcon} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={openIcon} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large" />
            <Image source={{ uri: icon }} style={{ width: 15, height: 15 }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Card.Content>
    </RestaurantCardStyled>
  );
};
