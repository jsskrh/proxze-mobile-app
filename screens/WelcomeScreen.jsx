import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import OnboardingItem from "../components/OnboardingItem";
import Paginator from "../components/Paginator";

const slides = [
  {
    id: "1",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: "",
  },
  {
    id: "2",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: "",
  },
  {
    id: "3",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: "",
  },
  {
    id: "4",
    title: "Have work done anywhere and anytime",
    description:
      "Find the proxze or task that best fits your skills, interests or job",
    image: "",
  },
];

const WelcomeScreen = ({ navigation: { navigate } }) => {
  const theme = useColorScheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <SafeAreaView
      className={`${theme === "light" ? "bg-[#ecffe0]" : "bg-black"} flex-1`}
    >
      <View className="flex-[3]">
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnboardingItem item={item} theme={theme} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View className="items-center my-7">
        <Paginator data={slides} scrollX={scrollX} />
      </View>
      {currentIndex === 3 ? (
        <View className="px-5 py-10 flex-row justify-between">
          <TouchableOpacity
            className="py-4 px-5 w-[48%] rounded-xl items-center border border-gray-700"
            onPress={() => navigate("Login")}
          >
            <Text
              className={`"font-poppins font-semibold ${
                theme === "light" ? "text-black" : "text-white"
              }"`}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-4 px-5 w-[48%] rounded-xl items-center bg-gray-700"
            onPress={() => navigate("RegisterOne")}
          >
            <Text className="font-poppins font-semibold text-white">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-5 py-10">
          <TouchableOpacity
            className="py-4 px-5 w-full rounded-xl items-center bg-white"
            onPress={scrollTo}
          >
            <Text className="font-poppins font-semibold text-[#5B7184]">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
