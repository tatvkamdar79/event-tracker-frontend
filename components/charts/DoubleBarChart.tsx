import {
  neutral00,
  neutral24,
  neutral64,
  neutral80,
  primary300,
  warning800,
} from "@/utils/constants/colors";
import React, { useEffect, useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import AppText from "../text/appText";

interface BarData {
  value: number;
  label1?: string;
  label2?: string;
  spacing?: number;
  labelTextStyle?: {
    color: string;
    fontWeight: string;
    fontSize: number;
    marginRight: number;
  };
  frontColor: string;
}

const DoubleBarChart = ({
  labels,
  values,
  innerLabels = [],
}: {
  labels: string[];
  values: number[][];
  innerLabels?: string[];
}) => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  // Update dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    };

    Dimensions.addEventListener("change", handleResize);
  }, []);

  // Calculate responsive values based on screen width
  const getResponsiveValues = () => {
    const width = dimensions.width;
    // Extra small screens (small mobile)
    if (width < 360) {
      return {
        barWidth: 10,
        spacing: 15,
        initialSpacing: 8,
        labelMarginRight: 10,
        fontSize: 10,
        labelWidth: 50,
        yAxisFontSize: 7,
        xAxisFontSize: 7,
        paddingHorizontal: 2,
      };
    }

    // Small mobile screens
    if (width < 480) {
      return {
        barWidth: 15,
        spacing: 20,
        initialSpacing: 10,
        labelMarginRight: 15,
        fontSize: 10,
        labelWidth: 60,
        yAxisFontSize: 8,
        xAxisFontSize: 8,
        paddingHorizontal: 5,
      };
    }

    // Medium mobile screens
    if (width < 768) {
      return {
        barWidth: 18,
        spacing: 20,
        initialSpacing: 12,
        labelMarginRight: 18,
        fontSize: 10,
        labelWidth: 65,
        yAxisFontSize: 9,
        xAxisFontSize: 9,
        paddingHorizontal: 8,
      };
    }

    // Tablets and small laptops
    if (width < 992) {
      return {
        barWidth: 22,
        spacing: 20,
        initialSpacing: 14,
        labelMarginRight: 20,
        fontSize: 10,
        labelWidth: 70,
        yAxisFontSize: 10,
        xAxisFontSize: 10,
        paddingHorizontal: 10,
      };
    }

    // Medium desktop screens
    if (width < 1200) {
      return {
        barWidth: 25,
        spacing: 32,
        initialSpacing: 16,
        labelMarginRight: 22,
        fontSize: 11,
        labelWidth: 72,
        yAxisFontSize: 10,
        xAxisFontSize: 10,
        paddingHorizontal: 12,
      };
    }

    // Large desktop screens
    if (width < 1600) {
      return {
        barWidth: 35,
        spacing: 42,
        initialSpacing: 25,
        labelMarginRight: 25,
        fontSize: 12,
        labelWidth: 80,
        yAxisFontSize: 11,
        xAxisFontSize: 11,
        paddingHorizontal: 15,
      };
    }

    // Extra large screens
    if (width < 2000) {
      return {
        barWidth: 40,
        spacing: 80,
        initialSpacing: 45,
        labelMarginRight: 30,
        fontSize: 13,
        labelWidth: 100,
        yAxisFontSize: 12,
        xAxisFontSize: 12,
        paddingHorizontal: 20,
      };
    }

    return {
      barWidth: 50,
      spacing: 100,
      initialSpacing: 50,
      labelMarginRight: 30,
      fontSize: 13,
      labelWidth: 100,
      yAxisFontSize: 12,
      xAxisFontSize: 12,
      paddingHorizontal: 20,
    };
  };

  const {
    barWidth,
    spacing,
    initialSpacing,
    labelMarginRight,
    fontSize,
    labelWidth,
    yAxisFontSize,
    xAxisFontSize,
    paddingHorizontal,
  } = getResponsiveValues();

  // Create data with responsive styling
  const createBarData = () => {
    const result: BarData[] = [];

    labels.forEach((subject, index) => {
      // Add first bar with label
      result.push({
        value: values[index][0],
        label1: subject,
        label2: innerLabels[0] || "",
        spacing: 2,
        labelTextStyle: {
          color: neutral64,
          fontWeight: "500",
          fontSize: fontSize,
          marginRight: labelMarginRight,
        },
        frontColor: warning800,
      });

      // Add second bar
      result.push({
        label1: subject,
        label2: innerLabels[1] || "",
        value: values[index][1],
        frontColor: primary300,
      });
    });

    return result;
  };

  return (
    <View
      style={{
        backgroundColor: neutral00,
        paddingHorizontal: paddingHorizontal,
      }}
    >
      <ScrollView horizontal={true}>
        <BarChart
          data={createBarData()}
          barWidth={barWidth}
          spacing={spacing}
          hideRules={true}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{
            color: neutral64,
            fontSize: yAxisFontSize,
          }}
          noOfSections={5}
          maxValue={100}
          xAxisTextNumberOfLines={2}
          labelWidth={labelWidth}
          barBorderRadius={5}
          xAxisLabelTextStyle={{
            fontSize: xAxisFontSize,
            color: "yellow",
          }}
          initialSpacing={initialSpacing}
          showFractionalValues={true}
          disableScroll={true}
          showValuesAsTopLabel={false}
          renderTooltip={(
            item: {
              value: number;
              label1?: string;
              label2?: string;
              frontColor: string;
            },
            index: number
          ) => {
            return (
              <View
                style={{
                  bottom: -item.value + 10,
                  transform: [{ translateX: -30 - index }],
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: neutral00,
                  borderWidth: 2,
                  maxWidth: 200,
                  borderColor: neutral24,
                }}
              >
                <AppText
                  style={{
                    color: neutral80,
                    fontSize: 12,
                    marginBottom: 5,
                    fontWeight: 500,
                  }}
                >
                  {item.label1 || "Subject"}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        backgroundColor: item.frontColor || primary300,
                        marginRight: 5,
                      }}
                    />
                    <AppText
                      style={{
                        color: neutral64,
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {item.label2 || ""}
                    </AppText>
                  </View>
                  <AppText
                    style={{
                      color: neutral80,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {item.value}%
                  </AppText>
                </View>

                <View // outer triange
                  style={{
                    borderLeftColor: "transparent",
                    borderLeftWidth: 12,
                    borderRightColor: "transparent",
                    borderRightWidth: 12,
                    borderTopColor: neutral24,
                    borderTopWidth: 12,
                    height: 0,
                    left: "50%",
                    position: "absolute",
                    top: "100%",
                    transform: [{ translateX: -12 }],
                    width: 0,
                    zIndex: 1000,
                  }}
                />

                <View // inner triange
                  style={{
                    borderLeftColor: "transparent",
                    borderLeftWidth: 11,
                    borderRightColor: "transparent",
                    borderRightWidth: 11,
                    borderTopColor: neutral00,
                    borderTopWidth: 11,
                    height: 0,
                    left: "50%",
                    position: "absolute",
                    top: "100%",
                    transform: [{ translateX: -11 }, { translateY: -1 }],
                    width: 0,
                    zIndex: 1005,
                  }}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default DoubleBarChart;
