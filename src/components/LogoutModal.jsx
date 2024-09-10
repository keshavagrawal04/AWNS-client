import React from "react";
import {Modal, View, Text, TouchableOpacity, Image} from "react-native";
import icons from "../assets/icons";

const LogoutModal = ({visible, handleClose, handleYes}) => {
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
              source={icons.info}
              className="w-[80px] h-[80px] mx-auto rounded-full"
            />
          </View>
          <Text className="text-center text-black text-lg font-poppins-bold">
            Are you leaving?
          </Text>
          <Text
            className={`text-gray text-center text-sm font-poppins-medium mb-5 px-4`}>
            Are you sure you want to logout? once you logout you need to login
            again
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
              className={`bg-info py-3 rounded-full px-8`}
              onPress={handleYes}>
              <Text className={`text-white text-center font-poppins-medium`}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
