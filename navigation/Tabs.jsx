import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  InboxIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import {
  BriefcaseIcon as BriefcaseIconOutline,
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
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import TasksScreen from "../screens/TasksScreen";
import TasksStack from "./TasksStack";
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

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Taskpool"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#91e6b3",
        tabBarStyle: {
          //   backgroundColor: "#18181B",
          borderTopWidth: 0,
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={85}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
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
          headerShown: false,
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
