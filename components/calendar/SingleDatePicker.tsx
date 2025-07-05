import { primary500 } from "@/utils/constants/colors";

import "dayjs/locale/en";
import React from "react";
import { View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function SingleDatePicker({
  onChange,
  date,
  setDate,
  timePick,
  maxDate,
  minDate,
}: {
  onChange: (date: DateType) => void;
  timePick?: boolean;
  date: DateType;
  setDate: (value: { date: DateType }) => void;
  mandatory?: boolean;
  maxDate?: DateType;
  minDate?: DateType;
}) {
  return (
    <View style={{ width: "100%", marginTop: 8, gap: 8 }}>
      <View style={{}}></View>

      <DateTimePicker
        selectedItemColor={primary500}
        headerButtonColor={primary500}
        headerTextStyle={{ color: primary500 }}
        mode="single"
        date={date}
        onChange={(date) => {
          setDate(date);
          onChange(date.date);
        }}
        maxDate={maxDate}
        timePicker={timePick}
        minDate={minDate}
      />
      {/* <SecondaryButton label='Save' onClick={() => { }} /> */}
    </View>
  );
}
