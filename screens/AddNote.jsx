import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddNote = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.goBack()}>Back</Text>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
