import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import TabLayout from "../components/TabLayout";
import Task from "../components/Tasks/Task";
import { getOngoingTasks } from "../redux/task/taskActions";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
  ArchiveBoxIcon,
} from "react-native-heroicons/outline";

const TasksScreen = ({ navigation: { navigate, setOptions } }) => {
  const { userToken } = useSelector((state) => state.auth);
  const { loading, ongoingTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOngoingTasks());
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Tasks", headerTitle: "Tasks" };

  const [refreshing, setRefreshing] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [sort, setSort] = useState(true);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity style={{ marginRight: 12 }}>
            <FunnelIcon color="#91e6b3" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setSort(!sort)}>
            <Bars3BottomRightIcon color="#91e6b3" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [setOptions]);

  useEffect(() => {
    let tasks = [...ongoingTasks];
    const sorted = tasks.sort((a, b) => {
      // const dateA = new Date(a.createdBy);
      // const dateB = new Date(b.createdBy);

      if (sort) {
        return a.createdAt - b.createdAt;
      } else {
        return b.createdAt - a.createdAt;
      }
    });

    setTasks(tasks);
  }, [ongoingTasks, sort]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  return (
    <TabLayout config={tabConfig}>
      {/* {loading || refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : ( */}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              dispatch(getOngoingTasks());
            }}
          />
        }
      />
      {/* )} */}
    </TabLayout>
  );
};

export default TasksScreen;
