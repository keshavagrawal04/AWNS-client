import {Text, View} from "react-native";
import React from "react";
import {CustomButton} from "../../components";

const ProfileImage = () => {
  return (
    <View>
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Profile Image
      </Text>
      <View className="p-5">
        <View className="h-[200px] flex justify-center w-full rounded-lg border border-dashed">
          <Text className="text-center text-black font-poppins-regular">
            Image Preview
          </Text>
        </View>
        <CustomButton
          containerStyles={"mt-8 mx-10 rounded-full"}
          title={"Browse"}
        />
      </View>
    </View>
  );
};

export default ProfileImage;
