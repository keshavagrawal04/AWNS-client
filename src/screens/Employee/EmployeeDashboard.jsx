import {Circle, Svg, Text} from "react-native-svg";
import {View, StyleSheet} from "react-native";
import React from "react";

const EmployeeDashboard = ({size = 200, percentage = 80}) => {
  const center = size / 2;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View className="p-5 mx-auto">
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth={20}
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#d3d3d3"
          strokeWidth={15}
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#007bff"
          strokeWidth={20}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={`-${percentage}`}
          origin={`${center}, ${center}`}
        />
      </Svg>

      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  percentageText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{translateX: -20}, {translateY: -10}],
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default EmployeeDashboard;
