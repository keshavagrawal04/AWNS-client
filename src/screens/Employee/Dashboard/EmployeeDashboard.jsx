import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../../assets/images";
import React, {useState} from "react";
import Attendance from "./Attendance";
import {useGetUserInfoQuery} from "../../../services/api/user";
import Meeting from "./Meeting";
import {useNavigation} from "@react-navigation/native";

const EmployeeDashboard = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
      <ScrollView className="px-2">
        <View className="px-4 mt-4 mb-5">
          <View className="w-[100%] rounded-full flex flex-row bg-[#3470ed1a] p-1">
            <TouchableOpacity
              className={`w-[50%] ${
                activeTab === 0 && "bg-primary"
              } rounded-full p-3`}
              onPress={() => {
                setActiveTab(0);
              }}>
              <Text
                className={`text-center font-poppins-medium text-lg ${
                  activeTab === 0 ? "text-white" : "text-black"
                }`}>
                Attendance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-[50%] rounded-full p-3 ${
                activeTab === 1 && "bg-primary"
              }`}
              onPress={() => {
                setActiveTab(1);
              }}>
              <Text
                className={`text-center font-poppins-medium text-lg ${
                  activeTab === 1 ? "text-white" : "text-black"
                }`}>
                Meeting
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>{activeTab === 0 && <Attendance />}</View>
        <View>{activeTab === 1 && <Meeting />}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeeDashboard;
