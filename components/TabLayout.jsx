import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = ({ config, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  // const handleScroll = ({ contentOffset }) => {
  //   setScrollPosition(contentOffset.y);
  //   scrollRef.current = contentOffset.y;
  // };

  return (
    <SafeAreaView
      className={`${config.bg ? config.bg : "bg-black"} flex-1 text-white`}
      style={{ backgroundColor: config.bg ? config.bg : "black" }}
    >
      <View className="mt-0 flex-1">
        {/* <View
          className={`mt-2 px-5 flex-row h-9 border-b items-center justify-evenly`}
        >
          <View></View>
          <View>
            {scrollPosition >= 40 && (
              <Text className="text-white font-semibold">
                {config.headerTitle}
              </Text>
            )}
          </View>
          <View></View>
        </View> */}
        {children}
      </View>
    </SafeAreaView>
  );
};

export default TabLayout;
