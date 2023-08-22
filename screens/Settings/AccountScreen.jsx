import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import TabLayout from "../../components/TabLayout";
import { deactivateAccount } from "../../redux/auth/authActions";

const AccountScreen = ({ navigation: { navigate, goBack } }) => {
  const { userToken, userInfo, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(0);

  const handleScroll = ({ contentOffset }) => {
    setScrollPosition(contentOffset.y);
    scrollRef.current = contentOffset.y;
  };

  const tabConfig = { title: "Account", headerTitle: "Account" };

  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    trigger,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const submitHandler = () => {
    const password = watch("password");
    dispatch(deactivateAccount({ password, userToken }));
  };

  return (
    <TabLayout config={tabConfig}>
      <ScrollView className="flex-1">
        <View className="pb-3 mx-5">
          <View className="mb-7">
            <Text className="text-white text-3xl font-bold">
              {tabConfig.title}
            </Text>
          </View>
        </View>
        <View className="mx-5 border border-zinc-600 rounded-xl p-5">
          <Text className="text-white text-2xl font-semibold mb-5">
            Deactivate Account
          </Text>
          <Text className="mb-7 text-white">
            {editMode
              ? "Are you sure you want to deactivate your account? Enter your password to confirm."
              : "Once you deactivate your account, there is no going back. Please be certain."}
          </Text>
          {editMode ? (
            <View>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Please enter your password",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                    message: "Please enter valid password",
                  },
                }}
                render={({ field }) => (
                  <>
                    <View className="mb-5 bg-zinc-800 rounded-lg justify-center">
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="gray"
                        // value={field.value}
                        // onChangeText={field.onChange}
                        id="password"
                        name="password"
                        secureTextEntry
                        className={`px-5 py-3 border rounded-lg justify-center text-base w-full text-white ${""}`}
                        // multiline
                      />
                    </View>
                    {errors.password && (
                      <Text className={`text-[#ff0000] mx-5 text-xs`}>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <TouchableOpacity
                className="items-center justify-center bg-red-600 rounded-xl py-3"
                onPress={submitHandler}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-white">Deactivate</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="items-center bg-red-600 rounded-xl py-3"
              onPress={() => setEditMode(true)}
            >
              <Text className="text-white">Deactivate Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </TabLayout>
  );
};

export default AccountScreen;
