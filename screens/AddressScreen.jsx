import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  useContext,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MapPinIcon } from "react-native-heroicons/outline";
import * as Location from "expo-location";
import TabLayout from "../components/TabLayout";
import { RequestContext } from "../components/RequestProvider";

const AddressScreen = ({ navigation: { navigate, goBack } }) => {
  // const { setValue, watch, control, errors, trigger } =
  //   useContext(RequestContext);

  console.log(RequestContext);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const tabConfig = {
    title: "Location",
    headerTitle: "Location",
    bg: "rgb(24 24 27)",
  };

  const data = [
    {
      title: "Higher College, Yaba",
      subtitle: "Herbert Macaulay Way, Lagos Mainland, Lagos, 23401, Nigeria",
    },
    {
      title: "Murtala Muhammed International Airport",
      subtitle: "Airport Road, Lagos, 23401, Nigeria",
    },
    {
      title: "Hard Rock Cafe Lagos",
      subtitle: "Oniru Estate, Eti-Osa, Lagos, Nigeria",
    },
  ];

  return (
    <TabLayout config={tabConfig}>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <View className="">
            <TouchableOpacity className="mb-7">
              <View className="mx-5 py-3 border-y-[1px] flex-row items-center border-zinc-600">
                <View
                  className="p-1 mr-4 rounded-full items-center justify-center"
                  style={{ backgroundColor: "grey" }}
                >
                  <Ionicons name="navigate" size={22} />
                </View>
                <View className="truncate flex-1">
                  <Text className="text-white text-lg">Current Location</Text>
                  <Text
                    className="text-white text-base"
                    style={{ color: "gray" }}
                    numberOfLines={1}
                  >
                    {text}
                  </Text>
                </View>
              </View>
              {/* <Text className="text-white text-base font-semibold">
              Tasks you might like...
            </Text> */}
            </TouchableOpacity>
            <View className="mx-5 border-b pb-4 border-zinc-600">
              <Text className="text-white uppercase font-semibold">
                Search Result
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mx-5 border-t-[1px] border-zinc-600"></View>
        )}
        contentContainerStyle={{
          // paddingBottom: useBottomTabBarHeight(),
          paddingTop: 4,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity>
            <View className="mx-5 py-3 flex-row items-center">
              <View
                className="p-1 mr-4 rounded-full items-center justify-center"
                style={{ backgroundColor: "grey" }}
              >
                <MapPinIcon size={22} color="#91e6b3" />
              </View>
              <View className="truncate flex-1">
                <Text className="text-white text-lg">{item.title}</Text>
                <Text
                  className="text-white text-base"
                  style={{ color: "gray" }}
                  numberOfLines={1}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-zinc-600 mx-5"></View>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </TabLayout>
  );
};

export default AddressScreen;
