import {
  error800,
  neutral00,
  neutral24,
  neutral64,
} from "@/utils/constants/colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../text/appText";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void; //Using OnChange instead of DropDownBox SetValue for consistency in Form Builder
  items: { label: string; value: string }[];
  placeholder: string;
  label: string;
  search: boolean;
  searchPlaceholder?: string;
  mandatory?: boolean;
  styles?: any;
}

export default function FormDropdownBox({
  search,
  searchPlaceholder,
  value,
  onChange, // Use onChange to pass the handler
  items,
  placeholder,
  label,
  mandatory,
}: DropdownProps) {
  return (
    <>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>{label}</AppText>
        {mandatory && <AppText style={styles.mandatory}> *</AppText>}
      </View>

      {search ? (
        <Dropdown
          search={true}
          searchPlaceholder={searchPlaceholder}
          placeholder={placeholder}
          style={styles.dropdown}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(item) => onChange(item.value)}
          data={items}
        />
      ) : (
        <Dropdown
          placeholder={placeholder}
          style={styles.dropdown}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(item) => onChange(item.value)}
          data={items}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: neutral00,
    borderColor: neutral24,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  label: {
    color: neutral64,
    fontSize: 16,
  },
  labelContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
  },
  mandatory: {
    color: error800,
    fontSize: 16,
  },
});
