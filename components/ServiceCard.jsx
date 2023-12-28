import { View, Text, TouchableOpacity, Image } from "react-native";
import Verification from "../assets/images/client-verify.svg";

const ServiceCard = ({ title, washer, navigate, service }) => {
  return (
    <TouchableOpacity
      className="relative w-[30%] h-24 justify-between items-center"
      onPress={() => navigate("RequestStack")}
    >
      <View className="h-full w-full p-2 rounded-xl items-center bg-gray-400">
        <View className="flex-1">
          <Verification width={50} height={50} />
        </View>
        <Text className="text-black font-semibold capitalize text-xs">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
