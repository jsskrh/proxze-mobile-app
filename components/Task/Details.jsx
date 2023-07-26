import { convertDateWithoutTime } from "../../utils/helpers";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const style = {
  subSection: `py-7 border-b mx-5 border-gray-600`,
  subSectionHeader: `text-xl mb-5 text-white`,
  list: `text-sm`,
  listItem: `mb-2 flex-row`,
  listName: `font-semibold text-gray-400`,
  listValue: `ml-1 text-gray-200`,
};

const Details = ({ task }) => {
  const taskDetails = [
    { name: "Minimum level of education", value: task.educationLevel },
    { name: "Skill Type", value: task.skillLevel },
    { name: "Occupation", value: task.occupation },
    { name: "Certified", value: task.isCertified ? "Yes" : "No" },
    { name: "Time of work", value: task.timeBlock },
    { name: "Start Date", value: convertDateWithoutTime(task.startDate) },
    { name: "End Date", value: convertDateWithoutTime(task.endDate) },
  ];

  return (
    <View className={style.subSection}>
      <Text className={style.subSectionHeader}>Task Details</Text>
      <View className={style.list}>
        {taskDetails.map((detail, index) => (
          <View className={style.listItem} key={index}>
            <Text className={`${style.listName}`}>{detail.name}:</Text>
            <Text className={`${style.listValue}`}>{detail.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Details;
