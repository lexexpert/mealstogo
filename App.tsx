import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.search}>
          <Searchbar value="" placeholder="Search" />
        </View>
        <View style={styles.list}>
          <Text>list</Text>
        </View>
      </SafeAreaView>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: { padding: 16 },
  list: { flex: 1, padding: 16, backgroundColor: 'blue' },
});
