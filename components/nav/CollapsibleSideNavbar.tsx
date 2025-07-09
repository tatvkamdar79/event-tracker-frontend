import { View, TouchableOpacity, Image, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  collapseIcon,
  logout,
  paperlessCollapsedIcon,
  paperlessIcon,
} from "@/utils/constants/images";
import AppText from "../text/appText";
import {
  error800,
  neutral00,
  neutral24,
  neutral64,
  primary400,
} from "@/utils/constants/colors";
import { RelativePathString, router, usePathname } from "expo-router";
import { NavSection } from "@/utils/constants/types";
// import useLogout from "@/hooks/useLogout";
interface CollapsibleSideNavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavSection[];
}
const CollapsibleSideNavbar = ({
  isCollapsed,
  setIsCollapsed,
  navItems,
}: CollapsibleSideNavbarProps) => {
  const [selectedTab, setSelectedTab] = useState("");

  const widthAnim = useRef(new Animated.Value(270)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // const signout = useLogout();
  const uri = usePathname();

  useEffect(() => {
    const setSidebarActiveTab = () => {
      // Flatten all items from all sections and find the matching route
      const matchingItem = navItems
        .flatMap((section) => section.items)
        .find((item) => uri.indexOf(item.route) >= 0);

      setSelectedTab(matchingItem?.name || "");
    };

    setSidebarActiveTab();
  }, [uri]);

  const toggleCollapse = () => {
    const toValue = isCollapsed ? 270 : 80;
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: isCollapsed ? 0 : 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setIsCollapsed(!isCollapsed);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const navClickHandler = (name: string, route: RelativePathString) => {
    if (uri !== `/${route}`) {
      setSelectedTab(name);
      router.replace(route);
    }
  };

  const logoutPressHandler = async () => {
    // await signout();
  };

  return (
    <Animated.ScrollView
      style={{
        maxWidth: widthAnim,
        backgroundColor: neutral00,
        paddingHorizontal: 20,
        paddingTop: 20,
        height: "100%",
        borderRightWidth: 1,
        borderRightColor: neutral24,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo and Toggle Button */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "space-around",
          maxWidth: 270,
        }}
      >
        <View>
          <Image
            source={isCollapsed ? paperlessCollapsedIcon : paperlessIcon}
            style={{
              height: 50,
              resizeMode: isCollapsed ? "contain" : "cover",
              width: 150,
              maxHeight: isCollapsed ? 30 : 50,
              marginLeft: isCollapsed ? -60 : 0,
            }}
          />
        </View>
        <View style={{ marginLeft: isCollapsed ? 0 : 81 }}>
          <TouchableOpacity
            onPress={toggleCollapse}
            style={{
              padding: 2,
              backgroundColor: neutral00,
              borderRadius: 8,
              marginLeft: isCollapsed ? -48 : 0,
            }}
          >
            <View
              style={{
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderLeftWidth: 2,
                borderTopWidth: 2,
                borderBottomWidth: 2,
                marginLeft: -7,
                borderColor: neutral24,
                height: 30,
                justifyContent: "center",
              }}
            >
              <Animated.Image
                source={collapseIcon}
                style={{
                  marginLeft: isCollapsed ? -5 : -7,
                  transform: [{ rotate: spin }],
                  height: 15,
                  resizeMode: "contain",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation */}
      {navItems.map((section) => (
        <View key={section.section} style={{}}>
          {!isCollapsed && (
            <View style={{ marginBottom: 20 }}>
              <AppText style={{ color: neutral64, fontSize: 10 }}>
                {section.section}
              </AppText>
            </View>
          )}

          {(!isCollapsed || section.section !== "SYSTEM PREFERENCE") &&
            section.items.map((item) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() =>
                    navClickHandler(
                      item.name,
                      item.route as unknown as RelativePathString
                    )
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 24,
                      borderRightWidth: selectedTab === item.name ? 3 : 0,
                      width: isCollapsed ? 60 : 250,
                      height: 30,
                      borderColor: primary400,
                    }}
                  >
                    <Image
                      source={item.icon}
                      style={{
                        height: 20,
                        resizeMode: "contain",
                        marginRight: isCollapsed ? 0 : 8,
                        tintColor:
                          selectedTab === item.name ? primary400 : neutral64,
                      }}
                    />
                    {!isCollapsed && (
                      <AppText
                        style={{
                          color:
                            selectedTab === item.name ? primary400 : neutral64,
                          fontWeight: "400",
                        }}
                      >
                        {item.name}
                      </AppText>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      ))}
      {!isCollapsed && (
        <TouchableOpacity onPress={logoutPressHandler}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 34,
              width: isCollapsed ? 60 : 250,
              height: 30,
              borderColor: primary400,
            }}
          >
            <Image
              source={logout}
              style={{
                height: 20,
                resizeMode: "contain",
                marginRight: isCollapsed ? 0 : 8,
                tintColor: error800,
              }}
            />

            <AppText
              style={{
                color: error800,
              }}
            >
              Logout Account
            </AppText>
          </View>
        </TouchableOpacity>
      )}
    </Animated.ScrollView>
  );
};

export default CollapsibleSideNavbar;
