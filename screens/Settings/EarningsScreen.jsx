import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
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
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import { getEarnings } from "../../redux/transaction/transactionActions";
import TabLayout from "../../components/TabLayout";
import EarningsChart from "../../components/Account/EarningsChart";
import { timeAgo, shortenId } from "../../utils/helpers";

const tabConfig = { title: "Earnings", headerTitle: "Earnings" };

const EarningsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetEarningsData = async (message) => {
    const {
      payload: { data },
    } = await dispatch(getEarnings());
    setEarningsData(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetEarningsData();
  }, []);

  return (
    <TabLayout config={tabConfig}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="pb-3 mx-5">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
          </View>

          <View className="mx-5 mb-10">
            <Text className="text-white font-semibold">Current Balance</Text>
            <Text className="text-white font-bold text-3xl">
              N{earningsData.balance}
            </Text>
            <Text className="text-neutral-600 font-semibold">
              N{earningsData.totalEarnings} all time
            </Text>
          </View>

          <View className="mx-5 mb-10">
            <View className="bg-neutral-800 rounded-xl pt-4 ">
              <View className="mx-4 mb-1">
                <Text className="text-white font-light">This month</Text>
                <Text className="text-white text-2xl">
                  N{earningsData.currentMonthTotal}
                </Text>
                <Text className="text-neutral-500">
                  {earningsData.percentageChange}% from last month
                </Text>
              </View>

              <EarningsChart monthlyEarnings={earningsData.monthlyEarnings} />
            </View>
          </View>

          <View className="mb-5">
            <View className="mx-5 flex-row justify-between items-center mb-7">
              <Text className="text-base font-semibold text-white">
                Recent Transactions
              </Text>
              <Text className="text-gray-500 font-light">View all</Text>
            </View>
            <View>
              {earningsData.recentTransactions?.map((transaction, index) => (
                <TouchableOpacity
                  key={transaction._id}
                  className="relative px-5 flex-1 flex-row items-center"
                >
                  <View className="w-1/5 rounded-l-xl items-center justify-center">
                    <View className="h-[52px] w-[52px] p-3 rounded-full justify-center items-center bg-neutral-700">
                      {transaction.transactionType === "CR" ? (
                        <ArrowDownRightIcon color="#38a139" />
                      ) : (
                        <ArrowUpRightIcon color="rgb(220, 38, 38)" />
                      )}
                    </View>
                  </View>
                  <View
                    className={`mx-2 py-3 ${
                      earningsData.recentTransactions.length === index + 1
                        ? ""
                        : "border-b"
                    } border-gray-400 flex-1`}
                  >
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-white">
                        {transaction.createdAt}
                      </Text>
                      <Text className="text-white font-bold">
                        {transaction.transactionType === "CR" ? "+" : "-"}{" "}
                        {parseFloat(transaction.amount.toString())}
                      </Text>
                    </View>
                    <View className="">
                      <Text className="text-base font-semibold text-white">
                        # {transaction._id}
                      </Text>
                      {/* <Text className="font-light mb-1 text-xs text-neutral-400">
                      {transaction.summary}
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
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </TabLayout>
  );
};

export default EarningsScreen;
