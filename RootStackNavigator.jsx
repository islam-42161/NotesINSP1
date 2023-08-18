import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Test from "./screens/Test";
import AddNote from "./screens/AddNote";

const { Screen, Navigator, Group } = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => null,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AddNote" component={AddNote} />
    </Navigator>
  );
};

export default RootStackNavigator;

const styles = StyleSheet.create({});
