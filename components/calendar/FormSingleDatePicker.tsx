import React, { useState, useRef } from "react";
import { Image, TouchableOpacity, View, Modal } from "react-native";
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";
import { error800, neutral24, neutral64 } from "@/utils/constants/colors";
import { calenderIcon } from "@/utils/constants/images";
import AppText from "../text/appText";
import SingleDatePicker from "./SingleDatePicker";
import useScreenSize from "@/hooks/useScreenSize";

type FormSingleDatePickerProps = {
  label: string;
  placeholder: string;
  date: Date | null;
  setDate: (value: { date: DateType }) => void;
  mandatory?: boolean;
  timePick?: boolean;
  minDate?: DateType;
  maxDate?: DateType;
};

export default function FormSingleDatePicker({
  label,
  placeholder,
  date,
  setDate,
  mandatory,
  timePick,
  minDate,
  maxDate,
}: FormSingleDatePickerProps) {
  const isMobile = useScreenSize();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const locale = "en";
  const touchableRef = useRef<View | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // const openModal = () => {
  //   if (touchableRef.current) {
  //     touchableRef.current.measure(
  //       (
  //         x: number,
  //         y: number,
  //         width: number,
  //         height: number,
  //         pageX: number,
  //         pageY: number
  //       ) => {
  //         setModalPosition({
  //           top: pageY + height + 5,
  //           left: pageX,
  //         });
  //         setIsModalVisible(true);
  //       }
  //     );
  //   }
  // };

  const openModal = () => {
    if (touchableRef.current) {
      touchableRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          const windowHeight = isMobile
            ? require("react-native").Dimensions.get("window").height
            : window.innerHeight || 800;
          const windowWidth = isMobile
            ? require("react-native").Dimensions.get("window").width
            : window.innerWidth || 800;

          // Modal dimensions and spacing
          const modalHeight = 320;
          const modalWidth = isMobile ? windowWidth * 0.83 : 300; // Width of the modal
          const spacing = 10;

          const spaceBelow = windowHeight - (pageY + height);
          const spaceAbove = pageY;
          const spaceRight = windowWidth - pageX - width;
          const spaceLeft = pageX;

          // Find horizontal position relative to the calendar icon
          let left;
          if (isMobile) {
            // Center the modal horizontally with respect to the touchable area
            left = Math.max(
              spacing,
              Math.min(
                windowWidth - modalWidth - spacing,
                pageX - (modalWidth - width) / 2
              )
            );
          } else {
            // If right side has enough space, open to the right of the icon
            if (spaceRight >= modalWidth) {
              left = pageX + width - 20; // 20px accounts for the calendar icon width
            }
            // If right doesn't have space but left does, open to the left
            else if (spaceLeft + width >= modalWidth) {
              left = Math.max(spacing, pageX + width - modalWidth);
            }
            // If neither side has enough space, center the modal horizontally
            else {
              left = Math.max(
                spacing,
                Math.min(
                  windowWidth - modalWidth - spacing,
                  pageX - (modalWidth - width) / 2
                )
              );
            }
          }

          // Find vertical position
          let top;
          // If enough space below, position below the touchable area
          if (spaceBelow >= modalHeight) {
            top = pageY + height + spacing;
          }
          // If not enough space below but enough above, position above
          else if (spaceAbove >= modalHeight) {
            top = pageY - modalHeight - spacing;
          }
          // If neither above nor below has enough space, position where there's more space
          else {
            top =
              spaceBelow > spaceAbove
                ? pageY + height + spacing
                : Math.max(spacing, pageY - modalHeight - spacing);
          }

          setModalPosition({
            top,
            left,
          });

          setIsModalVisible(true);
        }
      );
    }
  };

  return (
    <View style={{ width: "100%", marginTop: 8, gap: 8 }}>
      {/* Label */}
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row" }}>
          <AppText style={{ color: neutral64, fontSize: 16 }}>
            {label}
            {mandatory && <AppText style={{ color: error800 }}> *</AppText>}
          </AppText>
        </View>
        {/* Date Display and Calendar Icon */}
        <View
          ref={touchableRef}
          style={{
            flexDirection: "row",
            padding: 12,
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: neutral24,
            borderRadius: 8,
          }}
        >
          <AppText style={{ fontSize: 16 }}>
            {date
              ? timePick
                ? dayjs(date).locale(locale).format("DD-MMMM-YYYY HH:mm:ss")
                : dayjs(date).locale(locale).format("DD-MMMM-YYYY")
              : placeholder}
          </AppText>
          <TouchableOpacity onPress={openModal}>
            <Image style={{ width: 20, height: 18 }} source={calenderIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker Popup */}
      {isModalVisible && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          />
          <View
            style={{
              position: "absolute",
              top: modalPosition.top,
              left: modalPosition.left,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: isMobile ? "83%" : "25%",
            }}
          >
            <SingleDatePicker
              onChange={(date) => {
                setIsModalVisible(false);
                setDate({ date });
              }}
              date={date}
              setDate={setDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}
