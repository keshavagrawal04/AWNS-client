import {Text, View, TouchableOpacity, Image} from "react-native";
import images from "../../assets/images";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {
  CustomButton,
  CustomPasswordInput,
  CustomTextInput,
  Loader,
  CustomAlert,
} from "../../components";
import {useFormik} from "formik";
import {useNavigation} from "@react-navigation/native";
import {useLoginMutation} from "../../services/api/authentication";
import {loginSchema} from "../../schema/Authentication";
import {useAuth} from "../../hooks";

const Login = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState({visible: false});

  const {login, user} = useAuth();

  const [userLogin, {isLoading}] = useLoginMutation();

  const formik = useFormik({
    initialValues: {email: "", password: ""},
    validationSchema: loginSchema,
    onSubmit: async values => {
      try {
        const {data, error} = await userLogin(values);
        if (data) {
          console.log(data?.message);
          login(data?.data);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
              navigation.navigate(
                user.profileSetup ? "Dashboard" : "EmployeeAdd",
              );
            },
          });
        } else {
          console.log(error.data.message);
          setShowAlert({
            visible: true,
            type: "error",
            message: error?.data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
            },
          });
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
      <View className="flex justify-center items-center px-4  mt-16">
        <Text className="text-4xl text-black font-ubuntu-bold">
          Welcome Back!
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center">
          Sign in to your account to access your dashboard
        </Text>
      </View>
      <View className="mt-20 px-4">
        <View>
          <CustomTextInput
            inputStyles={"py-4"}
            placeholder={"Email Address"}
            id="email"
            formik={formik}
          />
        </View>
        <View>
          <CustomPasswordInput
            placeholder={"Password"}
            id="password"
            formik={formik}
          />
        </View>
        <CustomButton
          title="Login"
          containerStyles={"mt-5 rounded-lg p-5"}
          handleOnPress={formik.handleSubmit}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}>
          <Text className="text-center text-gray text-lg font-poppins-medium mb-0 my-5">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Sign Up"
          variant="plain"
          containerStyles={"rounded-lg p-5"}
          handleOnPress={() => {
            navigation.navigate("Signup");
          }}
        />
      </View>
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </SafeAreaView>
  );
};

export default Login;
