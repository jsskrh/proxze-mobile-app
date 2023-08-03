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
import TabLayout from "../components/TabLayout";
import Notification from "../components/Notifications/Notification";

const notifications = [
  {
    id: "6479b37968b699ea77c6fcdd",
    type: "assign",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "647928de06b56acb9134d574",
      type: "Verification",
    },
    createdAt: "2023-06-02T09:16:41.860Z",
  },
  {
    id: "6479b33268b699ea77c6fcb6",
    type: "assign",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "647928de06b56acb9134d574",
      type: "Verification",
    },
    createdAt: "2023-06-02T09:15:30.323Z",
  },
  {
    id: "64792bb268b699ea77c6fbcc",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "647928de06b56acb9134d574",
      type: "Verification",
    },
    createdAt: "2023-06-01T23:37:22.320Z",
  },
  {
    id: "646bc24234865ff36f32d58a",
    type: "start",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    task: {
      id: "643ea5a8807a4de5bdd67ce7",
      type: "Consultation",
    },
    createdAt: "2023-05-22T19:28:02.319Z",
  },
  {
    id: "643fa45803a3e25388bb326g",
    type: "review",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:20:40.262Z",
  },
  {
    id: "643fa45803a3e25388bb326f",
    type: "review",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:20:40.262Z",
  },
  {
    id: "646bc18b34865ff36f32d4bd",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "643ea5a8807a4de5bdd67ce7",
      type: "Consultation",
    },
    createdAt: "2023-05-22T19:24:59.022Z",
  },
  {
    id: "643fa45803a3e25388bb326e",
    type: "credit",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:20:40.262Z",
  },
  {
    id: "643fa45803a3e25388bb326c",
    type: "confirm",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:20:40.012Z",
  },
  {
    id: "643fa3700bb92d66a080e438",
    type: "credit",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:16:48.320Z",
  },
  {
    id: "643fa3700bb92d66a080e436",
    type: "confirm",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:16:48.093Z",
  },
  {
    id: "643fa00e8b031f3ef171399f",
    type: "credit",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:02:22.411Z",
  },
  {
    id: "643fa00e8b031f3ef171399d",
    type: "confirm",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T08:02:22.082Z",
  },
  {
    id: "643f9cf1261473e60da2055c",
    type: "start",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    task: {
      id: "643e8a282e7ef703656b4356",
      type: "Verification",
    },
    createdAt: "2023-04-19T07:49:05.927Z",
  },
  {
    id: "643f9ce0261473e60da2053b",
    type: "start",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    task: {
      id: "64391815e99e092cf77b97ad",
      type: "Verification",
    },
    createdAt: "2023-04-19T07:48:48.570Z",
  },
  {
    id: "643f9cd1261473e60da2051a",
    type: "start",
    seen: true,
    read: true,
    recipient: "642aa17e47159b317ef5cbbe",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T07:48:33.159Z",
  },
  {
    id: "643f9ca9261473e60da204ab",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "64391815e99e092cf77b97ad",
      type: "Verification",
    },
    createdAt: "2023-04-19T07:47:53.942Z",
  },
  {
    id: "643f9c9b261473e60da20463",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "643e8a282e7ef703656b4356",
      type: "Verification",
    },
    createdAt: "2023-04-19T07:47:39.925Z",
  },
  {
    id: "643f9c8b261473e60da2041d",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "641a27bd5bb881c39313c9ea",
    task: {
      id: "6438fd7fe99e092cf77b96e2",
      type: "Errand",
    },
    createdAt: "2023-04-19T07:47:23.645Z",
  },
  {
    id: "642f94e32e730b243e41a29c",
    type: "confirm",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "642a9e3ec872573ce1cfe9dc",
    task: {
      id: "642f8d8f7bee387512ad7369",
      type: "Consultation",
    },
    createdAt: "2023-04-07T03:58:27.657Z",
  },
  {
    id: "642f94662e730b243e41a22c",
    type: "start",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    task: {
      id: "642f8d8f7bee387512ad7369",
      type: "Consultation",
    },
    createdAt: "2023-04-07T03:56:22.995Z",
  },
  {
    id: "642f94042e730b243e41a205",
    type: "assign",
    seen: true,
    read: false,
    recipient: "642aa17e47159b317ef5cbbe",
    sender: "642a9e3ec872573ce1cfe9dc",
    task: {
      id: "642f8d8f7bee387512ad7369",
      type: "Consultation",
    },
    createdAt: "2023-04-07T03:54:44.008Z",
  },
];

const NotificationsScreen = ({ navigation: { navigate } }) => {
  const tabConfig = { title: "Notifications", headerTitle: "Notifications" };

  return (
    <TabLayout config={tabConfig}>
      <FlatList
        data={notifications}
        ListHeaderComponent={() => (
          <View className="pb-3 mx-5 border-b-[1px] border-zinc-600">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
            {/* <Text className="text-white text-base font-semibold">
              Tasks you might like...
            </Text> */}
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mx-5 border-t-[1px] border-zinc-600"></View>
        )}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
          paddingTop: 4,
        }}
        renderItem={({ item, index }) => (
          <Notification
            notification={item}
            index={index}
            navigate={navigate}
            isLast={notifications.length - 1 === index}
            // lastActivity={item.timeline[item.timeline.length - 1]}
            // archive
          />
        )}
        // ItemSeparatorComponent={() => (
        //   <View className="h-[1px] bg-zinc-600 mx-5"></View>
        // )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </TabLayout>
  );
};

export default NotificationsScreen;
