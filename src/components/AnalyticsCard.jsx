import {View, Text} from "react-native";
import React from "react";

const AnalyticsCard = ({title, count}) => {
  return (
    <View className="bg-white w-[175px] py-2 flex flex-row justify-evenly rounded-xl">
      <View className="w-[4px] rounded-lg h-full bg-primary" />
      <View className="py-2 flex">
        <Text className="text-gray text-md py-1 font-poppins-medium">
          {title}
        </Text>
        <Text className="text-black text-2xl font-poppins-bold">{count}</Text>
      </View>
    </View>
  );
};

export default AnalyticsCard;
