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
import TabLayout from "../../components/TabLayout";

const BillingPaymentScreen = ({ navigation: { navigate, goBack } }) => {
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = {
    title: "Billing & Payment",
    headerTitle: "Billing & Payment",
  };

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

  const paymentMethod = {
    title: "Payment method",
    data: [
      { title: "Bank", value: userInfo.bank },
      { title: "Account Number", value: userInfo.accountNumber },
    ],
  };

  const billingMethod = {
    title: "Billing method",
    data: [{ title: "Address", value: userInfo.billingMethod, noTitle: true }],
  };

  const contactInfo = [paymentMethod, billingMethod];

  return (
    <TabLayout config={tabConfig}>
      {loading || refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={
            {
              // paddingBottom: useBottomTabBarHeight() + 5,
            }
          }
          className="flex-1"
        >
          <View className="pb-3 mx-5">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
          </View>

          <View className="gap-y-7">
            {contactInfo.map((group, index) => (
              <View className="mx-5 border border-gray-600 p-5 rounded-xl">
                <Text className="text-white text-2xl font-semibold mb-5">
                  {group.title}
                </Text>
                <View className="gap-y-5">
                  {group.data.map((info, index) => (
                    <View className="">
                      {!info.noTitle && (
                        <Text className="text-white font-semibold mb-2">
                          {info.title}
                        </Text>
                      )}
                      {info.value ? (
                        <Text className="text-white">{info.value}</Text>
                      ) : (
                        <Text className="text-white font-semibold">
                          You have not set up any {info.title} information yet.
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </TabLayout>
  );
};

export default BillingPaymentScreen;
