import {Text, View, TouchableOpacity, Image} from 'react-native';
import images from '../../assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {CustomButton, CustomPasswordInput} from '../../components';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const CreatePassword = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {password: '', confirmPassword: ''},
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
      <View className="flex justify-center items-center mt-16">
        <Text className="text-4xl text-black font-ubuntu-bold">
          Create a New Password
        </Text>
        <Text className="font-poppins-regular text-lg text-gray text-center">
          Choose a strong password to secure your account
        </Text>
      </View>
      <View className="mt-20 px-4">
        <View>
          <CustomPasswordInput
            placeholder={'Password'}
            id="password"
            formik={formik}
          />
        </View>
        <View>
          <CustomPasswordInput
            placeholder={'Confirm Password'}
            id="confirmPassword"
            formik={formik}
          />
        </View>
        <CustomButton title="Save" containerStyles={'mt-5'} />
      </View>
    </SafeAreaView>
  );
};

export default CreatePassword;
