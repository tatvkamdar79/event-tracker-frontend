import useScreenSize from "@/hooks/useScreenSize";
import {
  blue200,
  blue800,
  neutral00,
  neutral40,
} from "@/utils/constants/colors";
import React from "react";
import { Image, ImageSourcePropType, Platform, View } from "react-native";
import AppText from "../text/appText";

export default function TabIcon({
  focused,
  icon,
  name,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  name?: string;
}) {
  const isMobile = useScreenSize();
  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
        marginBottom: Platform.OS === "web" ? 0 : 10,
      }}
    >
      {isMobile && (
        <View
          style={{
            width: 65,
            borderBlockColor: blue800,
            marginBottom: 3,
          }}
        >
          <AppText></AppText>
        </View>
      )}
      {isMobile && (
        <Image
          source={icon}
          style={{
            width: 28,
            height: 28,
            tintColor: focused ? blue800 : neutral40,
            resizeMode: "contain",
          }}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <AppText
          numberOfLines={2}
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: isMobile ? 10 : 18,
            color: neutral00,
          }}
        >
          {name}
        </AppText>
      </View>
      {!isMobile && (
        <View
          style={{
            borderBottomWidth: focused ? 5 : 0,
            width: 65,
            borderBlockColor: blue200,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginTop: 20,
          }}
        >
          <AppText></AppText>
        </View>
      )}
    </View>
  );
}
