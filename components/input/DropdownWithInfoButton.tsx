import useScreenSize from "@/hooks/useScreenSize";
import {
  background,
  error800,
  neutral00,
  neutral24,
  neutral64,
  neutral80,
} from "@/utils/constants/colors";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../text/appText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface DropdownItem {
  label: string;
  value: string;
  description: string;
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
}

export default function CustomDropdown({
  search,
  searchPlaceholder,
  value,
  setValue,
  items,
  placeholder,
  label,
  onChange,
  mandatory,
}: DropdownProps) {
  // console.info("DropdownBox printing value:", value);
  const isMobile = useScreenSize();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ padding: isMobile ? 2 : 4 }}>
      {label && (
        <View style={{ flexDirection: "row" }}>
          <AppText style={{ fontSize: 18, marginTop: 8, marginBottom: 4 }}>
            {label}
          </AppText>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginLeft: 8, marginTop: 5 }}
          >
            <MaterialIcons name="info-outline" size={24} color={neutral64} />
          </TouchableOpacity>

          <AppText style={{ color: error800, marginTop: 5 }}>
            {mandatory ? " *" : ""}
          </AppText>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppText
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              Item Descriptions:
            </AppText>
            {items.map((item, index) => (
              <AppText key={index} style={{ fontSize: 14 }}>
                {index + 1}. {item.description}{" "}
                {/* Show actual descriptions here */}
              </AppText>
            ))}
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: neutral64 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <AppText style={styles.textStyle}>Close</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
          onChange={
            onChange
              ? (value) => {
                  onChange(value);
                  setValue(value.value);
                }
              : (value) => setValue(value.value)
          }
          data={items}
          minHeight={48}
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
          onChange={
            onChange
              ? (value) => {
                  onChange(value);
                  setValue(value.value);
                }
              : (value) => setValue(value.value)
          }
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  openButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
