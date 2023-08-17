import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { makeOffer } from "../redux/task/taskActions";
import TabLayout from "../components/TabLayout";

const OfferScreen = ({
  navigation: { navigate, goBack },
  route: {
    params: { taskId },
  },
}) => {
  const { userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useForm();

  const submitHandler = async () => {
    const offer = watch("offer");
    const data = {
      coverLetter: offer,
      taskId,
      userToken,
      timestamp: Date.now(),
    };
    // console.log(data);
    dispatch(makeOffer(data));
    goBack();
  };

  const tabConfig = {
    title: "Make Offer",
    headerTitle: "Make Offer",
    bg: "rgb(24 24 27)",
  };

  return (
    <TabLayout config={tabConfig}>
      {/* <SafeAreaView className=""> */}
      <ScrollView className="pt-5">
        <View className="pt-5 mb-8">
          <Controller
            name="offer"
            control={control}
            rules={{
              required: "Please write your offer",
            }}
            render={({ field }) => (
              <>
                <View className="mx-5 bg-zinc-800 rounded-lg items-center">
                  <TextInput
                    placeholder="Write your offer"
                    placeholderTextColor="gray"
                    value={field.value}
                    onChangeText={field.onChange}
                    // defaultValue={offer}
                    id="offer"
                    name="offer"
                    className={`px-5 py-3 border rounded-lg text-base w-full h-80 text-white ${
                      errors.offer ? "border-red-500" : ""
                    }`}
                    multiline
                  />
                </View>
                {errors.offer && (
                  <Text className={`text-[#ff0000] mx-5 text-xs`}>
                    {errors.offer.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <TouchableOpacity
          className="p-3 items-center bg-[#38a139] rounded-lg mx-5"
          onPress={() => submitHandler()}
        >
          <Text className="text-white capitalize font-semibold text-base">
            Send Offer
          </Text>
        </TouchableOpacity>
        {/* </SafeAreaView> */}
      </ScrollView>
    </TabLayout>
  );
};

export default OfferScreen;
