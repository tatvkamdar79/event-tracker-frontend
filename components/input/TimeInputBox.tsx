import TimePicker from "@/components/calendar/TimePicker";
import WebTimePicker from "@/components/calendar/WebTimePicker";
import {
  neutral00,
  neutral24,
  neutral40,
  neutral64,
  neutral80,
} from "@/utils/constants/colors";
import { clockIcon } from "@/utils/constants/images";
import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import AppText from "../text/appText";

interface TimeInputBoxProps {
  label: string;
  value: {
    hours: number;
    minutes: number;
  };
  onChange: ({ hours, minutes }: { hours: number; minutes: number }) => void;
}

const TimeInputBox = ({
  label,
  value = { hours: 25, minutes: 911 },
  onChange,
}: TimeInputBoxProps) => {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState<{ hours: number; minutes: number }>(value);

  useEffect(() => {
    onChange(time);
  }, [time]);
  return (
    <View>
      <AppText
        style={{
          color: neutral64,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        {label}
      </AppText>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: neutral24,
          borderRadius: 8,
          borderWidth: 1,
          padding: 14,
          backgroundColor: neutral00,
        }}
        onPress={() => setVisible(true)}
      >
        <AppText
          style={{
            fontWeight: "400",
            fontSize: 16,
            color: neutral80,
          }}
        >
          {time && time.hours < 24
            ? `${time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours}:${time.minutes.toString().padStart(2, "0")} ${time.hours >= 12 ? "PM" : "AM"}`
            : "-- : --"}
        </AppText>

        <Image
          source={clockIcon}
          style={{
            height: 14,
            width: 14,
            tintColor: neutral40,
          }}
        />
      </TouchableOpacity>

      {visible && (
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          {Platform.OS !== "ios" ? (
            <WebTimePicker
              visible={visible}
              setVisible={setVisible}
              setTime={setTime}
            />
          ) : (
            <TimePicker
              visible={visible}
              setVisible={setVisible}
              setTime={setTime}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default TimeInputBox;
