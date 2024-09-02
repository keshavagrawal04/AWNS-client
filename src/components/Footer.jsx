import {Image, Text, TouchableOpacity, View} from "react-native";
import images from "../assets/images";
import React from "react";

const Footer = ({activeTab, setActiveTab}) => {
  const tabOptions = [
    {
      title: "Analytics",
      activeIcon: images.dashboardActive,
      deactiveIcon: images.dashboardDeactive,
      tabName: "Dashboard",
    },
    {
      title: "Department",
      activeIcon: images.departmentActive,
      deactiveIcon: images.departmentDeactive,
      tabName: "Department",
    },
    {
      title: "Scan",
      activeIcon: images.qrActive,
      deactiveIcon: images.qrDeactive,
      tabName: "QRScanner",
    },
    {
      title: "Meeting",
      activeIcon: images.meetingActive,
      deactiveIcon: images.meetingDeactive,
      tabName: "Meeting",
    },
    {
      title: "Employees",
      activeIcon: images.employeeActive,
      deactiveIcon: images.employeeDeactive,
      tabName: "Employees",
    },
  ];

  return (
    <View className="flex bg-white flex-row rounded-tl-3xl rounded-tr-3xl p-4 gap-2 justify-between mx-0">
      {tabOptions?.map(({tabName, activeIcon, deactiveIcon, title}, index) => (
        <TouchableOpacity
          key={index}
          className="flex"
          onPress={() => {
            setActiveTab(tabName);
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
      ))}
    </View>
  );
};

export default Footer;
