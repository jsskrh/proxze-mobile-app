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
import { ChevronRightIcon } from "react-native-heroicons/solid";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import TabLayout from "../../components/TabLayout";

const LegalScreen = ({ navigation: { navigate, goBack } }) => {
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Legal", headerTitle: "Legal" };

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
    { title: "Privacy Policy", value: "2349975", id: "0" },
    { title: "Terms of Use", value: `Test User` },
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
            <View className="mb-3 mx-5">
              <View className="mb-7">
                <Text className="text-white text-3xl font-bold">
                  {tabConfig.title}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{
            paddingTop: 4,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="mx-5 bg-neutral-800 p-3 px-5 flex-row justify-between items-center rounded-lg">
              <Text className="text-white font-semibold text-xl">
                {item.title}
              </Text>
              <ChevronRightIcon color="#888" size={17} />
            </TouchableOpacity>
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
                // fetcher();
              }}
            />
          }
        />
      )}
    </TabLayout>
  );
};

export default LegalScreen;
