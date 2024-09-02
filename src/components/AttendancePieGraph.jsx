import {Circle, Svg} from "react-native-svg";
import {View, Text} from "react-native";
import React from "react";

const AttendancePieGraph = ({
  size = 250,
  percentage = 90,
  title = "Attendance",
  containerStyles = "py-5",
  pieStyles = "my-16",
  children,
}) => {
  const center = size / 2;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View className={`my-4 px-4 rounded-xl bg-white ${containerStyles}`}>
      <Text className="text-black font-poppins-medium text-lg">{title}</Text>
      <View className="relative">
        <Svg width={size} height={size} className={`mx-auto ${pieStyles}`}>
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
            rotation={`-${percentage / 5}`}
            origin={`${center}, ${center}`}
          />
        </Svg>

        <View
          className="absolute w-[100%]"
          style={{
            top: "50%",
            transform: [{translateY: -center / 3.9}],
          }}>
          <Text className="text-[#404040] text-center text-4xl font-poppins-medium">
            {percentage}%
          </Text>
          <Text className="color-[#0EB01D] text-lg text-center font-poppins-medium">
            Excellent
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

export default AttendancePieGraph;
