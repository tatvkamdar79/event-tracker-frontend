import AppText from "@/components/text/appText";
import React, { Component } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export class HomePage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppText>Hi</AppText>
      </SafeAreaView>
    );
  }
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  body: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonOutline: {
    borderColor: "#4a90e2",
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonOutlineText: {
    color: "#4a90e2",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
