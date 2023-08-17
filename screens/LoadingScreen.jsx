import { View, Text, Animated, useColorScheme } from "react-native";
import React, { useEffect, useRef } from "react";

const LoadingScreen = ({ word, duration }) => {
  const theme = useColorScheme();
  console.log(theme);

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

  const style = {
    container: `flex-1 justify-center items-center ${
      theme === "light" ? "bg-white" : "bg-black"
    }`,
  };

  return (
    <View className={style.container}>
      <View className="flex-row">
        {wordArr.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{
              opacity: animatedValues.current[index],
              color: theme === "light" ? "black" : "white",
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
