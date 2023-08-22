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

const chat = [
  {
    _id: "64a5c5bee3c397a860a792e5",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Hello",
    createdAt: "2023-07-05T19:34:22.369Z",
    updatedAt: "2023-07-05T19:34:22.369Z",
    __v: 0,
  },
  {
    _id: "64a5c802b5b543572fbefa3a",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Its me",
    createdAt: "2023-07-05T19:44:02.682Z",
    updatedAt: "2023-07-05T19:44:02.682Z",
    __v: 0,
  },
  {
    _id: "64a5de862e07d5650e740943",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "I was wondering if after all these years you'd like to meet",
    createdAt: "2023-07-05T21:20:06.465Z",
    updatedAt: "2023-07-05T21:20:06.465Z",
    __v: 0,
  },
  {
    _id: "64a5e2552e07d5650e7409be",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "To go over everything",
    createdAt: "2023-07-05T21:36:21.363Z",
    updatedAt: "2023-07-05T21:36:21.363Z",
    __v: 0,
  },
  {
    _id: "64a5e2c72e07d5650e7409d8",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content:
      "They say that time's supposed to heal ya, but I ain't done much healing",
    createdAt: "2023-07-05T21:38:15.552Z",
    updatedAt: "2023-07-05T21:38:15.552Z",
    __v: 0,
  },
  {
    _id: "64a5e33c2e07d5650e7409f8",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Hello, can you hear me?",
    createdAt: "2023-07-05T21:40:12.391Z",
    updatedAt: "2023-07-05T21:40:12.391Z",
    __v: 0,
  },
  {
    _id: "64a5e40e2e07d5650e740a39",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "I'm in California dreaming about who we used to be",
    createdAt: "2023-07-05T21:43:42.503Z",
    updatedAt: "2023-07-05T21:43:42.503Z",
    __v: 0,
  },
  {
    _id: "64a5e4932e07d5650e740a71",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "When we were younger and free",
    createdAt: "2023-07-05T21:45:55.624Z",
    updatedAt: "2023-07-05T21:45:55.624Z",
    __v: 0,
  },
  {
    _id: "64a5e5cb2e07d5650e740a77",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "I've forgotten how it felt before the world fell at our feet",
    createdAt: "2023-07-05T21:51:07.323Z",
    updatedAt: "2023-07-05T21:51:07.323Z",
    __v: 0,
  },
  {
    _id: "64a5e5dd2e07d5650e740a7d",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "",
    createdAt: "2023-07-05T21:51:25.354Z",
    updatedAt: "2023-07-05T21:51:25.354Z",
    __v: 0,
  },
  {
    _id: "64a742f2bf0371ad783e1aeb",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "There's such a difference between us",
    createdAt: "2023-07-06T22:40:51.019Z",
    updatedAt: "2023-07-06T22:40:51.019Z",
    __v: 0,
  },
  {
    _id: "64a7434144ec50aca455581a",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "And a million miles",
    createdAt: "2023-07-06T22:42:09.961Z",
    updatedAt: "2023-07-06T22:42:09.961Z",
    __v: 0,
  },
  {
    _id: "64a74418de945ec8304d2c3b",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Hello from the other side",
    createdAt: "2023-07-06T22:45:44.495Z",
    updatedAt: "2023-07-06T22:45:44.495Z",
    __v: 0,
  },
  {
    _id: "64a7453a2d20f9641c9bded5",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "I must've called a thousand times",
    createdAt: "2023-07-06T22:50:34.065Z",
    updatedAt: "2023-07-06T22:50:34.065Z",
    __v: 0,
  },
  {
    _id: "64a7461c4bea65e29d0bfab7",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "To tell you I'm sorry for everything that I've done",
    createdAt: "2023-07-06T22:54:20.139Z",
    updatedAt: "2023-07-06T22:54:20.139Z",
    __v: 0,
  },
  {
    _id: "64a7467eefe992e1d8484774",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "But when I call, you never seem to be home",
    createdAt: "2023-07-06T22:55:58.075Z",
    updatedAt: "2023-07-06T22:55:58.075Z",
    __v: 0,
  },
  {
    _id: "64a74700f1c35347f59aa029",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Hello from the outside",
    createdAt: "2023-07-06T22:58:08.425Z",
    updatedAt: "2023-07-06T22:58:08.425Z",
    __v: 0,
  },
  {
    _id: "64a74764ea7f4445a954a838",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "At least I can say that I've tried",
    createdAt: "2023-07-06T22:59:48.375Z",
    updatedAt: "2023-07-06T22:59:48.375Z",
    __v: 0,
  },
  {
    _id: "64a748b6ea7f4445a954a854",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "To tell you I'm sorry for breaking your heart",
    createdAt: "2023-07-06T23:05:26.879Z",
    updatedAt: "2023-07-06T23:05:26.879Z",
    __v: 0,
  },
  {
    _id: "64a74b451924cafea2999eab",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "But it don't matter, it clearly doesn't tear you apart anymore",
    createdAt: "2023-07-06T23:16:21.789Z",
    updatedAt: "2023-07-06T23:16:21.789Z",
    __v: 0,
  },
  {
    _id: "64a755b87e1d4fe4f9bcc783",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Hello, how are you?",
    createdAt: "2023-07-07T00:00:56.520Z",
    updatedAt: "2023-07-07T00:00:56.520Z",
    __v: 0,
  },
  {
    _id: "64a7565a7e1d4fe4f9bcc794",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "It's so typical of me to talk about myself, I'm sorry",
    createdAt: "2023-07-07T00:03:38.899Z",
    updatedAt: "2023-07-07T00:03:38.899Z",
    __v: 0,
  },
  {
    _id: "64a756ee7e1d4fe4f9bcc7af",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "I hope that you're well",
    createdAt: "2023-07-07T00:06:06.574Z",
    updatedAt: "2023-07-07T00:06:06.574Z",
    __v: 0,
  },
  {
    _id: "64a7587d778ce486dcf0378b",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content:
      "Did you ever make it out of that town where nothing ever happened?",
    createdAt: "2023-07-07T00:12:45.987Z",
    updatedAt: "2023-07-07T00:12:45.987Z",
    __v: 0,
  },
  {
    _id: "64a7599c778ce486dcf037b9",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "It's no secret that the both of us",
    createdAt: "2023-07-07T00:17:32.852Z",
    updatedAt: "2023-07-07T00:17:32.852Z",
    __v: 0,
  },
  {
    _id: "64a75a58965565a8ed392ba0",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Are running out of time",
    createdAt: "2023-07-07T00:20:40.855Z",
    updatedAt: "2023-07-07T00:20:40.855Z",
    __v: 0,
  },
  {
    _id: "64a75abe6d52b0f41dcbaecf",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "So hello from the other side (other side)",
    createdAt: "2023-07-07T00:22:22.817Z",
    updatedAt: "2023-07-07T00:22:22.817Z",
    __v: 0,
  },
  {
    _id: "64a75dbad72cff85b9786383",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "I must've called a thousand times (thousand times)",
    createdAt: "2023-07-07T00:35:06.358Z",
    updatedAt: "2023-07-07T00:35:06.358Z",
    __v: 0,
  },
  {
    _id: "64a75e18ed4f98a33c6da7c1",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "To tell you I'm sorry for everything that I've done",
    createdAt: "2023-07-07T00:36:40.121Z",
    updatedAt: "2023-07-07T00:36:40.121Z",
    __v: 0,
  },
  {
    _id: "64a75e4fed4f98a33c6da7dd",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "But when I call, you never seem to be home",
    createdAt: "2023-07-07T00:37:35.975Z",
    updatedAt: "2023-07-07T00:37:35.975Z",
    __v: 0,
  },
  {
    _id: "64a75f08ed4f98a33c6da819",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Hello from the outside (outside)",
    createdAt: "2023-07-07T00:40:40.400Z",
    updatedAt: "2023-07-07T00:40:40.400Z",
    __v: 0,
  },
  {
    _id: "64a75fb3ed4f98a33c6da84a",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "At least I can say that I've tried (I've tried)",
    createdAt: "2023-07-07T00:43:31.952Z",
    updatedAt: "2023-07-07T00:43:31.952Z",
    __v: 0,
  },
  {
    _id: "64a76088ed4f98a33c6da85b",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "To tell you I'm sorry for breaking your heart",
    createdAt: "2023-07-07T00:47:04.691Z",
    updatedAt: "2023-07-07T00:47:04.691Z",
    __v: 0,
  },
  {
    _id: "64a7619bed4f98a33c6da89c",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "But it don't matter, it clearly doesn't tear you apart anymore",
    createdAt: "2023-07-07T00:51:39.521Z",
    updatedAt: "2023-07-07T00:51:39.521Z",
    __v: 0,
  },
  {
    _id: "64a761c2ed4f98a33c6da8a4",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T00:52:18.124Z",
    updatedAt: "2023-07-07T00:52:18.124Z",
    __v: 0,
  },
  {
    _id: "64a76342c2d427bf65b48156",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T00:58:42.843Z",
    updatedAt: "2023-07-07T00:58:42.843Z",
    __v: 0,
  },
  {
    _id: "64a76371c2d427bf65b4815c",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T00:59:29.037Z",
    updatedAt: "2023-07-07T00:59:29.037Z",
    __v: 0,
  },
  {
    _id: "64a78d63c2d427bf65b481bd",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T03:58:27.530Z",
    updatedAt: "2023-07-07T03:58:27.530Z",
    __v: 0,
  },
  {
    _id: "64a78d83c2d427bf65b481c3",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T03:58:59.076Z",
    updatedAt: "2023-07-07T03:58:59.076Z",
    __v: 0,
  },
  {
    _id: "64a85f3cebc43275725dd8fa",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T18:53:48.056Z",
    updatedAt: "2023-07-07T18:53:48.056Z",
    __v: 0,
  },
  {
    _id: "64a860530035b47bcd100b8c",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T18:58:27.250Z",
    updatedAt: "2023-07-07T18:58:27.250Z",
    __v: 0,
  },
  {
    _id: "64a860890035b47bcd100ba8",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T18:59:21.553Z",
    updatedAt: "2023-07-07T18:59:21.553Z",
    __v: 0,
  },
  {
    _id: "64a860970035b47bcd100bae",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T18:59:35.052Z",
    updatedAt: "2023-07-07T18:59:35.052Z",
    __v: 0,
  },
  {
    _id: "64a862d60a6f240a0998844e",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T19:09:10.348Z",
    updatedAt: "2023-07-07T19:09:10.348Z",
    __v: 0,
  },
  {
    _id: "64a863764601367a9803adcc",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T19:11:50.905Z",
    updatedAt: "2023-07-07T19:11:50.905Z",
    __v: 0,
  },
  {
    _id: "64a863834601367a9803add2",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "642b668a08f97645cc65ebeb",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T19:12:03.388Z",
    updatedAt: "2023-07-07T19:12:03.388Z",
    __v: 0,
  },
  {
    _id: "64a863914601367a9803add8",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "Ooh (lows, lows, lows, lows), anymore",
    createdAt: "2023-07-07T19:12:17.309Z",
    updatedAt: "2023-07-07T19:12:17.309Z",
    __v: 0,
  },
  {
    _id: "64a8639f4601367a9803adde",
    chat: "64a5c5bee3c397a860a792e3",
    seen: false,
    read: false,
    sender: "641a27bd5bb881c39313c9ea",
    content: "(Highs, highs, highs, highs)",
    createdAt: "2023-07-07T19:12:31.089Z",
    updatedAt: "2023-07-07T19:12:31.089Z",
    __v: 0,
  },
];

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
