import React from "react";
import { TimePickerModal } from "react-native-paper-dates";

interface WebTimePickerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<
    React.SetStateAction<{ hours: number; minutes: number }>
  >;
}

export default function WebTimePicker({
  visible,
  setVisible,
  setTime,
}: WebTimePickerProps) {
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setTime({ hours, minutes }); // Store selected time
      setVisible(false);
    },
    [setTime, setVisible]
  );

  return (
    <TimePickerModal
      visible={visible}
      onDismiss={onDismiss}
      onConfirm={onConfirm}
      hours={12} // Optional: Default time
      minutes={0} // Optional: Default time
    />
  );
}
