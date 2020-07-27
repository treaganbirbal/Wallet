import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";

function SpendingChart(props) {
  const info = props.info;
  return (
    <LineChart
      data={{
        labels: info
          .map((el) => {
            return el.date.slice(5);
          })
          .reverse() || [0],
        datasets: [
          {
            data: info.length
              ? info
                  .map((el) => {
                    return el.amount * -1;
                  })
                  .reverse()
              : [0, 0, 0, 0],
          },
        ],
      }}
      width={Dimensions.get("window").width - 40} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#6CBDC3",
        backgroundGradientFrom: "#6CBDC3",
        backgroundGradientTo: "#82E0AA",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 10,
        },
        propsForDots: {
          r: "6",
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
}

export default SpendingChart;
