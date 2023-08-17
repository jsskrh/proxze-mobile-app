import Status from "./Status";
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

const style = {
  container: `py-7 mx-5 border-b border-gray-600`,
  subSectionHeader: `text-xl mb-5 text-white`,
};

const Timeline = ({ timeline }) => {
  return (
    <View className={style.container}>
      <Text className={style.subSectionHeader}>Timeline</Text>
      <View>
        {[
          {
            type: "created",
            date: timeline.find((block) => block.status === "created")
              ?.timestamp,
          },
          {
            type: "assigned",
            date: timeline.find((block) => block.status === "assigned")
              ?.timestamp,
          },
          {
            type: "approved",
            date: timeline.find((block) => block.status === "approved")
              ?.timestamp,
          },
          {
            type: "started",
            date: timeline.find((block) => block.status === "started")
              ?.timestamp,
          },
          {
            type: "completed",
            date: timeline.find((block) => block.status === "completed")
              ?.timestamp,
          },
          {
            type: "confirmed",
            date: timeline.find((block) => block.status === "confirmed")
              ?.timestamp,
          },
        ].map((step) => (
          <Status
            type={step.type}
            statusDate={step.date}
            status={timeline[timeline.length - 1].status}
            key={step.type}
          />
        ))}
      </View>
    </View>
  );
};

export default Timeline;
