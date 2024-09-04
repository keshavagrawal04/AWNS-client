import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";

const DeleteModal = ({title, visible, handleClose, handleYes}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-80 py-5 px-2 bg-white rounded-2xl shadow-lg`}>
          <View className="flex justify-center p-3">
            <Image
              source={icons.cancel}
              className="w-[80px] h-[80px] mx-auto rounded-full"
            />
          </View>
          <Text className="text-center text-black text-lg font-poppins-medium">
            Are you sure you want DELETE{" "}
            <Text className="text-red font-poppins-medium">{title}</Text>?
          </Text>

          <View className="flex justify-center gap-2 flex-row mt-3">
            <TouchableOpacity
              className={`bg-[#F3F3F3] py-3 rounded-full px-5`}
              onPress={handleClose}>
              <Text className={`text-gray text-center font-poppins-medium`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-red py-3 rounded-full px-5`}
              onPress={handleYes}>
              <Text className={`text-white text-center font-poppins-medium`}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
