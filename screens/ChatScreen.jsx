import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  GiftedChat,
  Bubble,
  Send,
  Composer,
  InputToolbar,
  LeftAction,
  ChatInput,
  SendButton,
} from "react-native-gifted-chat";
import {
  PaperAirplaneIcon,
  ChevronDownIcon,
} from "react-native-heroicons/solid";
import { BlurView } from "expo-blur";
import TabLayout from "../components/TabLayout";
import MessageItem from "../components/Messages/MessageItem";
import {
  mailDate,
  chatDate,
  validateInput,
  convertTo24HourFormat,
  transformChatArray,
} from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { clearChat } from "../redux/chat/chatSlice";
import { getChat, sendMessage, createChat } from "../redux/chat/chatActions";

const ChatScreen = ({
  route: {
    params: { details },
  },
}) => {
  // const { success, error, loading, chat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [chatId, setChatId] = useState(details.chatId);
  const [chat, setChat] = useState([]);

  const handleGetChat = async (message) => {
    const {
      payload: { data },
    } = await dispatch(getChat({ chatId }));
    setChat(transformChatArray(data));
  };

  useEffect(() => {
    if (chatId) handleGetChat();
  }, [chatId]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat.length !== 0) {
      const reversedChat = chat.slice().reverse();
      setMessages(reversedChat);
    }
  }, [chat]);

  const send = async (message) => {
    responseData = await dispatch(
      createChat({
        taskId: details.newChat.taskId,
        message,
        proxze: details.user.id,
      })
    );
    const id = responseData.payload.data._id;
    setChatId(id);
  };

  const onSend = useCallback(
    (messages = []) => {
      if (!chatId) {
        const newChat = details.newChat;
        send(messages[0].text);
      } else {
        dispatch(sendMessage({ message: messages[0].text, chatId }));
      }
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [chatId]
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#38a139" },
          left: { backgroundColor: "rgb(39 39 42)" },
        }}
        textStyle={{
          right: { color: "#fff" },
          left: { color: "#fff" },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View className="bg-[#38a139] rounded-full p-[5px] mx-[5px] mb-[5px]">
          <PaperAirplaneIcon size={22} color="white" />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#000",
          borderColor: "#e0e0e0",
          borderTopWidth: 0,
        }}
        primaryStyle={{ alignItems: "center" }}
      />
    );
  };

  // minInputToolbarHeight={70}
  // const renderInputToolbar = (props) => (
  //   <View style={{ height: 200 }}>
  //     <BlurView tint="dark" intensity={85} style={StyleSheet.absoluteFill}>
  //       <View>
  //         {/* <LeftAction {...props} />
  //       <ChatInput {...props} />
  //       <SendButton {...props} /> */}
  //       </View>
  //       <View></View>
  //     </BlurView>
  //   </View>
  // );

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: "black",
          borderColor: "rgb(156 163 175)",
          borderWidth: 1,
          borderRadius: 25,
          paddingTop: 8.5,
          paddingHorizontal: 10,
          // alignItems: "center",
          color: "#fff",
        }}
      />
    );
  };

  // const renderComposer = (props) => {
  //   return (
  //     <View className="items-center flex-row mx-2 ">
  //       <TextInput
  //         style={{
  //           flex: 1,
  //           // padding: 10,
  //           // borderRadius: 25,
  //         }}
  //         className=" text-base text-white border border-gray-400 rounded-3xl p-1"
  //         placeholder="Type your message..."
  //         placeholderTextColor="gray"
  //         multiline
  //         {...props}
  //       />
  //       {/* <TouchableOpacity
  //         onPress={() => onSendPress()}
  //         style={{ paddingHorizontal: 10 }}
  //       >
  //         <Text style={{ color: "#007BFF", fontWeight: "bold" }}>Send</Text>
  //       </TouchableOpacity> */}
  //       {/* <Send {...props}>
  //         <View className="bg-[#91e6b3] rounded-full p-1">
  //           <PaperAirplaneIcon size={22} color="white" />
  //         </View>
  //       </Send> */}
  //     </View>
  //   );
  // };

  const scrollToBottomComponent = () => {
    return (
      <View className="h-full w-full justify-center rounded-full items-center">
        <ChevronDownIcon size={32} color="#91e6b3" />
      </View>
    );
  };

  const renderAvatar = () => {
    return null; // Always return null to hide avatars for all users
  };

  const tabConfig = { title: "Messages", headerTitle: "Messages" };

  return (
    <TabLayout config={tabConfig}>
      {/* <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderBubble={renderBubble}
            renderSend={renderSend}
            // alwaysShowSend
            renderAvatar={renderAvatar}
            renderComposer={renderComposer}
            renderInputToolbar={renderInputToolbar}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
          />
        </View>
        <View style={{ height: 200 }}>
          <BlurView tint="dark" intensity={85} style={StyleSheet.absoluteFill}>
            <InputToolbar
              // {...props}
              containerStyle={{
                backgroundColor: "#000",
                borderColor: "#e0e0e0",
                borderTopWidth: 0,
              }}
              primaryStyle={{ alignItems: "center" }}
            />
          </BlurView>
        </View>
      </KeyboardAvoidingView> */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userInfo.id,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        // alwaysShowSend
        renderAvatar={renderAvatar}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </TabLayout>
  );
};

export default ChatScreen;
