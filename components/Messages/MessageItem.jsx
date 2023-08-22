import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  mailDate,
  chatDate,
  validateInput,
  convertTo24HourFormat,
} from "../../utils/helpers";
import {
  UserCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";

const MessageItem = ({ conversation, converserInfo, index, navigate }) => {
  return (
    <TouchableOpacity
      //   activeOpacity={0.6}
      //   underlayColor="#DDDDDD"
      className={`flex-row px-5`}
      onPress={() =>
        navigate("Chat", {
          details: {
            user: {
              id: converserInfo._id,
              firstName: converserInfo.firstName,
              lastName: converserInfo.lastName,
            },
            chatId: conversation._id,
          },
        })
      }
    >
      <View className="mr-2 justify-center">
        <View className="">
          {/* <UserCircleIcon size={57} /> */}
          <View className="h-[55px] w-[55px] items-center justify-center bg-gray-400 rounded-full">
            <Text className="text-white text-lg">
              {converserInfo.firstName.charAt(0)}
              {converserInfo.lastName.charAt(0)}
            </Text>
          </View>
        </View>
      </View>
      <View
        className={`flex-1 py-2 ${
          index === 0 ? "border-y" : "border-b"
        } border-gray-600`}
      >
        <View className="flex-row">
          <View className="flex-1 truncate">
            <Text className="whitespace-nowrap text-base text-white font-semibold">
              {converserInfo.firstName} {converserInfo.lastName}
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="whitespace-nowrap text-sm text-gray-400">
              {mailDate(conversation.lastMessage.createdAt)}
            </Text>
            <ChevronRightIcon size={16} color="rgb(107 114 128)" />
          </View>
        </View>
        <Text className="text-sm h-10 text-gray-400 mr-2" numberOfLines={2}>
          {conversation.lastMessage.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageItem;
