import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {CustomButton, CustomTextInput} from '../../components';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {email: ''},
    onSubmit: async values => {},
  });

  return (
    <SafeAreaView>
      <TouchableOpacity
        className="p-4"
        onPress={() => {
          navigation.navigate('/Login');
        }}>
        Back
      </TouchableOpacity>
      <View className="flex justify-center items-center mt-16">
        <Text className="text-4xl text-primary font-ubuntu-bold">
          Forgot Your Password?
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center px-8">
          Enter your email address to receive a OTP
        </Text>
      </View>
      <View className="mt-16 px-4">
        <View>
          <CustomTextInput
            placeholder={'Email Address'}
            id="email"
            formik={formik}
          />
        </View>
        <CustomButton
          title="Send OTP"
          containerStyles={'mt-5'}
          handleOnPress={() => {
            navigation.navigate('/OtpVerification');
          }}
        />
        <CustomButton
          containerStyles={'mt-5'}
          title="Login"
          variant="plain"
          handleOnPress={() => {
            navigation.navigate('/Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
