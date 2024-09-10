import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import images from "../assets/images";
import {AnalyticsCard, AttendancePieGraph, LogoutModal} from "../components";
import {
  useGetUserInfoQuery,
  useGetEmployeesCountsQuery,
} from "../services/api/user";
import icons from "../assets/icons";
import {useAuth} from "../hooks";
import {useNavigation} from "@react-navigation/native";

const Dashboard = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const {data: userData} = useGetUserInfoQuery();
  const {data: countsData} = useGetEmployeesCountsQuery();
  const navigation = useNavigation();
  const {logout} = useAuth();

  return (
    <SafeAreaView>
      <View className="flex align-middle content-center flex-row py-4 justify-between px-4 mb-5">
        <Text className="font-ubuntu-bold text-3xl text-black">Dashboard</Text>
        <View className="flex gap-3 justify-center align-middle content-center flex-row">
          <View className="flex align-middle items-center justify-center">
            <Image
              source={images.notification}
              className="w-[26px] h-[26px]"
              resizeMethod="contain"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsLogoutModalVisible(true);
            }}
            className="flex items-center justify-center">
            <Image source={icons.logout} className="w-[26px] h-[26px]" />
          </TouchableOpacity>
          <TouchableOpacity>
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
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="px-4">
        <View className="">
          <View className="px-5 py-6 w-full flex flex-row justify-between bg-primary rounded-md">
            <Text className="text-white font-poppins-bold text-xl">
              Total Employees
            </Text>
            <Text className="text-white font-poppins-bold text-xl">
              {countsData?.totalEmployees}
            </Text>
          </View>
        </View>

        <View className="py-5">
          <Text className="text-black font-poppins-bold text-xl">
            Today Analytics
          </Text>
          <View className="flex flex-row justify-between mt-5">
            <AnalyticsCard
              title={"Reported Employees"}
              count={countsData?.attended}
            />
            <AnalyticsCard
              title={"Absent Employees"}
              count={countsData?.notAttended}
            />
          </View>
          <View className="flex flex-row justify-between mt-3">
            <AnalyticsCard
              title={"Sanctioned Leaves"}
              count={countsData?.leaves}
            />
            <AnalyticsCard
              title={"Upcoming Birthdays"}
              count={countsData?.upcomingBirthdayCount}
            />
          </View>
        </View>

        <View className="bg-white rounded-xl px-5 mb-28">
          <AttendancePieGraph
            title={"Attendance Today"}
            pieStyles={"my-4"}
            isFilter={true}
            percentage={countsData?.percentage}>
            <View className="mt-4">
              <View className="flex flex-row justify-between">
                <Text className="text-light-gray font-poppins-medium">
                  Reported Employees
                </Text>
                <Text className="text-black text-lg font-poppins-bold">
                  {countsData?.attended}
                </Text>
              </View>
              <View className="flex flex-row justify-between mt-2">
                <Text className="text-light-gray font-poppins-medium">
                  Absent Employees
                </Text>
                <Text className="text-black text-lg font-poppins-bold">
                  {countsData?.notAttended}
                </Text>
              </View>
            </View>
          </AttendancePieGraph>
        </View>
        <View className="mb-44" />
      </ScrollView>
      <LogoutModal
        visible={isLogoutModalVisible}
        handleClose={() => {
          setIsLogoutModalVisible(prev => !prev);
        }}
        handleYes={() => {
          setIsLogoutModalVisible(prev => !prev);
          logout();
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
