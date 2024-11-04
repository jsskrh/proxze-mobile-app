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
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Offer = ({ offer, navigate, taskId, goBack }) => {
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
      const { data } = await axios.put(
        `http://172.20.10.3:3001/api/task/view/${taskId}/principal/accept-offer`,
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
      const { data } = await axios.put(
        `http://172.20.10.3:3001/api/task/view/${taskId}/principal/reject-offer`,
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
      <View className="mb-3 flex-row justify-between items-center">
        <Text className="text-white text-lg">{offer.proxze.name}</Text>
        <TouchableOpacity
          className="border-2 border-[#38a139] items-center justify-center rounded-full p-2 mx-[5px] mb-[5px]"
          onPress={() =>
            navigate("Chat", {
              details: {
                chatId: offer.chat,
                user: {
                  id: offer.proxze.id,
                  name: offer.proxze.name,
                },
                newChat: offer.chat
                  ? null
                  : {
                      taskId: taskId,
                    },
              },
            })
          }
        >
          <PaperAirplaneIcon size={22} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-300 mb-5">{offer.coverLetter}</Text>
      <View className="flex-row justify-end gap-x-3 items-center">
        <TouchableOpacity
          className="w-1/3 p-3 border items-center bg-red-600 rounded-xl"
          onPress={() => rejectOffer()}
        >
          <Text className="text-white">Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/3 p-3 border items-center bg-[#38a139] rounded-xl"
          onPress={() => acceptOffer()}
        >
          <Text className="text-white">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Offer;
