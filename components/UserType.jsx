import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const UserType = ({ item, handleUserTypeChange, userType }) => {
  return (
    <TouchableOpacity
      key={item.type}
      className="mb-5"
      onPress={() => handleUserTypeChange(item.type)}
    >
      <View
        className={`w-full rounded-xl ${
          item.type === "proxze" ? "bg-[#91e6b3]" : "bg-[#135446]"
        } ${userType === item.type ? "shadow-lg" : ""} flex-row`}
      >
        <View className="w-[40%] h-[150px]">
          <Image source={item.image} className="h-full w-full rounded-l-xl" />
        </View>
        <View className="p-4 w-[60%] justify-center">
          <Text
            className={`${
              item.type === "proxze" ? "text-[#212121]" : "text-[#91e6b3]"
            }`}
          >
            As a {item.type}
          </Text>
          <Text
            className={`text-2xl ${
              item.type === "proxze" ? "text-[#135446]" : "text-white"
            }`}
          >
            {item.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserType;
