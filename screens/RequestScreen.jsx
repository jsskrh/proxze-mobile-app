import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import {
  FunnelIcon,
  Bars3BottomRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import { XMarkIcon } from "react-native-heroicons/solid";
import { XCircleIcon } from "react-native-heroicons/solid";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import TabLayout from "../components/TabLayout";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { RequestContext } from "../components/RequestProvider";
import { setLocation } from "../redux/task/taskSlice";

const requestTypes = ["Verification"];

const RequestScreen = ({
  navigation: { navigate, goBack, popToTop, setOptions },
}) => {
  const { location } = useSelector((state) => state.task);
  const { userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const {
    setValue,
    watch,
    control,
    errors,
    reset,
    trigger,
    // submitHandler,
    handleSubmit,
  } = useContext(RequestContext);

  const [showTypePicker, setShowTypePicker] = useState(false);

  const tabConfig = {
    title: "Request",
    headerTitle: "Request",
    bg: "rgb(24 24 27)",
  };

  // useEffect(() => {
  //   const header = () =>
  //     setOptions({
  //       headerRight: () => (
  //         // <TouchableOpacity onPress={() => goBack()}>
  //         <Button
  //           className="text-white"
  //           title="Next"
  //           onPress={handleSubmit(submitHandler)}
  //         />
  //         // </TouchableOpacity>
  //       ),
  //     });

  //   header();
  // }, []);

  useEffect(() => {
    setValue("requestType", "Verification");
    setValue("endDate", new Date());
    setValue("startDate", new Date());
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
    setValue("startDate", currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
    setValue("endDate", currentDate);
  };

  const makeRequest = async (details) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `https://proxze-backend-app.onrender.com/api/task`,
        details,
        config
      );
      // console.log(data);
      setLoading(false);
      dispatch(setLocation(null));
      reset();
      navigate("Task", { taskId: data.data._id });
      // goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  const submitHandler = async ({
    requestType,
    description,
    startDate,
    endDate,
    // location,
  }) => {
    const data = {
      type: requestType,
      description,
      startDate,
      endDate,
      location,
      bill: 500500,
    };
    console.log(data);
    // dispatch(makeRequest(data));
    makeRequest(data);
  };

  return (
    <TabLayout config={tabConfig}>
      <ScrollView className="pt-5">
        <TouchableWithoutFeedback onPress={() => setShowTypePicker(true)}>
          <View className="mx-5 px-5 py-2 bg-zinc-800 rounded-lg flex-row justify-between items-center">
            <Text className="text-white capitalize text-base">
              Request Type
            </Text>
            <View className="flex-row items-center">
              <Text className="text-base" style={{ color: "gray" }}>
                {watch("requestType")}
              </Text>
              <View className="ml-2">
                <ChevronUpIcon size={14} color="rgb(156, 163, 175)" />
                <ChevronDownIcon size={14} color="rgb(156, 163, 175)" />
              </View>
            </View>
            {errors.requestType && (
              <Text className={`text-[#ff0000] mx-5 text-xs`}>
                {errors.requestType.message}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>

        <View className="mt-8 mx-5 rounded-lg bg-zinc-800">
          <View className=" px-5 py-1 flex-row justify-between items-center">
            <Text className="text-white capitalize text-base">Start Time</Text>
            <View className="flex-row items-center gap-x-1">
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeStartDate}
                themeVariant="dark"
              />
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeStartDate}
                themeVariant="dark"
              />
            </View>
          </View>

          <View className="mx-5 h-0.5 w-full self-stretch border-gray-600"></View>

          <View className="px-5 py-2 flex-row justify-between items-center">
            <Text className="text-white capitalize text-base">End Time</Text>
            <View className="flex-row items-center gap-x-1">
              {/* <Controller
                name="endDate"
                control={control}
                // rules={{
                //   required: "Please enter the task end date",
                //   validate: (value) => value > startDate,
                // }}
                render={({ field }) => ( */}
              <DateTimePicker
                testID="endDate"
                value={endDate}
                // value={watch("endDate")}
                mode={"date"}
                // name="endDate"
                // id="endDate"
                is24Hour={true}
                onChange={onChangeEndDate}
                // onChange={field.onChange}
                themeVariant="dark"
              />
              {/* )}
              /> */}
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeEndDate}
                themeVariant="dark"
              />
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => navigate("Address")}>
          <View className="mx-5 px-5 py-2 mt-8 bg-zinc-800 rounded-lg flex-row justify-between items-center">
            {location ? (
              <>
                <Text className="capitalize text-base text-white">
                  {location.label}
                </Text>
                <View className="flex-row items-center h-7">
                  <XCircleIcon color="gray" />
                </View>
              </>
            ) : (
              <Text className="capitalize text-base" style={{ color: "gray" }}>
                Location
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>

        <Controller
          name="description"
          control={control}
          rules={{
            required: "Please describe your request",
          }}
          render={({ field }) => (
            <>
              <View className="mx-5 mt-8 bg-zinc-800 rounded-lg items-center">
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="gray"
                  value={field.value}
                  onChangeText={field.onChange}
                  id="description"
                  name="description"
                  className={`px-5 py-3 border rounded-lg text-base w-full h-56 text-white ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  multiline
                />
              </View>
              {errors.description && (
                <Text className={`text-[#ff0000] mx-5 text-xs`}>
                  {errors.description.message}
                </Text>
              )}
            </>
          )}
        />

        <View className="mx-5 px-5 py-2 mt-8 bg-zinc-800 rounded-lg">
          <View className="flex-row justify-between items-center">
            <Text className="capitalize text-base text-white">Bill</Text>
            <View className="flex-row items-center h-10">
              <Text className="capitalize text-base" style={{ color: "gray" }}>
                N500000
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="capitalize text-base text-white">Service Fee</Text>
            <View className="flex-row items-center h-10">
              <Text className="capitalize text-base" style={{ color: "gray" }}>
                N500
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="capitalize text-base text-white font-semibold">
              Total
            </Text>
            <View className="flex-row items-center h-10">
              <Text
                className="capitalize text-base font-semibold"
                style={{ color: "gray" }}
              >
                N500500
              </Text>
            </View>
          </View>
        </View>

        <View
          className="py-7 gap-y-5 mx-5"
          // ref={bottomContentRef}
          // onLayout={() => {
          //   bottomContentRef.current.measureInWindow((x, y) => {
          //     // Update the position of the bottomContent relative to the window
          //     bottomContentRef.current.y = y;
          //   });
          // }}
        >
          {loading ? (
            <TouchableOpacity
              className="p-4 items-center bg-[#38a139] rounded-lg"
              // onPress={handleSubmit(submitHandler)}
            >
              <ActivityIndicator color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="p-4 items-center bg-[#38a139] rounded-lg"
              onPress={handleSubmit(submitHandler)}
            >
              <Text className="text-white capitalize font-semibold text-base">
                Proceed
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <TypePicker
        showTypePicker={showTypePicker}
        setShowTypePicker={setShowTypePicker}
        control={control}
        options={requestTypes}
      />
    </TabLayout>
  );
};

export default RequestScreen;

// import { View, Text,Modal,
//   Dimensions,
//   TouchableWithoutFeedback, } from 'react-native'
// import React from 'react'

const TypePicker = ({
  showTypePicker,
  setShowTypePicker,
  control,
  options,
}) => {
  const { height } = useWindowDimensions();

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={showTypePicker}
      onRequestClose={() => setShowTypePicker(!showTypePicker)}
    >
      <View className="flex-1 bg-[#000000AA] justify-end">
        {/* <TouchableWithoutFeedback
          onPress={() => setShowTypePicker(false)}
          className="flex-1 w-full"
        ></TouchableWithoutFeedback> */}
        <View
          className="bg-zinc-800 flex-1 w-full rounded-t-3xl px-5"
          style={{
            maxHeight: height * 0.3,
            //   backgroundColor: "#ffffff",
            //   width: "100%",
          }}
        >
          <View className="items-end mt-5">
            <TouchableOpacity
              onPress={() => setShowTypePicker(false)}
              className="w-9 h-9 rounded-full bg-gray-700 justify-center items-center"
            >
              <XMarkIcon color="rgb(107, 114, 128)" size={28} />
            </TouchableOpacity>
          </View>

          <Controller
            name="requestType"
            control={control}
            rules={{
              required: "Please select a request type",
            }}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={field.onChange}
                id="requestType"
                name="requestType"
                itemStyle={{ color: "white" }}
              >
                {options.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

// export default TypePicker
