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
import {
  LockClosedIcon,
  StarIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  CogIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
} from "react-native-heroicons/outline";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import TabLayout from "../components/TabLayout";
import { testLogout, logout } from "../redux/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const { loading, error, success, userInfo, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const scrollRef = useRef(0);

  // const handleScroll = ({ contentOffset }) => {
  //   setScrollPosition(contentOffset.y);
  //   scrollRef.current = contentOffset.y;
  // };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch(logout());
  };

  const tabConfig = { title: "Account", headerTitle: "Jesse Akorah" };

  const accountSections = [
    {
      title: "Settings",
      data: [
        {
          title: "Earnings",
          color: "rgb(22, 163, 74)",
          icon: <CurrencyDollarIcon color="white" size={20} />,
        },
        {
          title: "Rating & Reviews",
          color: "#FFD700",
          icon: <StarIcon color="white" size={20} />,
        },
      ],
    },
    {
      title: "Settings",
      data: [
        {
          color: "rgb(156 163 175)",
          title: "Contact Info",
          icon: <DevicePhoneMobileIcon color="white" size={20} />,
        },
        {
          color: "rgb(107, 114, 128)",
          title: "Account",
          icon: <CogIcon color="white" size={20} />,
        },
        {
          color: "#C0C0C0",
          title: "Billing & Payment",
          icon: <CreditCardIcon color="white" size={20} />,
        },
        {
          color: "rgb(125, 211, 252)",
          title: "Profile Settings",
          icon: <UserIcon color="white" size={20} />,
        },
        {
          color: "#000",
          title: "Password & Security",
          icon: <LockClosedIcon color="white" size={20} />,
        },
      ],
    },
    {
      title: "Resources",
      data: [
        {
          color: "rgb(37, 99, 235)",
          title: "Support",
          icon: <UserGroupIcon color="white" size={20} />,
        },
      ],
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
          <View className="mb-3">
            {/* <Text className="text-white text-3xl font-bold mx-5">
              {tabConfig.title}
            </Text> */}
            <View className="mx-5 flex-row items-center">
              <View
                className={`h-20 w-20 mr-4 bg-gray-400 rounded-full`}
              ></View>
              <View className="">
                <Text className="text-white text-3xl font-semibold">
                  {userInfo.firstName} {userInfo.lastName}
                </Text>
                <Text className="text-gray-500 text-base">
                  {userInfo.email}
                </Text>
              </View>
            </View>
          </View>
        )}
        sections={accountSections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableHighlight
            className={`bg-zinc-900 mx-5`}
            underlayColor="white"
          >
            <View className="flex-row items-center gap-2 px-4 ">
              <View className="w-[14%] items-center justify-center">
                <View
                  className="h-8 w-8 rounded-lg items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </View>
              </View>
              <View className="flex-1">
                <View className="flex-row flex-1 items-center justify-between py-4">
                  <Text className="text-white text-base">{item.title}</Text>
                  <ChevronRightIcon color="#888" size={17} />
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => (
          <View className="ml-10 mr-5 self-stretch bg-zinc-900">
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
        // renderSectionHeader={({ section: { title } }) => (
        //   <Text className="text-white text-2xl mx-5 font-semibold mt-3">
        //     {title}
        //   </Text>
        // )}
        SectionSeparatorComponent={() => <View className="h-4"></View>}
        ListFooterComponent={() => (
          <View className="mt-5 justify-center items-center">
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-red-600 text-base font-bold">Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </TabLayout>
  );
};

export default AccountScreen;
