import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";

const CustomAlert = ({visible, handleClose, type = "success", message}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-80 p-5 bg-white rounded-2xl shadow-lg`}>
          <View className="flex justify-center p-3">
            <Image
              source={icons[type]}
              className="w-[80px] h-[80px] mx-auto rounded-full"
            />
          </View>
          <Text
            className={`text-center text-black text-xl font-poppins-medium`}>
            {type === "success" ? "Well Done!" : "Sorry!"}
          </Text>
          <Text
            className={`text-center text-gray text-lg font-poppins-medium mb-5`}>
            {message}
          </Text>
          <TouchableOpacity
            className={`py-2 rounded-full mx-24 ${
              type === "success" ? "bg-green" : "bg-red"
            }`}
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
