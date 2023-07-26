import { StarIcon } from "react-native-heroicons/outline";
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

const EmptyStars = ({ style }) => {
  return (
    <View className={`${style.stars} ${style.hiddenStars}`}>
      {[...Array(5)].map((e, index) => (
        <StarIcon size={16} color="rgb(107 114 128)" key={index} />
      ))}
    </View>
  );
};

export default EmptyStars;
