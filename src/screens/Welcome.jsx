import {View, Text, Image} from 'react-native';
import React from 'react';
import {CustomButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import images from '../assets/images';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View className="px-5 pt-10">
      <Text className="text-black text-4xl font-ubuntu-bold">AWNS</Text>
      <Text className="text-black text-4xl font-ubuntu-bold">
        Management System
      </Text>
      <Text className="text-gray font-poppins-medium text-lg mt-2">
        Boost efficiency and unlock potential with our tailored management
        solutions.
      </Text>
      <View className="">
        <Image
          source={images.heroImage}
          className="w-[360px] h-[400px]"
          resizeMethod="contain"
        />
      </View>
      <CustomButton
        containerStyles={'mt-28'}
        title="Get Started"
        handleOnPress={() => {
          navigation.navigate('Login');
        }}
        arrow={true}
      />
    </View>
  );
};

export default Welcome;
