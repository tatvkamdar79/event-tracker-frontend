import useScreenSize from "@/hooks/useScreenSize";
import { neutral00, neutral24, neutral64 } from "@/utils/constants/colors";
import { expandViewIcon } from "@/utils/constants/images";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import AssessmentOverviewCard from "../cards/AssessmentOverviewCard";
import CustomModal from "../modals/Modal";
import AppText from "../text/appText";
import { sampleData } from "./sampleData";
import {
  amber500,
  cyan400,
  error800,
  orange500,
  primary200,
  purple300,
  red200,
  success800,
  teal800,
  warning800,
  yellow500,
  yellow800,
} from "@/utils/constants/colors";

interface CustomBarChartProps {
  title?: string;
  mobileMaintitle?: string;
  labels: string[];
  data: number[];
  containerBorderWidth?: number;
  widthFactor?: number;
}

const colors = [
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

const CustomBarChart = ({
  title,
  mobileMaintitle,
  labels,
  data,
  containerBorderWidth = 2,
  widthFactor = 0.4,
}: CustomBarChartProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const mobileWidth = 0.9 * width;
  const webWidth = Dimensions.get("window").width * widthFactor;
  const isMobile = useScreenSize();
  const [barChartData, setBarChartData] = useState<ChartData>(sampleData);

  useEffect(() => {
    const createChartDataWithFixedColors = () => {
      const colorSet = labels.map((_, index) => {
        return () => colors[index % colors.length]; // rotate if more labels than colors
      });

      return {
        labels,
        datasets: [
          {
            data,
            colors: colorSet,
          },
        ],
      };
    };

    const chartData = createChartDataWithFixedColors();
    setBarChartData(chartData);
  }, [labels, data]);

  return (
    <View
      style={{
        backgroundColor: neutral00,
        justifyContent: "center",
        borderWidth: containerBorderWidth,
        padding: 10,
        width: isMobile ? "auto" : "auto",
        borderRadius: 10,
        borderColor: neutral24,
        height: isMobile ? 400 : "auto",
      }}
    >
      <View
        style={{
          marginLeft: isMobile ? "8%" : 32,
          marginTop: 10,
          marginBottom: 30,
          flexDirection: "row",
          justifyContent: isMobile ? "space-between" : "flex-start",
          alignItems: "center",
        }}
      >
        {(mobileMaintitle || title) && (
          <AppText style={{ fontWeight: "600", fontSize: 16 }}>
            {isMobile ? (mobileMaintitle ? mobileMaintitle : title) : title}
          </AppText>
        )}
        {isMobile && (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image
              source={expandViewIcon}
              style={{
                height: 25,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{}}
      >
        <BarChart
          yAxisLabel=""
          yAxisSuffix=""
          width={isMobile ? mobileWidth : webWidth}
          height={300}
          fromZero={true}
          data={barChartData}
          chartConfig={{
            backgroundGradientFrom: neutral00,
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: neutral00,
            backgroundGradientToOpacity: 1,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barRadius: 10,
            barPercentage: isMobile ? 1.0 : 1.4,
            propsForVerticalLabels: {
              fontSize: 12,
              fontWeight: "500",
              fill: neutral64,
            },
            propsForBackgroundLines: {
              stroke: neutral24, // line color
              strokeDasharray: "0", // solid line
              strokeWidth: 1, // thickness
            },
            propsForHorizontalLabels: {
              fontSize: 12,
              fontWeight: "500",
            },
          }}
          showBarTops={false}
          withCustomBarColorFromData={true}
          flatColor={true}
          withVerticalLabels={true}
          withInnerLines={false}
          yLabelsOffset={20} // tweak this number
          style={{
            marginLeft: isMobile ? -0.027 * width : -0.005 * width,
            flex: 1,
          }}
        />
      </ScrollView>
      {isMobile && (
        <View
          style={{
            borderTopWidth: 2,
            width: "73%",
            marginLeft: "17%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: neutral24,
          }}
        >
          <AppText
            style={{
              fontWeight: "500",
              fontSize: 14,
              color: neutral64,
            }}
          >
            {title}
          </AppText>
        </View>
      )}

      {!isMobile && (
        <View>
          <AssessmentOverviewCard barChartData={barChartData} />
        </View>
      )}
      <CustomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        hasClose={true}
        makeItemsCenter={true}
        animationType="fade"
        heightProp="true"
      >
        <AssessmentOverviewCard barChartData={barChartData} />
      </CustomModal>
    </View>
  );
};

export default CustomBarChart;
