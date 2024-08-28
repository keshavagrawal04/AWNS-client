import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";
import images from "../assets/images";

const CustomModal = ({visible, handleClose, user}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-80 p-5 bg-white rounded-xl shadow-lg`}>
          <Text className="text-2xl text-black font-ubuntu-bold mb-4 text-center">
            Scan Data
          </Text>
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={handleClose}>
            <Image source={icons.close} className="w-[25px] h-[25px]" />
          </TouchableOpacity>
          <View className="mb-4 px-4">
            <View className="flex gap-2 flex-row mb-2">
              <Image source={images.profile} className="w-[50px] h-[50px]" />
              <View>
                <Text className="text-black text-xl font-poppins-medium">
                  {user?.name}
                </Text>
                <Text className="text-gray text-lg font-poppins-medium">
                  {user?.position}
                </Text>
              </View>
            </View>
            <Text className="font-poppins-medium w-100 py-3 text-center border-t border-gray text-gray">
              <Image source={icons.email} className="w-[17px] h-[17px]" />{" "}
              {user?.email}
            </Text>
            <Text className="text-center w-100 font-poppins-medium py-3 m border-t border-gray text-gray">
              <Image source={icons.call} className="w-[17px] h-[17px]" />{" "}
              {`+91 ${user?.mobileNumber}`}
            </Text>
          </View>
          <TouchableOpacity
            className={`bg-blue-500 py-2 rounded-full`}
            onPress={handleClose}>
            <Text
              className={`text-white text-center font-poppins-medium font-semibold`}>
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
