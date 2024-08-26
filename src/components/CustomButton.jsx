import {TouchableOpacity, Text, Image} from "react-native";
import images from "../assets/images";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  handleOnPress,
  variant = "gradient",
  arrow = false,
}) => {
  return (
    <>
      {variant === "gradient" ? (
        <TouchableOpacity
          onPress={handleOnPress}
          className={`${containerStyles} bg-primary rounded-lg p-5`}>
          <Text
            className={`${textStyles} text-white text-center text-xl font-poppins-medium`}>
            {title}
            {arrow && (
              <Image
                source={images.leftArrow}
                className="w-[25px] h-[20px]"
                resizeMethod="contain"
              />
            )}
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
