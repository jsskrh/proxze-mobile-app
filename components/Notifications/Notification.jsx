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
import {
  ClipboardDocumentListIcon,
  WalletIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { useEffect, useState, useRef } from "react";
import { timeAgo } from "../../utils/helpers";
import Rating from "../Rating";
import {
  shortenId,
  updateColor,
  timeDue,
  mailDate,
  convertDateWithoutTime,
} from "../../utils/helpers";

const style = {
  container: `mx-5`,
  containerInner: `flex-row`,
  title: `text-base font-semibold text-white`,
  description: `text-sm mb-3 text-gray-300`,
  topInfo: `text-xs mb-3 flex-row justify-between`,
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

const Notification = ({
  notification,
  index,
  pending,
  isLast,
  navigate,
  archive,
}) => {
  const boxRef = useRef(null);

  const [color, setColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    const dueColor = updateColor(notification.startDate, notification.endDate);
    setColor(dueColor);
  }, [notification]);

  return (
    <TouchableOpacity
      className={`${style.container} notification`}
      ref={boxRef}
      onPress={() => navigate("Task")}
    >
      <View className={style.containerInner}>
        {/* <View className="flex-row mb-7 justify-between items-center">
          <View className="flex-row items-center">
            <Text className={style.title}>{notification.type}</Text>
            <View className="p-1 px-3 ml-3 rounded bg-blue-300">
              <Text className="text-blue-700 font-semibold">
                {shortenId(notification.id)}
              </Text>
            </View>
          </View>
          <Text className={`${style.bold} ${style.bill}`}>₦{notification.bill}</Text>
        </View>
        <View className={style.topInfo}>
          <Text className={style.date}>
            {lastActivity.status}{" "}
            {archive
              ? convertDateWithoutTime(lastActivity.timestamp)
              : timeAgo(
                  pending
                    ? notification.timeline.find((block) => block.status === "created")
                        .timestamp
                    : notification.timeline.find((block) => block.status === "approved")
                        .timestamp
                )}
          </Text>
          {archive ? (
            <Rating rating={notification.rating} notificationpool />
          ) : (
            <Text className={`${style.date} font-bold`} style={{ color }}>
              {timeDue(notification.endDate)}
            </Text>
          )}
        </View> */}
        <View className="mr-5">
          <View className="py-3 items-center">
            {/* <UserCircleIcon size={57} /> */}
            <View className="h-6 w-6 mb-2.5 items-center justify-center rounded-full">
              {/* <Text className="text-white text-lg">
              {converserInfo.firstName.charAt(0)}
              {converserInfo.lastName.charAt(0)}
            </Text> */}
              {notification.type === "credit" ? (
                <WalletIcon size={23} color="rgb(34, 197, 94)" />
              ) : notification.type === "review" ? (
                <StarIcon size={23} color="#FFD700" />
              ) : (
                <ClipboardDocumentListIcon size={23} color="rgb(59 130 246)" />
              )}
            </View>
            {notification.read && (
              <View className="h-2.5 w-2.5 items-center justify-center bg-[#91e6b3] rounded-full"></View>
            )}
          </View>
        </View>
        <View
          className={`flex-1 py-3 ${isLast ? "" : "border-b"} border-gray-600`}
        >
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">
              {notification.task.type} #{shortenId(notification.task.id)}
            </Text>
            <Text className="text-gray-500 text-base">
              {mailDate(notification.createdAt)}
            </Text>
          </View>
          <Text className="text-white text-base">
            {notification.type === "offer" ? (
              <>
                An offer has been made for{" "}
                <Text className={style.strong}>{notification.task.title}</Text>
              </>
            ) : notification.type === "approve" ? (
              <>Your request has been approved</>
            ) : notification.type === "confirm" ? (
              <>Your task has been confirmed complete</>
            ) : notification.type === "assign" ? (
              <>You have been assigned a task</>
            ) : notification.type === "start" ? (
              <>Your task has started</>
            ) : notification.type === "complete" ? (
              <>Your request has been completed</>
            ) : notification.type === "ticket" ? (
              <>
                Response for ticket{" "}
                <Text className={style.strong}># {notification.ticket}</Text>{" "}
              </>
            ) : notification.type === "credit" ? (
              <>
                You have been payed{" "}
                <Text className={style.strong}>₦{notification.amount}</Text>
              </>
            ) : notification.type === "debit" ? (
              <>
                <Text className={style.strong}>₦{notification.amount}</Text> has
                been withdrawn from your wallet
              </>
            ) : (
              "You have recieved a new review"
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
