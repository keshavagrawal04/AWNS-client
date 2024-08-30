import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import images from "../assets/images";
import {AnalyticsCard} from "../components";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView className="px-4">
        <View className="">
          <View className="px-5 py-6 w-full flex flex-row justify-between bg-primary rounded-md">
            <Text className="text-white font-poppins-bold text-xl">
              Total Employees
            </Text>
            <Text className="text-white font-poppins-bold text-xl">150</Text>
          </View>
        </View>

        <View className="py-5">
          <Text className="text-black font-poppins-medium text-xl">
            Today Analystics
          </Text>
          <View className="flex flex-row justify-between mt-5">
            <AnalyticsCard title={"Reported Employees"} count={140} />
            <AnalyticsCard title={"Absent Employees"} count={10} />
          </View>
          <View className="flex flex-row justify-between mt-3">
            <AnalyticsCard title={"Sanctioned Leaves"} count={20} />
            <AnalyticsCard title={"Upcoming Birthdays"} count={5} />
          </View>
        </View>

        <View className="bg-white rounded-xl p-5">
          <Text className="text-black font-poppins-medium text-xl">
            Attendance Today
          </Text>
          <View className="flex flex-row gap-1 mt-2">
            <View className="flex bg-primary flex-row gap-[1.5px] rounded-full px-2">
              <Image
                source={images.filterArrows}
                className="w-[10px] h-[10px] translate-y-1"
              />
              <Text className="text-white font-poppins-medium text-[13px]">
                Date
              </Text>
            </View>

            <View className="flex bg-secondary flex-row gap-[1.5px] rounded-full px-2">
              <Image
                source={images.filterArrows}
                className="w-[10px] h-[10px] translate-y-1"
              />
              <Text className="text-gray-shade font-poppins-medium text-[13px]">
                Week
              </Text>
            </View>

            <View className="flex bg-secondary flex-row gap-[1.5px] rounded-full px-2">
              <Image
                source={images.filterArrows}
                className="w-[10px] h-[10px] translate-y-1"
              />
              <Text className="text-gray-shade font-poppins-medium text-[13px]">
                Month
              </Text>
            </View>

            <View className="flex bg-secondary flex-row gap-[1.5px] rounded-full px-2">
              <Image
                source={images.filterArrows}
                className="w-[10px] h-[10px] translate-y-1"
              />
              <Text className="text-gray-shade font-poppins-medium text-[13px]">
                Quarter
              </Text>
            </View>

            <View className="flex bg-secondary flex-row gap-[1.5px] rounded-full px-2">
              <Image
                source={images.filterArrows}
                className="w-[10px] h-[10px] translate-y-1"
              />
              <Text className="text-gray-shade font-poppins-medium text-[13px]">
                Year
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
