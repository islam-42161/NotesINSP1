import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  interpolate,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import AllNotes from "./AllNotes";
import Folders from "./Folders";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const { height, width } = Dimensions.get("window");
const pages = ["All Notes", "Folders"];
const PageTitle = ({ title, scrollX, pageindex, scrollref }) => {
  const handlePageChangePress = () => {
    if (Math.round(scrollX.value / width) != pageindex) {
      scrollX.value = runOnUI(scrollTo)(scrollref, pageindex * width, 0, true);
    }
  };
  const indicatorWidth = useSharedValue(0);
  const indicatorStyle = useAnimatedStyle(() => ({
    width: indicatorWidth.value * 1.4,
    opacity: interpolate(
      scrollX.value,
      pages.map((_, index) => index * width),
      pages.map((_, index) => (index === pageindex ? 1 : 0)),
      Extrapolate.CLAMP
    ),
  }));
  return (
    // <View style={{ width: "50%" }}>
    <Pressable onPress={handlePageChangePress} style={[styles.titleButton]}>
      <Text
        onLayout={(event) =>
          (indicatorWidth.value = event.nativeEvent.layout.width)
        }
        style={styles.pageTitle}
      >
        {title}
      </Text>
      <Animated.View
        style={[
          {
            position: "absolute",
            // width: "140%",
            bottom: 0,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "black",
            // alignSelf: "center",
          },
          indicatorStyle,
        ]}
      />
    </Pressable>
    // </View>
  );
};

const Home = ({ navigation }) => {
  const scrollX = useSharedValue(0);
  const headerHeight = useSharedValue(0);
  const headerPositionY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    // console.log(Math.round(event.contentOffset.x / width));
    scrollX.value = event.contentOffset.x;
  });
  const scrollref = useAnimatedRef();
  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: headerPositionY.value,
      },
    ],
    opacity: interpolate(
      headerPositionY.value,
      [0, -headerHeight.value],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));
  return (
    <View style={styles.root}>
      {/* headercontainer */}
      <Animated.View style={[styles.headercontainer]}>
        {/* header */}
        <View style={styles.header}>
          <Pressable style={styles.header_avatar}>
            <View style={styles.avatar}>
              <Image
                source={
                  "https://images.pexels.com/photos/8388502/pexels-photo-8388502.jpeg"
                }
                contentFit="cover"
                style={StyleSheet.absoluteFill}
              />
            </View>
            <Text style={styles.header_Text}>Floyd Lawton</Text>
          </Pressable>
          <View style={styles.header_icons}>
            <Ionicons name="search" size={24} color="black" />
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </Animated.View>
      {/* body */}
      <View style={styles.body}>
        {/* page titles */}
        <View style={styles.pageTitlesContainer}>
          {pages.map((value, index) => (
            <PageTitle
              title={value}
              key={index}
              scrollX={scrollX}
              pageindex={index}
              scrollref={scrollref}
            />
          ))}
        </View>
        {/* pages scrollview: horizontal */}
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          ref={scrollref}
        >
          <View style={{ width }}>
            <AllNotes
              navigation={navigation}
              headerHeight={headerHeight}
              headerPositionY={headerPositionY}
            />
          </View>
          <View style={{ width }}>
            <Folders
              navigation={navigation}
              headerHeight={headerHeight}
              headerPositionY={headerPositionY}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    // gap: 15,
    paddingTop: STATUSBAR_HEIGHT * 1.5,
  },
  headercontainer: {
    // paddingTop: STATUSBAR_HEIGHT * 1.5,
    paddingHorizontal: "4%",
    backgroundColor: "white",
    rowGap: 10, //necessary
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_avatar: {
    gap: 10,
    // backgroundColor: "pink",
    flexDirection: "row",
    alignItems: "center",
  },
  header_icons: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  header_Text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    flex: 1,
    // rowGap: 10,
  },
  pageTitlesContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingHorizontal: "4%",
    paddingVertical: 15,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: -1,
  },
  titleButton: {
    flex: 1,
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    // backgroundColor: "pink",
  },
});
