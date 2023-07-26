import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect } from "react";
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
import ChatScreen from "./screens/ChatScreen";
import WelcomeStack from "./navigation/WelcomeStack";
import Tabs from "./navigation/Tabs";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="WelcomeStack"
              component={WelcomeStack}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Tabs"
              component={Tabs}
            />
            <Stack.Screen
              options={({ route, navigation: { goBack } }) => ({
                headerStyle: {
                  backgroundColor: "#000000",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#91e6b3" />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text className="text-white font-semibold">Task</Text>
                ),
                // headerRight: () => (
                //   <View style={{ flexDirection: "row", marginRight: 20 }}>
                //     <TouchableOpacity style={{ marginRight: 12 }}>
                //       <FunnelIcon color="#91e6b3" />
                //     </TouchableOpacity>
                //     <TouchableOpacity>
                //       <Bars3BottomRightIcon color="#91e6b3" />
                //     </TouchableOpacity>
                //   </View>
                // ),
              })}
              name="Task"
              component={TaskScreen}
            />
            <Stack.Screen
              options={({ route, navigation: { goBack } }) => ({
                headerStyle: {
                  backgroundColor: "#000000",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#91e6b3" />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text
                    className="text-white font-semibold"
                    style={{ color: "white", fontWeight: 600 }}
                  >
                    {route.params.user.firstName} {route.params.user.lastName}
                  </Text>
                ),
                // headerRight: () => (
                //   <View style={{ flexDirection: "row", marginRight: 20 }}>
                //     <TouchableOpacity style={{ marginRight: 12 }}>
                //       <FunnelIcon color="#91e6b3" />
                //     </TouchableOpacity>
                //     <TouchableOpacity>
                //       <Bars3BottomRightIcon color="#91e6b3" />
                //     </TouchableOpacity>
                //   </View>
                // ),
              })}
              name="Chat"
              component={ChatScreen}
            />
          </Stack.Navigator>
        </Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
