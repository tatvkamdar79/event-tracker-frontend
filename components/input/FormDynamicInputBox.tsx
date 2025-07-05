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

interface FormDynamicInputBoxProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (values: string[]) => void;
}

const FormDynamicInputBox: React.FC<FormDynamicInputBoxProps> = ({
  label,
  placeholder,
  value = [],
  onChange,
}) => {
  const values = value.length > 0 ? value : [""];

  const addInputField = () => {
    onChange([...values, ""]);
  };

  const removeInputField = (index: number) => {
    if (values.length === 1) return;
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  const handleInputChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    onChange(newValues);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>{label}</AppText>

      {values.map((fieldValue, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={fieldValue}
            placeholderTextColor={neutral40}
            onChangeText={(text) => handleInputChange(text, index)}
          />
          {index > 0 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeInputField(index)}
            >
              <Image
                source={closeIcon}
                style={{ height: 24, width: 24, tintColor: red200 }}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addInputField}>
        <AppText style={styles.addButtonText}>+ Add</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addButtonText: {
    color: primary400,
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    // marginVertical: 8,
  },
  heading: {
    color: neutral64,
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderColor: neutral24,
    borderRadius: 8,
    borderWidth: 1,
    color: neutral80,
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    padding: 12,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  removeButton: {
    marginLeft: 8,
  },
});

export default FormDynamicInputBox;
