import React from "react";
import {View, Text, ActivityIndicator} from "react-native";

const Loader = () => {
  return (
    <View className="flex-1 h-[100vh] bg-white/80 justify-center items-center">
      <ActivityIndicator size="large" color="#3470ED" />

      <Text className="mt-2 font-poppins-medium text-lg text-[#3470ED]">
        Loading...
      </Text>
    </View>
  );
};

export default Loader;
