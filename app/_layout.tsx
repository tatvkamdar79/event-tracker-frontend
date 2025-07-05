import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { ToastConfiguration } from "@/components/toasts/toastConfig";

export default function _layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast config={ToastConfiguration} />
    </>
  );
}
