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
import LoadingScreen from "./screens/LoadingScreen";
import Tabs from "./navigation/Tabs";
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
import { setLoading } from "./redux/auth/authSlice";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { loading, error, success, userInfo, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  // const authContext = useMemo(() => ({
  //   login: (user) => {
  //     setUserToken(user);
  //     setIsLoading(false);
  //   },
  //   logout: () => {
  //     setUserToken(null);
  //     setIsLoading(false);
  //   },
  //   register: () => {
  //     setUserToken(user);
  //     setIsLoading(false);
  //   },
  // }));

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 4000);
  }, []);

  if (loading) {
    return <LoadingScreen word={"PROXZE"} />;
  }

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Tabs"
            component={Tabs}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "modal",
            }}
            name="RequestStack"
            component={RequestStack}
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
            })}
            name="Chat"
            component={ChatScreen}
          />
        </>
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WelcomeStack"
          component={WelcomeStack}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
