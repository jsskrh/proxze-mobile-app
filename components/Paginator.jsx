import { View, Text, Animated, useWindowDimensions } from "react-native";

const Paginator = ({ data, scrollX, theme }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row h-16">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            className={`h-2 w-2 rounded-full mx-2 ${
              theme === "light" ? "bg-principal" : "bg-white"
            }`}
            style={[{ width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
