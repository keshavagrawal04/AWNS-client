import {Text, View, TouchableOpacity, Image} from 'react-native';
import images from '../../assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {
  CustomButton,
  CustomPasswordInput,
  CustomTextInput,
} from '../../components';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    onSubmit: async values => {},
  });

  return (
    <SafeAreaView>
      <View className="px-2 pt-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Welcome');
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
            placeholder={'Email Address'}
            id="email"
            formik={formik}
          />
        </View>
        <View>
          <CustomPasswordInput
            placeholder={'Password'}
            id="password"
            formik={formik}
          />
        </View>
        <CustomButton
          title="Login"
          containerStyles={'mt-5'}
          handleOnPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text className="text-center text-gray text-lg font-poppins-medium mb-0 my-5">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Sign Up"
          variant="plain"
          handleOnPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
