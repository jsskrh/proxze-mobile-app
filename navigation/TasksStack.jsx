import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect } from "react";
// import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterProvider } from "../components/RegisterProvider";
import TasksScreen from "../screens/TasksScreen";
import ArchivedTasksScreen from "../screens/ArchivedTasksScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterOneScreen from "../screens/Register/RegisterOneScreen";
import RegisterTwoScreen from "../screens/Register/RegisterTwoScreen";
import RegisterThreeScreen from "../screens/Register/RegisterThreeScreen";
import Tabs from "./Tabs";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
  ArchiveBoxIcon,
} from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const TasksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation: { navigate, goBack } }) => ({
          headerStyle: {
            backgroundColor: "#000000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            // <View style={{ flexDirection: "row", marginLeft: 20 }}>
            <TouchableOpacity onPress={() => navigate("ArchivedTasks")}>
              {/* <Text className="text-[#91e6b3]">Archive</Text> */}
              <ArchiveBoxIcon color="#91e6b3" />
            </TouchableOpacity>
            // </View>
          ),
          headerTitle: () => (
            <Text className="text-white font-semibold">Tasks</Text>
          ),
          // headerRight: () => (
          //   <View style={{ flexDirection: "row" }}>
          //     <TouchableOpacity style={{ marginRight: 12 }}>
          //       <FunnelIcon color="#91e6b3" />
          //     </TouchableOpacity>
          //     <TouchableOpacity>
          //       <Bars3BottomRightIcon color="#91e6b3" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        })}
        name="Tasks"
        component={TasksScreen}
      />
      <Stack.Screen
        options={({ navigation: { navigate, goBack } }) => ({
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
            <Text className="text-white font-semibold">Archived Tasks</Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ marginRight: 12 }}>
                <FunnelIcon color="#91e6b3" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Bars3BottomRightIcon color="#91e6b3" />
              </TouchableOpacity>
            </View>
          ),
        })}
        name="ArchivedTasks"
        component={ArchivedTasksScreen}
      />
    </Stack.Navigator>
  );
};

export default TasksStack;
