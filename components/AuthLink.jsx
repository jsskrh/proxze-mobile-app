import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AuthLink = ({ navigate, userType }) => {
  return (
    <View className="flex-row">
      <Text
        className={`text-sm font-poppins text-center ${
          userType === "proxzi"
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
            userType === "proxzi"
              ? "text-black"
              : userType === "principal"
              ? "text-white"
              : "text-black"
          } relative after:content-[''] after:bg-[#757575] after:absolute after:w-full after:top-5 after:h-0.5 after:left-0 after:right-0`}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthLink;
