import React from "react";
import { Card } from "react-native-paper";
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
import starIcon from "../../../assets/star";
import openIcon from "../../../assets/open";
import { Spacer } from "../Spacer.componet";
import { Text } from "../Text.component";
import {
  Address,
  Icon,
  Rating,
  RestaurantCardCover,
  RestaurantCardStyled,
  Section,
  SectionEnd,
} from "./RestaurantCard.styles";

type RestaurantCardProps = {
  restaurant: {
    name: string;
    icon: string;
    photos: string[];
    address: string;
    isOpenNow: boolean;
    rating: number;
    isClosedTemporarily: boolean;
    placeId: string;
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
    placeId,
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
              <SvgXml
                key={`star-${placeId}-${index}`}
                xml={starIcon}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            {isOpenNow && (
              <Spacer position="left" size="large">
                <SvgXml xml={openIcon} width={20} height={20} />
              </Spacer>
            )}
            {!!icon && (
              <Spacer position="left" size="large">
                <Icon source={{ uri: icon }} />
              </Spacer>
            )}
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Card.Content>
    </RestaurantCardStyled>
  );
};
