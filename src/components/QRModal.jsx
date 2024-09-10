import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";
import images from "../assets/images";

const QRModal = ({visible, handleClose, qr}) => {
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
          <View className="mb-4 mt-2 px-4"></View>
        </View>
      </View>
    </Modal>
  );
};

export default QRModal;
