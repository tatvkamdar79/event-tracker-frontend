import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ViewStyle, Animated, Easing } from "react-native";

interface CustomProgressBarProps {
  progress: number;
  color: string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const ProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  color,
  height = 8,
  borderRadius = 10,
  style,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container, { height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.progressFill,
          {
            backgroundColor: color,
            height,
            borderRadius,
            width: widthInterpolated,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    width: "100%",
  },
  progressFill: {
    left: 0,
    position: "absolute",
    top: 0,
  },
});

export default ProgressBar;
