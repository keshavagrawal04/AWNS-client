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
        <View className={`w-80 p-5 bg-white rounded-2xl shadow-lg`}>
          <Text className="text-2xl text-black font-ubuntu-bold mb-4 text-center">
            Scan Data
          </Text>
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={handleClose}>
            <Image source={icons.close} className="w-[25px] h-[25px]" />
          </TouchableOpacity>
          <View className="mb-4 mt-2 px-4">
            <View className="flex justify-center">
              {user?.profileImage ? (
                <Image
                  source={{uri: user?.profileImage}}
                  className="w-[55px] h-[55px] mx-auto rounded-full mb-2"
                />
              ) : (
                <Image
                  source={images.profile}
                  className="w-[55px] h-[55px] mx-auto rounded-full mb-2"
                />
              )}
              <Text className="text-black text-center text-xl font-poppins-medium">
                {user?.name}
              </Text>
              <Text className="text-gray text-center text-md font-poppins-medium">
                {user?.department}
              </Text>
            </View>
            <Text className="font-poppins-medium w-100 pt-1 text-center text-black">
              <Image source={icons.email} className="w-[17px] h-[17px]" />{" "}
              {user?.email}
            </Text>
            <Text className="text-center w-100 pt-1 font-poppins-medium text-black">
              <Image source={icons.call} className="w-[17px] h-[17px]" />{" "}
              {`+91 ${user?.mobileNumber}`}
            </Text>
          </View>
          <TouchableOpacity
            className={`bg-blue-500 py-2 rounded-full mx-24`}
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
