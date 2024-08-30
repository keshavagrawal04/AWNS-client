import {View, Text, Image} from "react-native";
import React, {useState} from "react";
import {CustomButton, Loader} from "../../components";
import {useNavigation} from "@react-navigation/native";
import images from "../../assets/images";
import {useAuth} from "../../hooks";

const EmployeeAdd = () => {
  const navigation = useNavigation();
  const {isLoading} = useAuth();

  if (isLoading) return <Loader />;

  return (
    <View className="px-5 pt-10">
      <View className="mt-4">
        <Image
          source={images.employeeaddHero}
          className="w-[360px] h-[400px]"
          resizeMethod="contain"
        />
      </View>
      <View className="mt-24">
        <Text className="text-primary text-center text-2xl font-ubuntu-bold">
          Welcome back!
        </Text>
        <Text className="text-gray text-center font-poppins-medium text-sm mt-2">
          To get started, please complete your profile by filling in all the
          required details. This helps us ensure everything is up to date.
        </Text>
      </View>
      <CustomButton
        containerStyles={"mt-5 rounded-full p-5"}
        title="Get Started"
        handleOnPress={() => {
          navigation.navigate("Details");
        }}
        arrow={true}
      />
    </View>
  );
};

export default EmployeeAdd;
