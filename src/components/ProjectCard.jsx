import {Text, View} from "react-native";
import React from "react";

const ProjectCard = ({name, date, technology, actions}) => {
  return (
    <View className="rounded-xl bg-white px-4 py-5 mb-4">
      <View className="flex flex-row border-b border-light-gray pb-2 pt-4">
        <Text className="w-1/2 text-gray text-md font-poppins-medium">
          NAME
        </Text>
        <Text className="w-2/3 text-primary text-lg font-poppins-bold">
          {name}
        </Text>
      </View>

      <View className="flex flex-row border-b border-light-gray pb-2 pt-4">
        <Text className="w-1/2 text-gray text-md font-poppins-medium">
          STARTED DATE
        </Text>
        <Text className="w-2/4 text-black font-poppins-medium">{date}</Text>
      </View>

      <View className="flex flex-row pb-2 pt-4">
        <Text className="w-1/2 text-gray text-md font-poppins-medium">
          TECHNOLOGY
        </Text>
        <Text className="w-2/4 text-black font-poppins-medium">
          {technology}
        </Text>
      </View>
    </View>
  );
};

export default ProjectCard;
