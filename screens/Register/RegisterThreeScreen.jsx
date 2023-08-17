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

  const { waiting, error, success, userInfo, userToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      navigate("Login");
    }
    if (error) {
      console.log(error);
    }
  }, [success, error]);

  const userType = watch("userType");

  const validationChecker = async () => {
    if (
      (await trigger([
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
      ])) === false
    )
      return false;
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

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password should be more than 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password should be less than 20 characters",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                  message: "Please enter valid password",
                },
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    id="password"
                    name="password"
                    placeholder="Password"
                    placeholderTextColor={"grey"}
                    autoCapitalize="none"
                    secureTextEntry
                    className={`p-5 border rounded-md ${
                      errors.password ? "border-red-500 border-2 mt-5" : "mt-7"
                    }`}
                  />
                  {errors.password && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.password.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) => value === getValues("password"),
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    placeholderTextColor={"grey"}
                    autoCapitalize="none"
                    secureTextEntry
                    className={`p-5 border rounded-md ${
                      errors.confirmPassword
                        ? "border-red-500 border-2 mt-5"
                        : "mt-7"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <Text className={`text-[#ff0000] text-xs`}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </>
              )}
            />
          </KeyboardAvoidingView>

          <View className="mt-14">
            <TouchableOpacity
              onPress={async () => {
                if (await validationChecker()) registerHandler();
              }}
              className="border flex p-4 rounded-xl bg-black"
            >
              {waiting ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text className="text-center text-white">Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterThreeScreen;
