import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../text/appText";
const CustomHeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <AppText style={styles.titleText}>Feedback</AppText>
    </View>
  );
};
export default CustomHeaderTitle;
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flex: 1,
  },
  titleText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
});
