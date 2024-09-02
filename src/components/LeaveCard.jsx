import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

const LeaveCard = ({title, date, reason}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="rounded-xl bg-white p-5">
      <Text className="text-xl text-black font-poppins-bold mb-3">{title}</Text>

      <View className="flex flex-row border-b border-light-gray pb-2 pt-4">
        <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
          DATE
        </Text>
        <Text className="w-2/3 text-black font-poppins-medium">{date}</Text>
      </View>

      <View className="flex flex-row pt-4">
        <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
          Reason
        </Text>
        <Text
          className="w-2/4 text-black font-poppins-medium"
          numberOfLines={isExpanded ? undefined : 1}
          ellipsizeMode="tail">
          {reason}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsExpanded(prev => !prev);
        }}>
        <Text className="text-center text-primary font-poppins-medium text-lg pt-5">
          {isExpanded ? "View Less" : "View More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeaveCard;
