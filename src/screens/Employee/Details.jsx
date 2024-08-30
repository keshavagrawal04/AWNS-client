import {Text, View, ScrollView} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
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

      <ScrollView className="mt-5 p-4 flex-1">
        {tabIndex === 0 && <ProfileImage handleNextTab={handleNextTab} />}
        {tabIndex === 1 && (
          <PersonalInformation
            handleNextTab={handleNextTab}
            handlePrevTab={handlePrevTab}
          />
        )}
        {tabIndex === 2 && (
          <AdditionalInformation
            handleNextTab={handleNextTab}
            handlePrevTab={handlePrevTab}
          />
        )}
        {tabIndex === 3 && <BankDetails handlePrevTab={handlePrevTab} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
