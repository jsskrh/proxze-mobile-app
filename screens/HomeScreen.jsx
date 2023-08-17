import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
} from "react-native-heroicons/outline";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { MapPinIcon, NoSymbolIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Task from "../components/Tasks/Task";
import TabLayout from "../components/TabLayout";
import {
  shortenId,
  updateColor,
  timeDue,
  convertDateWithoutTime,
} from "../utils/helpers";

const tasks = [
  {
    id: "64391815e99e092cf77b97ad",
    type: "Verification",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-14T09:08:37.481Z",
        _id: "64391815e99e092cf77b97ae",
      },
      {
        status: "approved",
        timestamp: "2023-04-14T09:09:36.364Z",
        _id: "64391850e99e092cf77b97d6",
      },
      {
        status: "assigned",
        timestamp: "2023-04-19T07:47:52.038Z",
        _id: "643f9ca9261473e60da204a2",
      },
      {
        status: "started",
        timestamp: "2023-04-19T07:48:47.382Z",
        _id: "643f9cdf261473e60da2052f",
      },
      {
        status: "completed",
        timestamp: "2023-04-19T07:52:14.139Z",
        _id: "643f9daf261473e60da20645",
      },
    ],
    bill: 4572288,
    proxze: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-03-14T07:15:11.345Z",
    endDate: "2023-07-14T07:15:11.345Z",
  },
  {
    id: "643ea5a8807a4de5bdd67ce7",
    type: "Verification",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-18T14:14:00.958Z",
        _id: "643ea5a8807a4de5bdd67ce8",
      },
      {
        status: "approved",
        timestamp: "2023-04-18T14:16:53.342Z",
        _id: "643ea655376f6a8d70369054",
      },
      {
        status: "assigned",
        timestamp: "2023-05-22T19:24:57.190Z",
        _id: "646bc18a34865ff36f32d4b4",
      },
      {
        status: "started",
        timestamp: "2023-05-22T19:28:00.959Z",
        _id: "646bc24134865ff36f32d57e",
      },
      {
        status: "completed",
        timestamp: "2023-06-22T19:02:02.930Z",
        _id: "64949aab8e1f8887ba0727df",
      },
    ],
    bill: 1469664,
    proxze: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-05-14T07:15:11.345Z",
    endDate: "2023-09-14T07:15:11.345Z",
  },
  {
    id: "647928de06b56acb9134d574",
    type: "Verification",
    timeline: [
      {
        status: "created",
        timestamp: "2023-06-01T23:25:18.310Z",
        _id: "647928de06b56acb9134d575",
      },
      {
        status: "approved",
        timestamp: "2023-06-01T23:26:18.929Z",
        _id: "6479291a06b56acb9134d614",
      },
      {
        status: "assigned",
        timestamp: "2023-06-02T09:16:40.708Z",
        _id: "6479b37968b699ea77c6fcd3",
      },
      {
        status: "started",
        timestamp: "2023-06-22T19:02:44.517Z",
        _id: "64949ad48e1f8887ba07286f",
      },
      {
        status: "completed",
        timestamp: "2023-06-22T19:17:44.647Z",
        _id: "64949e598e1f8887ba0728f9",
      },
    ],
    bill: 1306368,
    proxze: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-07-14T07:15:11.345Z",
    endDate: "2023-08-14T07:15:11.345Z",
  },
];

const HomeScreen = ({ navigation: { navigate } }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Home", headerTitle: "Home" };

  return (
    <TabLayout config={tabConfig}>
      <View className="mb-3 mx-5">
        <View className="mb-7">
          <Text className="text-gray-400 text-xl font-semibold">Welcome,</Text>
          <Text className="text-white text-3xl font-bold">John Doe</Text>
        </View>
      </View>
      <View className="mb-7 mx-5 flex-row justify-between items-center">
        {/* <View></View> */}
        <TouchableOpacity
          className="px-3 py-2 bg-[#38a139] rounded-lg items-center"
          onPress={() => navigate("RequestStack")}
        >
          <Text className="text-white capitalize font-semibold text-sm">
            New Request
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mb-7 mx-5 bg-zinc-800 p-4 rounded-xl">
        <View className="flex-row items-center">
          <View className="">
            <View className="flex-row items-center mb-2">
              <Text className={`text-base font-semibold text-white`}>
                Verification
              </Text>
              <View className="p-1 px-3 ml-3 rounded bg-blue-300">
                <Text className="text-blue-700 font-semibold">
                  {shortenId("64391815e99e092cf77b97ad")}
                </Text>
              </View>
            </View>
            <Text className={`flex-row items-center mb-2`}>
              <MapPinIcon size={16} color="#91e6b3" />
              <Text className="text-gray-500 ml-2">Apapa, Lagos</Text>
            </Text>
            <View className="flex-row pl-1 items-center">
              <View className="h-2.5 w-2.5 rounded-full mr-1 bg-red-600"></View>
              <Text className="text-base text-white">Live</Text>
            </View>
          </View>
          <View className="flex-1 flex-row justify-end items-center">
            <View className="justify-center items-center h-20 w-20 rounded-full bg-white mr-5">
              <View className="h-[76px] w-[76px] rounded-full bg-black"></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View>
        <View className="flex-row justify-between items-center mb-3 mx-5">
          <Text className="text-white font-semibold text-lg">
            Ongoing Tasks
          </Text>
          <TouchableOpacity>
            <Text className="text-gray-500">View all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="h-[1px] bg-zinc-600 mx-5"></View>
          {tasks.map((item, index) => (
            <>
              <Task
                home
                key={index}
                task={item}
                index={index}
                navigate={navigate}
                lastActivity={item.timeline[item.timeline.length - 1]}
              />
              <View
                key={index + 10}
                className="h-[1px] bg-zinc-600 mx-5"
              ></View>
            </>
          ))}
        </View>
      </View>
    </TabLayout>
  );
};

export default HomeScreen;
