import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

const OnboardingItem = ({ item, theme }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1" style={[{ width }]}>
      {/* <Image source={item.image} className='flex-[0.7] justify-center' /> */}
      <View className="flex-1 flex justify-center items-center">
        {item.image}
      </View>
      <View className="px-10 pt-10">
        <Text
          className={`text-3xl font-poppins font-bold text-center ${
            theme === "light" ? "text-[#135446]" : "text-white"
          }`}
        >
          {item.title}
        </Text>
        <Text className="text-sm font-poppins mt-5 text-center text-gray-500">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;
