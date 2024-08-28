import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../assets/images";
import ProfileImage from "./ProfileImage";
import PersonalInformation from "./PersonalInformation";
import AdditionalInformation from "./AdditionalInformation";
import BankDetails from "./BankDetails";

const Details = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleNextTab = () => {
    if (tabIndex < 3) {
      setTabIndex(prev => prev + 1);
    }
  };

  const handlePrevTab = () => {
    if (tabIndex > 0) {
      setTabIndex(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex p-4 flex-row justify-between items-center">
        <Text className="font-ubuntu-medium text-xl text-black">
          Fill Your Details
        </Text>

        <View className="flex flex-row gap-2">
          {Array.from([0, 1, 2, 3]).map(item => (
            <View
              key={item}
              className={`${
                tabIndex !== item ? "bg-primary-transparent" : "bg-primary"
              } w-[24px] h-[8px] rounded-full`}
            />
          ))}
        </View>
      </View>

      <ScrollView className="mt-5 p-4">
        {tabIndex === 0 && <ProfileImage />}
        {tabIndex === 1 && <PersonalInformation />}
        {tabIndex === 2 && <AdditionalInformation />}
        {tabIndex === 3 && <BankDetails />}
      </ScrollView>

      <View className="w-full absolute flex flex-row justify-evenly p-4 bottom-0">
        <TouchableOpacity
          className={`bg-primary rounded-xl px-5 py-2`}
          onPress={handlePrevTab}>
          <Text
            className={`text-white text-center text-xl font-poppins-medium`}>
            <Image
              source={images.prevArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />{" "}
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-primary rounded-xl px-5 py-2`}
          onPress={handleNextTab}>
          <Text
            className={`text-white text-center text-xl font-poppins-medium`}>
            Next{" "}
            <Image
              source={images.nextArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Details;
