import {
  error200,
  error800,
  neutral00,
  neutral100,
  neutral64,
  primary100,
  primary400,
  success200,
  success800,
  warning200,
  warning800,
} from "@/utils/constants/colors";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastProps,
} from "react-native-toast-message";
import useScreenSize from "@/hooks/useScreenSize";
import AppText from "../text/appText";

export const ToastConfiguration: ToastConfig = {
  Success: (props: ToastProps) => {
    const isMobile = useScreenSize();
    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: success800,
          backgroundColor: success200,
          width: isMobile === true ? "80%" : "30%",
          marginTop: isMobile === true ? "6%" : "1.8%",
          left: isMobile === true ? "1%" : "33%",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 18, fontWeight: "bold" }}
        text2Style={{ fontSize: 14, color: neutral64 }}
        text2NumberOfLines={5}
      />
    );
  },

  Error: (props: ToastProps) => {
    const isMobile = useScreenSize();
    return (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: error800,
          backgroundColor: error200,
          width: isMobile === true ? "80%" : "30%",
          marginTop: isMobile === true ? "6%" : "1.8%",
          left: isMobile === true ? "1%" : "33%",
        }}
        text1Style={{ fontSize: 16, fontWeight: "bold" }}
        text2Style={{
          fontSize: 14,
          color: neutral64,
          width: "100%",
          flexWrap: "wrap",
        }}
        text2NumberOfLines={5}
      />
    );
  },

  Info: (props: ToastProps) => {
    const isMobile = useScreenSize();
    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: primary400,
          backgroundColor: primary100,
          width: isMobile === true ? "80%" : "30%",
          marginTop: isMobile === true ? "6%" : "1.8%",
          left: isMobile === true ? "1%" : "33%",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: primary400 }}
        text2Style={{ fontSize: 14, color: primary400 }}
        text2NumberOfLines={5}
      />
    );
  },

  Warning: (props: ToastProps) => {
    const isMobile = useScreenSize();
    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: warning800,
          backgroundColor: warning200,
          width: isMobile === true ? "80%" : "30%",
          marginTop: isMobile === true ? "6%" : "1.8%",
          left: isMobile === true ? "1%" : "33%",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: warning800 }}
        text2Style={{ fontSize: 14, color: neutral64 }}
        text2NumberOfLines={5}
      />
    );
  },

  CustomClose: ({ text1, text2, props }) => {
    const isMobile = useScreenSize();
    return (
      <View style={[styles.customWrapper, props?.positionStyle]}>
        <BaseToast
          {...props}
          style={[
            styles.toastStyle,
            {
              backgroundColor: props?.backgroundColor || neutral00,
              borderLeftColor: props?.borderColor || primary100,
              minHeight: 50,
              width: isMobile === true ? "80%" : "30%",
              marginTop: isMobile === true ? "6%" : "1.8%",
              left: isMobile === true ? "1%" : "33%",
            },
          ]}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1={text1}
          text2={text2}
          text1Style={{
            fontSize: 16,
            fontWeight: "bold",
            color: props?.text1Color || primary100,
          }}
          text2Style={{ fontSize: 14, color: props?.text2Color || neutral64 }}
          text2NumberOfLines={5}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => Toast.hide()}
        >
          <AppText style={styles.closeIcon}>✕</AppText>
        </TouchableOpacity>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  closeButton: {
    padding: 5,
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 10000,
  },
  closeIcon: {
    color: error800,
    fontSize: 18,
  },
  customWrapper: {
    position: "absolute",
    zIndex: 9999,
  },

  toastStyle: {
    elevation: 4,
    minHeight: 60,
    shadowColor: neutral100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 300,
  },
});

// how to use the toasts

// <View style={{ margin: 20, borderWidth: 1, padding: 10 }}>
//       <AppText>
//         This is for testing buttons only, remove this view after checking
//       </AppText>

//       <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
//         <Button
//           title="Show Success Toast"
//           onPress={() => {
//             Toast.show({
//               type: "Success",
//               text1: "Success",
//               text2: "Everything worked perfectly!",
//               visibilityTime: 1000,
//             });
//           }}
//         />
//       </View>

// <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
//   <Button
//     title="Show Error Toast"
//     onPress={() => {
//       Toast.show({
//         type: "Error",
//         text1: "Error",
//         text2: "Nothing worked perfectly!",
//         position: "top",
//       });
//     }}
//   />
// </View>

// <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
//   <Button
//     title="Show Warning Toast"
//     onPress={() => {
//       Toast.show({
//         type: "Warning",
//         text1: "Warning",
//         text2: "Something worked perfectly!",
//         position: "bottom",
//       });
//     }}
//   />
// </View>

//       <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
//         <Button
//           title="Show Information Toast"
//           onPress={() => {
//             Toast.show({
//               type: "Info",
//               text1: "Information",
//               text2: "Information details here.",
//               position: "top",
//             });
//           }}
//         />
//       </View>

//       <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
//         <Button
//           title="Show Uploaded Toast (Customclose)"
//           onPress={() => {
//             Toast.show({
//               type: "CustomClose",
//               text1: "Uploaded 🎉",
//               text2: "Your file was uploaded successfully.",
//               props: {
//                 positionStyle: {
//                   top: "10%",
//                   right: "3%",
//                 },
//                 backgroundColor: success200,
//                 borderColor: "green",
//                 text1Color: "green",
//                 text2Color: neutral64,
//               },
//             });
//           }}
//         />
//       </View>

//     </View>
