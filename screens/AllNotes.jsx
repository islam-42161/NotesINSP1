import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  SlideInDown,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const data = require("../data.json").notes;
const AniMasonry = Animated.createAnimatedComponent(MasonryFlashList);
function showTags(tags) {
  tags.map((value, index) => {
    if (index > 2) {
      return null;
    } else if (index === 2) {
      return <Text>{tags.length - (index + 1)}+</Text>;
    } else {
      return <Text style={{ color: "black" }}>{value}</Text>;
    }
  });
}
const AllNotes = ({
  navigation,
  headerPositionY,
  headerHeight,
  headertitleHeight,
}) => {
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
  const [loaded, setLoaded] = useState(false);
  useDerivedValue(() => {
    if (headertitleHeight.value > 0) {
      runOnJS(setLoaded)(true);
    }
  }, [headertitleHeight]);

  // load if calculated header height
  if (loaded) {
    return (
      <View style={styles.container}>
        <AniMasonry
          onScroll={scrollHandler}
          contentContainerStyle={{
            paddingTop: headertitleHeight.value + 10,
            paddingBottom: 80,
          }}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => {
            const even = index % 2 === 0 ? true : false;
            return (
              <Animated.View
                style={[
                  styles.node,
                  {
                    marginLeft: even ? "6%" : "3%",
                    marginRight: even ? "3%" : "6%",
                    marginBottom: "6%",
                  },
                ]}
                entering={index < 8 ? FadeInDown.delay(index * 50) : null}
              >
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {item.timestamp.split(",")[0]}
                </Text>
                <Text numberOfLines={3} style={styles.nodetitle}>
                  {item.title}
                </Text>
                {/* tags */}
                <View style={styles.tagsrow}>
                  {item.tags.map((value, index) => {
                    if (index > 2) {
                      return null;
                    } else {
                      return (
                        <Text
                          key={index}
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          style={[
                            styles.tagStyle,
                            index === 2
                              ? {
                                  flex: 1,
                                }
                              : null,
                          ]}
                        >
                          {index === 2 ? `${item.tags.length - index}+` : value}{" "}
                        </Text>
                      );
                    }
                  })}
                </View>

                <Text style={styles.nodetext}>{item.note}</Text>
              </Animated.View>
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
                fontWeight: "bold",
                letterSpacing: -1,
              }}
            >
              Add new note
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  } else {
    return (
      <ActivityIndicator size={"large"} color={"black"} style={{ flex: 1 }} />
    );
  }
};

export default AllNotes;

const styles = StyleSheet.create({
  container: { flex: 1 },
  node: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    gap: 5,
    borderRadius: 12,
    maxHeight: 400,
    overflow: "hidden",
  },
  tagsrow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  tagStyle: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    maxWidth: 80,
    borderRadius: 5,
    textTransform: "capitalize",
    color: "#6c6c6c",
  },
  nodetitle: {
    fontSize: 18,
    letterSpacing: -1,
    fontWeight: "400",
    color: "black",
  },
  nodetext: {
    fontSize: 14,
    color: "#00000074",
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
