import { Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

// import GlobalHeader from "@/components/GlobalHeader";
import CollapsibleSideNavbar from "@/components/nav/CollapsibleSideNavbar";
import TabIcon from "@/components/nav/TabIcon";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
import useScreenSize from "@/hooks/useScreenSize";
import { background } from "@/utils/constants/colors";
import { dashboard} from "@/utils/constants/images";

import { studentNavItems } from "@/utils/constants/sidebarTabs";
import { IconSymbol } from "@/components/ui/IconSymbol";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";

export default function TabLayout() {
  const isMobile = useScreenSize();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);


  if (loading) return;
  return (
    <>
      {!isMobile ? (
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <CollapsibleSideNavbar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              navItems={studentNavItems}
            />
          </View>

          {/* Main content */}
          <View style={styles.content}>
            {/* Global Header */}
            {/* <View style={styles.header}>
              <GlobalHeader isCollapsed={isCollapsed} />
            </View> */}

            {/* Children */}
            <View style={styles.children}>
              <Tabs
                screenOptions={{
                  headerShown: false,
                  // tabBarBackground: TabBarBackground,
                  tabBarStyle: Platform.select({
                    ios: {
                      position: "absolute",
                      display: isMobile ? "flex" : "none",
                    },
                    default: { display: isMobile ? "flex" : "none" },
                  }),
                }}
              >
                <Tabs.Screen
                  name="home"
                  options={{
                    title: "Home",
                    // tabBarIcon: ({ color }) => (
                    //   <IconSymbol size={28} name="house.fill" color={color} />
                    // ),
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="analytics"
                  options={{
                    title: "Analytics",
                    tabBarIcon: ({ color }) => (
                      <IconSymbol
                        size={28}
                        name="paperplane.fill"
                        color={color}
                      />
                    ),
                    href: null,
                  }}
                />
              </Tabs>
            </View>
          </View>
        </View>
      ) : (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarBackground: BlurTabBarBackground,
            tabBarStyle: Platform.select({
              ios: { position: "absolute" },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} name="Home" icon={dashboard} />
              ),
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} name="Analytics" icon={dashboard} />
              ),
              title: "Analytics",
            }}
          />
          
        </Tabs>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  children: {
    backgroundColor: background, // Add a background color if needed
    flex: 1, // Occupy remaining vertical space
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row", // Sidebar and content side by side
    width: "100%",
  },
  content: {
    flexDirection: "column", // Header on top, children below
    flex: 1,
  },
  header: {
    backgroundColor: "#f8f8f8", // Add a background color if needed,
    height: 60, // Fixed height for the header
    zIndex: 999,
  },
  sidebar: {
    height: "100%",
    maxWidth: 270, // Fixed width for the sidebar
  },
});
