import {
  View,
  Text,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  PanResponder,
} from "react-native";
import React, { useState, useEffect } from "react";

const TouchModal = ({ children, visible, setVisible }) => {
  const onDismiss = () => {
    setVisible(false);
  };

  const [panY] = useState(new Animated.Value(Dimensions.get("screen").height));

  const _resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const _closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get("screen").height,
    duration: 500,
    useNativeDriver: false,
  });

  const _panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, { dy: panY }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gs) => {
      if (gs.dy > 0 && gs.vy > 2) {
        return _closeAnim.start(() => onDismiss());
      }
      return _resetPositionAnim.start();
    },
  });

  // Convert the interpolation code to a variable
  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // Handle componentDidUpdate using useEffect
  useEffect(() => {
    if (visible) {
      _resetPositionAnim.start();
    }
  }, [visible]);

  // Handle _handleDismiss as a separate function
  const handleDismiss = () => {
    _closeAnim.start(() => onDismiss());
  };

  return (
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => handleDismiss()}
    >
      <View className="flex-1 justify-end bg-[#000000AA]">
        <Animated.View
          {..._panResponders.panHandlers}
          style={[{ top }]}
          className="pt-3 rounded-t-xl bg-zinc-800"
        >
          <View className="items-center">
            <View className="bg-zinc-500 rounded-full h-1 w-1/6"></View>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default TouchModal;
