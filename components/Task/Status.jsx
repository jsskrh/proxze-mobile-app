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
import { convertDate } from "../../utils/helpers";

const style = {
  step: `flex-row`,
  progressBarContainer: `mr-5 relative`,
  progressBar: `w-1`,
  progressDone: `h-6`,
  barColor: `bg-[#38a139]`,
  undoneColor: `bg-gray-600`,
  progressUndone: `bg-gray-600 h-3`,
  invisible: `invisible opacity-0`,
  progressMarker: `h-4 w-4 flex-row justify-center items-center absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2`,
  markerActive: `border border-[#38a139] z-10`,
  markerInner: `h-2 w-2`,
  stepText: ``,
  stepName: `capitalize`,
  textDone: `text-gray-400 text-base`,
  textUndone: `text-gray-600 text-sm`,
  dateText: `text-sm text-gray-200`,
};

const Status = ({ status, statusDate, type }) => {
  const timeline = [
    "created",
    "assigned",
    "approved",
    "started",
    "completed",
    "confirmed",
  ];

  const doneTimeline = timeline.slice(0, timeline.indexOf(status) + 1);

  return (
    <View className={style.step}>
      <View className={style.progressBarContainer}>
        <View
          className={`${style.progressBar} ${
            type === "created" && style.invisible
          } ${
            doneTimeline.includes(type)
              ? style.progressDone
              : style.progressUndone
          } ${doneTimeline.includes(type) && style.barColor}`}
        ></View>
        <View
          className={`${style.progressMarker} ${
            status === type && style.markerActive
          }`}
        >
          <View
            className={`${style.markerInner} ${
              doneTimeline.includes(type) ? style.barColor : style.undoneColor
            }`}
          ></View>
        </View>
        <View
          className={`${style.progressBar} ${
            doneTimeline.includes(type)
              ? style.progressDone
              : style.progressUndone
          } ${
            type === "confirmed"
              ? style.invisible
              : doneTimeline.includes(type) &&
                doneTimeline.indexOf(type) !== doneTimeline.length - 1
              ? style.barColor
              : style.undoneColor
          } `}
        ></View>
      </View>
      <View className={style.stepText}>
        <Text
          className={`${style.stepName} ${
            doneTimeline.includes(type) ? style.textDone : style.textUndone
          }`}
        >
          {type}
        </Text>
        <Text className={style.dateText}>
          {statusDate && convertDate(statusDate)}
        </Text>
      </View>
    </View>
  );
};

export default Status;
