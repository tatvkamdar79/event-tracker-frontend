import useScreenSize from "@/hooks/useScreenSize";
import {
  neutral00,
  neutral100,
  neutral24,
  neutral64,
} from "@/utils/constants/colors";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../text/appText";

const WebSelectionTab = ({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isMobile = useScreenSize();

  const renderWebTabs = () => (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: neutral24,
          borderRadius: 8,
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          padding: 4,
          width: "auto",
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={{
              alignItems: "center",
              borderRadius: 6,
              flexShrink: 0,
              height: isMobile ? 28 : 32, // Adjust height for mobile
              justifyContent: "center",
              marginHorizontal: 2,
              minWidth: isMobile ? 80 : 100, // Adjust minWidth for mobile
              padding: 6,
              width: "auto",
              ...(selectedTab === tab && {
                backgroundColor: neutral00,
              }),
            }}
          >
            <AppText
              style={{
                textAlign: "center",
                fontSize: isMobile ? 14 : 16, // Adjust font size for mobile
                color: selectedTab === tab ? neutral100 : neutral64,
              }}
            >
              {tab}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <View></View>
    </View>
  );

  return renderWebTabs();
};

export default WebSelectionTab;
