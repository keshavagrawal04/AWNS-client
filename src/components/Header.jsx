import {Text, View, Image} from "react-native";
import images from "../assets/images";
import React from "react";

const Header = ({title}) => {
  return (
    <View className="flex align-middle content-center flex-row py-4 justify-between px-4">
      <Text className="font-ubuntu-bold text-3xl text-black">{title}</Text>
      <View className="flex gap-3 justify-center align-middle content-center flex-row">
        <View className="flex align-middle content-center justify-center">
          <Image
            source={images.notification}
            className="w-[26px] h-[26px]"
            resizeMethod="contain"
          />
        </View>
        <Image
          source={images.profile}
          className="w-[42px] h-[42px]"
          resizeMethod="contain"
        />
      </View>
    </View>
  );
};

export default Header;
