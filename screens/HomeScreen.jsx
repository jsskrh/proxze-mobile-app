import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
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
import { useSelector, useDispatch } from "react-redux";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import Task from "../components/Tasks/Task";
import TabLayout from "../components/TabLayout";
import ServiceCard from "../components/ServiceCard";
import { getOngoingTasks } from "../redux/task/taskActions";
import { getAllChats } from "../redux/chat/chatActions";
import { getAllNotifications } from "../redux/notification/notificationActions";
import {
  shortenId,
  updateColor,
  timeAgo,
  timeDue,
  convertDateWithoutTime,
} from "../utils/helpers";
import Enterprise from "../assets/images/enterprise.svg";
import Verification from "../assets/images/client-verify.svg";

const HomeScreen = ({ navigation: { navigate } }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { loading: taskLoading, ongoingTasks } = useSelector(
    (state) => state.task
  );
  const { loading: chatLoading } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ongoingTasks.length === 0) {
      dispatch(getOngoingTasks());
      dispatch(getAllChats());
      dispatch(getAllNotifications());
    }
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Home", headerTitle: "Home" };

  const { width } = useWindowDimensions();

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const scrollX = useRef(new Animated.Value(0)).current;
  // const slidesRef = useRef(null);

  // const viewableItemsChanged = useRef(({ viewableItems }) => {
  //   setCurrentIndex(viewableItems[0].id);
  // }).current;

  // const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // const scrollTo = () => {
  //   if (currentIndex < slides.length - 1) {
  //     slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  //   }
  // };

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // useEffect(() => {
  //   console.log(scrollX);
  // });

  useEffect(() => {
    if (slidesRef.current)
      slidesRef.current.scrollToOffset({
        offset: (width - 40) * (3 / 4),
        animated: false,
      });
  }, [slidesRef]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < tasks.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  // Calculate margin for the FlatList items based on the current index
  const getItemMargin = (index) => {
    const marginLeft = index === 0 ? 0 : 20;
    const marginRight = index === tasks.length - 1 ? 20 : 0;
    return { marginLeft, marginRight };
  };

  const calculateScrollOffset = (index) => {
    return index * (width - 60); // Adjust as needed based on your item width and spacing
  };

  const snapToOffsets = ongoingTasks.slice(0, 3).map((x, i) => {
    return i * (width - 40) + (width - 40) * (3 / 4);
  });

  if (taskLoading || chatLoading) {
    return (
      <View className="bg-black flex-1">
        <MotiView
          transition={{
            type: "timing",
          }}
          style={[styles.container, styles.padded]}
          animate={{ backgroundColor: "#000000" }}
        >
          <View className="flex-row justify-between bg-black">
            <View className="flex-row gap-x-4 bg-black">
              <View className="justify-between bg-black">
                <Skeleton colorMode="dark" width={80} height={16} />
                <Spacer height={12} />
                <Skeleton colorMode="dark" width={150} height={20} />
              </View>
            </View>
          </View>
          <Spacer height={40} />
          <Skeleton colorMode="dark" height={140} width={"100%"} />
          <Spacer height={40} />
          <Skeleton colorMode="dark" width={200} />
          <Spacer height={20} />
          <Skeleton colorMode="dark" height={140} width={"100%"} />
          <Spacer height={40} />
          <Skeleton colorMode="dark" width={200} />
          <Spacer height={20} />
          <View className="flex-row justify-between">
            <View className="w-[30%]">
              <Skeleton
                colorMode="dark"
                radius={12}
                height={96}
                width={"100%"}
              />
            </View>
            <View className="w-[30%]">
              <Skeleton
                colorMode="dark"
                radius={12}
                height={96}
                width={"100%"}
              />
            </View>
            <View className="w-[30%]">
              <Skeleton
                colorMode="dark"
                radius={12}
                height={96}
                width={"100%"}
              />
            </View>
          </View>
          <Spacer height={40} />
          <Skeleton colorMode="dark" height={140} width={"100%"} />
        </MotiView>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: useBottomTabBarHeight(),
      }}
      showsVerticalScrollIndicator={false}
      className="bg-black"
    >
      <View className="mb-3 mx-5">
        <View className="mb-7">
          <Text className="text-gray-400 text-xl font-semibold">Welcome,</Text>
          <Text className="text-white text-3xl font-bold">
            {userInfo.firstName} {userInfo.lastName}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="px-5 py-3 mb-7 mx-5 bg-proxze rounded-lg"
        onPress={() => navigate("RequestStack")}
      >
        <View>
          <View className=" justify-between">
            <View className="">
              <Text className="font-bold text-xl pb-2 text-principal">
                New Request
              </Text>
              <Text className="text-black">Start a new request</Text>
            </View>
            <View className="mt-7 p-2 px-3 rounded-xl flex-row items-center justify-between bg-principal">
              <Text className="text-white">Begin request</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* </View> */}

      {ongoingTasks.length > 0 && (
        <View className="mb-7">
          <View className="flex-row justify-between items-center mb-3 mx-5">
            <Text className="text-white font-semibold text-lg">
              Ongoing Tasks
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigate("TasksStack", {
                  screen: "Tasks",
                })
              }
            >
              <Text className="text-gray-500">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <FlatList
              data={ongoingTasks.slice(0, 3)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => navigate("Task", { taskId: item.id })}
                  className={`h-36 bg-blue-500 rounded-xl flex-row`}
                  style={{ width: width - 60 }}
                >
                  <View className="px-5 py-3 justify-between">
                    <View className="">
                      <View className="flex-row pb-2 gap-2 items-center">
                        <Text className="font-bold text-xl text-white">
                          {item.type}
                        </Text>
                        <Text className="text-white">•</Text>
                        <Text className="text-xl font-extralight text-white">
                          {shortenId(item.id)}
                        </Text>
                      </View>
                      <Text className="text-white capitalize">
                        {item.timeline[item.timeline.length - 1].status}{" "}
                        {timeAgo(
                          item.timeline[item.timeline.length - 1].timestamp
                        )}
                      </Text>
                    </View>
                    <View className="py-2 flex-row items-center">
                      <Text>View</Text>
                      <Ionicons name="arrow-forward" size={20} color="black" />
                    </View>
                  </View>
                  <View className="h-full p-4  justify-center items-center">
                    <Verification width={100} height={100} />
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                marginLeft: 20,
                paddingRight: 40,
              }}
              ItemSeparatorComponent={() => <View className="w-5"></View>}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              bounces={false}
              keyExtractor={(item) => item.id}
              // snapToOffsets={snapToOffsets}
              // snapToAlignment={"center"}
              // onScroll={Animated.event(
              //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              //   {
              //     useNativeDriver: false,
              //     listener: (event) => {
              //       const offsetX = event.nativeEvent.contentOffset.x;
              //       console.log(offsetX);
              //       const currentIndex = Math.floor(offsetX / (width + 20));
              //       console.log(currentIndex);
              //       const targetOffset = currentIndex * (width + 20);

              //       // Set the adjusted scroll position
              //       if (slidesRef.current) {
              //         slidesRef.current.scrollToOffset({
              //           offset: targetOffset,
              //           animated: true,
              //         });
              //       }

              //       // Update the current index state if needed
              //       setCurrentIndex(currentIndex);
              //     },
              //   }
              // )}
              // onScroll={Animated.event(
              //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              //   { useNativeDriver: false }
              // )}
              // onScroll={(event) => {
              //   const offsetX = event.nativeEvent.contentOffset.x;
              //   const index = Math.round(offsetX / (width - 60));
              //   const targetOffset = calculateScrollOffset(index);
              //   scrollX.setValue(targetOffset);
              // }}
              // scrollEventThrottle={32}
              // onViewableItemsChanged={viewableItemsChanged}
              // viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>

          {/* <View className="items-center mt-2">
          <Paginator data={adverts} scrollX={scrollX} />
        </View> */}
        </View>
      )}

      <View className="mb-7">
        <View className="flex-row justify-between items-center mb-3 mx-5">
          <Text className="text-white font-semibold text-lg">Services</Text>
          <TouchableOpacity onPress={() => navigate("Services")}>
            <Text className="text-gray-500">View all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row justify-between px-5">
            {/* <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            // className="pt-[10px] px-[15px]"
            horizontal
            showsHorizontalScrollIndicator={false}
          > */}
            {["verififaction"].map((service, index) => (
              <ServiceCard
                key={index}
                navigate={navigate}
                service={service}
                title={service}
              />
            ))}
            {/* </ScrollView> */}
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="mb-7 mx-5 flex-row bg-blue-900 rounded-lg"
        // onPress={() => navigate("RequestStack")}
      >
        <View className="px-5 py-3 flex-1">
          <View className="justify-between">
            <View className="">
              <Text className="font-bold text-xl pb-2 text-secondary">
                Enterprise
              </Text>
              <Text className="text-gray-200">Are you an organization?</Text>
            </View>
            <View className="mt-7 flex-row items-center">
              <Text className="text-black">Learn more</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </View>
          </View>
        </View>
        <View className="w-[30%] items-center justify-center">
          <Enterprise width="100%" height={100} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});

export default HomeScreen;
