import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";

const CustomAlert = ({visible, handleClose, type = "success", message}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-80 p-5 bg-white rounded-2xl shadow-lg`}>
          <View className="flex justify-center p-3">
            <Image
              source={icons[type]}
              className="w-[80px] h-[80px] mx-auto rounded-full"
            />
          </View>
          <Text
            className={`text-black text-center text-xl font-poppins-medium mb-5`}>
            {message}
          </Text>
          <TouchableOpacity
            className={`bg-blue-500 py-2 rounded-full mx-24`}
            onPress={handleClose}>
            <Text className={`text-white text-center font-poppins-medium`}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
