import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AuthLink = ({ navigate, userType }) => {
  return (
    <View className="flex-row">
      <Text
        className={`text-sm font-poppins text-center ${
          userType === "proxze"
            ? "text-gray-500"
            : userType === "principal"
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        Already have an account?
      </Text>
      <TouchableOpacity onPress={() => navigate("Login")}>
        <Text
          className={`text-sm font-poppins text-center font-semibold ml-2 ${
            userType === "proxze"
              ? "text-black"
              : userType === "principal"
              ? "text-white"
              : "text-black"
          }`}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthLink;
