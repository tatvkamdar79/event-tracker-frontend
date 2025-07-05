import { neutral100, primary400 } from "@/utils/constants/colors";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import AppText from "../text/appText";

interface LineChartProps {
  containerWidth: number;
  isCurved: boolean;
  data: lineDataItem[];
  lineChartheight?: number;
  noOfSections?: number;
  areaChart?: boolean;
  color?: string;
  thickness?: number;
  startFillColor?: string;
  endFillColor?: string;
  startOpacity?: number;
  endOpacity?: number;
  hideRules?: boolean;
  hideDataPoints?: boolean;
  hideOrigin?: boolean;
  title?: string;
  spacing?: number;
  dataPointsRadius?: number;
  ylabel?: string;
}

const Linechart = ({
  containerWidth,
  data,
  isCurved,
  lineChartheight = 250,
  noOfSections = 5,
  areaChart = true,
  color = primary400,
  thickness = 3,
  startFillColor = primary400,
  endFillColor = "rgba(30, 91, 144, 0.01)",
  startOpacity = 0,
  endOpacity = 0,
  hideRules = true,
  hideDataPoints = false,
  hideOrigin = true,
  title,
  spacing = 60,
  dataPointsRadius = 0,
  ylabel,
}: LineChartProps) => {
  // Calculate available width for the chart
  const containerRef = useRef<View>(null);
  // Start with provided width or null (not a default number)
  const [width, setWidth] = useState(containerWidth || 300);

  useEffect(() => {
    // If width is provided via props, use it
    if (containerWidth) {
      setWidth(containerWidth);
    }
    // If no width is provided and we have a ref, measure it
    else if (containerRef.current) {
      // We need to wait for the next frame to ensure the ref is properly connected
      setTimeout(() => {
        containerRef.current?.measure((x, y, measuredWidth) => {
          if (measuredWidth > 0) {
            setWidth(measuredWidth - 40); // Subtract padding
          }
        });
      }, 0);
    }
  }, [containerWidth, containerRef.current]);

  return (
    <View style={styles.container}>
      <View
        ref={containerRef}
        onLayout={(event) => {
          if (!containerWidth) {
            const { width: layoutWidth } = event.nativeEvent.layout;
            setWidth(layoutWidth - 30); // Account for padding
          }
        }}
        style={styles.chartWrapper}
      >
        {ylabel && (
          <AppText
            style={{
              transform: [{ rotate: "-90deg" }],
              position: "absolute",
              left: -65,
              fontSize: 16,
              color: neutral100,
              fontWeight: 600,
              margin: 10,
            }}
          >
            {ylabel}
          </AppText>
        )}

        {width && (
          <LineChart
            data={data}
            height={lineChartheight}
            width={width}
            noOfSections={noOfSections}
            areaChart={areaChart}
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            color={color}
            thickness={thickness}
            startFillColor={startFillColor}
            endFillColor={endFillColor}
            startOpacity={startOpacity}
            endOpacity={endOpacity}
            hideRules={hideRules}
            hideDataPoints={hideDataPoints}
            curved={isCurved}
            hideOrigin={hideOrigin}
            spacing={spacing}
            dataPointsRadius={dataPointsRadius}
          />
        )}
      </View>

      {/* Category labels */}
      {/* <View style={styles.categoriesContainer}>
        {performanceCategories.map((category, index) => (
          <View key={index} style={styles.categoryLabelContainer}>
            <AppText style={styles.categoryLabel}>{category.label}</AppText>
            <AppText style={styles.rangeText}>
              ({category.range[0]}-{category.range[1]})
            </AppText>
          </View>
        ))}
      </View> */}

      {title && (
        <View style={styles.legendContainer}>
          <View style={styles.legendDot} />
          <AppText style={styles.legendText}>{title}</AppText>
        </View>
      )}

      {/* <View style={styles.statsContainer}>
        <AppText style={styles.statsText}>Class Average: {mean.toFixed(1)}</AppText>
        <AppText style={styles.statsText}>
          Standard Deviation: {stdDev.toFixed(1)}
        </AppText>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  axisText: {
    color: "#666",
    fontSize: 10,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 20,
    // padding: 15,
  },
  legendContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  legendDot: {
    backgroundColor: "#1E5B90",
    borderRadius: 5,
    height: 10,
    marginRight: 8,
    width: 10,
  },
  legendText: {
    color: "#666",
    fontSize: 14,
  },
});

export default Linechart;
