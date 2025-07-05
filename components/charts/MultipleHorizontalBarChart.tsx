import { error800, neutral80, success800 } from "@/utils/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../text/appText";

interface SingleBarType {
  label?: string;
  value?: number;
  category?: string;
}

interface barDataType {
  label: string;
  bars: SingleBarType | SingleBarType[];
}

interface HorizontalBarChartProps {
  data: barDataType[];
  showLegends?: boolean;
  colors?: string[];
  maxValue?: number;
  showValues?: boolean;
  showLabels?: boolean;
  barHeight?: number;
  barSpacing?: number;
  rowSpacing?: number;
  chartWidth: number;
}

const HorizontalBarChart = ({
  data,
  colors = [success800, error800, "#3B82F6", "#F59E0B", "#8B5CF6"],
  maxValue = 100,
  showValues = true,
  showLabels = true,
  barHeight = 20,
  barSpacing = 4,
  rowSpacing = 10,
  chartWidth,
  showLegends,
}: HorizontalBarChartProps) => {
  const renderBars = (bars: SingleBarType | SingleBarType[]) => {
    // Normalize to array if it's a single object
    const barArray = Array.isArray(bars) ? bars : [bars];

    return barArray.map((bar, barIndex) => {
      const barWidth = (bar.value! / maxValue) * chartWidth!;
      const barColor = colors[barIndex % colors.length];

      return (
        <View
          key={barIndex}
          style={[styles.barRow, { marginBottom: barSpacing }]}
        >
          <View
            style={[
              styles.bar,
              {
                width: barWidth,
                height: barHeight,
                backgroundColor: barColor,
              },
            ]}
          />
          <View style={styles.barLabelContainer}>
            {bar.label && (
              <AppText style={styles.barLabel}>{bar.label}</AppText>
            )}
            {showValues && (
              <AppText style={styles.barValue}>{bar.value}%</AppText>
            )}
          </View>
        </View>
      );
    });
  };

  const renderRow = (item: barDataType, index: number) => {
    return (
      <View key={index} style={[styles.chartRow, { marginBottom: rowSpacing }]}>
        {showLabels && (
          <View style={styles.labelContainer}>
            <AppText style={styles.rowLabel}>{item.label}</AppText>
          </View>
        )}

        <View style={styles.barsContainer}>{renderBars(item.bars)}</View>
      </View>
    );
  };
  const renderXAxisLabels = () => {
    const ticks = [];
    const step = 10; // step size from 10 to 100
    for (let i = 0; i <= 100; i += step) {
      const left = (i / maxValue) * chartWidth;
      ticks.push(
        <View
          key={i}
          style={{ position: "absolute", left, alignItems: "center" }}
        >
          <AppText style={{ fontSize: 10, color: "#6B7280" }}>{i}</AppText>
        </View>
      );
    }

    return (
      <View
        style={{
          marginLeft: 135,
          height: 20,
          marginTop: 5,
          width: chartWidth + 20,
          position: "relative",
        }}
      >
        <View
          style={{
            height: 1,
            backgroundColor: "#D1D5DB",
            width: "100%",
          }}
        />
        {ticks}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <ScrollView style={{ height: 300, flexDirection: "column-reverse" }}>
          {data.map((item, index) => renderRow(item, index))}
        </ScrollView>
        {renderXAxisLabels()}
        {showLegends && (
          <View style={{ alignSelf: "center", flexDirection: "row", gap: 10 }}>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: success800,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                }}
              />
              <AppText
                style={{ fontSize: 14, color: neutral80, fontWeight: 400 }}
              >
                Top Subject
              </AppText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: error800,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                }}
              />
              <AppText
                style={{ fontSize: 14, color: neutral80, fontWeight: 400 }}
              >
                Low Subject
              </AppText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 4,
  },
  barLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginRight: 8,
    minWidth: 60,
  },
  barLabelContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
  },
  barRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 4,
  },
  barValue: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  barsContainer: {
    flex: 1,
  },
  chartContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chartRow: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  labelContainer: {
    justifyContent: "center",
    marginRight: 15,
    paddingTop: 10,
    width: 120,
  },
  rowLabel: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
  },
});

export default HorizontalBarChart;
