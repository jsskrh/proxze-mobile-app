import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RegisterContext } from "../../components/RegisterProvider";
import UserType from "../../components/UserType";
import AuthLink from "../../components/AuthLink";

const userTypes = [
  {
    type: "principal",
    text: "I am a client, hiring for projects",
    image: require("../../assets/images/contract.jpg"),
  },
  {
    type: "proxze",
    text: "I am a proxy, looking for work",
    image: require("../../assets/images/freelancer.webp"),
  },
];

const RegisterOneScreen = ({ navigation: { navigate, goBack } }) => {
  const { setValue, watch } = useContext(RegisterContext);

  const userType = watch("userType");

  const handleUserTypeChange = (type) => {
    setValue("userType", type);
  };

  return (
    <SafeAreaView
      className={`${
        userType === "proxze"
          ? "bg-[#91e6b3]"
          : userType === "principal"
          ? "bg-[#135446]"
          : ""
      } h-full`}
    >
      <View className="m-5">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text
          className={`mt-10 font-bold text-2xl mb-2 ${
            userType === "proxze"
              ? "text-black"
              : userType === "principal"
              ? "text-white"
              : "text-black"
          }`}
        >
          Select the account type you want to create
        </Text>

        <AuthLink navigate={navigate} userType={userType} />

        <View className="flex flex-col mt-10 justify-between">
          <View>
            {userTypes.map((item, index) => (
              <UserType
                item={item}
                userType={userType}
                handleUserTypeChange={handleUserTypeChange}
                key={index}
              />
            ))}
          </View>

          <View className="mt-14">
            <TouchableOpacity
              onPress={() => navigate("RegisterTwo")}
              className="border flex p-4 rounded-xl bg-black"
            >
              <Text className="text-center text-white">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterOneScreen;
