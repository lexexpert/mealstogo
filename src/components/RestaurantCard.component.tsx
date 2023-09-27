import React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";

const RestaurantCardStyled = styled(Card)`
  background-color: ${(props) => props.theme.colors?.bg?.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.colors?.bg?.primary};
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.colors?.ui?.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const Address = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
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
        <Address>{address}</Address>
      </Card.Content>
    </RestaurantCardStyled>
  );
};
