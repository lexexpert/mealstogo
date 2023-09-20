import React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";

const RestaurantCardStyled = styled(Card)`
  background-color: white;
`;

const RestaurantCardCover = styled(Card.Cover)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: white;
`;

const Title = styled(Text)`
  color: blue;
  font-size: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
  font-weight: bold;
`;

const Address = styled(Text)`
  font-size: bodyMedium;
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
