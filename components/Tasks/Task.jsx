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
import { timeAgo } from "../../utils/helpers";
import Rating from "../Rating";
import {
  shortenId,
  updateColor,
  timeDue,
  convertDateWithoutTime,
} from "../../utils/helpers";

const style = {
  container: `mx-5`,
  containerInner: `p-5 py-4`,
  title: `text-base font-semibold text-white`,
  description: `text-sm mb-3 text-gray-300`,
  topInfo: `text-xs flex-row justify-between`,
  bill: `text-white`,
  date: `text-gray-500 capitalize`,
  bold: `font-semibold`,
  offers: `mb-3 text-xs`,
  offersText: `font-semibold`,
  heroIcon: `h-4 w-4`,
  bottomInfo: `text-xs flex-row items-center`,
  location: `flex-row ml-3 items-center`,
  locationText: `ml-1 text-gray-500`,
};

const Task = ({ task, lastActivity, pending, home, navigate, archive }) => {
  const boxRef = useRef(null);

  const [color, setColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    const dueColor = updateColor(task.startDate, task.endDate);
    setColor(dueColor);
  }, [task]);

  return (
    <TouchableOpacity
      className={`${style.container} task`}
      ref={boxRef}
      onPress={() => navigate("Task")}
    >
      <View className={style.containerInner}>
        <View className="flex-row mb-3 justify-between items-center">
          <View className="flex-row items-center">
            <Text className={style.title}>{task.type}</Text>
            <View className="p-1 px-3 ml-3 rounded bg-blue-300">
              <Text className="text-blue-700 font-semibold">
                {shortenId(task.id)}
              </Text>
            </View>
          </View>
          <Text className={`${style.bold} ${style.bill}`}>₦{task.bill}</Text>
        </View>
        <View className={style.topInfo}>
          <Text className={style.date}>
            {lastActivity.status}{" "}
            {archive
              ? convertDateWithoutTime(lastActivity.timestamp)
              : timeAgo(
                  pending
                    ? task.timeline.find((block) => block.status === "created")
                        .timestamp
                    : task.timeline.find((block) => block.status === "approved")
                        .timestamp
                )}
          </Text>
          {archive ? (
            <Rating rating={task.rating} taskpool />
          ) : (
            <Text className={`${style.date} font-bold`} style={{ color }}>
              {timeDue(task.endDate)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;
