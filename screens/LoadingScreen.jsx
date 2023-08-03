import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const LoadingScreen = ({ word, duration }) => {
  const animatedValues = useRef([]);
  const wordArr = word.split("");
  wordArr.forEach((_, index) => {
    animatedValues.current[index] = new Animated.Value(0);
  });
  const animated = (toValue = 1) => {
    const animations = wordArr.map((_, index) => {
      return Animated.timing(animatedValues.current[index], {
        toValue,
        duration: 700,
        useNativeDriver: true,
        // delay: index * duration,
      });
    });

    Animated.stagger(200, animations).start();
  };

  useEffect(() => {
    animated();
  }, []);

  //   useEffect(() => {
  //     wordArr.forEach((_, index) => {
  //       animatedValues.current[index] = new Animated.Value(0);
  //     });
  //     const animations = wordArr.map((_, index) => {
  //       return Animated.timing(animatedValues.current[index], {
  //         toValue: 1,
  //         duration: duration,
  //         useNativeDriver: true,
  //         // delay: index * duration,
  //       });
  //     });
  //     // Animated.parallel(animations).start();
  //     Animated.stagger(duration / 2, animations).start();
  //   }, []);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* <Text className="text-white text-6xl font-bold">
        {wordArr.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{ opacity: animatedValues.current[index] }}
          >
            {letter}
          </Animated.Text>
        ))}
      </Text> */}
      <View className="flex-row">
        {wordArr.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{
              opacity: animatedValues.current[index],
              color: "white",
              fontWeight: 700,
              fontSize: 60,
            }}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

export default LoadingScreen;
