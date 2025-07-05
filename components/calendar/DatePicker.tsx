import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import {
  neutral00,
  neutral40,
  primary100,
  primary400,
} from "@/utils/constants/colors";
import useScreenSize from "@/hooks/useScreenSize";
import AppText from "../text/appText";

interface DatePickerProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  start: DateType;
  setStartDate: React.Dispatch<React.SetStateAction<DateType>>;
  end: DateType;
  setEndDate: React.Dispatch<React.SetStateAction<DateType>>;
}

export default function DatePicker({
  setIsModalVisible,
  start,
  setStartDate,
  end,
  setEndDate,
}: DatePickerProps) {
  const isMobile = useScreenSize();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [selectedStartDate, setSelectedStartDate] = useState<DateType>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<DateType>(null);
  const cancelPressHandler = () => {
    setIsModalVisible(false);
  };

  const applyPressHandler = () => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    setIsModalVisible(false);
  };
  const formattedDate = (dateToBeFormatted: DateType) => {
    const date = dayjs(dateToBeFormatted);
    const formattedDate = `${date.date()} ${months[date.month()]}, ${date.year()}`;

    return formattedDate;
  };

  useEffect(() => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.calendars,
          {
            flexDirection: isMobile ? "column" : "row",
            backgroundColor: neutral00,
          },
        ]}
      >
        <DateTimePicker
          mode="range"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onChange={({ startDate, endDate }) => {
            setSelectedStartDate(startDate);
            setSelectedEndDate(endDate);
          }}
          displayFullDays={true}
          selectedItemColor={primary400}
          selectedRangeBackgroundColor={primary100}
        />
      </View>
      <View
        style={{
          flexDirection: isMobile ? "column" : "row",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 90,
              borderWidth: 1,
              borderRadius: 8,
              height: 40,
              marginRight: 10,
              borderColor: neutral40,
            }}
          >
            <AppText style={{ fontSize: 13 }}>
              {selectedStartDate ? formattedDate(selectedStartDate) : ""}
            </AppText>
          </View>
          <View style={{ justifyContent: "center", marginRight: 10 }}>
            <AppText style={{ fontWeight: "600", fontSize: 18 }}> - </AppText>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 90,
              borderWidth: 1,
              borderRadius: 8,
              height: 40,
              borderColor: neutral40,
            }}
          >
            <AppText style={{ fontSize: 13 }}>
              {selectedEndDate ? formattedDate(selectedEndDate) : ""}
            </AppText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: isMobile ? 0 : 30,
            marginTop: isMobile ? 10 : 0,
            marginBottom: isMobile ? 30 : 0,
          }}
        >
          <TouchableOpacity onPress={applyPressHandler}>
            <View
              style={{
                backgroundColor: primary400,
                width: isMobile ? 100 : 90,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
                borderRadius: 8,
                marginLeft: isMobile ? 2 : 0,
              }}
            >
              <AppText style={{ color: neutral00 }}>Apply</AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelPressHandler}>
            <View
              style={{
                borderWidth: 1,
                width: isMobile ? 100 : 90,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                borderColor: neutral40,
                marginLeft: isMobile ? 6 : 0,
              }}
            >
              <AppText>Cancel</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendars: {
    // Stack calendars vertically
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Space between calendars and controls
    marginTop: 20,
  },
  container: {
    alignItems: "center",
    backgroundColor: neutral00,
    borderRadius: 20,
    justifyContent: "center",
  },
});
