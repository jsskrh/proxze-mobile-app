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

const ContactInfoScreen = ({ navigation: { navigate } }) => {
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Contact Info", headerTitle: "Contact Info" };

  const [refreshing, setRefreshing] = useState(false);

  const [archive, setArchive] = useState([]);

  const [loading, setLoading] = useState(false);

  // const fetcher = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     };
  //     const { data } = await axios.get(
  //       `https://proxze-backend-app.onrender.com/api/task/history`,
  //       config
  //     );
  //     setArchive(data.data);
  //     setLoading(false);
  //     setRefreshing(false);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //     // if (error.response && error.response.data.message) {
  //     //   return rejectWithValue(error.response.data.message);
  //     // } else {
  //     //   return rejectWithValue(error.message);
  //     // }
  //   }
  // };

  // useEffect(() => {
  //   fetcher();
  //   // console.log(test);
  //   if (!loading) {
  //     setRefreshing(false);
  //     // console.log("archive", archive);
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   console.log("archive", archive);
  // }, [archive]);

  // useEffect(() => {
  //   fetcher();
  // }, []);

  const contactData = [
    { title: "User ID", value: userInfo.id, id: "0" },
    { title: "Name", value: `${userInfo.firstName} ${userInfo.lastName}` },
    { title: "Email", value: userInfo.email },
    // {
    //   title: "Location",
    //   value: `[${userInfo.location.lat}, ${userInfo.location.lng}]`,
    // },
  ];

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <TabLayout config={tabConfig}>
      {loading || refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={contactData}
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
          // ListFooterComponent={() => (
          //   <View className="mx-5 border-t-[1px] border-zinc-600"></View>
          // )}
          contentContainerStyle={{
            // paddingBottom: useBottomTabBarHeight(),
            paddingTop: 4,
          }}
          renderItem={({ item, index }) => (
            <View className="px-5">
              <Text className="text-white font-semibold mb-2">
                {item.title}
              </Text>
              <Text className="text-white">{item.value}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="h-5"></View>}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                // dispatch(getOngoingTasks({ userToken }));
                fetcher();
              }}
            />
          }
        />
      )}
    </TabLayout>
  );
};

export default ContactInfoScreen;
