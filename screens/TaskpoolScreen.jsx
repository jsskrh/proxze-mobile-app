import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
} from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import { getTaskpool } from "../redux/task/taskActions";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Task from "../components/Taskpool/Task";
import TabLayout from "../components/TabLayout";

const tasks = [];

const TaskpoolScreen = ({ navigation: { navigate } }) => {
  const { success, error, loading, taskpool } = useSelector(
    (state) => state.task
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskpool.length === 0)
      dispatch(getTaskpool({ userToken: userInfo.userToken }));
  }, []);

  useEffect(() => {
    // console.log(taskpool);
    setRefreshing(false);
  }, [taskpool]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Taskpool", headerTitle: "Taskpool" };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <TabLayout config={tabConfig}>
      {loading ? (
        <View className="flex-1 pt-1">
          <View className="mb-3 mx-5">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
            <Text className="text-white text-base font-semibold">
              Tasks you might like...
            </Text>
          </View>
          <View className="gap-y-7">
            {Array(3)
              .fill()
              .map((x, index) => (
                <View className="h-[170px] w-full px-5" key={index}>
                  <View className="bg-zinc-800 rounded-[14px] border w-full h-full p-5">
                    <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 w-28 mb-8"></View>
                    <View className="flex-row justify-between mb-5">
                      <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 w-28 mb-1"></View>
                      <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 w-28 mb-1"></View>
                    </View>
                    <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 w-full mb-4"></View>
                    <View className="flex-row gap-x-6">
                      <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 w-20 mb-1"></View>
                      <View className="h-2 animate-pulse bg-slate-700 rounded-full mt-1 flex-1 mb-1"></View>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={taskpool}
          ListHeaderComponent={() => (
            <View className="mb-3 mx-5">
              <View className="mb-7">
                <Text className="text-white text-3xl font-bold">
                  {tabConfig.title}
                </Text>
              </View>
              <Text className="text-white text-base font-semibold">
                Tasks you might like...
              </Text>
            </View>
          )}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight(),
            paddingTop: 4,
          }}
          renderItem={({ item }) => <Task task={item} navigate={navigate} />}
          ItemSeparatorComponent={() => <View className="h-7"></View>}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() =>
                dispatch(getTaskpool({ userToken: userInfo.userToken }))
              }
            />
          }
        />
      )}
    </TabLayout>
  );
};

export default TaskpoolScreen;
