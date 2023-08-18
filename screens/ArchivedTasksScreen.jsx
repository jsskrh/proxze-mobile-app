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

const tasks = [
  {
    id: "643e8a282e7ef703656b4356",
    type: "Errand",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-18T12:16:40.700Z",
        _id: "643e8a282e7ef703656b4357",
      },
      {
        status: "approved",
        timestamp: "2023-04-18T13:48:28.251Z",
        _id: "643e9faca1b5e865d6a58676",
      },
      {
        status: "assigned",
        timestamp: "2023-04-19T07:47:38.217Z",
        _id: "643f9c9b261473e60da2045a",
      },
      {
        status: "started",
        timestamp: "2023-04-19T07:49:04.279Z",
        _id: "643f9cf0261473e60da20550",
      },
      {
        status: "completed",
        timestamp: "2023-04-19T07:52:56.955Z",
        _id: "643f9dda261473e60da206c9",
      },
      {
        status: "confirmed",
        timestamp: "2023-04-19T08:57:43.973Z",
        _id: "643fad0ae485dac2eef7e35e",
      },
    ],
    bill: 979776,
    proxze: "Test1 Akorah",
    principal: "Jesse Akorah",
  },
  {
    id: "642f8d8f7bee387512ad7369",
    type: "Confirmation",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-07T03:27:11.469Z",
        _id: "642f8d8f7bee387512ad736a",
      },
      {
        status: "approved",
        timestamp: "2023-04-07T03:32:08.169Z",
        _id: "642f8eb833dd9dc0b5bd88c0",
      },
      {
        status: "assigned",
        timestamp: "2023-04-07T03:54:43.952Z",
        _id: "642f94032e730b243e41a1fc",
      },
      {
        status: "started",
        timestamp: "2023-04-07T03:56:22.954Z",
        _id: "642f94662e730b243e41a220",
      },
      {
        status: "completed",
        timestamp: "2023-04-07T03:57:43.136Z",
        _id: "642f94b72e730b243e41a25f",
      },
      {
        status: "confirmed",
        timestamp: "2023-04-07T03:58:27.597Z",
        _id: "642f94e32e730b243e41a28f",
      },
    ],
    bill: 6096384,
    proxze: "Test1 Akorah",
    principal: "Test0 Akorah",
  },
  {
    id: "642d7a9bc03595a32b77ea4b",
    type: "Consultation",
    timeline: [
      {
        status: "created",
        timestamp: "2023-04-05T12:58:03.883Z",
        _id: "642d7a9bc03595a32b77ea4c",
      },
      {
        status: "approved",
        timestamp: "2023-04-05T12:58:03.883Z",
        _id: "642d7afdc03595a32b77ea75",
      },
      {
        status: "assigned",
        timestamp: "2023-04-05T14:31:15.158Z",
        _id: "642d8633d1d01a8c15b2852a",
      },
      {
        status: "started",
        timestamp: "2023-04-05T17:10:51.852Z",
        _id: "642dab9bd1d01a8c15b285ce",
      },
      {
        status: "completed",
        timestamp: "2023-04-06T19:29:20.583Z",
        _id: "642f1dec6d79f5789b8f7846",
      },
      {
        status: "confirmed",
        timestamp: "2023-04-06T23:49:23.457Z",
        _id: "642f5a83d740657f4b51ba32",
      },
    ],
    bill: 15676416,
    proxze: "Test1 Akorah",
    principal: "Test0 Akorah",
  },
];

