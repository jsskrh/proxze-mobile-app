import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/auth/authActions";

const LoginScreen = ({ navigation: { navigate, goBack } }) => {
  const { loading, waiting, error, success, userInfo, userToken, pushToken } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Perform login logic here using email and password
    // console.log("Email:", email);
    // console.log("Password:", password);
    const data = { email, password, token: pushToken.data };
    console.log(data);
    dispatch(userLogin(data));

    // if (email === "principal@sage-grey.com") {
    //   dispatch(testLogin("principal"));
    // } else if (email === "proxze@sage-grey.com") {
    //   dispatch(testLogin("proxze"));
    // }
  };

  return (
    // <SafeAreaView className=" bg-black flex-1">
    //   <View className="px-5 pt-8">
    //     <View>
    //       <Text className="text-xl max-w-[50%] font-poppins font-bold text-white">
    //         Login to your Proxze app account
    //       </Text>
    //     </View>
    //     <View className="flex-row">
    //       <Text className="text-sm font-poppins mt-3 text-center text-gray-500">
    //         Don't have an account?
    //       </Text>
    //       <Text className="text-sm font-poppins mt-3 text-center font-semibold ml-2 text-gray-500 relative after:content-[''] after:bg-[#757575] after:absolute after:w-full after:top-5 after:h-0.5 after:left-0 after:right-0">
    //         Register
    //       </Text>
    //     </View>
    //   </View>
    //   <View className="px-5 py-10">
    //     <TextInput
    //       placeholder="Email"
    //       className="font-poppins text-sm p-5 bg-gray-900 text-gray-500 rounded-lg"
    //     />
    //     <TextInput
    //       placeholder="Password"
    //       secureTextEntry
    //       className="font-poppins text-sm p-5 bg-gray-900 text-gray-500 rounded-lg"
    //     />
    //     {/* <TouchableOpacity
    //       className="py-4 px-5 w-[48%] rounded-xl items-center border border-gray-700"
    //       onPress={() => navigate("Login")}
    //     >
    //       <Text className="font-poppins font-semibold text-white">Login</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       className="py-4 px-5 w-[48%] rounded-xl items-center bg-gray-700"
    //       onPress={() => navigate("Register")}
    //     >
    //       <Text className="font-poppins font-semibold text-white">
    //         Register
    //       </Text>
    //     </TouchableOpacity> */}
    //   </View>
    // </SafeAreaView>
    <SafeAreaView className="m-5">
      <View className="mt-5 flex-row">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="pt-10">
        <View>
          <Text className="text-xl max-w-[50%] font-poppins font-bold text-black">
            Login to your Proxze app account
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-sm font-poppins mt-3 text-center text-gray-500">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigate("RegisterOne")}>
            <Text className="text-sm font-poppins mt-3 text-center font-semibold ml-2 text-black relative after:content-[''] after:bg-[#757575] after:absolute after:w-full after:top-5 after:h-0.5 after:left-0 after:right-0">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col mt-10 justify-between">
        <View className=" justify-start">
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoCapitalize="none"
            className="p-5 border rounded-md"
          />
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter password"
            placeholderTextColor="grey"
            secureTextEntry
            className="p-5 border rounded-md mt-8"
          />
          <View className="flex flex-row mt-4">
            <Text className="text-gray-600">Forgot Password?</Text>
            <TouchableOpacity>
              <Text> Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-10">
          <TouchableOpacity
            onPress={handleLogin}
            className="border flex p-4 rounded-xl bg-black"
          >
            {waiting ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text className="text-center text-white">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
