import useScreenSize from "@/hooks/useScreenSize";
import { neutral64 } from "@/utils/constants/colors";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import AppText from "../text/appText";

interface PieChartDataType {
  value: number;
  color: string;
  label?: string;
}

interface CustomPieChartProps {
  pieChartData: PieChartDataType[];
  currentTerm: string;
  showPercentage?: boolean;
  centerText?: string;
}

const CustomPieChart = ({
  pieChartData,
  currentTerm,
  showPercentage = true,
  centerText,
}: CustomPieChartProps) => {
  const isMobile = useScreenSize();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const calculateSize = useMemo(() => {
    const baseSize = Math.min(dimensions.width, dimensions.height);
    return {
      innerRadius: Math.max(baseSize * 0.115, 40),
      radius: Math.max(baseSize * 0.15, 60),
      fontSize: Math.max(baseSize * 0.02, 14),
    };
  }, [dimensions]);

  const totalValue = pieChartData.reduce((sum, item) => sum + item.value, 0);
  const formattedData = pieChartData.map((item) => ({
    ...item,
    label: showPercentage
      ? `${((item.value / totalValue) * 100).toFixed(1)}%`
      : item.label,
  }));

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PieChart
        data={formattedData}
        donut={true}
        innerRadius={
          isMobile
            ? calculateSize.innerRadius * 1.25
            : calculateSize.innerRadius
        }
        radius={isMobile ? calculateSize.radius * 1.2 : calculateSize.radius}
        centerLabelComponent={() => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {centerText && (
              <AppText
                style={{
                  fontSize: calculateSize.fontSize,
                  fontWeight: "400",
                  color: neutral64,
                }}
              >
                {centerText}
              </AppText>
            )}
            <AppText
              style={{
                fontSize: calculateSize.fontSize + 4,
                fontWeight: "600",
              }}
            >
              {currentTerm}
            </AppText>
          </View>
        )}
      />
    </View>
  );
};

export default CustomPieChart;
