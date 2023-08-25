import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const Folders = ({
  navigation,
  headertitleHeight,
  headerHeight,
  headerPositionY,
}) => {
  const [loaded, setLoaded] = useState(false);
  useDerivedValue(() => {
    if (headertitleHeight.value > 0) {
      runOnJS(setLoaded)(true);
    }
  }, [headertitleHeight]);
  const folders = require("../data.json").folders;

  const containerStyle = useAnimatedStyle(() => ({
    // top: headertitleHeight.value + headerPositionY.value,
    // height: height - (headertitleHeight.value + headerPositionY.value),
    paddingTop: headertitleHeight.value + headerPositionY.value + 10,
  }));
  const lastY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const deltaY = event.contentOffset.y - lastY.value;

    if (deltaY > 0) {
      headerPositionY.value = Math.max(
        headerPositionY.value - deltaY,
        -headerHeight.value
      );
    } else {
      if (event.contentOffset.y <= 0) {
        headerPositionY.value = 0;
      } else {
        headerPositionY.value = Math.min(headerPositionY.value - deltaY, 0);
      }
    }

    lastY.value = event.contentOffset.y;
  });
  if (loaded) {
    return (
      <Animated.View style={[styles.container]}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: headertitleHeight.value,
            paddingBottom: 80,
          }}
          onScroll={scrollHandler}
          numColumns={2}
          data={folders}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            const even = index % 2 === 0 ? true : false;

            return (
              <View style={styles.folderContainer}>
                <Pressable
                  style={[
                    styles.folder,
                    {
                      marginLeft: even ? "6%" : "3%",
                      marginRight: even ? "3%" : "6%",
                      marginBottom: "6%",
                    },
                  ]}
                >
                  <MaterialIcons name={item.icon} color={"black"} size={48} />
                  <Text>{item.title}</Text>
                </Pressable>
              </View>
            );
          }}
        />
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.2)",
            "rgba(255, 255, 255, 0.3)",
            "rgba(255, 255, 255, 0.4)",
            "rgba(255, 255, 255, 0.5)",
            "rgba(255, 255, 255, 0.6)",
            "rgba(255, 255, 255, 0.7)",
            "rgba(255, 255, 255, 0.8)",
            "rgba(255, 255, 255, 0.9)",
            "rgba(255, 255, 255, 1)",
          ]}
          style={styles.bottomComponent}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AddNote")}
            style={styles.add_note_button}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text
              style={{
                fontSize: 18,
                color: "white",
                // fontWeight: "bold",
                letterSpacing: -1,
              }}
            >
              Add new folder
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  } else {
    return (
      <ActivityIndicator color={"black"} size={"large"} style={{ flex: 1 }} />
    );
  }
};

export default Folders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: "red",
  },
  folderContainer: {
    width: width * 0.5,
    height: width * 0.5,
  },
  folder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    gap: 10,
    borderRadius: 12,
    flex: 1,
  },
  add_note_button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    elevation: 5,
  },
  bottomComponent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
