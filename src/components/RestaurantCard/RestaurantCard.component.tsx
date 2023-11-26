import React from "react";
import { Card } from "react-native-paper";
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
import { RestaurantType } from "../../types/restaurant.type";
import { Favourite } from "../Favourite.component";

type RestaurantCardProps = {
  restaurant: RestaurantType;
};

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const {
    name = "",
    icon = "",
    formattedPhotos = [],
    address = "",
    isOpenNow = true,
    rating = 0,
    isClosedTemporarily = true,
    placeId,
  } = restaurant || {};

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCardStyled mode="elevated">
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: formattedPhotos[0] }} />
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
