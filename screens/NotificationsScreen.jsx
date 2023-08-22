import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TabLayout from "../components/TabLayout";
import Notification from "../components/Notifications/Notification";
import { getAllNotifications } from "../redux/notification/notificationActions";

const NotificationsScreen = ({ navigation: { navigate } }) => {
  // const { success, error, loading, notifications } = useSelector(
  //   (state) => state.notification
  // );

  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // if (taskpool.length === 0) dispatch(getTaskpool());
  //   if (notifications.all.length === 0)
  //     dispatch(getAllNotifications({ userToken: userInfo.userToken }));
  // }, []);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetcher = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `https://proxze-backend-app.onrender.com/api/notification`,
        config
      );
      setNotifications(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      return error;
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
    }
  };

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  useEffect(() => {
    fetcher();
  }, []);

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
