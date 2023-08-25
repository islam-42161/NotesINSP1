import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const AddFolder = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.goBack()}>Back</Text>
    </View>
  );
};

export default AddFolder;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT * 1.5,
  },
});
