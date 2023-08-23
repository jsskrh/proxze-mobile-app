import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const EarningsChart = ({ monthlyEarnings }) => {
  const { width } = useWindowDimensions();

  return (
    <LineChart
      data={{
        labels: monthlyEarnings.map((month) => month.month),
        datasets: [
          {
            data: monthlyEarnings.map((month) => month.totalAmount),
          },
        ],
      }}
      width={width - 40} // from react-native
      height={230}
      yAxisLabel="N"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        // backgroundGradientFrom: "#fb8c00",
        // backgroundGradientTo: "#ffa726",
        backgroundGradientFrom: "rgb(38 38 38)",
        backgroundGradientTo: "rgb(38 38 38)",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "3",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default EarningsChart;
