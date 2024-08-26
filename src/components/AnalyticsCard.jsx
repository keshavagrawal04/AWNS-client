import {View, Text} from "react-native";
import React from "react";

const AnalyticsCard = ({title, count}) => {
  return (
    <View className="px-4 py-4 bg-white w-[175px] flex flex-row gap-[1px] justify-center rounded-xl">
      <View className="w-[5px] rounded-lg h-full bg-primary" />
      <View className="py-2 flex gap-1">
        <Text className="text-gray text-md py-2 font-poppins-medium">
          {title}
        </Text>
        <Text className="text-black text-2xl font-poppins-bold">{count}</Text>
      </View>
    </View>
  );
};

export default AnalyticsCard;
