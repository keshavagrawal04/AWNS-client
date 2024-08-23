import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
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

const Signup = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      role: '',
    },
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
            <CustomTextInput placeholder={'Name'} id="name" formik={formik} />
          </View>
          <View>
            <CustomTextInput placeholder={'Email'} id="email" formik={formik} />
          </View>
          <View>
            <CustomTextInput
              placeholder={'Phone Number'}
              id="phoneNumber"
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
          <View>
            <CustomTextInput
              placeholder={'Select Your Role'}
              id="role"
              formik={formik}
            />
          </View>
          <CustomButton title="Sign Up" containerStyles={'mt-4'} />
          <CustomButton
            containerStyles={'mt-4'}
            title="Login"
            variant="plain"
            handleOnPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
