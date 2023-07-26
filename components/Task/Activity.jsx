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
  subSection: `py-7 mx-5 border-b border-gray-600`,
  subSectionHeader: `text-xl mb-5 text-white`,
  list: `text-sm`,
  listItem: `mb-2 flex-row`,
  listName: `font-semibold text-gray-400`,
  listValue: `ml-1 text-gray-200`,
};

const Activity = ({ task }) => {
  return (
    <View className={style.subSection}>
      <Text className={style.subSectionHeader}>Activity on job</Text>
      <View className={style.list}>
        <View className={style.listItem}>
          <Text className={style.listName}>Offers:</Text>
          <Text className={style.listValue}> {task.offers.length}</Text>
        </View>
        <View className={style.listItem}>
          <Text className={style.listName}>Last viewed by principal:</Text>
          <Text className={style.listValue}> 6 hours ago</Text>
        </View>
      </View>
    </View>
  );
};

export default Activity;
