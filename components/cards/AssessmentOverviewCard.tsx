import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import AppText from "../text/appText";
import useScreenSize from "@/hooks/useScreenSize";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { neutral00, neutral64, neutral80 } from "@/utils/constants/colors";

interface AssessmentOverviewCardProps {
  barChartData: ChartData;
}

const AssessmentOverviewCard = ({
  barChartData,
}: AssessmentOverviewCardProps) => {
  const isMobile = useScreenSize();
  const { width } = useWindowDimensions();

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const transformedData = barChartData.labels.map((label, index) => ({
    subject: label,
    score: barChartData.datasets[0].data[index],
    color:
      barChartData.datasets[0].colors && barChartData.datasets[0].colors[index]
        ? barChartData.datasets[0].colors[index](0)
        : getRandomColor(),
  }));

  const renderCards = () => {
    if (isMobile) {
      return transformedData.map((item) => (
        <View
          key={item.subject}
          style={[
            styles.itemContainer,
            {
              width: 0.625 * width,
              margin: 10,
            },
          ]}
        >
          <View
            style={[styles.colorIndicator, { backgroundColor: item.color }]}
          />
          <AppText style={styles.subjectText}>{item.subject}</AppText>
          <AppText style={styles.scoreText}>{item.score}</AppText>
        </View>
      ));
    }

    // Non-mobile view: group cards into rows of 3
    const cardRows = [];
    for (let i = 0; i < transformedData.length; i += 5) {
      const rowCards = transformedData.slice(i, i + 5).map((item) => (
        <View
          key={item.subject}
          style={[
            styles.itemContainer,
            {
              width: 170,
            },
          ]}
        >
          <View
            style={[styles.colorIndicator, { backgroundColor: item.color }]}
          />
          <AppText style={styles.subjectText}>{item.subject}</AppText>
        </View>
      ));
      cardRows.push(
        <ScrollView horizontal={true}>
          <View key={`row-${i}`} style={styles.cardRow}>
            {rowCards}
          </View>
        </ScrollView>
      );
    }
    return cardRows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            width: isMobile ? 0.65 * width : "auto",
          }}
        >
          {renderCards()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginLeft: 20,
  },
  colorIndicator: {
    borderRadius: 4,
    height: 12,
    marginRight: 8,
    width: 12,
  },
  container: {
    backgroundColor: neutral00,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  scoreText: {
    color: neutral80,
    fontSize: 10,
    fontWeight: "bold",
  },
  subjectText: {
    color: neutral64,

    fontSize: 12,
  },
});

export default AssessmentOverviewCard;
