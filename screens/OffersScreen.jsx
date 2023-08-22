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
import Offer from "../components/Task/Offer";
import TabLayout from "../components/TabLayout";
import MessageItem from "../components/Messages/MessageItem";
import {
  mailDate,
  chatDate,
  validateInput,
  convertTo24HourFormat,
} from "../utils/helpers";

const OffersScreen = ({
  navigation: { navigate, goBack },
  route: {
    params: { offers, taskId },
  },
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Offers", headerTitle: "Offers" };

  return (
    <TabLayout config={tabConfig}>
      <FlatList
        data={offers}
        ListHeaderComponent={() => (
          <View className="mb-3 mx-5">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{
          // paddingBottom: useBottomTabBarHeight(),
          paddingTop: 4,
        }}
        renderItem={({ item, index }) => (
          <Offer
            offer={item}
            taskId={taskId}
            goBack={goBack}
            navigate={navigate}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-600"></View>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.proxze.id}
      />
    </TabLayout>
  );
};

export default OffersScreen;
