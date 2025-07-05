import useScreenSize from "@/hooks/useScreenSize";
import { closeIcon } from "@/utils/constants/images";
import React from "react";
import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../text/appText";
import { neutral00 } from "@/utils/constants/colors";

interface CustomModalProps {
  visible: boolean;
  hasClose: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
  children: React.ReactNode;
  makeItemsCenter: boolean;
  animationType?: "none" | "fade" | "slide";
  heightProp?: string;
  widthProp?: string; // New optional width property
  heightPercentage?: string;
  maxHeight?: DimensionValue;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  hasClose,
  title,
  image,
  children,
  description,
  animationType,
  makeItemsCenter,
  heightProp,
  widthProp, // Added widthProp
  heightPercentage,
  maxHeight,
}) => {
  const isMobile = useScreenSize();
  return (
    <Modal
      animationType={animationType ?? "fade"}
      transparent={true}
      visible={visible}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: (widthProp as DimensionValue) ?? (isMobile ? "80%" : "40%"),
            height:
              Platform.OS === "web"
                ? (heightProp as DimensionValue)
                  ? "auto"
                  : (heightPercentage as DimensionValue)
                    ? (heightPercentage as DimensionValue)
                    : "55%"
                : (heightProp as DimensionValue)
                  ? "auto"
                  : (heightPercentage as DimensionValue)
                    ? (heightPercentage as DimensionValue)
                    : "45%",
            maxHeight: maxHeight ? maxHeight : "auto",
            backgroundColor: neutral00,
            alignItems: makeItemsCenter ? "center" : undefined,
            padding: 20,
            marginVertical: 20,
            borderRadius: 15,
            gap: 15,
          }}
        >
          {hasClose && (
            <TouchableOpacity
              onPress={onClose}
              style={{ alignSelf: "flex-end" }}
            >
              <Image style={{ width: 30, height: 30 }} source={closeIcon} />
            </TouchableOpacity>
          )}
          {image && <Image source={image} />}
          {title && (
            <AppText
              style={{
                fontWeight: "bold",
                fontSize: 20,
                width: "100%",
                textAlign: "center",
              }}
            >
              {title}
            </AppText>
          )}
          {description && <AppText>{description}</AppText>}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
