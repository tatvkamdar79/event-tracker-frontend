import React from "react";
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from "react-native";

interface AppTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
}

const AppText: React.FC<AppTextProps> = ({ children, style, ...props }) => {
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const modifiedStyle: StyleProp<TextStyle> = {
    ...flattenedStyle,
    fontSize: 14,
  };

  return (
    <Text style={[styles.defaultText, modifiedStyle]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "",
  },
});

export default AppText;
