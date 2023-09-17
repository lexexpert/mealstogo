import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

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
    <Card mode="elevated" style={styles.card}>
      <Card.Cover key={name} style={styles.cover} source={{ uri: photos[0] }} />
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          {name}
        </Text>
        <Text variant="bodyMedium">{address}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  cover: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    paddingVertical: 16,
  },
});
