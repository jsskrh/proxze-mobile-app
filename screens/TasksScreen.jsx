import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TabLayout from "../components/TabLayout";
import Task from "../components/Tasks/Task";

const tasks = [
  {
    id: "6438fd7fe99e092cf77b96e2",
    type: "Consultation",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-14T07:15:11.345Z",
        _id: "6438fd7fe99e092cf77b96e3",
      },
      {
        status: "approved",
        timestamp: "2023-04-14T07:18:30.974Z",
        _id: "6438fe46e99e092cf77b970f",
      },
      {
        status: "assigned",
        timestamp: "2023-04-19T07:47:21.787Z",
        _id: "643f9c8b261473e60da20414",
      },
      {
        status: "started",
        timestamp: "2023-04-19T07:48:31.665Z",
        _id: "643f9cd0261473e60da2050e",
      },
      {
        status: "completed",
        timestamp: "2023-04-19T07:51:40.512Z",
        _id: "643f9d8d261473e60da205de",
      },
    ],
    bill: 7838208,
    proxzi: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-02-14T07:15:11.345Z",
    endDate: "2023-08-14T07:15:11.345Z",
  },
  {
    id: "64391815e99e092cf77b97ad",
    type: "Errand",
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
    proxzi: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-03-14T07:15:11.345Z",
    endDate: "2023-07-14T07:15:11.345Z",
  },
  {
    id: "643ea5a8807a4de5bdd67ce7",
    type: "Consultation",
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
    proxzi: "Test1 Akorah",
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
    proxzi: "Test1 Akorah",
    principal: "Jesse Akorah",
    startDate: "2023-07-14T07:15:11.345Z",
    endDate: "2023-08-14T07:15:11.345Z",
  },
];

const TasksScreen = ({ navigation: { navigate } }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Tasks", headerTitle: "Tasks" };

  return (
    <TabLayout config={tabConfig}>
      <FlatList
        data={tasks}
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
          <Task
            task={item}
            index={index}
            navigate={navigate}
            lastActivity={item.timeline[item.timeline.length - 1]}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-zinc-600 mx-5"></View>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </TabLayout>
  );
};

export default TasksScreen;
