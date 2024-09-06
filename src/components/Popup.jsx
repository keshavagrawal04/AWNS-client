import {
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React from "react";
import icons from "../assets/icons";

const Popup = ({visible, setVisible, options = []}) => {
  return (
    <Modal transparent visible={visible}>
      <SafeAreaView
        className="flex-1"
        onTouchStart={() => {
          setVisible(false);
        }}>
        <View className="border border-light-gray bg-white rounded-md py-2 px-3 absolute top-14 right-5">
          {options.map((option, index) => (
            <TouchableOpacity
              className="flex flex-row gap-2 items-center justify-center"
              key={index}
              onPress={option.handlePress}>
              <Text className="text-black font-poppins-medium">
                {option.title}
              </Text>
              <Image
                source={icons[option.icon]}
                className="w-[25px] h-[25px]"
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Popup;
