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
import Task from "../components/Task";
import TabLayout from "../components/TabLayout";

// const tasks = [
//   {
//     id: "643ed6547e34ecbfed81f335",
//     type: "Consultation",
//     description:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-18T17:41:40.530Z",
//         _id: "643ed6547e34ecbfed81f336",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-18T17:43:38.029Z",
//         _id: "643ed6ca7e34ecbfed81f342",
//       },
//     ],
//     lga: "Oriade",
//     state: "Lagos",
//     bill: 381024,
//   },
//   {
//     id: "643ea5d8807a4de5bdd67cec",
//     type: "Verification",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam laudantium ducimus! Debitis exercitationem eius possimus suscipit laboriosam atque tempore non repudiandae blanditiis sit. Voluptatem saepe est eaque maiores dolor?\nQuisquam vitae enim voluptates asperiores dolore mollitia iure magnam ab, saepe molestias omnis sapiente iusto, ea, perferendis exercitationem recusandae. Nam sint ipsum voluptate voluptas amet quo similique asperiores illo dolores.\nAssumenda totam nemo accusantium sed. Id delectus rem at nam maxime, minus reprehenderit dicta doloremque provident a deserunt dolor explicabo hic illum, magni nobis. Optio sint tempore velit odio quos!",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-18T14:14:48.209Z",
//         _id: "643ea5d8807a4de5bdd67ced",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-18T14:17:04.659Z",
//         _id: "643ea660376f6a8d7036906b",
//       },
//     ],
//     lga: "Epe",
//     state: "Lagos",
//     bill: 1143072,
//   },
//   {
//     id: "642a9f47cd3a246222ff6fef",
//     type: "Errand",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam laudantium ducimus! Debitis exercitationem eius possimus suscipit laboriosam atque tempore non repudiandae blanditiis sit. Voluptatem saepe est eaque maiores dolor?\nQuisquam vitae enim voluptates asperiores dolore mollitia iure magnam ab, saepe molestias omnis sapiente iusto, ea, perferendis exercitationem recusandae. Nam sint ipsum voluptate voluptas amet quo similique asperiores illo dolores.\nAssumenda totam nemo accusantium sed. Id delectus rem at nam maxime, minus reprehenderit dicta doloremque provident a deserunt dolor explicabo hic illum, magni nobis. Optio sint tempore velit odio quos!",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-03T09:41:18.737Z",
//         _id: "642a9f47cd3a246222ff6ff0",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-06-01T23:26:01.511Z",
//         _id: "6479290906b56acb9134d5ef",
//       },
//     ],
//     lga: "Ayobo-Ipaja",
//     state: "Lagos",
//     bill: 7715736,
//   },
//   {
//     id: "643ed6547e34ecbfed81f331",
//     type: "Consultation",
//     description:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-18T17:41:40.530Z",
//         _id: "643ed6547e34ecbfed81f336",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-18T17:43:38.029Z",
//         _id: "643ed6ca7e34ecbfed81f342",
//       },
//     ],
//     lga: "Oriade",
//     state: "Lagos",
//     bill: 381024,
//   },
//   {
//     id: "643ea5d8807a4de5bdd67ce2",
//     type: "Verification",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam laudantium ducimus! Debitis exercitationem eius possimus suscipit laboriosam atque tempore non repudiandae blanditiis sit. Voluptatem saepe est eaque maiores dolor?\nQuisquam vitae enim voluptates asperiores dolore mollitia iure magnam ab, saepe molestias omnis sapiente iusto, ea, perferendis exercitationem recusandae. Nam sint ipsum voluptate voluptas amet quo similique asperiores illo dolores.\nAssumenda totam nemo accusantium sed. Id delectus rem at nam maxime, minus reprehenderit dicta doloremque provident a deserunt dolor explicabo hic illum, magni nobis. Optio sint tempore velit odio quos!",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-18T14:14:48.209Z",
//         _id: "643ea5d8807a4de5bdd67ced",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-04-18T14:17:04.659Z",
//         _id: "643ea660376f6a8d7036906b",
//       },
//     ],
//     lga: "Epe",
//     state: "Lagos",
//     bill: 1143072,
//   },
//   {
//     id: "642a9f47cd3a246222ff6fec",
//     type: "Errand",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam laudantium ducimus! Debitis exercitationem eius possimus suscipit laboriosam atque tempore non repudiandae blanditiis sit. Voluptatem saepe est eaque maiores dolor?\nQuisquam vitae enim voluptates asperiores dolore mollitia iure magnam ab, saepe molestias omnis sapiente iusto, ea, perferendis exercitationem recusandae. Nam sint ipsum voluptate voluptas amet quo similique asperiores illo dolores.\nAssumenda totam nemo accusantium sed. Id delectus rem at nam maxime, minus reprehenderit dicta doloremque provident a deserunt dolor explicabo hic illum, magni nobis. Optio sint tempore velit odio quos!",
//     timeline: [
//       {
//         status: "created",
//         timestamp: "2023-04-03T09:41:18.737Z",
//         _id: "642a9f47cd3a246222ff6ff0",
//       },
//       {
//         status: "approved",
//         timestamp: "2023-06-01T23:26:01.511Z",
//         _id: "6479290906b56acb9134d5ef",
//       },
//     ],
//     lga: "Ayobo-Ipaja",
//     state: "Lagos",
//     bill: 7715736,
//   },
// ];

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
      {/* <View
        className={`mt-2 px-5 flex-row h-9 border-b items-center justify-evenly`}
      >
        <View className="bg-purple-300"></View>
        <View className="flex-row bg-yellow-200 items-center">
          
          <Text className="text-white font-semibold">Taskpool</Text>
          
        </View>
        <View className="justify-end gap-x-2 bg-violet-300 flex-row">
          <FunnelIcon color="#91e6b3" />
          <Bars3BottomRightIcon color="#91e6b3" />
        </View>
      </View> */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
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
