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
import TransactionItem from "../../components/Account/TransactionItem";
import TransactionView from "../../components/Account/TransactionView";
import { timeAgo, shortenId } from "../../utils/helpers";

const tabConfig = { title: "Earnings", headerTitle: "Earnings" };

const EarningsScreen = ({ navigation: { navigate } }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(false);

  const handleActiveTransaction = (transaction) => {
    setActiveTransaction(transaction);
    setVisible(true);
  };

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
              <TouchableOpacity onPress={() => navigate("Transactions")}>
                <Text className="text-gray-500 font-light">View all</Text>
              </TouchableOpacity>
            </View>
            <View>
              {earningsData.recentTransactions?.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  item={transaction}
                  setVisible={handleActiveTransaction}
                  recent
                />
              ))}
            </View>
          </View>

          <TransactionView
            visible={visible}
            setVisible={setVisible}
            item={activeTransaction}
          />
        </ScrollView>
      )}
    </TabLayout>
  );
};

export default EarningsScreen;
