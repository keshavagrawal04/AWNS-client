import {AttendancePieGraph} from "../../../components";
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import images from "../../../assets/images";
import {useNavigation} from "@react-navigation/native";
import React from "react";
import {useGetAttendanceQuery} from "../../../services/api/attendance";

const Attendance = () => {
  const navigation = useNavigation();
  const {data: countsData} = useGetAttendanceQuery();

  return (
    <ScrollView className="px-4">
      <AttendancePieGraph
        containerStyles="my-5 py-5 px-5"
        percentage={countsData?.percentage}
      />
      <Text className="text-black font-poppins-medium text-xl mb-3">
        This Month
      </Text>
      <View className="rounded-xl bg-white p-4">
        <View className="flex flex-row justify-between px-8 border-b border-light-gray pb-2">
          <Text className="text-light-gray text-md font-poppins-medium">
            Total Working Day
          </Text>
          <Text className="text-black text-xl font-poppins-medium">
            {countsData?.workingDays}
          </Text>
        </View>

        <View className="flex flex-row justify-between px-8 border-b border-light-gray pb-2 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            Present
          </Text>
          <Text className="text-primary text-lg font-poppins-medium">
            {countsData?.attendance}
          </Text>
        </View>

        <View className="flex flex-row justify-between px-8 border-b border-light-gray pb-2 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            Leaves
          </Text>
          <Text className="text-green text-lg font-poppins-medium">
            {countsData?.workingDays - countsData?.attendance}
          </Text>
        </View>

        <View className="flex flex-row justify-between px-8 pt-4">
          <Text className="text-light-gray text-md font-poppins-medium">
            Absent
          </Text>
          <Text className="text-red text-lg font-poppins-medium">
            {countsData?.workingDays - countsData?.attendance}
          </Text>
        </View>
      </View>

      <View className="rounded-xl bg-white p-4 mt-5 mb-24">
        <View className="flex flex-row justify-between">
          <Text className="text-black text-xl font-poppins-medium">
            Your Leaves
          </Text>
          <TouchableOpacity
            className="flex flex-row gap-1 justify-center items-center"
            onPress={() => {
              navigation.navigate("Leaves");
            }}>
            <Text className="text-primary text-lg font-poppins-medium">
              Leaves
            </Text>
            <Image
              className="w-[18px] h-[18px]"
              source={images.nextArrowPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Attendance;
