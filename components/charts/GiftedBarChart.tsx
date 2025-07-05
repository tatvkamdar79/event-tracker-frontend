import {
  amber500,
  cyan400,
  error800,
  neutral00,
  neutral24,
  neutral64,
  neutral80,
  orange500,
  pink700,
  primary200,
  primary300,
  purple300,
  red200,
  success800,
  teal800,
  warning800,
  yellow500,
  yellow800,
} from "@/utils/constants/colors";
import React, { useEffect, useState } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import AppText from "../text/appText";
import useScreenSize from "@/hooks/useScreenSize";

interface GiftedBarChartProps {
  defaultBarColor?: string;
  barWidth?: number;
  barRadius?: number;
  initialSpacing?: number;
  spacing?: number;
  endSpacing?: number;
  yAxisThickness?: number;
  xaxisThickness?: number;
  xAxisLabelsVerticalShift?: number;
  numberOfYAxisLabels?: number;
  maxValue?: number;
  xAxisColor?: string;
  yAxisColor?: string;
  needDashes?: boolean;
  toolTip?: (item: { value: string | number | boolean }) => React.ReactNode;
  xAxisLabelTextStyle?: StyleProp<TextStyle>;
  useGivenColors?: boolean;
  givenColors?: string[];
  data: number[];
  labels: string[];
  chartWidth?: number;
  title?: string;
}

export interface BarDataItem {
  value: number;
  label?: string;
  frontColor?: string;
}

const defaultColors = [
  primary200,
  success800,
  error800,
  warning800,
  orange500,
  purple300,
  red200,
  yellow800,
  teal800,
  yellow500,
  amber500,
  cyan400,
];

const defaultTooltipRenderer = (
  item: { value: number; label?: string; frontColor: string },
  maxValue: number | undefined
) => {
  const isTall = maxValue && item.value >= maxValue / 2;
  return (
    <View
      style={{
        bottom: isTall ? -70 : -item.value / 2,
        transform: isTall ? [{ translateX: -30 }] : [{ translateX: -45 }],
        padding: 10,
        borderRadius: 6,
        alignItems: "flex-start",
        backgroundColor: neutral00,
        borderWidth: 2,
        maxWidth: 210,
        borderColor: neutral24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginRight: 5,
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
            {item.label}
          </AppText>
        </View>
        <AppText style={{ color: neutral80, fontSize: 12, fontWeight: "600" }}>
          {item.value}
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
};

const GiftedBarChart = ({
  defaultBarColor = pink700,
  barWidth = 20,
  barRadius = 4,
  initialSpacing,
  spacing,
  endSpacing,
  yAxisThickness,
  xaxisThickness,
  xAxisLabelsVerticalShift,
  numberOfYAxisLabels,
  maxValue,
  xAxisColor,
  yAxisColor,
  needDashes = false,
  toolTip,
  xAxisLabelTextStyle,
  useGivenColors = false,
  givenColors,
  data,
  labels,
  chartWidth = 400,
  title,
}: GiftedBarChartProps) => {
  const [barChartData, setBarChartData] = useState<BarDataItem[]>([]);
  const isMobile = useScreenSize();
  useEffect(() => {
    const createChartDataWithFixedColors = () => {
      let colorsToBeMapped: string[];

      if (useGivenColors && givenColors) {
        colorsToBeMapped = givenColors;
      } else {
        colorsToBeMapped = defaultColors;
      }

      const formattedData = data.map((item, index) => {
        return {
          value: item,
          label: labels[index],
          frontColor:
            index >= colorsToBeMapped.length
              ? defaultBarColor
              : colorsToBeMapped[index],
        };
      });

      return formattedData;
    };

    const chartData = createChartDataWithFixedColors();
    setBarChartData(chartData);
  }, [labels, data]);

  return (
    <View style={{}}>
      <AppText
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: neutral80,
          marginVertical: 10,
          padding: 10,
        }}
      >
        {title}
      </AppText>
      <BarChart
        data={barChartData}
        barWidth={barWidth}
        barBorderRadius={barRadius}
        frontColor={defaultBarColor}
        initialSpacing={initialSpacing}
        spacing={spacing}
        endSpacing={endSpacing}
        yAxisThickness={yAxisThickness}
        xAxisThickness={xaxisThickness}
        xAxisLabelsVerticalShift={xAxisLabelsVerticalShift}
        noOfSections={numberOfYAxisLabels}
        maxValue={maxValue}
        xAxisColor={xAxisColor}
        yAxisColor={yAxisColor}
        renderTooltip={(item: {
          value: number;
          label?: string;
          frontColor: string;
        }) =>
          toolTip ? toolTip(item) : defaultTooltipRenderer(item, maxValue)
        }
        hideRules={needDashes ? false : true}
        xAxisLabelTextStyle={xAxisLabelTextStyle}
        width={Math.max(chartWidth, isMobile ? 200 : 300)}
      />
    </View>
  );
};

export default GiftedBarChart;
