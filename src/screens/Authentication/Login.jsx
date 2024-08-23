import {Text, View, TouchableOpacity} from 'react-native';
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('/Welcome');
        }}>
        Back{' '}
      </TouchableOpacity>
      <View className="flex justify-center items-center px-4  mt-16">
        <Text className="text-4xl text-primary font-ubuntu-bold">
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
        <CustomButton title="Login" containerStyles={'mt-5'} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('/ForgotPassword');
          }}>
          <Text className="text-center text-gray text-lg font-poppins-medium mb-0 my-5">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Sign Up"
          variant="plain"
          handleOnPress={() => {
            navigation.navigate('/Signup');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
