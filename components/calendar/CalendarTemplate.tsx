import { neutral24 } from "@/utils/constants/colors";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
} from "react-native";
import AppText from "../text/appText";

interface SimpleCalendarProps {
  currentMonth?: Date;
  renderDay: (date: Date) => React.ReactNode;
  weekDayLabels?: string[];

  // Optional style overrides
  containerStyle?: ViewStyle;
  weekRowStyle?: ViewStyle;
  weekDayTextStyle?: TextStyle;
  dayGridStyle?: ViewStyle;
  dayCellStyle?: ViewStyle;
}

const CalendarTemplate: React.FC<SimpleCalendarProps> = ({
  currentMonth = new Date(),
  renderDay,
  weekDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  containerStyle,
  weekRowStyle,
  weekDayTextStyle,
  dayGridStyle,
  dayCellStyle,
}) => {
  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = [...Array(daysInMonth)].map((_, i) => i + 1);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.weekRow, weekRowStyle]}>
        {weekDayLabels.map((day, idx) => (
          <AppText
            key={idx}
            style={[styles.weekDayText, weekDayTextStyle || {}]}
          >
            {day}
          </AppText>
        ))}
      </View>

      <ScrollView>
        <View style={[styles.daysGrid, dayGridStyle]}>
          {[...Array(firstDayOfMonth)].map((_, idx) => (
            <View key={`empty-${idx}`} style={[styles.dayCell, dayCellStyle]} />
          ))}

          {days.map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );

            return (
              <View key={day} style={[styles.dayCell, dayCellStyle]}>
                {renderDay(date)}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  dayCell: {
    borderColor: neutral24,
    borderWidth: 1,
    height: "20%",
    padding: 4,
    width: "14.28%",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weekDayText: {
    fontWeight: "600",
    textAlign: "center",
    width: "14.28%",
  },
  weekRow: {
    borderColor: neutral24,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
});

export default CalendarTemplate;
