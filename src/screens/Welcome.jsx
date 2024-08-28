import {View, Text, Image} from "react-native";
import React from "react";
import {CustomButton, Loader} from "../components";
import {useNavigation} from "@react-navigation/native";
import images from "../assets/images";
import {useAuth} from "../hooks";

const Welcome = () => {
  const navigation = useNavigation();
  const {isLoggedIn, isLoading, user} = useAuth();

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
        containerStyles={"mt-28 rounded-lg"}
        title="Get Started"
        handleOnPress={() => {
          navigation.navigate(
            !isLoggedIn
              ? "Login"
              : user?.profileSetup
              ? "Dashboard"
              : "EmployeeAdd",
          );
        }}
        arrow={true}
      />
    </View>
  );
};

export default Welcome;
