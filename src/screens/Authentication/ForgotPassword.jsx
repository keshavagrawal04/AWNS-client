import {Text, View, TouchableOpacity, Image} from "react-native";
import images from "../../assets/images";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {CustomButton, CustomTextInput} from "../../components";
import {useFormik} from "formik";
import {useNavigation} from "@react-navigation/native";
import {forgotPasswordSchema} from "../../schema/Authentication";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: forgotPasswordSchema,
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
            source={images.rightArrow}
            className="w-[30px] h-[25px]"
            resizeMethod="contain"
          />
        </TouchableOpacity>
      </View>
      <View className="flex justify-center items-center mt-16">
        <Text className="text-4xl text-black font-ubuntu-bold">
          Forgot Your Password?
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center px-8">
          Enter your email address to receive a OTP
        </Text>
      </View>
      <View className="mt-16 px-4">
        <View>
          <CustomTextInput
            inputStyles={"py-4"}
            placeholder={"Email Address"}
            id="email"
            formik={formik}
          />
        </View>
        <CustomButton
          title="Send OTP"
          containerStyles={"mt-5 rounded-lg p-5"}
          handleOnPress={() => {
            navigation.navigate("OtpVerification");
          }}
        />
        <CustomButton
          containerStyles={"mt-5 rounded-lg p-5"}
          title="Login"
          variant="plain"
          handleOnPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
