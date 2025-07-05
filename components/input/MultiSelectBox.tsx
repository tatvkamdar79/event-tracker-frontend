import {
  background,
  blue50,
  error800,
  neutral00,
  neutral24,
  neutral64,
  primary400,
} from "@/utils/constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../text/appText";

interface MultiSelectItem {
  label: string;
  value: string;
}

interface MultiSelectBoxProps {
  items: MultiSelectItem[];
  selectedItems: string[];
  onChange: (item: string, selectedItems?: string[]) => void;
  placeholder?: string;
  label?: string;
  mandatory?: boolean;
}

const MultiSelectBox = ({
  items,
  selectedItems,
  onChange,
  placeholder = "Search...",
  label,
  mandatory,
}: MultiSelectBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<MultiSelectItem[]>(items);
  const [areAllFilteredItemsSelected, setAreAllFilteredItemsSelected] =
    useState(false);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const getSelectedLabels = () => {
    return items
      .filter((item) => selectedItems.includes(item.value))
      .map((item) => item.label);
  };

  const handleItemPress = (item: MultiSelectItem) => {
    if (selectedItems.length === items.length) {
      setAreAllFilteredItemsSelected(false);
    } else {
      if (
        selectedItems.length === items.length - 1 &&
        !selectedItems.includes(item.value)
      ) {
        setAreAllFilteredItemsSelected(true);
      } else setAreAllFilteredItemsSelected(false);
    }

    onChange(item.value);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSelectAll = () => {
    if (areAllFilteredItemsSelected) {
      onChange("", []);
    } else {
      onChange(
        "",
        items.map((item) => item.value)
      );
    }

    setAreAllFilteredItemsSelected(!areAllFilteredItemsSelected);
  };
  return (
    <View style={{ gap: 12 }}>
      {label && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <AppText
            style={{ color: neutral64, fontSize: 16, fontWeight: "500" }}
          >
            {label}
          </AppText>
          {mandatory && (
            <AppText style={{ color: error800, fontSize: 16 }}>*</AppText>
          )}
        </View>
      )}

      <View
        style={{
          gap: 12,
          borderRadius: 12,
          borderWidth: 1,
          padding: 16,
          borderColor: neutral24,
          backgroundColor: neutral00,
        }}
      >
        {/* Selected tags section */}
        {getSelectedLabels().length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ gap: 10, flexDirection: "row" }}>
              {getSelectedLabels().map((label, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: neutral24,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      marginRight: 6,
                    }}
                  >
                    {label}
                  </AppText>
                  <TouchableOpacity
                    onPress={() => {
                      const itemToRemove = items.find(
                        (item) => item.label === label
                      );
                      if (itemToRemove) {
                        onChange(itemToRemove.value);
                      }
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Feather name="x" size={16} color={neutral64} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        <View
          style={{
            alignItems: "center",
            backgroundColor: background,
            borderRadius: 8,
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Ionicons name="search-outline" size={20} color={neutral64} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              marginLeft: 8,
              color: neutral64,
              paddingVertical: 4,
            }}
            placeholder={placeholder}
            placeholderTextColor={neutral64}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={neutral64} />
            </TouchableOpacity>
          )}
        </View>

        {/* Select All button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: neutral24,
          }}
          onPress={handleSelectAll}
          activeOpacity={0.7}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderWidth: 1.5,
              borderColor: primary400,
              borderRadius: 6,
              marginRight: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: areAllFilteredItemsSelected ? blue50 : neutral00,
            }}
          >
            {areAllFilteredItemsSelected && (
              <Feather name="check" size={16} color={primary400} />
            )}
          </View>
          <AppText style={{ fontSize: 15, fontWeight: "500" }}>
            {areAllFilteredItemsSelected ? "Deselect All" : "Select All"}
          </AppText>
        </TouchableOpacity>
        <ScrollView
          style={{ height: 150 }}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 4 }}
        >
          <View style={{ gap: 12 }}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 4,
                  }}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderWidth: 1.5,
                      borderColor: primary400,
                      borderRadius: 6,
                      marginRight: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: selectedItems.includes(item.value)
                        ? blue50
                        : neutral00,
                    }}
                  >
                    {selectedItems.includes(item.value) && (
                      <Feather name="check" size={16} color={primary400} />
                    )}
                  </View>
                  <AppText style={{ fontSize: 15 }}>{item.label}</AppText>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ padding: 10, alignItems: "center" }}>
                <AppText style={{ color: neutral64 }}>No matches found</AppText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MultiSelectBox;
