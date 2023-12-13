import { StatusBar } from "expo-status-bar";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { RegisterProvider } from "./components/RegisterProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import RootStack from "./RootStack";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <TailwindProvider> */}
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootStack />
        </GestureHandlerRootView>
        {/* <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text>Your expo push token: {JSON.stringify(expoPushToken)}</Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>
                Title: {notification && notification.request.content.title}{" "}
              </Text>
              <Text>
                Body: {notification && notification.request.content.body}
              </Text>
              <Text>
                Data:{" "}
                {notification &&
                  JSON.stringify(notification.request.content.data)}
              </Text>
            </View>
            <Button
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View> */}
      </Provider>
      {/* </TailwindProvider> */}
    </NavigationContainer>
  );
}
