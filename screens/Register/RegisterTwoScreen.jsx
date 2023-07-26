import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Controller } from "react-hook-form";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RegisterContext } from "../../components/RegisterProvider";

const RegisterTwoScreen = ({ navigation: { navigate, goBack } }) => {
  const { setValue, watch, control, errors, trigger } =
    useContext(RegisterContext);

  const userType = watch("userType");

  const validationChecker = async () => {
    if ((await trigger(["firstName", "lastName"])) === false) return false;
    return true;
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        userType === "proxzi"
          ? "bg-[#91e6b3]"
          : userType === "principal"
          ? "bg-[#135446]"
          : ""
      }`}
    >
      <View className="m-5">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text className="mt-10 font-bold text-2xl mb-2">
          {userType === "proxzi"
            ? "Start doing jobs and offering your services"
            : "Create tasks and outsource them to the best of the best"}
        </Text>
        <View className="flex-row">
          <Text
            className={`text-sm font-poppins text-center ${
              userType === "proxzi" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigate("Login")}>
            <Text className="text-sm font-poppins text-center font-semibold ml-2 text-black relative after:content-[''] after:bg-[#757575] after:absolute after:w-full after:top-5 after:h-0.5 after:left-0 after:right-0">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col mt-10 justify-between">
          <View className=" justify-start">
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "Please enter your first name",
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    className={`p-5 border rounded-md ${
                      errors.firstName ? "border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Please enter your last name",
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Last Name"
                    id="lastName"
                    name="lastName"
                    className={`p-5 border rounded-md ${
                      errors.lastName ? "border-red-500 border-2 mt-5" : "mt-7"
                    }`}
                  />
                  {errors.lastName && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </>
              )}
            />

            <View className="flex flex-row mt-4">
              <Text
                className={`${
                  userType === "proxzi" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                By proceeding you agree to our
              </Text>
              <TouchableOpacity>
                <Text> Terms of Service </Text>
              </TouchableOpacity>
              <Text
                className={`${
                  userType === "proxzi" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                and
              </Text>
            </View>
            <TouchableOpacity>
              <Text>Privacy policy </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-14">
            <TouchableOpacity
              onPress={async () => {
                if (await validationChecker()) {
                  navigate("RegisterThree");
                }
              }}
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

export default RegisterTwoScreen;
