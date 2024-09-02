import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {LeaveCard} from "../../../components";

const Leaves = () => {
  const navigation = useNavigation();

  const leaves = [
    {
      id: 1,
      title: "Title 1",
      date: "Sep,23 2024",
      reason: "My Reason is i am tired lorem ipsum some content",
    },
    {
      id: 2,
      title: "Title 1",
      date: "Sep,23 2024",
      reason: "My Reason is i am tired",
    },
  ];

  return (
    <SafeAreaView>
      <TouchableOpacity
        className="flex flex-row items-center px-4 py-5"
        onPress={() => {
          navigation.navigate("EmployeeDashboard");
        }}>
        <Image
          source={icons.backArrow}
          className="w-7 h-7"
          resizeMethod="contain"
        />
        <Text className="text-black text-3xl font-ubuntu-bold ml-2">
          Leaves
        </Text>
      </TouchableOpacity>
      <ScrollView className="px-6">
        <View className="flex justify-between flex-row items-center my-auto">
          <Text className="text-black font-poppins-bold text-2xl">
            This Month
          </Text>
          <TouchableOpacity className="border border-primary rounded-md px-4 py-1">
            <Text className="text-primary font-poppins-medium text-xl">
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5">
          {leaves.map(leave => (
            <View className="mb-4">
              <LeaveCard
                title={leave.title}
                date={leave.date}
                reason={leave.reason}
              />
            </View>
          ))}
        </View>
        <View className="flex">
          <TouchableOpacity
            className="border border-primary rounded-md px-4 py-1"
            onPress={() => {
              navigation.navigate("ApplyLeaves");
            }}>
            <Text className="text-primary text-center font-poppins-medium text-xl">
              Apply Leave
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leaves;
