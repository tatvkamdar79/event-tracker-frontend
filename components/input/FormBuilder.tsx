import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import FormDropdownBox from "../input/FormDropdownBox";
import InputBox from "../input/InputBox";
import FormSingleDatePicker from "../calendar/FormSingleDatePicker";
import { DateType } from "react-native-ui-datepicker";
import useScreenSize from "@/hooks/useScreenSize";
import FormDynamicInputBox from "./FormDynamicInputBox";
import TimeInputBox from "./TimeInputBox";
import FormRadioButton from "./FormRadioButton";
// import UploadFileComponent from "../media/uploadFilesComponent";
import MultiSelectBox from "./MultiSelectBox";
import FormDynamicGroupInputBox from "./FormDynamicGroupInputBox";
import {
  neutral00,
  neutral24,
  neutral80,
  primary400,
} from "@/utils/constants/colors";
import AppText from "../text/appText";

export interface Field {
  label?: string;
  name: string;
  type: string;
  sectionBreak?: boolean;
  props?: Record<string, any>;
  component?: React.ComponentType<any> | React.ReactElement; // Fixed: Should be ComponentType or ReactElement
}

interface FunctionConfig {
  label: string;
  function: () => void;
}

interface FormBuilderProps {
  fields: Field[];
  formData: Record<string, any>;
  setFormData: (data: any) => void;
  inputColumns?: number;
  customErrors?: string[];
  setCustomErrors?: React.Dispatch<React.SetStateAction<string[]>>;
  functions?: {
    modal?: boolean;
    submit?: FunctionConfig;
    cancel?: FunctionConfig;
  };
}

