import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import TabLayout from "../components/TabLayout";
import MessageItem from "../components/Messages/MessageItem";
import {
  mailDate,
  chatDate,
  validateInput,
  convertTo24HourFormat,
} from "../utils/helpers";
import { getAllChats } from "../redux/chat/chatActions";

const MessagesScreen = ({ navigation: { navigate } }) => {
  const { success, error, loading, chats } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChats());
    // if (chats.all.length === 0) dispatch(getAllChats());
  }, []);

  // useEffect(() => {
  //   // console.log(taskpool);
  //   setRefreshing(false);
  // }, [taskpool]);

  const tabConfig = { title: "Messages", headerTitle: "Messages" };

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
  }, [chats]);

  return (
    <TabLayout config={tabConfig}>
      {loading || refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={chats.all}
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
            paddingBottom: useBottomTabBarHeight(),
            paddingTop: 4,
          }}
          renderItem={({ item, index }) => (
            <MessageItem
              navigate={navigate}
              conversation={item}
              index={index}
              converserInfo={item.users.find(
                (user) => user._id !== userInfo.id
              )}
            />
          )}
          // ItemSeparatorComponent={() => <View className="h-7"></View>}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                dispatch(getAllChats());
              }}
            />
          }
        />
      )}
    </TabLayout>
  );
};

export default MessagesScreen;
