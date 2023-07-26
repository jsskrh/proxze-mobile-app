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
import Rating from "../Rating";
import { convertDateWithoutTime } from "../../utils/helpers";

const user = { rating: 4.48, reviews: 24 };

const style = {
  container: `text-sm mb-7`,
  subSectionHeader: `text-xl mb-5 text-white`,
  ratingsContainer: `flex-row mb-5`,
  rateContainer: `flex flex-col mb-3`,
  name: `text-[#135446] mb-3 font-semibold`,
  rate: `font-semibold`,
  date: `text-xs text-gray-600`,
};

const AboutPrincipal = ({ principal }) => {
  return (
    <View className={style.container}>
      <Text className={style.subSectionHeader}>About the principal</Text>
      <View className={style.ratingsContainer}>
        <Rating rating={principal.rating} reviews={principal.reviews} />
      </View>
      <Text className={style.name}>{principal.name}</Text>
      {/* <View className={style.rateContainer}>
        <Text className={style.rate}>21 jobs posted</Text>
        <Text>3 jobs open</Text>
      </View> */}
      <View>
        <Text className={style.date}>
          Member since {convertDateWithoutTime(principal.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default AboutPrincipal;
