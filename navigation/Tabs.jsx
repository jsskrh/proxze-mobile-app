import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BriefcaseIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  InboxIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import {
  BriefcaseIcon as BriefcaseIconOutline,
  HomeIcon as HomeIconOutline,
  ClipboardDocumentListIcon as ClipboardDocumentListIconOutline,
  BellIcon as BellIconOutline,
  InboxIcon as InboxIconOutline,
  UserCircleIcon as UserCircleIconOutline,
} from "react-native-heroicons/outline";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
  ArchiveBoxIcon,
} from "react-native-heroicons/outline";
import TaskpoolScreen from "../screens/TaskpoolScreen";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import TasksScreen from "../screens/TasksScreen";
import TasksStack from "./TasksStack";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";
import { setCurrentLocation, setLocationError } from "../redux/auth/authSlice";
import {
  useGetUserDetailsQuery,
  useUpdateUserLocationMutation,
} from "../redux/services/authService";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { loading, error, success, userInfo, userToken, currentLocation } =
    useSelector((state) => state.auth);
  // const { location } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const [updateLocation, { isLoading }] = useUpdateUserLocationMutation();

  useEffect(() => {
    if (currentLocation) {
      console.log(currentLocation);
      const location = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      };
      updateLocation({ location });
    }
  }, [currentLocation]);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        dispatch(setLocationError("Permission to access location was denied"));
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      dispatch(setCurrentLocation(location));
      // setLocation(location);
    };

    // Fetch location initially
    fetchLocation();

    // Set up an interval to fetch a new location every 15 minutes
    const locationUpdateInterval = setInterval(fetchLocation, 15 * 60 * 1000); // 15 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(locationUpdateInterval);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Taskpool"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#91e6b3",
        tabBarStyle: {
          backgroundColor: "#18181B",
          borderTopWidth: 0,
          position: "absolute",
        },
        // tabBarBackground: () => (
        //   <BlurView
        //     tint="dark"
        //     intensity={85}
        //     style={StyleSheet.absoluteFill}
        //   />
        // ),
      }}
    >
      {userInfo.userType === "proxze" ? (
        <Tab.Screen
          options={{
            headerStyle: {
              backgroundColor: "#000000",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitle: () => (
              <Text className="text-white font-semibold">Taskpool</Text>
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <TouchableOpacity style={{ marginRight: 12 }}>
                  <FunnelIcon color="#91e6b3" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Bars3BottomRightIcon color="#91e6b3" />
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                {focused ? (
                  <BriefcaseIcon color={color} size={size} />
                ) : (
                  <BriefcaseIconOutline color={color} size={size} />
                )}
              </View>
            ),
          }}
          name="Taskpool"
          component={TaskpoolScreen}
        />
      ) : (
        <Tab.Screen
          options={{
            headerStyle: {
              backgroundColor: "#000000",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitle: () => (
              <Text className="text-white font-semibold">Taskpool</Text>
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
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                {focused ? (
                  <HomeIcon color={color} size={size} />
                ) : (
                  <HomeIconOutline color={color} size={size} />
                )}
              </View>
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
      )}

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              {focused ? (
                <ClipboardDocumentListIcon color={color} size={size} />
              ) : (
                <ClipboardDocumentListIconOutline color={color} size={size} />
              )}
            </View>
          ),
        }}
        name="TasksStack"
        component={TasksStack}
      />

      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#000000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => (
            <Text className="text-white font-semibold">Messages</Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity style={{ marginRight: 12 }}>
                <FunnelIcon color="#91e6b3" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Bars3BottomRightIcon color="#91e6b3" />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              {focused ? (
                <InboxIcon color={color} size={size} />
              ) : (
                <InboxIconOutline color={color} size={size} />
              )}
            </View>
          ),
        }}
        name="Messages"
        component={MessagesScreen}
      />

      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#000000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => (
            <Text className="text-white font-semibold">Notifications</Text>
          ),
          //   headerRight: () => (
          //     <View style={{ flexDirection: "row", marginRight: 20 }}>
          //       <TouchableOpacity style={{ marginRight: 12 }}>
          //         <FunnelIcon color="#91e6b3" />
          //       </TouchableOpacity>
          //       <TouchableOpacity>
          //         <Bars3BottomRightIcon color="#91e6b3" />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              {focused ? (
                <BellIcon color={color} size={size} />
              ) : (
                <BellIconOutline color={color} size={size} />
              )}
            </View>
          ),
        }}
        name="Notifications"
        component={NotificationsScreen}
      />

      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#000000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => (
            <Text className="text-white font-semibold">Account</Text>
          ),
          //   headerRight: () => (
          //     <View style={{ flexDirection: "row", marginRight: 20 }}>
          //       <TouchableOpacity style={{ marginRight: 12 }}>
          //         <FunnelIcon color="#91e6b3" />
          //       </TouchableOpacity>
          //       <TouchableOpacity>
          //         <Bars3BottomRightIcon color="#91e6b3" />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              {focused ? (
                <UserCircleIcon color={color} size={size} />
              ) : (
                <UserCircleIconOutline color={color} size={size} />
              )}
            </View>
          ),
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
