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
  useMemo,
  useContext,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";
import TabLayout from "../components/TabLayout";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { RequestContext } from "../components/RequestProvider";
import { setLocation } from "../redux/task/taskSlice";
import billingAlgorithm from "../utils/billingAlgorithm";

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

  const [bill, setBill] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [total, setTotal] = useState(0);

  const [placesAuto, setPlacesAuto] = useState(null);
  // const [location, setLocation] = useState(null);
  const [lga, setLga] = useState("");
  const [state, setState] = useState("");

  // useEffect(() => {
  //   if (location) {
  //     geocodeByAddress(placesAuto.label).then((results) => {
  //       setLga(
  //         results[0].address_components.find((component) =>
  //           component.types.includes("administrative_area_level_2")
  //         ).long_name
  //       );
  //       setState(
  //         results[0].address_components.find((component) =>
  //           component.types.includes("administrative_area_level_1")
  //         ).long_name
  //       );
  //     });
  //   }
  // }, [location]);

  const type = watch("type");
  const dateBlock = watch("dateBlock");
  const timeBlock = watch("timeBlock");
  const duration = watch("duration");
  // const startDate = watch("startDate");
  // const endDate = watch("endDate");
  const searchRange = watch("searchRange");
  // const lga = watch("lga");
  const skillLevel = watch("skillLevel");
  const educationLevel = watch("educationLevel");
  const isCertified = watch("isCertified");
  const yearsOfExperience = watch("yearsOfExperience");

  useEffect(() => {
    console.log(location);
    const bill = billingAlgorithm(
      type,
      location?.lga,
      location?.state,
      dateBlock,
      timeBlock,
      searchRange,
      duration,
      false
    );
    setBill(bill);
  }, [type, location, dateBlock, timeBlock, searchRange, duration]);

  useEffect(() => {
    const serviceCharge = (bill * 0.015).toFixed(2);
    setServiceCharge(serviceCharge);
    setTotal(Number(bill) + Number(serviceCharge));
  }, [bill]);

  useEffect(() => {
    setValue("requestType", "Verification");
    setValue("endDate", new Date());
    setValue("startDate", new Date());
    setValue("dateBlock", "Week Range (7 days)");
    setValue("timeBlock", "Range (6am - 6pm daily)");
    setValue("duration", "1");
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
        `http://172.20.10.3:3001/api/task`,
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
    dateBlock,
    timeBlock,
    // location,
  }) => {
    const data = {
      type: requestType,
      description,
      startDate,
      endDate,
      location: { label: location.label, coords: location.coords },
      bill,
    };
    console.log(data);
    // dispatch(makeRequest(data));
    makeRequest(data);
  };

  const bottomSheetRef = useRef(null);

  const [active, setActive] = useState("");

  const handleOpenPress = () => bottomSheetRef.current.expand();

  // variables
  const snapPoints = useMemo(() => ["30%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [date, setDate] = useState(new Date());

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

        <DatePicker date={date} onDateChange={setDate} />

        <View className="mt-8 mx-5 rounded-lg bg-zinc-800">
          <TouchableWithoutFeedback
            onPress={() => {
              setActive("date");
              handleOpenPress();
            }}
          >
            <View className=" px-5 py-1 flex-row justify-between items-center">
              <Text className="text-white capitalize text-base">
                Date Block
              </Text>
              <View className="flex-row items-center py-1">
                <Text className="text-base" style={{ color: "gray" }}>
                  {watch("dateBlock")}
                </Text>
                <View className="ml-2">
                  <ChevronUpIcon size={14} color="rgb(156, 163, 175)" />
                  <ChevronDownIcon size={14} color="rgb(156, 163, 175)" />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View className="mx-5 h-0.5 w-full self-stretch border-gray-600"></View>

          <TouchableWithoutFeedback
            onPress={() => {
              setActive("time");
              handleOpenPress();
            }}
          >
            <View className="px-5 py-2 flex-row justify-between items-center">
              <Text className="text-white capitalize text-base">
                Time Block
              </Text>
              <View className="flex-row items-center py-1">
                <Text className="text-base" style={{ color: "gray" }}>
                  {watch("timeBlock")}
                </Text>
                <View className="ml-2">
                  <ChevronUpIcon size={14} color="rgb(156, 163, 175)" />
                  <ChevronDownIcon size={14} color="rgb(156, 163, 175)" />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

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

        <TouchableWithoutFeedback
          onPress={() => {
            setActive("duration");
            handleOpenPress();
          }}
        >
          <View className="mx-5 px-5 mt-8 py-2 bg-zinc-800 rounded-lg flex-row justify-between items-center">
            <Text className="text-white capitalize text-base">Duration</Text>
            <View className="flex-row items-center">
              <Text className="text-base" style={{ color: "gray" }}>
                {watch("duration")}
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
                N{bill}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="capitalize text-base text-white">Service Fee</Text>
            <View className="flex-row items-center h-10">
              <Text className="capitalize text-base" style={{ color: "gray" }}>
                N{serviceCharge}
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
                N{total}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        // backgroundStyle={{ backgroundColor: "#e6f7ff" }}
        backgroundStyle={{ backgroundColor: "rgb(39 39 42)" }}
      >
        {active === "date" ? (
          // <View className="flex-row justify-between mx-5 bg-zinc-800">
          <Controller
            name="dateBlock"
            control={control}
            rules={{
              required: "Please select a date block",
            }}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={field.onChange}
                id="dateBlock"
                name="dateBlock"
                itemStyle={{ color: "white" }}
              >
                {["Week Range (7 days)", "Specify"].map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )}
          />
        ) : active === "time" ? (
          <Controller
            name="timeBlock"
            control={control}
            rules={{
              required: "Please select a time block",
            }}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={field.onChange}
                id="timeBlock"
                name="timeBlock"
                itemStyle={{ color: "white" }}
              >
                {["Range (6am - 6pm daily)", "Specify"].map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )}
          />
        ) : (
          // </View>
          <Controller
            name="duration"
            control={control}
            rules={{
              required: "Please select a duration",
            }}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={field.onChange}
                id="duration"
                name="duration"
                itemStyle={{ color: "white" }}
              >
                {["1", "2", "3", "4"].map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )}
          />
          // </View>
        )}
      </BottomSheet>
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
