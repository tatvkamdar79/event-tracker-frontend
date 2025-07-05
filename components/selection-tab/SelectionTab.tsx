import useScreenSize from "@/hooks/useScreenSize";
import {
  neutral00,
  neutral24,
  neutral64,
  neutral80,
  primary400,
} from "@/utils/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../text/appText";

const SelectionTab = ({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isMobile = useScreenSize();

  const renderMobileTabs = () => (
    <View style={styles.selectTabContainerMobile}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tabMobile,
              selectedTab === tab && styles.selectedTabMobile,
            ]}
          >
            <AppText
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: selectedTab === tab ? neutral00 : neutral80,
              }}
            >
              {tab}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderWebTabs = () => (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.selectTabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
          >
            <AppText
              style={{
                textAlign: "center",
                color: selectedTab === tab ? "" : neutral64,
                fontWeight: selectedTab === tab ? 600 : 500,
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

  return isMobile ? renderMobileTabs() : renderWebTabs();
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  selectTabContainer: {
    backgroundColor: neutral24,
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    padding: 4,
    width: "auto",
  },
  selectTabContainerMobile: {
    alignItems: "center",
    backgroundColor: neutral24,
    borderRadius: 20,
    flexDirection: "row",
    height: 40,
    padding: 4,
  },
  selectedTab: {
    alignItems: "center",
    backgroundColor: neutral00,
    height: 32,
    justifyContent: "center",
    padding: 6,
  },
  selectedTabMobile: {
    alignItems: "center",
    backgroundColor: primary400,
    height: 32,
    justifyContent: "center",
    padding: 6,
  },
  tab: {
    alignItems: "center",
    borderRadius: 6,
    flexShrink: 0,
    height: 32,
    justifyContent: "center",
    marginHorizontal: 2,
    minWidth: 100,
    padding: 6,
    width: "auto",
  },
  tabMobile: {
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
    height: 32,
    justifyContent: "center",
    marginHorizontal: 4,
    padding: 6,
  },
});

export default SelectionTab;
