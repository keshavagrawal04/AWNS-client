import {View, ScrollView} from "react-native";
import React from "react";
import {Footer, Header} from "../components";
import {useRoute} from "@react-navigation/native";

const MainLayout = ({children}) => {
  const route = useRoute();

  return (
    <View className="flex-1">
      <View className="w-full">
        <Header title={route.name} />
      </View>
      <ScrollView className="flex-grow">{children}</ScrollView>
      <View className="w-full absolute bottom-0">
        <Footer />
      </View>
    </View>
  );
};

export default MainLayout;
