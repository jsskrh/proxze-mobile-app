import { StarIcon } from "react-native-heroicons/solid";
// import gsap from "gsap";
import { useRef } from "react";
import { useEffect } from "react";
import EmptyStars from "./EmptyStars";
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
  container: `flex-row items-center`,
  starsContainer: `flex-row mr-1 relative`,
  starsWidth: `w-20`,
  stars: `flex-row`,
  visibleStars: `absolute left-0 z-10 overflow-hidden`,
  heroIcon: `text-primary`,
  heroIconSize: `h-5 w-5`,
};

const Rating = ({ rating, reviews, taskpool }) => {
  const starsRef = useRef();

  const round = (number) => {
    var rounded = Math.round(number * 2) / 2;
    return rounded;
  };

  const ratio = (point) => {
    return (round(point) / 5) * 80;
  };

  let width;

  useEffect(() => {
    width = ratio(rating);
    // gsap.set(starsRef.current, {
    //   width: width,
    // });
  }, [rating]);

  return (
    <View className={style.container}>
      <View
        className={`${style.starsContainer} ${!taskpool && style.starsWidth}`}
      >
        {rating === 0 ? (
          <Text className={`font-bold uppercase text-[#999]`}>New</Text>
        ) : (
          <>
            <View
              className={`${style.stars} ${style.visibleStars}`}
              ref={starsRef}
              style={{ width }}
            >
              <View className={style.stars}>
                {[...Array(5)].map((e, index) => (
                  <StarIcon size={16} color="#FFD700" key={index} />
                ))}
              </View>
            </View>
            <EmptyStars style={style} />
          </>
        )}
      </View>
      {!taskpool && (
        <Text className="text-gray-400">
          {rating} of {reviews} reviews
        </Text>
      )}
    </View>
  );
};

export default Rating;
