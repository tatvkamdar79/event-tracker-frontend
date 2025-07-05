import {
  neutral24,
  neutral40,
  neutral64,
  neutral80,
  primary400,
  red200,
} from "@/utils/constants/colors";
import { closeIcon } from "@/utils/constants/images";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../text/appText";

interface FieldConfig {
  key: string;
  placeholder: string;
  multiline?: boolean;
  optional?: boolean;
}

interface FormDynamicGroupInputBoxProps {
  label?: string;
  value: Record<string, string>[];
  fields: FieldConfig[];
  onChange: (updated: Record<string, string>[]) => void;
  addButtonText?: string;
}

const FormDynamicGroupInputBox: React.FC<FormDynamicGroupInputBoxProps> = ({
  label,
  value = [],
  fields,
  onChange,
  addButtonText = "+ Add",
}) => {
  const values =
    value.length > 0
      ? value
      : [Object.fromEntries(fields.map((f) => [f.key, ""]))];

  const handleChange = (index: number, key: string, text: string) => {
    const newValues = [...values];
    newValues[index][key] = text;
    onChange(newValues);
  };

  const addFieldGroup = () => {
    const newGroup = Object.fromEntries(fields.map((f) => [f.key, ""]));
    onChange([...values, newGroup]);
  };

  const removeFieldGroup = (index: number) => {
    if (values.length === 1) return;
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  return (
    <View>
      <AppText style={styles.heading}>{label}</AppText>

      {values.map((item, index) => (
        <View key={index} style={styles.fieldGroup}>
          {fields.map(({ key, placeholder, multiline }) => (
            <TextInput
              key={key}
              placeholder={placeholder}
              placeholderTextColor={neutral40}
              value={item[key]}
              multiline={multiline}
              onChangeText={(text) => handleChange(index, key, text)}
              style={[styles.input, multiline && styles.multiline]}
            />
          ))}
          {index > 0 && (
            <TouchableOpacity
              onPress={() => removeFieldGroup(index)}
              style={styles.removeButton}
            >
              <Image source={closeIcon} style={styles.removeIcon} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addFieldGroup} style={styles.addBtn}>
        <AppText style={styles.addText}>{addButtonText}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  addText: {
    color: primary400,
    fontSize: 14,
    fontWeight: "500",
  },
  fieldGroup: {
    marginBottom: 28,
    paddingRight: 36,
    position: "relative",
  },
  heading: {
    color: neutral64,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  input: {
    borderColor: neutral24,
    borderRadius: 8,
    borderWidth: 1,
    color: neutral80,
    fontSize: 16,
    marginBottom: 10,
    padding: 12,
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  removeButton: {
    padding: 2,
    position: "absolute",
    right: 4,
    top: 8,
  },
  removeIcon: {
    height: 24,
    tintColor: red200,
    width: 24,
  },
});

export default FormDynamicGroupInputBox;
