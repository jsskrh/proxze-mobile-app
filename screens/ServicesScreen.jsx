import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ServiceCard from "../components/ServiceCard";
import Offer from "../components/Task/Offer";
import TabLayout from "../components/TabLayout";
import MessageItem from "../components/Messages/MessageItem";
import {
  mailDate,
  chatDate,
  validateInput,
  convertTo24HourFormat,
} from "../utils/helpers";

const ServicesScreen = ({ navigation: { navigate, goBack } }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Services", headerTitle: "Services" };

  return (
    <TabLayout config={tabConfig}>
      <View className="pb-3 mx-5">
        <View className="mb-5">
          <Text className="text-white text-3xl font-bold">
            {tabConfig.title}
          </Text>
        </View>
      </View>

      <View className="mx-5 flex-row flex-wrap justify-between">
        {["Verification"].map((service, index) => (
          <ServiceCard
            key={index}
            navigate={navigate}
            service={service}
            title={service}
          />
        ))}
      </View>
    </TabLayout>
  );
};

export default ServicesScreen;
