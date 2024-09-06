import {ScrollView, Text, TouchableOpacity, View, Image} from "react-native";
import images from "../../assets/images";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {
  CustomButton,
  FloatingLabelTextInput,
  Loader,
  CustomAlert,
} from "../../components";
import {useFormik} from "formik";
import {useNavigation} from "@react-navigation/native";
import {useSignupMutation} from "../../services/api/authentication";
import {signupSchema} from "../../schema/Authentication";
import icons from "../../assets/icons";

const Signup = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState({visible: false});

  const [userSignup, {isLoading}] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobileNumber: "",
    },
    validationSchema: signupSchema,
    onSubmit: async values => {
      try {
        const {data, error} = await userSignup(values);
        if (data) {
          console.log(data.message);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
              navigation.navigate("Login");
            },
          });
        } else {
          setShowAlert({
            visible: true,
            type: "error",
            message: error?.data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
            },
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
            source={icons.backArrow}
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
            <FloatingLabelTextInput
              inputStyles={"py-4"}
              label={"Name"}
              id="name"
              formik={formik}
            />
          </View>
          <View>
            <FloatingLabelTextInput
              inputStyles={"py-4"}
              label={"Email"}
              id="email"
              formik={formik}
            />
          </View>
          <View>
            <FloatingLabelTextInput
              inputStyles={"py-4"}
              label={"Phone Number"}
              id="mobileNumber"
              formik={formik}
              type="numeric"
            />
          </View>
          <View>
            <FloatingLabelTextInput
              inputStyles={"py-4"}
              label={"Password"}
              id="password"
              formik={formik}
              isPassword
            />
          </View>
          <CustomButton
            title="Sign Up"
            containerStyles={"mt-4 rounded-lg p-5"}
            handleOnPress={formik.handleSubmit}
          />
          <CustomButton
            containerStyles={"mt-4 rounded-lg p-5"}
            title="Login"
            variant="plain"
            handleOnPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </SafeAreaView>
  );
};

export default Signup;
