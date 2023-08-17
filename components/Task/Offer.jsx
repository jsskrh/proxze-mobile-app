import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Offer = ({ offer, taskId, goBack }) => {
  const { userInfo, userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const acceptOffer = async () => {
    setLoading(true);
    console.log(offer.proxze);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `https://proxze-backend-app.onrender.com/api/task/view/${taskId}/principal/accept-offer`,
        { proxze: offer.proxze.id, timestamp: Date.now() },
        config
      );
      //   return data
      // console.log(data);
      setLoading(false);
      goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  const rejectOffer = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `https://proxze-backend-app.onrender.com/api/task/view/${taskId}/principal/reject-offer`,
        { proxze: offer.proxze.id, timestamp: Date.now() },
        config
      );
      //   return data
      // console.log(data);
      setLoading(false);
      goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  return (
    <View className="p-5">
      <Text className="text-white text-lg mb-3">{offer.proxze.name}</Text>
      <Text className="text-gray-300 mb-5">{offer.coverLetter}</Text>
      <View className="flex-row justify-end gap-x-3 items-center">
        <TouchableOpacity
          className="w-1/3 p-4 border items-center bg-red-600 rounded-xl"
          onPress={() => rejectOffer()}
        >
          <Text className="text-white">Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/3 p-4 border items-center bg-[#38a139] rounded-xl"
          onPress={() => acceptOffer()}
        >
          <Text className="text-white">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Offer;
