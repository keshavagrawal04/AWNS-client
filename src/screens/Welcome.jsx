import {View, Text, Image} from "react-native";
import React, {useEffect} from "react";
import {CustomButton, Loader} from "../components";
import {useNavigation} from "@react-navigation/native";
import images from "../assets/images";
import {useAuth} from "../hooks";
import {useGetUserInfoQuery} from "../services/api/user";

const Welcome = () => {
  const navigation = useNavigation();
  const {isLoggedIn, isLoading} = useAuth();
  const {data: userData} = useGetUserInfoQuery();

  if (isLoading) return <Loader />;

  return (
    <View className="px-5 pt-10">
      <Text className="text-black text-4xl font-ubuntu-bold">AWNS</Text>
      <Text className="text-black text-4xl font-ubuntu-bold">
        Management System
      </Text>
      <Text className="text-gray font-poppins-medium text-lg mt-2">
        Boost efficiency and unlock potential with our tailored management
        solutions.
      </Text>
      <View className="">
        <Image
          source={images.heroImage}
          className="w-[360px] h-[400px]"
          resizeMethod="contain"
        />
      </View>
      <CustomButton
        containerStyles={"mt-28 rounded-lg p-5"}
        title="Get Started"
        handleOnPress={() => {
          navigation.navigate(
            !isLoggedIn
              ? "Login"
              : userData?.user?.profileSetup
              ? "EmployeeDashboard"
              : "EmployeeAdd",
          );
        }}
        arrow={true}
      />
    </View>
  );
};

export default Welcome;
