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
import { MapPinIcon } from "react-native-heroicons/solid";
import { useEffect, useState, useRef } from "react";
import { timeAgo } from "../utils/helpers";
import Rating from "./Rating";

const style = {
  container: `mx-5 border rounded-[14px] bg-zinc-800`,
  containerInner: `p-5`,
  title: `mb-7 text-base font-semibold text-white`,
  description: `text-sm mb-3 text-gray-300`,
  topInfo: `text-xs mb-3 flex-row justify-between`,
  bill: `text-white`,
  date: `text-gray-500`,
  bold: `font-semibold`,
  offers: `mb-3 text-xs`,
  offersText: `font-semibold`,
  heroIcon: `h-4 w-4`,
  bottomInfo: `text-xs flex-row items-center`,
  location: `flex-row ml-3 items-center`,
  locationText: `ml-1 text-gray-500`,
};

const Task = ({ task, pending, navigate }) => {
  const boxRef = useRef(null);

  // const handleHover = () => {
  //   gsap.to(boxRef.current, {
  //     boxShadow: "10px 10px 25px rgba(0, 0, 0, 0.3)",
  //     duration: 0.3,
  //   });
  // };

  // const handleHoverExit = () => {
  //   gsap.to(boxRef.current, {
  //     boxShadow: "none",
  //     duration: 0.3,
  //   });
  // };

  return (
    <TouchableOpacity
      className={`${style.container} task`}
      ref={boxRef}
      // onMouseEnter={handleHover}
      // onMouseLeave={handleHoverExit}
      onPress={() => navigate("Task")}
    >
      <View className={style.containerInner}>
        <Text className={style.title}>{task.type}</Text>
        <View className={style.topInfo}>
          <Text className={`${style.bold} ${style.bill}`}>₦{task.bill}</Text>
          <Text className={style.date}>
            Posted{" "}
            {timeAgo(
              pending
                ? task.timeline.find((block) => block.status === "created")
                    .timestamp
                : task.timeline.find((block) => block.status === "approved")
                    .timestamp
            )}
          </Text>
        </View>
        <Text className={style.description} numberOfLines={3}>
          {task.description}
        </Text>
        {/* {!pending && (
          <View className={style.offers}>
            <Text className={style.offersText}>Offers:</Text>{" "}
            <Text>{task.offers?.length ? task.offers.length : "0"}</Text>
          </View>
        )} */}
        <View className={style.bottomInfo}>
          <Rating rating={task.rating} taskpool />
          <View className={style.location}>
            <MapPinIcon className={style.heroIcon} size={16} color="#91e6b3" />
            <Text className={style.locationText}>
              {task.lga}, {task.state}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;
