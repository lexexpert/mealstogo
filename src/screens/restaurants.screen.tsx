import React from "react";
import { StatusBar, StyleSheet, SafeAreaView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard.component";

export const RestaurantsScreen = () => {
  const restaurant = {
    name: "Some Restaurant",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: [
      "https://images.squarespace-cdn.com/content/v1/58192407b8a79b7beff7e669/1670104585943-XEJ1ILCRZ4ZQDA0AWP4K/IMG_4925.JPG",
    ],
    address: "100 some random street",
    isOpenNow: true,
    rating: 4,
    isClosedTemporarily: true,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Searchbar value="" placeholder="Search" />
      </View>
      <View style={styles.list}>
        <RestaurantCard restaurant={restaurant} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: { padding: 16 },
  list: { flex: 1, padding: 16, backgroundColor: "blue" },
});
