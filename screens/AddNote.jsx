import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const inputOptions = ["text", "image", "link", "list"];
const AddNote = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text onPress={() => navigation.goBack()}>Back</Text>
        <TextInput
          placeholder="Untitled"
          placeholderTextColor={"rgba(0,0,0,0.1)"}
          style={styles.title}
          cursorColor={"darkgray"}
          selectionColor={"darkgray"}
          autoCorrect={false}
        />
        {/* body */}
        <View style={styles.body}>
          <TextInput
            style={styles.textnode}
            placeholder="Type / to see options - kidding"
            placeholderTextColor={"rgba(0,0,0,0.1)"}
            multiline
            cursorColor={"darkgray"}
            selectionColor={"darkgray"}
            autoCorrect={false}
          />
        </View>
      </ScrollView>
      <View style={styles.toolsContainer}>
        <TouchableOpacity
          style={[
            styles.toolicon,
            {
              borderEndWidth: StyleSheet.hairlineWidth,
              borderRadius: 0,
              borderColor: "lightgray",
              flex: 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"dots-horizontal"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.tools}>
          {inputOptions.map((value, index) => {
            return (
              <TouchableOpacity style={styles.toolicon} key={index}>
                <Ionicons name={value} size={24} color="black" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT * 1.5,
    backgroundColor: "white",
    // backgroundColor: "pink",
  },
  title: {
    color: "black",
    paddingHorizontal: "4%",
    fontSize: 28,
    fontWeight: "bold",
    // backgroundColor: "gray",
  },
  body: {
    // flexGrow: 1,
    // backgroundColor: "pink",
    padding: "4%",
  },
  textnode: {
    color: "black",
    letterSpacing: 1,
    lineHeight: 20,
    // backgroundColor: "pink",
    textAlign: "justify",
  },
  toolsContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    left: "4%",
    right: "4%",
    bottom: 10,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 20,
  },
  tools: {
    columnGap: 20,
    flex: 4,
    flexDirection: "row",
    padding: 10,
  },
  toolicon: {
    padding: 4,
    borderRadius: 14,
    flex: 1,
    // backgroundColor: "pink",
    // backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
  },
});
