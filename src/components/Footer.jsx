import {Image, Text, TouchableOpacity, View} from "react-native";
import images from "../assets/images";
import React, {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

const TabOption = ({title, activeIcon, deactiveIcon, tabName}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route.name);

  return (
    <TouchableOpacity
      className="flex"
      onPress={() => {
        setActiveTab(tabName);
        navigation.navigate(tabName);
      }}>
      <Image
        source={activeTab === tabName ? activeIcon : deactiveIcon}
        resizeMode="contain"
        className="w-[24px] h-[24px] mx-auto mb-1"
      />
      <Text
        className={`text-black font-poppins-medium text-[12px] ${
          activeTab === tabName ? "text-black" : "text-gray"
        }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Footer = () => {
  return (
    <View className="flex bg-white flex-row rounded-tl-3xl rounded-tr-3xl p-4 gap-2 justify-between mx-0">
      <TabOption
        title="Analytics"
        activeIcon={images.dashboardActive}
        deactiveIcon={images.dashboardDeactive}
        tabName={"Dashboard"}
      />
      <TabOption
        title="Department"
        activeIcon={images.departmentActive}
        deactiveIcon={images.departmentDeactive}
        tabName={"Department"}
      />
      <TabOption
        title="Scan"
        activeIcon={images.qrActive}
        deactiveIcon={images.qrDeactive}
        tabName={"QRScanner"}
      />
      <TabOption
        title="Meeting"
        activeIcon={images.meetingActive}
        deactiveIcon={images.meetingDeactive}
        tabName={"Meeting"}
      />
      <TabOption
        title="Employees"
        activeIcon={images.employeeActive}
        deactiveIcon={images.employeeDeactive}
        tabName={"Employees"}
      />
    </View>
  );
};

export default Footer;
