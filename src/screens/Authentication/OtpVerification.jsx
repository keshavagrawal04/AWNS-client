import {Text, View, TouchableOpacity, Image} from "react-native";
import images from "../../assets/images";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {CustomButton, OtpInput} from "../../components";
import {useFormik} from "formik";
import {useNavigation} from "@react-navigation/native";
import icons from "../../assets/icons";

const OtpVerification = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {otp: ""},
    onSubmit: async values => {},
  });

  return (
    <SafeAreaView>
      <View className="px-2 pt-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Welcome");
          }}>
          <Image
            source={icons.backArrow}
            className="w-[30px] h-[25px]"
            resizeMethod="contain"
          />
        </TouchableOpacity>
      </View>
      <View className="flex justify-center items-center mt-16">
        <Text className="text-4xl text-black font-ubuntu-bold">
          Verify Your OTP
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center px-4">
          Enter the OTP sent to your email to proceed.
        </Text>
      </View>
      <View className="mt-20 px-4">
        <OtpInput />
        <View className="flex justify-center flex-row mt-8">
          <Text className="text-center text-lg font-poppins-medium text-gray">
            If you don’t get OTP :
          </Text>
          <TouchableOpacity className="text-center">
            <Text className="text-black font-poppins-bold text-lg">
              {"  "}
              Resend
              <Image
                source={images.resend}
                className="w-[18px] h-[18px]"
                resizeMethod="contain"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Save"
          containerStyles={"mt-12 rounded-lg p-5"}
          handleOnPress={() => {
            navigation.navigate("CreatePassword");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
