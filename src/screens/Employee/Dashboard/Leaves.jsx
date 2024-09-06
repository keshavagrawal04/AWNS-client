import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {Filter, LeaveCard, Loader} from "../../../components";
import {useGetLeavesQuery} from "../../../services/api/leave";
import images from "../../../assets/images";

const Leaves = () => {
  const navigation = useNavigation();
  const {data: leavesData, isLoading} = useGetLeavesQuery();
  const [activeTab, setActiveTab] = useState("Leaves");
  const [isFilter, setIsFilter] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView>
      <ScrollView className="px-5">
        <View className="flex flex-row justify-between">
          <TouchableOpacity
            className="flex flex-row items-center py-5"
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
          <View className="flex justify-center">
            <TouchableOpacity
              className="bg-primary rounded-full px-4 py-1"
              onPress={() => {
                navigation.navigate("ApplyLeaves");
              }}>
              <Text className="text-white text-center font-poppins-medium">
                Apply Leave
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-[100%] rounded-full flex flex-row bg-[#3470ed1a] p-1">
          <TouchableOpacity
            className={`w-[50%] ${
              activeTab === "Leaves" && "bg-primary"
            } rounded-full p-3`}
            onPress={() => {
              setActiveTab("Leaves");
            }}>
            <Text
              className={`text-center font-poppins-medium text-lg ${
                activeTab === "Leaves" ? "text-white" : "text-black"
              }`}>
              Leaves
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-[50%] rounded-full p-3 ${
              activeTab === "Applied Leaves" && "bg-primary"
            }`}
            onPress={() => {
              setActiveTab("Applied Leaves");
            }}>
            <Text
              className={`text-center font-poppins-medium text-lg ${
                activeTab === "Applied Leaves" ? "text-white" : "text-black"
              }`}>
              Applied
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-between flex-row items-center mt-5">
          <Text className="text-black font-poppins-bold text-2xl">
            {activeTab}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsFilter(true);
            }}
            className="border border-primary rounded-md px-4 py-1 flex flex-row justify-between items-center">
            <Image className="h-[15px] w-[15px]" source={icons.filter} />
            <Text className="text-primary font-poppins-medium text-xl">
              {" "}
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5">
          {leavesData?.data?.length <= 0 && (
            <View className="flex items-center mt-10">
              <Image
                source={images.noDataFound}
                className="w-[280px] h-[280px]"
                resizeMethod="contain"
              />
            </View>
          )}
          {leavesData?.data?.map(leave => (
            <View key={leave._id} className="mb-4">
              <LeaveCard
                id={leave._id}
                title={leave.title}
                date={leave.date?.split("T")[0]}
                reason={leave.reason}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <Filter
        visible={isFilter}
        handleClose={() => {
          setIsFilter(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Leaves;
