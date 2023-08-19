import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Folders = ({ navigation, headertitleHeight }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: headertitleHeight.value + 10 }}
      >
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
};

export default Folders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "4%",
    // backgroundColor: "pink",
  },
});