// const tasks = [
//   {
//     id: "6438fd7fe99e092cf77b96e2",
//     type: "Consultation",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-14T07:15:11.345Z",
//         _id: "6438fd7fe99e092cf77b96e3",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-14T07:18:30.974Z",
//         _id: "6438fe46e99e092cf77b970f",
//       },
//       {
//         status: "assigned",
//         timestamp: "2023-04-19T07:47:21.787Z",
//         _id: "643f9c8b261473e60da20414",
//       },
//       {
//         status: "started",
//         timestamp: "2023-04-19T07:48:31.665Z",
//         _id: "643f9cd0261473e60da2050e",
//       },
//       {
//         status: "completed",
//         timestamp: "2023-04-19T07:51:40.512Z",
//         _id: "643f9d8d261473e60da205de",
//       },
//     ],
//     bill: 7838208,
//     proxze: "Test1 Akorah",
//     principal: "Jesse Akorah",
//     startDate: "2023-02-14T07:15:11.345Z",
//     endDate: "2023-08-14T07:15:11.345Z",
//   },
//   {
//     id: "64391815e99e092cf77b97ad",
//     type: "Errand",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-14T09:08:37.481Z",
//         _id: "64391815e99e092cf77b97ae",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-14T09:09:36.364Z",
//         _id: "64391850e99e092cf77b97d6",
//       },
//       {
//         status: "assigned",
//         timestamp: "2023-04-19T07:47:52.038Z",
//         _id: "643f9ca9261473e60da204a2",
//       },
//       {
//         status: "started",
//         timestamp: "2023-04-19T07:48:47.382Z",
//         _id: "643f9cdf261473e60da2052f",
//       },
//       {
//         status: "completed",
//         timestamp: "2023-04-19T07:52:14.139Z",
//         _id: "643f9daf261473e60da20645",
//       },
//     ],
//     bill: 4572288,
//     proxze: "Test1 Akorah",
//     principal: "Jesse Akorah",
//     startDate: "2023-03-14T07:15:11.345Z",
//     endDate: "2023-07-14T07:15:11.345Z",
//   },
//   {
//     id: "643ea5a8807a4de5bdd67ce7",
//     type: "Consultation",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-18T14:14:00.958Z",
//         _id: "643ea5a8807a4de5bdd67ce8",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-18T14:16:53.342Z",
//         _id: "643ea655376f6a8d70369054",
//       },
//       {
//         status: "assigned",
//         timestamp: "2023-05-22T19:24:57.190Z",
//         _id: "646bc18a34865ff36f32d4b4",
//       },
//       {
//         status: "started",
//         timestamp: "2023-05-22T19:28:00.959Z",
//         _id: "646bc24134865ff36f32d57e",
//       },
//       {
//         status: "completed",
//         timestamp: "2023-06-22T19:02:02.930Z",
//         _id: "64949aab8e1f8887ba0727df",
//       },
//     ],
//     bill: 1469664,
//     proxze: "Test1 Akorah",
//     principal: "Jesse Akorah",
//     startDate: "2023-05-14T07:15:11.345Z",
//     endDate: "2023-09-14T07:15:11.345Z",
//   },
//   {
//     id: "647928de06b56acb9134d574",
//     type: "Verification",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-06-01T23:25:18.310Z",
//         _id: "647928de06b56acb9134d575",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-06-01T23:26:18.929Z",
//         _id: "6479291a06b56acb9134d614",
//       },
//       {
//         status: "assigned",
//         timestamp: "2023-06-02T09:16:40.708Z",
//         _id: "6479b37968b699ea77c6fcd3",
//       },
//       {
//         status: "started",
//         timestamp: "2023-06-22T19:02:44.517Z",
//         _id: "64949ad48e1f8887ba07286f",
//       },
//       {
//         status: "completed",
//         timestamp: "2023-06-22T19:17:44.647Z",
//         _id: "64949e598e1f8887ba0728f9",
//       },
//     ],
//     bill: 1306368,
//     proxze: "Test1 Akorah",
//     principal: "Jesse Akorah",
//     startDate: "2023-07-14T07:15:11.345Z",
//     endDate: "2023-08-14T07:15:11.345Z",
//   },
// ];

const ArchivedTasksScreen = ({ navigation: { navigate } }) => {
  const { userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Archived Tasks", headerTitle: "Archived Tasks" };

  const [refreshing, setRefreshing] = useState(false);

  const [archive, setArchive] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetcher = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `https://proxze-backend-app.onrender.com/api/task/history`,
        config
      );
      setArchive(data.data);
      setLoading(false);
      setRefreshing(false);
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
    fetcher();
    // console.log(test);
    if (!loading) {
      setRefreshing(false);
      // console.log("archive", archive);
    }
  }, [loading]);

  useEffect(() => {
    console.log("archive", archive);
  }, [archive]);

  // useEffect(() => {
  //   fetcher();
  // }, []);

  return (
    <TabLayout config={tabConfig}>
      {loading || refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={archive}
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
              archive
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

export default ArchivedTasksScreen;
