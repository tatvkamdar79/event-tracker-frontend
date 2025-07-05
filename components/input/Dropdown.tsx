import useScreenSize from "@/hooks/useScreenSize";
import {
  background,
  error800,
  neutral00,
  neutral24,
  neutral64,
  neutral80,
} from "@/utils/constants/colors";
import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../text/appText";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  setValue: (value: string) => void;
  items: DropdownItem[];
  placeholder: string;
  label?: string;
  search: boolean;
  searchPlaceholder?: string;
  mandatory?: boolean;
  onChange?: (item: DropdownItem) => void;
  dropdownPosition?: "auto" | "top" | "bottom";
}

export default function DropdownBox({
  search,
  searchPlaceholder,
  value,
  setValue,
  items,
  placeholder,
  label,
  onChange,
  mandatory,
  dropdownPosition,
}: DropdownProps) {
  // console.info("DropdownBox printing value:", value);
  const isMobile = useScreenSize();

  const handleChange = (selectedItem: DropdownItem) => {
    if (onChange) {
      onChange(selectedItem);
    }
    setValue(selectedItem.value);
  };

  return (
    <View style={{ padding: isMobile ? 2 : 4 }}>
      {label && (
        <View style={{ flexDirection: "row" }}>
          <AppText style={{ fontSize: 18, marginTop: 8, marginBottom: 4 }}>
            {label}
          </AppText>
          <AppText style={{ color: error800 }}>{mandatory ? " *" : ""}</AppText>
        </View>
      )}
      {search ? (
        <Dropdown
          search={true}
          searchPlaceholder={searchPlaceholder}
          placeholder={placeholder}
          style={{
            backgroundColor: background,
            padding: isMobile ? 12 : 16,
            borderRadius: 10,
            borderColor: neutral24,
            borderWidth: 1,
          }}
          labelField="label"
          valueField="value"
          value={value}
          dropdownPosition={dropdownPosition}
          onChange={handleChange}
          data={items}
          minHeight={48}
          autoScroll={false}
        />
      ) : (
        <Dropdown
          placeholder={placeholder}
          style={{
            backgroundColor: neutral00,
            padding: isMobile ? 12 : 16,
            borderRadius: 10,
            borderColor: neutral24,
            borderWidth: 1,
          }}
          labelField="label"
          valueField="value"
          value={value}
          dropdownPosition={dropdownPosition}
          onChange={handleChange}
          placeholderStyle={{
            color: neutral64,
            fontSize: isMobile ? 14 : 16,
            fontWeight: 500,
          }}
          selectedTextStyle={{
            color: neutral80,
            fontSize: isMobile ? 14 : 16,
            fontWeight: 500,
          }}
          data={items}
          autoScroll={false}
        />
      )}
    </View>
  );
}
