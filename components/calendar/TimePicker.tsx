import React from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface TimePickerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<
    React.SetStateAction<{ hours: number; minutes: number }>
  >;
}

const TimePicker = ({ visible, setVisible, setTime }: TimePickerProps) => {
  const onConfirm = (date: Date) => {
    setTime({ hours: date.getHours(), minutes: date.getMinutes() });
    setVisible(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={onConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export default TimePicker;
