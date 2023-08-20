import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
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
    height: height - (headertitleHeight.value + headerPositionY.value),
  }));
  if (loaded) {
    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <FlatList
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
                  <MaterialIcons name="notes" color={"black"} size={48} />
                  <Text>{item.title}</Text>
                </Pressable>
              </View>
            );
          }}
        />
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
    // paddingHorizontal: "4%",
    paddingTop: 10,
    backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
  },
  folderContainer: {
    width: width * 0.5,
  },
  folder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    gap: 10,
    height: height * 0.2,
    borderRadius: 12,
  },
});