const componentMap: Record<string, React.ComponentType<any>> = {
  dropdown: FormDropdownBox,
  "input-box": InputBox,
  "dynamic-input-box": FormDynamicInputBox,
  datepicker: FormSingleDatePicker,
  "time-input-box": TimeInputBox,
  empty: View,
  "radio-input": FormRadioButton,
  // upload: UploadFileComponent,
  "multi-select-box": MultiSelectBox,
  "dynamic-group-input-box": FormDynamicGroupInputBox,
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  formData,
  setFormData,
  inputColumns = 3,
  customErrors = [],
  setCustomErrors,
  functions,
}) => {
  const isMobile = useScreenSize();
  const inputsPerRow = isMobile ? 1 : inputColumns;
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const errorRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (formErrors.length > 0) {
      errorRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [formErrors]);

  useEffect(() => {
    if (customErrors.length > 0) {
      errorRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [customErrors]);
  const handleChange = (key: string, value: any) => {
    setFormData((prevState: Record<string, any>) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMultiSelectChange = (
    fieldName: string,
    selectedItem: string,
    selectedItems?: string[]
  ) => {
    // If selectedItems is provided, use it directly
    if (selectedItems) {
      handleChange(fieldName, selectedItems);
      return;
    }

    // Otherwise, toggle the selected item in the current field's value
    const currentValue = formData[fieldName] || [];
    let updatedItems;

    if (currentValue.includes(selectedItem)) {
      updatedItems = currentValue.filter(
        (item: string) => item !== selectedItem
      );
    } else {
      updatedItems = [...currentValue, selectedItem];
    }

    handleChange(fieldName, updatedItems);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const errors: string[] = [];

    for (const field of fields) {
      if (field.type === "empty" || field.type === "custom_component") continue;

      const value = formData[field.name];
      const isEmpty =
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0);

      //Check if value is empty.
      if (field?.props?.mandatory && isEmpty) {
        errors.push(`${field.props?.label || field.name} is required.`);
        isValid = false;
        continue;
      }

      //Check if expected value is numeric but string is entered.
      if (
        field?.props?.keyboardType === "numeric" &&
        value !== undefined &&
        value !== null
      ) {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
          errors.push(`${field.label || field.name} must be a number.`);
          isValid = false;
        }
      }

      //Check if maxLength is defined for a field but we are exceeding it
      if (
        (field?.props?.maxLength || field.props?.fixedLength) &&
        value !== undefined &&
        value !== null
      ) {
        const stringValue = typeof value === "string" ? value : String(value);
        if (
          field.props.maxLength &&
          stringValue.length > field.props.maxLength
        ) {
          errors.push(
            `${field.label || field.name} must be at most ${field.props.maxLength} characters.`
          );
          isValid = false;
        }
        if (
          field.props.fixedLength &&
          stringValue.length !== field.props.fixedLength
        ) {
          errors.push(
            `${field.label || field.name} must be exactly ${field.props.fixedLength} characters.`
          );
          isValid = false;
        }
      }

      //Check for @ in case it is email-address
      if (field.props?.keyboardType === "email-address" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(
            `${field.label || field.name} must be a valid email address.`
          );
          isValid = false;
        }
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      if (setCustomErrors) setCustomErrors([]);
      return;
    } else {
      functions?.submit?.function();
    }
  };

  const rows: Field[][] = [];
  let currentRow: Field[] = [];

  fields.forEach((field) => {
    if (field.sectionBreak && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
    }
    currentRow.push(field);
    if (currentRow.length === inputsPerRow) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ref={errorRef}
    >
      {(formErrors.length > 0 || customErrors.length > 0) && (
        <View style={styles.errorContainer}>
          <AppText
            style={{
              fontSize: 16,
              paddingVertical: 6,
              color: "#cc0000",
              fontWeight: "600",
            }}
          >
            Errors found!
          </AppText>
          {formErrors &&
            formErrors.length > 0 &&
            formErrors.map((err, idx) => (
              <View key={idx} style={styles.errorRow}>
                <View style={styles.bulletCircle} />
                <AppText style={styles.errorText}>{err}</AppText>
              </View>
            ))}
          {customErrors &&
            customErrors.length > 0 &&
            customErrors.map((err, idx) => (
              <View key={idx} style={styles.errorRow}>
                <View style={styles.bulletCircle} />
                <AppText style={styles.errorText}>{err}</AppText>
              </View>
            ))}
        </View>
      )}
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((field, index) => {
            if (field.type === "custom_component") {
              return (
                <View key={`${rowIndex}-${index}`} style={styles.column}>
                  {React.isValidElement(field.component)
                    ? field.component
                    : field.component
                      ? React.createElement(
                          field.component as React.ComponentType<any>,
                          {
                            value: formData[field.name] || "",
                            onChange: (value: any) =>
                              handleChange(field.name, value),
                            ...field.props,
                          }
                        )
                      : null}
                </View>
              );
            }
            const Component = componentMap[field.type];
            if (!Component) return null;
            return (
              <View key={`${rowIndex}-${index}`} style={styles.column}>
                {(() => {
                  switch (field.type) {
                    case "datepicker":
                      return (
                        <FormSingleDatePicker
                          label={field.label || ""}
                          placeholder="Select date"
                          date={formData[field.name] || null}
                          setDate={(value: { date: DateType }) =>
                            handleChange(field.name, value.date)
                          }
                          {...field.props}
                        />
                      );
                    // case "upload":
                    //   return (
                    //     <UploadFileComponent
                    //       title={field.label}
                    //       filepath={field.props?.filepath || "uploads"}
                    //       uploadTrigger={field.props?.uploadTrigger || false}
                    //       onChange={(value: any) =>
                    //         handleChange(field.name, value)
                    //       }
                    //       isSingleFile={field.props?.isSingleFile || false}
                    //       mimeTypes={field.props?.mimeTypes || ["*/*"]}
                    //       {...field.props}
                    //     />
                    //   );
                    case "multi-select-box":
                      return (
                        <MultiSelectBox
                          selectedItems={formData[field.name] || []}
                          onChange={(selected, selectedItems) => {
                            handleMultiSelectChange(
                              field.name,
                              selected,
                              selectedItems
                            );
                          }}
                          items={field.props?.items || []}
                          {...field.props}
                        />
                      );
                    case "dynamic-group-input-box":
                      return (
                        <FormDynamicGroupInputBox
                          label={field.label || ""}
                          fields={field.props?.fields || []}
                          value={formData[field.name] || []}
                          onChange={(updated: Record<string, string>[]) =>
                            handleChange(field.name, updated)
                          }
                          addButtonText={field.props?.addButtonText}
                          {...field.props}
                        />
                      );
                    default:
                      return (
                        <Component
                          value={formData[field.name] || ""}
                          onChange={(value: any) =>
                            handleChange(field.name, value)
                          }
                          {...field.props}
                        />
                      );
                  }
                })()}
              </View>
            );
          })}
        </View>
      ))}
      {(functions?.submit || functions?.cancel) && (
        <View
          style={
            functions.modal
              ? styles.buttonContainerModal
              : styles.buttonContainer
          }
        >
          {functions?.cancel && (
            <TouchableOpacity
              onPress={functions.cancel.function}
              style={[
                styles.button,
                {
                  backgroundColor: neutral00,
                  borderColor: neutral24,
                  borderWidth: 1,
                  ...(functions.modal && { flex: 1 }),
                },
              ]}
            >
              <AppText
                style={{
                  color: neutral80,
                  fontWeight: "600",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {functions.cancel.label}
              </AppText>
            </TouchableOpacity>
          )}
          {functions?.submit && (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.button,
                {
                  backgroundColor: primary400,
                  ...(functions.modal && { flex: 1 }),
                },
              ]}
            >
              <AppText
                style={{
                  fontWeight: "600",
                  fontSize: 12,
                  color: neutral00,
                }}
              >
                {functions.submit.label}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bulletCircle: {
    backgroundColor: "#cc0000",
    borderRadius: 3,
    height: 6,
    marginRight: 8,
    marginTop: 2,
    width: 6,
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
    marginTop: 16,
  },
  buttonContainerModal: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 16,
  },
  column: {
    flex: 1,
  },
  container: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "#ffe6e6",
    borderRadius: 6,
    gap: 5,
    marginVertical: 16,
    padding: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  errorRow: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 2,
  },
  errorText: {
    color: "#cc0000",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default FormBuilder;
