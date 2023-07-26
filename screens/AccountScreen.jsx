import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TabLayout from "../components/TabLayout";

const AccountScreen = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const scrollRef = useRef(0);

  // const handleScroll = ({ contentOffset }) => {
  //   setScrollPosition(contentOffset.y);
  //   scrollRef.current = contentOffset.y;
  // };

  const tabConfig = { title: "Account", headerTitle: "Jesse Akorah" };

  const accountSections = [
    {
      title: "Settings",
      data: [
        "Contact Info",
        "Account",
        "Billing & Payment",
        "Profile Settings",
        "Password & Security",
      ],
    },
    {
      title: "Resources",
      data: ["Support"],
    },
  ];

  const settingsOptions = [];

  return (
    <TabLayout config={tabConfig}>
      <SectionList
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
          paddingTop: 4,
        }}
        ListHeaderComponent={() => (
          <View className="">
            <Text className="text-white text-3xl font-bold">
              {tabConfig.title}
            </Text>
          </View>
        )}
        sections={accountSections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableHighlight className={`bg-zinc-900`} underlayColor="white">
            <View className="flex-row items-center gap-2 px-4 ">
              <View className="w-1/6 bg-white"></View>
              <View className="flex-1">
                <View className="flex-row flex-1 items-center justify-between py-4">
                  <Text className="text-white text-base">{item}</Text>
                  <ChevronRightIcon color="#888" size={17} />
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => (
          <View className="ml-4 self-stretch bg-zinc-900">
            <View
              className="w-5/6 self-end border-gray-600"
              // style={{ height: 4, backgroundColor: "white", width: "100%" }}
              style={{
                // borderBottomColor: "white",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            ></View>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-2xl font-semibold mt-3">
            {title}
          </Text>
        )}
        SectionSeparatorComponent={() => <View className="h-3"></View>}
      />
    </TabLayout>
  );
};

export default AccountScreen;
