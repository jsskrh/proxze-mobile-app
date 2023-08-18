import { StatusBar } from "expo-status-bar";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import OffersScreen from "./screens/OffersScreen";
import RequestScreen from "./screens/RequestScreen";
import ChatScreen from "./screens/ChatScreen";
import WelcomeStack from "./navigation/WelcomeStack";
import RequestStack from "./navigation/RequestStack";
import AddressScreen from "./screens/AddressScreen";
import OfferScreen from "./screens/OfferScreen";
import ContactInfoScreen from "./screens/ContactInfoScreen";
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
import {
  setPushToken,
  setUserToken,
  setCredentials,
} from "./redux/auth/authSlice";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useGetUserDetailsQuery } from "./redux/services/authService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { loading, error, success, userInfo, userToken, pushToken } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleUserTokenFetch = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
      if (userToken) dispatch(setUserToken(userToken));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 4000);
  }, []);

  useEffect(() => {
    if (!userToken) {
      handleUserTokenFetch();
    }
  }, []);

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    // pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      dispatch(setPushToken(token))
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
        // console.log("test");

        // Check if the notification has data and a screen name
        if (response.notification.request.content.data.screenName) {
          const screenName =
            response.notification.request.content.data.screenName;
          const params =
            response.notification.request.content.data.params || {};

          // Navigate to the specified screen with optional parameters
          navigation.navigate(screenName, params);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (loading) {
    return <LoadingScreen word={"PROXZE"} />;
  }

  return (
    <Stack.Navigator>
      {userToken && userInfo ? (
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
                  Make Offer
                </Text>
              ),
              presentation: "modal",
            })}
            name="Offer"
            component={OfferScreen}
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
                <Text className="text-white font-semibold">Offers</Text>
              ),
            })}
            name="Offers"
            component={OffersScreen}
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
                <Text className="text-white font-semibold">Contact Info</Text>
              ),
            })}
            name="ContactInfo"
            component={ContactInfoScreen}
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
