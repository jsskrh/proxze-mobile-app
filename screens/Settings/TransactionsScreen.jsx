import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import TransactionItem from "../../components/Account/TransactionItem";
import TransactionView from "../../components/Account/TransactionView";
import TabLayout from "../../components/TabLayout";
import { timeAgo, shortenId, convertDate } from "../../utils/helpers";
import { getAllTransactions } from "../../redux/transaction/transactionActions";

const tabConfig = { title: "Transactions", headerTitle: "Transactions" };

const TransactionsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { transactions, loading } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  // const [earningsData, setEarningsData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const handleGetEarningsData = async (message) => {
  //   const {
  //     payload: { data },
  //   } = await dispatch(getAllTransactions());
  //   setEarningsData(data);
  //   console.log(data);
  //   setLoading(false);
  // };

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const [visible, setVisible] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(false);

  const handleActiveTransaction = (transaction) => {
    setActiveTransaction(transaction);
    setVisible(true);
  };

  return (
    <TabLayout config={tabConfig}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={transactions}
          ListHeaderComponent={() => (
            <View className="mb-3 mx-5">
              <View className="mb-7">
                <Text className="text-white text-3xl font-bold">
                  {tabConfig.title}
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <TransactionView
              visible={visible}
              setVisible={setVisible}
              item={activeTransaction}
            />
          )}
          contentContainerStyle={{
            // paddingBottom: useBottomTabBarHeight(),
            paddingTop: 4,
          }}
          renderItem={({ item }) => (
            <TransactionItem
              key={item._id}
              item={item}
              setVisible={handleActiveTransaction}
              recent
            />
          )}
          ItemSeparatorComponent={() => (
            <View className="mx-5 items-end">
              <View className="h-[1px] bg-gray-400 w-4/5"></View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => dispatch(getAllTransactions())}
            />
          }
        />
      )}
    </TabLayout>
  );
};

export default TransactionsScreen;
