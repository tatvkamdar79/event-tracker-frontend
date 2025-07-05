import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function _layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
