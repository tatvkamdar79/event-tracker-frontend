import { background, error800, neutral24 } from "@/utils/constants/colors";
import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../text/appText";

interface DropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: { label: string; value: string }[];
  placeholder: string;
  label: string;
  search: boolean;
  searchPlaceholder?: string;
  mandatory?: boolean;
}

export default function DropdownBox({
  search,
  searchPlaceholder,
  value,
  setValue,
  items,
  placeholder,
  label,
  mandatory,
}: DropdownProps) {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <AppText style={{ fontSize: 14, marginTop: 8, marginBottom: 4 }}>
          {label}
        </AppText>
        <AppText style={{ color: error800 }}>{mandatory ? " *" : ""}</AppText>
      </View>
      {search ? (
        <Dropdown
          search={true}
          searchPlaceholder={searchPlaceholder}
          placeholder={placeholder}
          style={{
            backgroundColor: background,
            padding: 12,
            borderRadius: 10,
            borderColor: neutral24,
            borderWidth: 1,
          }}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(value) => setValue(value.value)}
          data={items}
        />
      ) : (
        <Dropdown
          placeholder={placeholder}
          style={{
            backgroundColor: background,
            padding: 12,
            borderRadius: 10,
            borderColor: neutral24,
            borderWidth: 1,
          }}
          labelField="label"
          valueField="value"
          value={value}
          onChange={(value) => setValue(value.value)}
          data={items}
        />
      )}
    </>
  );
}
