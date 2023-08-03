import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RequestProvider } from "../components/RequestProvider";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
  ArchiveBoxIcon,
} from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";
import RequestScreen from "../screens/RequestScreen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createNativeStackNavigator();

const RequestStack = () => {
  return (
    <RequestProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={({ route, navigation: { goBack } }) => ({
            headerStyle: {
              backgroundColor: "rgb(39 39 42)",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: () => (
              <Button
                className="text-white"
                title="Cancel"
                onPress={() => goBack()}
              />
            ),
            headerTitle: () => (
              <Text
                className="text-white font-semibold"
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                New Request
              </Text>
            ),
            presentation: "modal",
          })}
          name="Request"
          component={RequestScreen}
        />

        <Stack.Screen
          options={({ route, navigation: { goBack } }) => ({
            headerStyle: {
              backgroundColor: "rgb(39 39 42)",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: () => (
              // <TouchableOpacity onPress={() => goBack()}>
              <Button
                className="text-white"
                title="Cancel"
                onPress={() => goBack()}
              />
              // </TouchableOpacity>
            ),
            headerTitle: () => (
              <Text
                className="text-white font-semibold"
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Location
              </Text>
            ),
            presentation: "modal",
          })}
          name="Address"
          component={AddressScreen}
        />
      </Stack.Navigator>
    </RequestProvider>
  );
};

export default RequestStack;
