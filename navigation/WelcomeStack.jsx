import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect } from "react";
// import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterProvider } from "../components/RegisterProvider";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterOneScreen from "../screens/Register/RegisterOneScreen";
import RegisterTwoScreen from "../screens/Register/RegisterTwoScreen";
import RegisterThreeScreen from "../screens/Register/RegisterThreeScreen";
import RegisterFourScreen from "../screens/Register/RegisterFourScreen";
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

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <RegisterProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterOne"
          component={RegisterOneScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterTwo"
          component={RegisterTwoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterThree"
          component={RegisterThreeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterFour"
          component={RegisterFourScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WelcomeStack"
          component={WelcomeStack}
        /> */}
      </Stack.Navigator>
    </RegisterProvider>
  );
};

export default WelcomeStack;
