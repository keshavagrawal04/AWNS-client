import {View, ScrollView} from "react-native";
import {Footer} from "../components";
import React, {useState} from "react";
import {Dashboard, Department, Employees, Meeting, QRScanner} from "../screens";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <View className="flex-1">
      <View className="flex-grow">
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "Department" && <Department />}
        {activeTab === "QRScanner" && <QRScanner />}
        {activeTab === "Meeting" && <Meeting />}
        {activeTab === "Employees" && <Employees />}
      </View>
      <View className="w-full absolute bottom-0">
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
};

export default MainLayout;
