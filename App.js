import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { RegisterProvider } from "./components/RegisterProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterOneScreen from "./screens/Register/RegisterOneScreen";
import RegisterTwoScreen from "./screens/Register/RegisterTwoScreen";
import RegisterThreeScreen from "./screens/Register/RegisterThreeScreen";
import TaskpoolScreen from "./screens/TaskpoolScreen";
import AccountScreen from "./screens/AccountScreen";
import MessagesScreen from "./screens/MessagesScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import TasksScreen from "./screens/TasksScreen";
import TaskScreen from "./screens/TaskScreen";
import RequestScreen from "./screens/RequestScreen";
import ChatScreen from "./screens/ChatScreen";
import WelcomeStack from "./navigation/WelcomeStack";
import RequestStack from "./navigation/RequestStack";
import AddressScreen from "./screens/AddressScreen";
import Tabs from "./navigation/Tabs";
import RootStack from "./RootStack";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
