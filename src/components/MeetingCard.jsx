import {Text, View} from "react-native";
import React from "react";

const MeetingCard = ({title, link, date, purpose}) => {
  return (
    <View className="rounded-xl bg-white p-5 border border-light-gray">
      <Text className="text-lg text-black font-poppins-bold mb-3">{title}</Text>

      <View>
        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">LINK</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-primary underline font-poppins-medium">
              {link}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">DATE</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-black font-poppins-medium">{date}</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">PURPOSE</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-black font-poppins-medium">{purpose}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MeetingCard;
