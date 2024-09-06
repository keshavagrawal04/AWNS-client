import React from "react";
import {Modal, View, Text, Image, TouchableOpacity} from "react-native";
import icons from "../assets/icons";

const Filter = ({visible, handleClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View className={`flex-1 justify-end items-center bg-black/50`}>
        <View className={`w-full p-5 bg-white rounded-t-3xl shadow-lg`}>
          <View className="flex flex-row justify-between items-center border-b border-light-gray pb-5">
            <Text className="text-black font-ubuntu-bold text-3xl">
              Filters
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.close} className="w-[30px] h-[30px]" />
            </TouchableOpacity>
          </View>
          <View className="my-5">
            <Text className="text-black font-poppins-medium text-xl">
              Leave Status
            </Text>
          </View>
          <View className="flex flex-row justify-end mt-16 space-x-3">
            <TouchableOpacity
              className={`border border-gray bg-[#EBEBEB] rounded-full px-8 py-2`}>
              <Text
                className={`text-gray text-center my-auto text-xl font-poppins-medium`}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-primary flex justify-center rounded-full px-5 py-3`}
              onPress={handleClose}>
              <Text
                className={`text-white text-center my-auto text-xl font-poppins-medium`}>
                Show Results
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Filter;
