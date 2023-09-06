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
import React from "react";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "react-native-heroicons/outline";
import TabLayout from "../../components/TabLayout";
import { timeAgo, shortenId, convertDate } from "../../utils/helpers";
import { getAllTransactions } from "../../redux/transaction/transactionActions";

const TransactionItem = ({ item, recent, setVisible }) => {
  return (
    <TouchableOpacity
      key={item._id}
      className="relative px-5 flex-1 flex-row items-center"
      onPress={() => setVisible(item)}
    >
      <View className="w-1/5 rounded-l-xl items-center justify-center">
        <View className="h-[52px] w-[52px] p-3 rounded-full justify-center items-center bg-neutral-700">
          {item.transactionType === "CR" ? (
            <ArrowDownRightIcon color="#38a139" />
          ) : (
            <ArrowUpRightIcon color="rgb(220, 38, 38)" />
          )}
        </View>
      </View>
      <View
        className={`mx-2 py-3 flex-1
      ${
        !recent && earningsData.recentTransactions.length === index + 1
          ? ""
          : "border-b border-gray-400"
      }`}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white">{convertDate(item.createdAt)}</Text>
          <Text className="text-white font-bold">
            {item.transactionType === "CR" ? "+" : "-"} N
            {parseFloat(item.amount["$numberDecimal"])}
          </Text>
        </View>
        <View className="">
          <Text className="text-base font-semibold text-white">
            # {item._id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;
