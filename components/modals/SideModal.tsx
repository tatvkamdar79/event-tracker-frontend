import { error800 } from "@/utils/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SideModal = ({
  isOpen,
  children,
  setissideModalOpen,
}: {
  isOpen: boolean;
  setissideModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const minWidth = SCREEN_WIDTH * 0.4;
  const maxWidth = SCREEN_WIDTH * 0.9;

  const width = useSharedValue(minWidth);

  useEffect(() => {
    if (isOpen) {
      width.value = withSpring(minWidth);
    }
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const onGestureEvent = (event: any) => {
    const newWidth = SCREEN_WIDTH - event.nativeEvent.absoluteX;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      width.value = newWidth;
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.modalOverlay}>
        <SafeAreaView style={[styles.safeArea, { alignItems: "flex-end" }]}>
          <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
            <Animated.View style={[styles.modalContainer, animatedStyle]}>
              {/* Drag Bar */}
              <PanGestureHandler onGestureEvent={onGestureEvent}>
                {
                  <View style={styles.dragHandle}>
                    <MaterialCommunityIcons
                      name="drag-vertical-variant"
                      size={24}
                      color="black"
                    />
                  </View>
                }
              </PanGestureHandler>

              {/* Close Button */}
              {setissideModalOpen && (
                <View style={{ alignSelf: "flex-end" }}>
                  <TouchableOpacity onPress={() => setissideModalOpen(false)}>
                    <MaterialIcons name="close" size={24} color={error800} />
                  </TouchableOpacity>
                </View>
              )}

              {children}
            </Animated.View>
          </GestureHandlerRootView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dragHandle: {
    cursor: "ew-resize",
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    width: 20,
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    flexDirection: "row",
    height: "100%",
    padding: 20,
    position: "absolute",
    right: 0,
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
  },
  safeArea: {
    flex: 1,
    height: "100%",
  },
});

export default SideModal;
