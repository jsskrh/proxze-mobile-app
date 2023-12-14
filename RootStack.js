import { StatusBar } from "expo-status-bar";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TailwindProvider } from "tailwindcss-react-native";
import { RegisterProvider } from "./components/RegisterProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import WelcomeScreen from "./screens/WelcomeScreen";
import TaskpoolScreen from "./screens/TaskpoolScreen";
import TasksScreen from "./screens/TasksScreen";
import TaskScreen from "./screens/TaskScreen";
import OffersScreen from "./screens/OffersScreen";
import RequestScreen from "./screens/RequestScreen";
import ChatScreen from "./screens/ChatScreen";
import WelcomeStack from "./navigation/WelcomeStack";
import RequestStack from "./navigation/RequestStack";
import AddressScreen from "./screens/AddressScreen";
import OfferScreen from "./screens/OfferScreen";
// import StreamScreen from "./screens/StreamScreen";
import ContactInfoScreen from "./screens/Settings/ContactInfoScreen";
import AccountScreen from "./screens/Settings/AccountScreen";
import BillingPaymentScreen from "./screens/Settings/BillingPaymentScreen";
import LegalScreen from "./screens/Settings/LegalScreen";
import EarningsScreen from "./screens/Settings/EarningsScreen";
import TransactionsScreen from "./screens/Settings/TransactionsScreen";
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
  Animated,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "./redux/auth/authSlice";
import { getUser } from "./redux/auth/authActions";
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

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const RootStack = () => {
  const dispatch = useDispatch();

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

  return (
    <AnimatedAppLoader image={require("./assets/images/splash.png")}>
      <MainScreen />
    </AnimatedAppLoader>
  );
};

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Load the image from the assets folder
      const imageAsset = Asset.fromModule(image).downloadAsync();
      await Promise.all([imageAsset]);
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [textAnimationDone, setTextAnimationState] = useState(false);

  const word = "PROXZE";

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      `isAppReady: ${isAppReady} - textAnimationDone: ${textAnimationDone}`
    );
    if (isAppReady && textAnimationDone) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady, textAnimationDone]);

  useEffect(() => {
    animated();
  }, []);

  const animatedValues = useRef([]);
  const wordArr = word.split("");
  wordArr.forEach((_, index) => {
    animatedValues.current[index] = new Animated.Value(0);
  });

  const animated = (toValue = 1) => {
    const animations = wordArr.map((_, index) => {
      return Animated.timing(animatedValues.current[index], {
        toValue,
        duration: 700,
        useNativeDriver: true,
        // delay: index * duration,
      });
    });

    Animated.stagger(200, animations).start();
    // setTextAnimationState(true);

    // console.log(staggerAnimation);

    // staggerAnimation.start(() => {
    //   // Animation is done playing, set setTextAnimationStatus to true
    //   setTextAnimationState(true);
    // });

    setTimeout(function () {
      setTextAnimationState(true);
    }, 2500);
  };

  const handleUserTokenFetch = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const response = dispatch(getUser({ userToken }));
        return response;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      const validate = handleUserTokenFetch();
      await Promise.all([validate]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "#ecffe0",
              opacity: animation,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
          {/* <Animated.View
            style={{ flexDirection: "row", position: "absolute", bottom: 50 }}
          >
            {wordArr.map((letter, index) => (
              <Animated.Text
                key={index}
                style={{
                  opacity: animatedValues.current[index],
                  color: "white",
                  fontWeight: 700,
                  fontSize: 45,
                }}
              >
                {letter}
              </Animated.Text>
            ))}
          </Animated.View> */}
        </Animated.View>
      )}
    </View>
  );
}

function MainScreen() {
  const { splashLoading, error, success, userInfo, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

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
                <Text className="text-white font-semibold">Account</Text>
              ),
            })}
            name="AccountSettings"
            component={AccountScreen}
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
                <Text className="text-white font-semibold">
                  Billing & Payment
                </Text>
              ),
            })}
            name="Billing&Payment"
            component={BillingPaymentScreen}
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
                <Text className="text-white font-semibold">Legal</Text>
              ),
            })}
            name="Legal"
            component={LegalScreen}
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
                <Text className="text-white font-semibold">Earnings</Text>
              ),
            })}
            name="Earnings"
            component={EarningsScreen}
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
                <Text className="text-white font-semibold">Transactions</Text>
              ),
            })}
            name="Transactions"
            component={TransactionsScreen}
          />

          {/* <Stack.Screen
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
                <Text className="text-white font-semibold">Stream</Text>
              ),
            })}
            name="Stream"
            component={StreamScreen}
          /> */}

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
                  {route.params.details.user.name
                    ? `${route.params.details.user.name}`
                    : `${route.params.details.user.firstName} ${route.params.details.user.lastName}`}
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
}

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
