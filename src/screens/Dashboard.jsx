import {View, Text, ScrollView, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import images from "../assets/images";
import {AnalyticsCard, AttendancePieGraph} from "../components";
import {useGetUserInfoQuery} from "../services/api/user";

const Dashboard = () => {
  const {data: userData} = useGetUserInfoQuery();

  return (
    <SafeAreaView>
      <View className="flex align-middle content-center flex-row py-4 justify-between px-4">
        <Text className="font-ubuntu-bold text-3xl text-black">Dashboard</Text>
        <View className="flex gap-3 justify-center align-middle content-center flex-row">
          <View className="flex align-middle content-center justify-center">
            <Image
              source={images.notification}
              className="w-[26px] h-[26px]"
              resizeMethod="contain"
            />
          </View>
          {userData?.user?.profileImage ? (
            <Image
              source={{uri: userData?.user?.profileImage}}
              className="w-[42px] h-[42px] rounded-full"
              resizeMethod="contain"
            />
          ) : (
            <Image
              source={images.profile}
              className="w-[42px] h-[42px]"
              resizeMethod="contain"
            />
          )}
        </View>
      </View>
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

        <View className="bg-white rounded-xl p-5 mb-28">
          <AttendancePieGraph
            containerStyles={""}
            title={"Attendance Today"}
            pieStyles={"my-4"}>
            <View className="mt-4">
              <View className="flex flex-row justify-between">
                <Text className="text-light-gray text- font-poppins-medium">
                  Reported Employees
                </Text>
                <Text className="text-black text-lg font-poppins-medium">
                  140
                </Text>
              </View>
              <View className="flex flex-row justify-between mt-2">
                <Text className="text-light-gray text- font-poppins-medium">
                  Absent Employees
                </Text>
                <Text className="text-black text-lg font-poppins-medium">
                  10
                </Text>
              </View>
            </View>
          </AttendancePieGraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
