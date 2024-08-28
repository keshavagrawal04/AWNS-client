import {ScrollView, Text, TouchableOpacity, View, Image} from "react-native";
import images from "../../assets/images";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {
  CustomButton,
  CustomPasswordInput,
  CustomTextInput,
  Loader,
} from "../../components";
import {useFormik} from "formik";
import {useNavigation} from "@react-navigation/native";
import {useSignupMutation} from "../../services/api/authentication";
import {signupSchema} from "../../schema/Authentication";
import * as Burnt from "burnt";

const Signup = () => {
  const navigation = useNavigation();

  const [userSignup, {isLoading}] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobileNumber: "",
      role: "",
    },
    validationSchema: signupSchema,
    onSubmit: async values => {
      try {
        const {data, error} = await userSignup(values);
        if (data) {
          Burnt.alert({
            title: data.message,
            preset: "done",
          });
          console.log(data.message);
          navigation.navigate("Login");
        } else {
          Burnt.alert({
            title: error.data.message,
            preset: "error",
          });
          console.log(error.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) return <Loader />;

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
      <ScrollView>
        <View className="flex justify-center items-center px-4 mt-2">
          <Text className="text-4xl text-black font-ubuntu-bold">
            Create an Account
          </Text>
          <Text className="font-poppins-regular text-lg text-gray text-center">
            Join us and start your journey with a new account
          </Text>
        </View>
        <View className="mt-5 px-4">
          <View>
            <CustomTextInput
              inputStyles={"py-4"}
              placeholder={"Name"}
              id="name"
              formik={formik}
            />
          </View>
          <View>
            <CustomTextInput
              inputStyles={"py-4"}
              placeholder={"Email"}
              id="email"
              formik={formik}
            />
          </View>
          <View>
            <CustomTextInput
              inputStyles={"py-4"}
              placeholder={"Phone Number"}
              id="mobileNumber"
              formik={formik}
              type="numeric"
            />
          </View>
          <View>
            <CustomPasswordInput
              placeholder={"Password"}
              id="password"
              formik={formik}
            />
          </View>
          <View>
            <CustomTextInput
              inputStyles={"py-4"}
              placeholder={"Select Your Role"}
              id="role"
              formik={formik}
            />
          </View>
          <CustomButton
            title="Sign Up"
            containerStyles={"mt-4 rounded-lg"}
            handleOnPress={formik.handleSubmit}
          />
          <CustomButton
            containerStyles={"mt-4 rounded-lg"}
            title="Login"
            variant="plain"
            handleOnPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
