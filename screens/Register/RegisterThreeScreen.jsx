import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Controller } from "react-hook-form";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RegisterContext } from "../../components/RegisterProvider";

const RegisterThreeScreen = ({ navigation: { navigate, goBack } }) => {
  const {
    setValue,
    getValues,
    watch,
    control,
    errors,
    trigger,
    submitHandler,
    handleSubmit,
    registerHandler,
  } = useContext(RegisterContext);

  const { waiting, error, registerSuccess, userInfo, userToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (registerSuccess) {
      navigate("Login");
    }
    if (error) {
      console.log(error);
    }
  }, [registerSuccess, error]);

  const userType = watch("userType");

  const validationChecker = async () => {
    if ((await trigger(["email", "phoneNumber"])) === false) return false;
    return true;
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        userType === "proxze"
          ? "bg-[#91e6b3]"
          : userType === "principal"
          ? "bg-[#135446]"
          : ""
      }`}
    >
      <View className="mx-5 mt-5">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="m-5 mt-0">
        <Text className="mt-10 font-bold text-2xl mb-2">
          {userType === "proxze"
            ? "Start doing jobs and offering your services"
            : "Create tasks and outsource them to the best of the best"}
        </Text>
        <View className="flex-row">
          <Text
            className={`text-sm font-poppins text-center ${
              userType === "proxze" ? "text-gray-500" : "text-gray-400"
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
        {error && <Text className="mt-3 text-[#ff0000] text-xs">{error}</Text>}

        <View className="flex flex-col mt-10 justify-between">
          <KeyboardAvoidingView className=" justify-start">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Please enter your email address",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Email"
                    placeholderTextColor={"grey"}
                    id="email"
                    name="email"
                    autoCapitalize="none"
                    className={`p-5 border rounded-md ${
                      errors.email ? "border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.email && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Please enter your phone number",
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Phone Number"
                    placeholderTextColor={"grey"}
                    id="phoneNumber"
                    name="phoneNumber"
                    autoCapitalize="none"
                    className={`p-5 border rounded-md ${
                      errors.phoneNumber
                        ? "border-red-500 border-2 mt-5"
                        : "mt-7"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </>
              )}
            />
          </KeyboardAvoidingView>

          <View className="mt-14">
            <TouchableOpacity
              onPress={async () => {
                if (await validationChecker()) {
                  navigate("RegisterFour");
                }
              }}
              className="border flex p-4 rounded-xl bg-black"
            >
              <Text className="text-center text-white">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterThreeScreen;
