import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import data from "../../utils/data";
import { convertDateWithoutTime } from "../../utils/helpers";
import Rating from "../Rating";

const style = {
  container: `text-sm`,
  subSectionHeader: `text-xl mb-5 text-white`,
  ratingsContainer: `flex-row mb-5`,
  rateContainer: `flex flex-col mb-3`,
  name: `text-primary mb-3 font-semibold`,
  name: `text-[#91e6b3] mb-3 font-semibold`,
  rate: `font-semibold`,
  date: `text-xs text-gray-600`,
};

const AboutProxzi = ({ proxzi }) => {
  return (
    <View className={style.container}>
      <Text className={style.subSectionHeader}>About the proxzi</Text>
      <View className={style.ratingsContainer}>
        <Rating reviews={proxzi.reviews} rating={proxzi.rating} />
      </View>
      <Text className={style.name}>{proxzi.name}</Text>
      {/* <View className={style.rateContainer}>
        <Text className={style.rate}>96% success rate</Text>
        <Text>19 jobs done</Text>
      </View> */}
      <View>
        <Text className={style.date}>
          Member since {convertDateWithoutTime(proxzi.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default AboutProxzi;
