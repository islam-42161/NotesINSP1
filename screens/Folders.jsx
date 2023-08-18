import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Folders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Folders</Text>
    </View>
  );
};

export default Folders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
  },
});
