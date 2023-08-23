import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import TabLayout from "../../components/TabLayout";
import { timeAgo, shortenId } from "../../utils/helpers";

const tabConfig = { title: "Transactions", headerTitle: "Transactions" };

const TransactionsScreen = () => {
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

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
            {/* {Array(3)
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
              ))} */}
          </View>
        </View>
      ) : (
        <FlatList
          data={data}
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
          renderItem={({ item }) => (
            <TouchableOpacity className="relative px-5 flex-1 flex-row items-center">
              {/* <View className="w-1/5 rounded-l-xl items-center justify-center">
                <View className="h-[52px] w-[52px] p-3 rounded-full justify-center items-center bg-cyan-200">
                  {order.iconType === "svg" ? (
                    <SvgXml xml={order.icon} width="100%" height="100%" />
                  ) : (
                    <Image
                      source={order.icon}
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  )}
                </View>
              </View> */}
              <View className={`mx-2 py-3 flex-1`}>
                <View className="flex-row justify-between">
                  <Text className="text-white">{item.createdAt}</Text>
                  <Text className="text-white">
                    {item.transactionType === "CR" ? "+" : "-"} {item.amount}
                  </Text>
                </View>
                <View className="">
                  <Text className="font-bold text-base text-white">
                    # {shortenId(item._id)}
                  </Text>
                  {/* <Text className="font-light mb-1 text-xs text-neutral-400">
                {item.summary}
              </Text> */}
                  {/* <View>
                    <View className="flex-row items-center">
                      <Ionicons name="shirt" color="#e6b89c" size={16} />
                      <Text className="ml-1 text-xs">
                        {order.numOfClothes}
                      </Text>
                    </View>
                  </View> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-gray-400 w-full"></View>
          )}
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

export default TransactionsScreen;

const data = [
  {
    _id: "64ddf50cb4f901604f506a30",
    amount: 425000,
    transactionType: "CR",
    summary: "Transfer of 425000 for task #64ddb3c2453b2ba01952bdbe",
    createdAt: "2023-08-17T10:23:08.764+00:00",
  },
  {
    _id: "64ddf50998c901604f506a30",
    amount: 425000,
    transactionType: "CR",
    summary: "Transfer of 425000 for task #64ddb3c2453b2ba01952bdbe",
    createdAt: "2023-08-17T10:23:08.764+00:00",
  },
];
