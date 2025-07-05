import { View } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { neutral00, neutral100 } from "@/utils/constants/colors";

interface GiftedPieChartProps {
  values: number[];
  colors: string[];
  labels: string[];
  centerLabelComponent?: React.ReactNode;
  outerRadius?: number;
  innerRadius?: number;
  stokeWidth?: number;
  isDonut?: boolean;
}

const GiftedPieChart = ({
  values,
  colors,
  labels,
  centerLabelComponent,
  innerRadius,
  outerRadius,
  stokeWidth,
  isDonut = true,
}: GiftedPieChartProps) => {
  const pieChartData = values.map((value, index) => ({
    value,
    color: colors[index] || neutral100,
    label: labels[index] || "unknown",
    text: `${value}%`,
  }));

  return (
    <View>
      {isDonut ? (
        <PieChart
          data={pieChartData}
          donut={isDonut}
          innerRadius={innerRadius ? innerRadius : 100}
          radius={outerRadius ? outerRadius : 120}
          centerLabelComponent={() => centerLabelComponent}
          strokeWidth={stokeWidth ? stokeWidth : 0}
          strokeColor={neutral00}
        />
      ) : (
        <PieChart
          strokeColor={neutral00}
          strokeWidth={1.5}
          data={pieChartData}
          showText={true}
          textColor={neutral00}
          focusOnPress={true} // on clicking section a small increase in portion will be seen
          textSize={20}
          innerRadius={innerRadius ? innerRadius : 100}
          radius={outerRadius ? outerRadius : 120}
        />
      )}
    </View>
  );
};

export default GiftedPieChart;
