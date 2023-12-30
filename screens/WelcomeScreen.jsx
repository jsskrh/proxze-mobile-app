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
import Verification from "../assets/images/client-verify.svg";
import Errand from "../assets/images/errand.svg";
import Kyc from "../assets/images/kyc4.svg";
import Map from "../assets/images/map2.svg";
import Consultation from "../assets/images/consultation.svg";

const slides = [
  {
    id: "1",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: <Errand width={250} height={300} />,
  },
  {
    id: "2",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: <Kyc width={250} height={300} />,
  },
  {
    id: "3",
    title: "Lorem Ipsum Dolor",
    description: "Lorem ipsum dolor sit amet consectetur",
    image: <Consultation width={400} height={250} />,
  },
  {
    id: "4",
    title: "Have work done anywhere and anytime",
    description:
      "Find the proxze or task that best fits your skills, interests or job",
    image: <Map width={400} height={300} />,
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
        <Paginator data={slides} scrollX={scrollX} theme={theme} />
      </View>
      {currentIndex === 3 ? (
        <View className="px-5 py-10 flex-row justify-between">
          <TouchableOpacity
            className="py-4 px-5 w-[48%] rounded-xl items-center border border-gray-700"
            onPress={() => navigate("Login")}
          >
            <Text
              className={`font-poppins font-semibold ${
                theme === "light" ? "text-black" : "text-white"
              }`}
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
            className={`py-4 px-5 w-full rounded-xl items-center ${
              theme === "light" ? "bg-principal" : "bg-white"
            }`}
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
