import {AttendancePieGraph} from "../../../components";
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import images from "../../../assets/images";
import {useNavigation} from "@react-navigation/native";
import React from "react";

const Attendance = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="px-4">
      <AttendancePieGraph />
      <Text className="text-black font-poppins-medium text-xl mb-3">
        This Month
      </Text>
      <View className="rounded-xl bg-white p-4">
        <View className="flex flex-row justify-between px-8 border-b-2 border-light-gray pb-2">
          <Text className="text-light-gray text-md font-poppins-medium">
            Total Working Day
          </Text>
          <Text className="text-primary text-lg font-poppins-medium">28</Text>
        </View>

        <View className="flex flex-row justify-between px-8 border-b-2 border-light-gray pb-2 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            Present
          </Text>
          <Text className="text-black text-lg font-poppins-medium">24</Text>
        </View>

        <View className="flex flex-row justify-between px-8 border-b-2 border-light-gray pb-2 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            On Leave
          </Text>
          <Text className="text-black text-lg font-poppins-medium">4</Text>
        </View>

        <View className="flex flex-row justify-between px-8 pb-2 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            Absent
          </Text>
          <Text className="text-black text-lg font-poppins-medium">0</Text>
        </View>
      </View>

      <View className="rounded-xl bg-white p-4 mt-5 mb-24">
        <View className="flex flex-row justify-between px-4">
          <Text className="text-black text-xl font-poppins-medium">
            Your Leaves
          </Text>
          <TouchableOpacity
            className="flex flex-row gap-1"
            onPress={() => {
              navigation.navigate("Leaves");
            }}>
            <Text className="text-primary text-xl font-poppins-medium">
              Leaves
            </Text>
            <Image
              className="w-[24px] h-[24px]"
              source={images.nextArrowPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Attendance;
