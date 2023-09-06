import {
  View,
  Text,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  PanResponder,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "react-native-heroicons/outline";
import TouchModal from "../TouchModal";
import { timeAgo, shortenId, convertDate } from "../../utils/helpers";

const TransactionView = ({ item, visible, setVisible }) => {
  const { width, height } = useWindowDimensions();

  return (
    <TouchModal visible={visible} setVisible={setVisible}>
      <View style={{ height: height / 2 }}>
        {item && (
          <View className="mt-4 mx-5">
            <View className="items-center gap-y-4">
              <View className="w-1/5 rounded-l-xl items-center justify-center">
                <View className="h-16 w-16 p-3 rounded-full justify-center items-center bg-neutral-700">
                  {item.transactionType === "CR" ? (
                    <ArrowDownRightIcon color="#38a139" />
                  ) : (
                    <ArrowUpRightIcon color="rgb(220, 38, 38)" />
                  )}
                </View>
              </View>
              <Text className="text-xl text-white font-semibold">
                {item.transactionType === "CR" ? "+" : "-"}
                NGN
                {parseFloat(item.amount["$numberDecimal"])}
              </Text>
            </View>
            <Text className="text-gray-400 mt-5 mb-5 text-xs font-semibold">
              {item.summary}
            </Text>
            <View className="flex-1 border-t border-gray-600">
              <View className="flex-1 flex-row justify-between py-5 border-b border-gray-600">
                <Text className="text-xs text-gray-500">Transaction Date</Text>
                <Text className="text-xs text-white font-semibold">
                  {convertDate(item.createdAt)}
                </Text>
              </View>
              <View className="flex-1 flex-row justify-between py-5 border-b border-gray-600">
                <Text className="text-xs text-gray-500">Reference</Text>
                <Text className="text-xs text-white font-semibold">
                  {item.reference}
                </Text>
              </View>
              <View className="flex-1 flex-row justify-between py-5 border-b border-gray-600">
                <Text className="text-xs text-gray-500">
                  Balance Before Transaction
                </Text>
                <Text className="text-xs text-white font-semibold">
                  NGN
                  {parseFloat(item.balanceBefore["$numberDecimal"])}
                </Text>
              </View>
              <View className="flex-1 flex-row justify-between py-5 border-b border-gray-600">
                <Text className="text-xs text-gray-500">
                  Balance After Transaction
                </Text>
                <Text className="text-xs text-white font-semibold">
                  NGN
                  {parseFloat(item.balanceAfter["$numberDecimal"])}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchModal>
  );
};

export default TransactionView;
