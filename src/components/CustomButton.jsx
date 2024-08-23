import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  handleOnPress,
  variant = 'gradient',
}) => {
  return (
    <>
      {variant === 'gradient' ? (
        <TouchableOpacity
          onPress={handleOnPress}
          className={`${containerStyles} bg-secondary rounded-lg p-5`}>
          <Text
            className={`${textStyles} text-white text-center text-xl font-poppins-medium`}>
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleOnPress}
          className={`${containerStyles} border border-light-gray bg-[#F3F3F3] rounded-lg p-5`}>
          <Text
            className={`${textStyles} text-black text-center text-xl font-poppins-medium`}>
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CustomButton;
