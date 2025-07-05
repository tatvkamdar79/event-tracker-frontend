import {
  neutral00,
  neutral64,
  neutral80,
  primary400,
} from "@/utils/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton } from "react-native-paper";
import AppText from "../text/appText";

interface RadioButtonOption {
  label: string;
  value: string;
}

interface FormRadioButtonProps {
  label: string;
  options: RadioButtonOption[];
  value: string;
  onChange: (value: string) => void;
  flexDirection?: "row" | "column";
}

const FormRadioButton: React.FC<FormRadioButtonProps> = ({
  label,
  options,
  value,
  onChange,
  flexDirection = "row",
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>{label}</AppText>
      <View style={{ flexDirection, gap: 10 }}>
        {options.map((option) => (
          <View key={option.value} style={styles.radioContainer}>
            <RadioButton
              value={option.value}
              status={value === option.value ? "checked" : "unchecked"}
              onPress={() => onChange(option.value)}
              color={value === option.value ? primary400 : neutral00}
            />
            <AppText style={styles.radioLabel}>{option.label}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 6,
    // paddingHorizontal: 16,
    top: 0,
  },
  heading: {
    color: neutral64,
    fontSize: 16,
  },
  radioContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
  },
  radioLabel: {
    color: neutral80,
    fontSize: 16,
  },
});

export default FormRadioButton;
