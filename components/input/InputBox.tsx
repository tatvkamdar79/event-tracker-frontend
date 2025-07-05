import {
  neutral00,
  error800,
  neutral64,
  neutral24,
  neutral40,
} from "@/utils/constants/colors";
import { closedEye, viewIcon } from "@/utils/constants/images";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../text/appText";
interface InputBoxProps {
  label: string;
  placeholder: string;
  value: string | number;
  type: string;
  borderColor?: string;
  onChange: (text: string) => void;
  mandatory?: boolean;
  editable?: boolean;
}

export default function InputBox(props: InputBoxProps) {
  const isPassword = props.type === "password";
  const [dontShowPassword, setDontShowPassword] = useState(true);
  return (
    <View>
      {props.label !== "" && (
        <View style={styles.labelContainer}>
          <AppText style={styles.labelText}>{props.label}</AppText>
          <AppText style={{ color: error800 }}>
            {props.mandatory ? " *" : ""}
          </AppText>
        </View>
      )}
      <View style={[styles.inputContainer, { backgroundColor: neutral00 }]}>
        {props.type === "phoneno" && (
          <View style={styles.phonePrefixContainer}>
            <AppText>+91</AppText>
          </View>
        )}
        <TextInput
          keyboardType={
            props.type === "phoneno" ||
            props.type === "number" ||
            props.type === "pincode" ||
            props.type === "single_digit"
              ? "number-pad"
              : "default"
          }
          secureTextEntry={isPassword && dontShowPassword}
          placeholderTextColor={neutral40}
          style={styles.input}
          value={props.value}
          placeholder={props.placeholder}
          maxLength={
            props.type === "phoneno"
              ? 10
              : props.type === "pincode"
                ? 6
                : props.type === "single_digit"
                  ? 1
                  : props.type === "textarea"
                    ? 500
                    : 100
          }
          onChangeText={(text) => {
            props.onChange(
              props.type === "phoneno" ||
                props.type === "pincode" ||
                props.type === "single_digit" ||
                props.type === "number"
                ? text.replace(/[^0-9]/g, "")
                : text
            );
          }}
          editable={props.editable}
          multiline={props.type === "textarea"}
          numberOfLines={props.type === "textarea" ? 5 : 1}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setDontShowPassword((prev) => !prev)}
          >
            <Image
              style={styles.passwordIcon}
              source={dontShowPassword ? viewIcon : closedEye}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyIconContainer} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyIconContainer: {
    height: 24,
    width: 24,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 4,
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
    borderColor: neutral24,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  labelContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  labelText: {
    color: neutral64,
    fontSize: 16,
    marginVertical: 8,
  },
  passwordIcon: {
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: neutral40,
    width: 24,
  },
  phonePrefixContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});
