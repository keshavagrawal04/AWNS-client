import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {CustomButton, OtpInput} from '../../components';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const OtpVerification = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {otp: ''},
    onSubmit: async values => {},
  });

  return (
    <SafeAreaView>
      <TouchableOpacity
        className="p-4"
        onPress={() => {
          navigation.navigate('/ForgotPassword');
        }}>
        Back{' '}
      </TouchableOpacity>
      <View className="flex justify-center items-center mt-16">
        <Text className="text-4xl text-primary font-ubuntu-bold">
          Verify Your OTP
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center px-4">
          Enter the OTP sent to your email to proceed.
        </Text>
      </View>
      <View className="mt-20 px-4">
        <OtpInput />
        <CustomButton
          title="Save"
          containerStyles={'mt-12'}
          handleOnPress={() => {
            navigation.navigate('/CreatePassword');
          }}
        />
        <View className="flex justify-center flex-row mt-4">
          <Text className="text-center text-lg font-poppins-medium text-gray">
            If you don’t get OTP :
          </Text>
          <TouchableOpacity className="text-primary text-center">
            <Text className="text-primary font-poppins-bold text-lg">
              {' '}
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
